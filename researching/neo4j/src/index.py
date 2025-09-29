import nest_asyncio
import os
from datetime import datetime
from neo4j import GraphDatabase
import sys

nest_asyncio.apply()
import asyncio
from llama_index.core import StorageContext
from dotenv import load_dotenv
from llama_index.llms.openai import OpenAI
from llama_index.core.agent.workflow import FunctionAgent
from pydantic import BaseModel, Field
from typing import List
from llama_index.graph_stores.neo4j import Neo4jPropertyGraphStore
from llama_index.core import PropertyGraphIndex
from llama_index.core.tools import QueryEngineTool
from llama_index.core.tools import FunctionTool

load_dotenv()

llm = OpenAI(
    model="gpt-4.1",
    api_key=os.getenv("OPENAI_API_KEY"),
    temperature=0.1,
)

username = "neo4j"
password = "Qwerty@123"
url = "bolt://localhost:7687"
embed_dim = 768
database = "neo4j"


def check_neo4j_connection():
    """Check Neo4j connectivity before starting the agent."""
    try:
        driver = GraphDatabase.driver(url, auth=(username, password))
        with driver.session(database=database) as session:
            result = session.run("RETURN 1 AS ok")
            record = result.single()
            if record and record["ok"] == 1:
                print("✅ Connected to Neo4j.")
                return True
            else:
                print("❌ Failed to verify Neo4j query.")
                return False
    except Exception as e:
        print(f"❌ Neo4j connection error: {e}")
        return False


if not check_neo4j_connection():
    raise RuntimeError("Neo4j is not available. Please check credentials or DB status.")


property_graph_store = Neo4jPropertyGraphStore(
    username=username,
    password=password,
    url=url,
)


class EntityDetails(BaseModel):
    entity: str
    fields: List[str]
    relatedEntities: List[str]


class CreateEntityResponse(BaseModel):
    project: str
    entity: str
    fields: List[str]
    status: str = "success"


class CreateRelationResponse(BaseModel):
    source: str
    target: str
    relation: str
    status: str = "success"


class UpdateEntityResponse(BaseModel):
    entity: str
    new_fields: List[str]
    status: str = "success"


def create_entity(project: str, entity: str, fields: List[str]) -> dict:
    """
    Create a new project (if not exists), create a new entity under it,
    and create all its fields in Neo4j.

    Use this tool when:
    - Defining new entities for the first time
    - Setting up initial data structures
    - Creating entities with their complete field definitions

    Input format:
    - project: str - The project name (e.g., "Image Management System")
    - entity: str - The entity name (e.g., "User", "Image")
    - fields: List[str] - Complete list of field names for this entity

    Returns JSON with success status and created entity details.
    """
    statements = []
    statements.append(f'MERGE (p:Project {{id:"Project:{project}", name:"{project}"}})')
    statements.append(
        f'MERGE (e:Entity {{id:"Entity:{entity}"}}) MERGE (e)-[:BELONGS_TO]->(p)'
    )

    for i, field in enumerate(fields):
        var = f"f{i}"
        # Store the sanitized field name as a property, not as a dynamic label
        safe_field = field.replace(" ", "_").replace("-", "_")
        statements.append(
            f'MERGE ({var}:Field {{id:"Field:{field}", name:"{field}", safe_name:"{safe_field}"}}) '
            f"MERGE ({var})-[:BELONGS_TO]->(e)"
        )

    cypher = "\n".join(statements)
    print("Cypher create_entity:\n", cypher)

    property_graph_store.structured_query(cypher)

    return CreateEntityResponse(
        project=project, entity=entity, fields=fields
    ).model_dump()


def create_relation(source: str, target: str, relation: str = "RELATED_TO") -> dict:
    """
    Create a relationship between two existing entities in Neo4j.

    Use this tool when:
    - Connecting two entities that already exist
    - Establishing relationships like "has", "belongs to", "references"
    - Linking related entities in the graph

    Input format:
    - source: str - Name of the source entity (must exist)
    - target: str - Name of the target entity (must exist)
    - relation: str - Type of relationship (default: "RELATED_TO")

    Common relation types: HAS, BELONGS_TO, REFERENCES, CONTAINS, DEPENDS_ON

    Returns JSON with success status and relationship details.
    """
    cypher = f"""
    MATCH (s:Entity {{id:"Entity:{source}"}})
    MATCH (t:Entity {{id:"Entity:{target}"}})
    MERGE (s)-[:{relation}]->(t)
    """
    print("Cypher create_relation:\n", cypher)

    property_graph_store.structured_query(cypher)

    return CreateRelationResponse(
        source=source, target=target, relation=relation
    ).model_dump()


def update_entity(entity: str, new_fields: List[str]) -> dict:
    """
    Update an EXISTING entity by adding NEW fields to it.

    Use this tool when:
    - Adding additional fields to an entity that already exists
    - Extending an entity's properties after initial creation
    - Modifying entity structure without recreating it

    Input format:
    - entity: str - Name of the existing entity to update
    - new_fields: List[str] - List of new field names to add

    Note: This only adds new fields, doesn't modify or remove existing ones.

    Returns JSON with status and list of newly added fields.
    """
    # First, check what fields already exist to avoid duplicates
    existing_fields_cypher = f"""
    MATCH (e:Entity {{id:"Entity:{entity}"}})<-[:BELONGS_TO]-(f:Field)
    RETURN collect(f.id) as existing_fields
    """

    result = property_graph_store.structured_query(existing_fields_cypher)
    existing_fields = []
    if result and isinstance(result, list) and len(result) > 0:
        existing_fields = [
            f.replace("Field:", "") for f in result[0].get("existing_fields", [])
        ]

    # Only add fields that don't already exist
    fields_to_add = [f for f in new_fields if f not in existing_fields]

    if fields_to_add:
        # Build a single Cypher query with multiple field creations
        merge_statements = []
        for i, field in enumerate(fields_to_add):
            var = f"f{i}"
            # Store the sanitized field name as a property
            safe_field = field.replace(" ", "_").replace("-", "_")
            merge_statements.append(
                f'MERGE ({var}:Field {{id:"Field:{field}", name:"{field}", safe_name:"{safe_field}"}}) '
                f"MERGE ({var})-[:BELONGS_TO]->(e)"
            )

        cypher = f'MATCH (e:Entity {{id:"Entity:{entity}"}})\n' + "\n".join(
            merge_statements
        )
        print("Cypher update_entity:\n", cypher)

        property_graph_store.structured_query(cypher)

        return UpdateEntityResponse(
            entity=entity,
            new_fields=fields_to_add,
            status="success" if fields_to_add else "no_new_fields",
        ).model_dump()
    else:
        return UpdateEntityResponse(
            entity=entity, new_fields=[], status="no_new_fields"
        ).model_dump()


def get_entity_details(entity: str) -> EntityDetails:
    """
    Retrieve complete details of an existing entity including all its fields
    and related entities from Neo4j.

    Use this tool when:
    - Querying entity information
    - Getting a complete view of an entity and its properties
    - Checking what fields an entity currently has
    - Finding related entities and relationships

    Input format:
    - entity: str - Name of the entity to retrieve (e.g., "User", "Booking")

    Returns JSON containing:
    - entity: The entity name
    - fields: List of all field names belonging to this entity
    - relatedEntities: List of entities this entity is connected to
    """
    cypher = f"""
    MATCH (e:Entity {{id:"Entity:{entity}"}})
    OPTIONAL MATCH (e)<-[:BELONGS_TO]-(f:Field)
    OPTIONAL MATCH (e)-[:RELATED_TO]->(re:Entity)
    RETURN 
        e.id as entity,
        collect(DISTINCT f.id) as fields,
        collect(DISTINCT re.id) as relatedEntities
    """

    result = property_graph_store.structured_query(cypher)
    print("Result get_entity_details:\n", result)

    if result and isinstance(result, list) and len(result) > 0:
        record = result[0]
        return EntityDetails(
            entity=record.get("entity"),
            fields=record.get("fields", []),
            relatedEntities=record.get("relatedEntities", []),
        )

    return EntityDetails(entity=entity, fields=[], relatedEntities=[])


get_entity_tool = FunctionTool.from_defaults(
    fn=get_entity_details,
    name="get_entity_details",
    description="Retrieve entity details with all fields and relationships. Use for querying/getting entity information. Input: entity name.",
)


create_entity_tool = FunctionTool.from_defaults(
    fn=create_entity,
    name="create_entity",
    description="Create new entities with fields. Use for defining entities for the first time. Input: project name, entity name, list of all fields.",
)

create_relation_tool = FunctionTool.from_defaults(
    fn=create_relation,
    name="create_relation",
    description="Create relationships between existing entities. Use for connecting/linking entities. Input: source entity, target entity, relation type.",
)


update_entity_tool = FunctionTool.from_defaults(
    fn=update_entity,
    name="update_entity",
    description="Add new fields to existing entities. Use for extending/modifying entity structure. Input: entity name, list of new fields.",
)


agent = FunctionAgent(
    llm=llm,
    verbose=True,
    tools=[
        create_entity_tool,
        create_relation_tool,
        get_entity_tool,
        update_entity_tool,
    ],
    system_prompt="""You are a Neo4j expert assistant that manages entities and relationships in a graph database.

Your available tools:
1. create_entity: Use when you need to create NEW entities with their fields. Input: project, entity name, list of fields.
2. update_entity: Use when you need to ADD NEW FIELDS to an EXISTING entity. Input: entity name, list of new fields.
3. get_entity_details: Use when you need to RETRIEVE/QUERY an existing entity with all its fields and relationships. Input: entity name.
4. create_relation: Use when you need to CREATE RELATIONSHIPS between two existing entities. Input: source entity, target entity, relation type (default: "RELATED_TO").

Guidelines for tool selection:
- If the instruction describes defining entities for the first time → use create_entity
- If the instruction asks to add/extend fields to existing entities → use update_entity
- If the instruction asks to get/fetch/query entity details → use get_entity_details
- If the instruction mentions connecting/linking entities → use create_relation
- If multiple operations are needed, call tools sequentially

Always return valid JSON matching the EntityDetails structure.""",
    output_cls=EntityDetails,
)


async def main():
    """Main function that determines which function to run based on command-line arguments."""
    function_to_run = ""

    if len(sys.argv) > 1:
        function_to_run = sys.argv[1]

    try:
        if function_to_run == "step_0":
            await step_0()
        elif function_to_run == "step_1":
            await step_1()
        elif function_to_run == "step_2":
            await step_2()
        elif function_to_run == "step_3":
            await step_3()
        elif function_to_run == "step_4":
            await step_4()
        elif function_to_run == "all":
            await run_all_steps()
        else:
            print(f"❌ Unknown function: {function_to_run}")
            return
    except Exception as e:
        print(f"\n❌ Error: {e}")
        raise


async def step_0():
    property_graph_store.structured_query("MATCH (n) DETACH DELETE n")


async def step_1():
    print("============= Step 1 =============")
    response = await agent.run(
        """
# Data Model: Image Detail View

**Feature**: Image Detail View (002-user-can-click)
**Date**: 2025-09-26
    
## Core Entities

### Image

Represents a single photo with all associated metadata.

**Fields**:
- `id`: string (UUID) - Unique identifier
- `filename`: string - Original filename
- `path`: string - File path in local storage
- `url`: string - Display URL (blob or data URL)
- `caption`: string? - Optional user-added caption
- `uploadedBy`: string - User ID who uploaded
- `uploadedAt`: DateTime - Upload timestamp
- `capturedAt`: DateTime? - Original capture date from EXIF
- `fileSize`: number - Size in bytes
- `width`: number? - Image width in pixels
- `height`: number? - Image height in pixels
- `mimeType`: string - e.g., "image/jpeg"
- `cameraModel`: string? - From EXIF data
- `location`: string? - GPS coordinates from EXIF
- `tags`: string[] - User-defined tags

**Validation Rules**:
- `id`: Required, valid UUID
- `filename`: Required, max 255 chars
- `path`: Required, must exist
- `uploadedBy`: Required, valid user ID
- `uploadedAt`: Required, past date
- `fileSize`: Required, positive integer
- `mimeType`: Required, valid image type

### User

Represents the user who uploaded images.

**Fields**:
- `id`: string (UUID) - Unique identifier
- `username`: string - Unique username
- `displayName`: string? - Display name
- `email`: string - Email address
- `avatarUrl`: string? - Profile picture URL

**Validation Rules**:
- `id`: Required, valid UUID
- `username`: Required, 3-30 chars, alphanumeric + underscore
- `email`: Required, valid email format

## Relationships
- Create a relationship from Image to User indicating "uploaded by"
"""
    )
    print("Step 1 ✅", response)


async def step_2():
    print("============= Step 2 =============")
    response = await agent.run(
        "Get the detail User entity and detail related entities. Return strict JSON."
    )
    print("Step 2 ✅", response)


async def step_3():
    print("============= Step 3 =============")
    response = await agent.run(
        "Update User entity, add fields: firstName, lastName, phoneNumber, insuranceNumber"
    )
    print("Step 3 ✅", response)


async def step_4():
    response = await agent.run("Get the detail User entity, Return strict JSON")
    print("Step 4 ✅", response)


async def run_all_steps():
    """Run all steps sequentially in one command."""
    print("🚀 Running all Neo4j steps sequentially...\n")

    print("============= Step 0 =============")
    print("Clearing all data from Neo4j...")
    await step_0()
    print("Step 0 ✅ Complete\n")

    print("============= Step 1 =============")
    print("Creating Image and User entities...")
    await step_1()
    print("Step 1 ✅ Complete\n")

    print("============= Step 2 =============")
    print("Getting User entity details...")
    await step_2()
    print("Step 2 ✅ Complete\n")

    print("============= Step 3 =============")
    print("Updating User entity with new fields...")
    await step_3()
    print("Step 3 ✅ Complete\n")

    print("============= Step 4 =============")
    print("Getting updated User entity details...")
    await step_4()
    print("Step 4 ✅ Complete\n")

    print("🎉 All steps completed successfully!")


if __name__ == "__main__":
    asyncio.run(main())
