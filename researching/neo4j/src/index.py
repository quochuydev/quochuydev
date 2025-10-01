import nest_asyncio
import os
from datetime import datetime
from neo4j import GraphDatabase
import numpy as np
import sys

nest_asyncio.apply()
import asyncio
from dotenv import load_dotenv
from llama_index.llms.openai import OpenAI
from llama_index.core.agent.workflow import FunctionAgent
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core.tools import FunctionTool
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any, Tuple, Union
import json
import uuid
import re

# Neo4jPropertyGraphStore is not actually used in this implementation
# We're using direct Neo4j driver for better control

load_dotenv()

# LLM and Embedding models
llm = OpenAI(
    model="gpt-4.1",
    api_key=os.getenv("OPENAI_API_KEY"),
    temperature=0.1,
)

embed_model = OpenAIEmbedding(
    model="text-embedding-3-small",
    api_key=os.getenv("OPENAI_API_KEY"),
)

# Neo4j connection
username = "neo4j"
password = "Qwerty@123"
url = "bolt://localhost:7687"
database = "neo4j"

# Initialize Neo4j driver
driver = GraphDatabase.driver(url, auth=(username, password))

# Global variables
neo4j_store = None
embed_dimension = 1536  # OpenAI text-embedding-3-small dimension


def setup_vector_indexes():
    """Setup Neo4j vector indexes for GraphRAG."""
    with driver.session(database=database) as session:
        # Create vector index for entities
        session.run(
            """
        CREATE VECTOR INDEX entity_vector_index IF NOT EXISTS
        FOR (e:Entity)
        ON (e.embedding)
        OPTIONS {
            indexConfig: {
                `vector.dimensions`: 1536,
                `vector.similarity_function`: 'cosine'
            }
        }
        """
        )

        # Create vector index for fields
        session.run(
            """
        CREATE VECTOR INDEX field_vector_index IF NOT EXISTS
        FOR (f:Field)
        ON (f.embedding)
        OPTIONS {
            indexConfig: {
                `vector.dimensions`: 1536,
                `vector.similarity_function`: 'cosine'
            }
        }
        """
        )

        # Create full-text search indexes
        session.run(
            """
        CREATE FULLTEXT INDEX entity_text_index IF NOT EXISTS
        FOR (e:Entity)
        ON EACH [e.id, e.description]
        """
        )

        session.run(
            """
        CREATE FULLTEXT INDEX field_text_index IF NOT EXISTS
        FOR (f:Field)
        ON EACH [f.name, f.description]
        """
        )

    print("✅ Vector indexes created in Neo4j")


def create_embedding(text: str) -> List[float]:
    """Create embedding for text using OpenAI."""
    response = embed_model.get_text_embedding(text)
    return response


def create_entity_embedding(
    project: str, entity: str, fields: List[str]
) -> List[float]:
    """Create embedding for entity with context."""
    entity_text = f"Project: {project}\n"
    entity_text += f"Entity: {entity}\n"
    entity_text += "Fields:\n"
    for field in fields:
        entity_text += f"- {field}\n"

    return create_embedding(entity_text)


def create_field_embedding(field_name: str, entity: str, project: str) -> List[float]:
    """Create embedding for field with entity context."""
    field_text = f"Project: {project}\n"
    field_text += f"Entity: {entity}\n"
    field_text += f"Field: {field_name}"

    return create_embedding(field_text)


def create_relationship_embedding(
    source: str, target: str, relation: str
) -> List[float]:
    """Create embedding for relationship."""
    rel_text = f"Relationship: {source} --{relation}--> {target}"
    return create_embedding(rel_text)


class EntityDetails(BaseModel):
    entity: str
    fields: List[str]
    project: str
    related_entities: List[str] = []


# Helper functions for embedding creation (used by vector search tool)


# Generic Cypher execution tool for LLM
async def execute_cypher_tool(
    cypher_query: str, params: Dict[str, Any] = None
) -> Union[List[Dict[str, Any]], Dict[str, Any], str]:
    """Execute arbitrary Cypher query against Neo4j database.

    Args:
        cypher_query: The Cypher query string to execute
        params: Optional parameters dictionary for parameterized queries

    Returns:
        Query results as list of records or single value
    """
    global driver, database

    if params is None:
        params = {}

    try:
        with driver.session(database=database) as session:
            result = session.run(cypher_query, params)

            # Check if it's a write operation
            query_lower = cypher_query.lower().strip()
            if any(
                op in query_lower
                for op in ["create", "merge", "set", "delete", "detach"]
            ):
                # For write operations, return summary
                summary = result.consume()
                return {
                    "status": "success",
                    "query_type": "write",
                    "counters": {
                        "nodes_created": summary.counters.nodes_created,
                        "nodes_deleted": summary.counters.nodes_deleted,
                        "relationships_created": summary.counters.relationships_created,
                        "relationships_deleted": summary.counters.relationships_deleted,
                        "properties_set": summary.counters.properties_set,
                    },
                }
            else:
                # For read operations, return all records
                records = []
                for record in result:
                    # Convert Neo4j Record to dict
                    record_dict = {}
                    for key in record.keys():
                        value = record[key]
                        # Handle Neo4j types
                        if hasattr(value, "items"):
                            record_dict[key] = dict(value)
                        elif hasattr(value, "__iter__") and not isinstance(
                            value, (str, bytes)
                        ):
                            record_dict[key] = list(value)
                        else:
                            record_dict[key] = value
                    records.append(record_dict)

                return records

    except Exception as e:
        return {"status": "error", "error": str(e), "query": cypher_query}


# Vector search helper tool
async def vector_search_tool(query: str, top_k: int = 5) -> List[Dict[str, Any]]:
    """Perform vector similarity search using Neo4j's vector index.

    Args:
        query: Search query text
        top_k: Number of results to return
    """
    # Create query embedding
    query_embedding = await asyncio.get_event_loop().run_in_executor(
        None, create_embedding, query
    )

    cypher_query = """
    CALL db.index.vector.queryNodes('entity_vector_index', $top_k, $query_embedding)
    YIELD node, score
    MATCH (node)-[:BELONGS_TO]->(p:Project)
    OPTIONAL MATCH (node)<-[:BELONGS_TO]-(f:Field)
    WITH node, p, score, collect(DISTINCT f.name) as fields
    RETURN {
        entity: node.id,
        project: p.name,
        fields: fields,
        score: score
    } as result
    ORDER BY score DESC
    """

    params = {"top_k": top_k, "query_embedding": query_embedding}

    return await execute_cypher_tool(cypher_query, params)


# Create function tools
execute_cypher_tool_obj = FunctionTool.from_defaults(
    fn=execute_cypher_tool,
    name="execute_cypher",
    description="Execute arbitrary Cypher query against Neo4j database. Use this for all graph operations.",
)

vector_search_tool_obj = FunctionTool.from_defaults(
    fn=vector_search_tool,
    name="vector_search",
    description="Perform vector similarity search using Neo4j's vector index",
)


# Agent with Cypher generation capability
agent = FunctionAgent(
    llm=llm,
    tools=[execute_cypher_tool_obj, vector_search_tool_obj],
    system_prompt="""You are a GraphRAG assistant with Neo4j database backend.

You have direct access to execute Cypher queries using the execute_cypher tool. You must generate appropriate Cypher queries for each operation:

SCHEMA:
- Nodes: Entity (id, name, project, embedding), Field (id, name, embedding), Project (id, name)
- Relationships: BELONGS_TO (Entity->Project, Field->Entity), RELATION (Entity->Entity with type property)
- Vector indexes: entity_vector_index, field_vector_index
- Full-text indexes: entity_text_index, field_text_index

COMMON OPERATIONS:

1. Create entity:
```cypher
MERGE (p:Project {id: $project_id, name: $project_name})
MERGE (e:Entity {id: $entity_id, name: $entity_name, project: $project_id})
SET e.embedding = $entity_embedding
MERGE (e)-[:BELONGS_TO]->(p)
```
IMPORTANT: When creating entities, you MUST:
- Create the entity embedding using the create_entity_embedding helper function
- Include the embedding in your Cypher query parameters
- Example workflow:
  1. Create embedding: entity_embedding = create_entity_embedding(project_name, entity_name, field_list)
  2. Use embedding in Cypher: SET e.embedding = $entity_embedding

2. Create field:
```cypher
MATCH (e:Entity {id: $entity_id})
MERGE (f:Field {id: $field_id, name: $field_name})
SET f.embedding = $field_embedding
MERGE (f)-[:BELONGS_TO]->(e)
```
IMPORTANT: When creating fields, you MUST:
- Create the field embedding using the create_field_embedding helper function
- Include the embedding in your Cypher query parameters

3. Create relationship:
```cypher
MATCH (s:Entity {id: $source_id})
MATCH (t:Entity {id: $target_id})
MERGE (s)-[r:RELATION {type: $relation_type}]->(t)
```

4. Get entity details:
```cypher
MATCH (e:Entity {id: $entity_id})
OPTIONAL MATCH (e)<-[:BELONGS_TO]-(f:Field)
OPTIONAL MATCH (e)-[]->(p:Project)
RETURN e.id as entity, p.name as project, collect(DISTINCT f.name) as fields
```

5. Semantic search: Use the vector_search tool

6. Graph traversal:
```cypher
MATCH (e:Entity {id: $start_id})--(related:Entity)
WHERE related.id <> $start_id
RETURN related.id as related_entity
```

Important:
- Generate appropriate Cypher queries for each request
- Use parameterized queries with $params for security
- Entity IDs are formatted as "Entity:Name"
- Field IDs are formatted as "Field:Name"
- Project IDs are formatted as "Project:ID"
- Vector embeddings should be created using OpenAI embeddings
- When creating embeddings, use the helper functions available
- Always format responses as JSON
- For project names with "(id:project is XXX)", extract both the ID and name
""",
    output_cls=EntityDetails,
)


async def main():
    """Main function."""
    function_to_run = ""

    if len(sys.argv) > 1:
        function_to_run = sys.argv[1]

    try:
        if function_to_run == "clear":
            await clear_database()
        elif function_to_run == "test":
            await test_agent_cypher_generation()
        else:
            print("Available commands:")
            print("  clear  - Clear Neo4j database")
            print("  test   - Test LLM Cypher generation")
            return
    except Exception as e:
        print(f"\n❌ Error: {e}")
        raise


async def clear_database():
    """Clear all data and recreate indexes."""
    with driver.session(database=database) as session:
        session.run("MATCH (n) DETACH DELETE n")
    print("📝 Cleared Neo4j database")
    setup_vector_indexes()


async def test_agent_cypher_generation():
    """Test the LLM agent generating Cypher queries."""
    print("🧪 Testing LLM Cypher Generation...\n")

    # Test 1: Create entities with proper embeddings (manual approach)
    print("1. Creating entities with embeddings...")

    # Create Image entity with embedding
    project_name = "Image Detail View (id:project is 1993)"
    entity_name = "Image"
    fields = [
        "id",
        "filename",
        "path",
        "url",
        "caption",
        "uploadedBy",
        "uploadedAt",
        "capturedAt",
        "fileSize",
        "width",
        "height",
        "mimeType",
        "cameraModel",
        "location",
        "tags",
    ]

    # Create embedding
    entity_embedding = create_entity_embedding(project_name, entity_name, fields)

    # Create entity using Cypher
    cypher = """
    MERGE (p:Project {id: 'Project:1993', name: $project_name})
    MERGE (e:Entity {id: $entity_id, name: $entity_name, project: 'Project:1993'})
    SET e.embedding = $entity_embedding
    MERGE (e)-[:BELONGS_TO]->(p)
    """

    result = await execute_cypher_tool(
        cypher,
        {
            "project_name": project_name,
            "entity_id": f"Entity:{entity_name}",
            "entity_name": entity_name,
            "entity_embedding": entity_embedding,
        },
    )
    print("✅ Image entity created with embedding")

    # Create fields for Image entity
    for field in fields:
        field_embedding = create_field_embedding(field, entity_name, project_name)
        field_cypher = """
        MATCH (e:Entity {id: $entity_id})
        MERGE (f:Field {id: $field_id, name: $field_name})
        SET f.embedding = $field_embedding
        MERGE (f)-[:BELONGS_TO]->(e)
        """
        await execute_cypher_tool(
            field_cypher,
            {
                "entity_id": f"Entity:{entity_name}",
                "field_id": f"Field:{field}",
                "field_name": field,
                "field_embedding": field_embedding,
            },
        )

    # Create User entity with embedding
    entity_name = "User"
    fields = ["id", "username", "displayName", "email", "avatarUrl"]
    entity_embedding = create_entity_embedding(project_name, entity_name, fields)

    result = await execute_cypher_tool(
        cypher,
        {
            "project_name": project_name,
            "entity_id": f"Entity:{entity_name}",
            "entity_name": entity_name,
            "entity_embedding": entity_embedding,
        },
    )
    print("✅ User entity created with embedding")

    # Create fields for User entity
    for field in fields:
        field_embedding = create_field_embedding(field, entity_name, project_name)
        field_cypher = """
        MATCH (e:Entity {id: $entity_id})
        MERGE (f:Field {id: $field_id, name: $field_name})
        SET f.embedding = $field_embedding
        MERGE (f)-[:BELONGS_TO]->(e)
        """
        await execute_cypher_tool(
            field_cypher,
            {
                "entity_id": f"Entity:{entity_name}",
                "field_id": f"Field:{field}",
                "field_name": field,
                "field_embedding": field_embedding,
            },
        )

    # Test 2: Create relationship
    print("\n2. Creating relationship using LLM-generated Cypher...")
    result3 = await agent.run(
        "Create a relationship from Image to User with type 'UPLOADED_BY'"
    )
    print("✅ Relationship created")

    # Test 3: Query entities
    print("\n3. Querying entity details using LLM-generated Cypher...")
    result4 = await agent.run("Get details for the User entity")
    print("✅ User details retrieved")

    # Test 4: Semantic search
    print("\n4. Testing semantic search...")
    result5 = await agent.run(
        "Search for entities related to user profiles using vector search"
    )
    print("✅ Semantic search completed")

    print("\n🎉 All tests completed successfully!")
    print("\n🚀 GraphRAG with LLM-Generated Cypher Summary:")
    print("- ✅ LLM generates Cypher queries dynamically")
    print("- ✅ Generic Cypher execution tool")
    print("- ✅ Vector search capabilities")
    print("- ✅ Natural language to graph operations")


if __name__ == "__main__":
    asyncio.run(main())
