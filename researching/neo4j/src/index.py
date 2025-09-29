import nest_asyncio
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

llm = OpenAI(model="gpt-4")

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
    Create a project if not exists, an entity under it,
    and its fields in Neo4j.
    """
    statements = []
    statements.append(f'MERGE (p:Project {{id:"Project:{project}", name:"{project}"}})')
    statements.append(
        f'MERGE (e:Entity {{id:"Entity:{entity}"}}) ' f"MERGE (e)-[:BELONGS_TO]->(p)"
    )

    for i, field in enumerate(fields):
        var = f"f{i}"
        # Sanitize field name for Neo4j label (remove spaces, special chars)
        field_label = "".join(c if c.isalnum() else "_" for c in field)
        statements.append(
            f'MERGE ({var}:{field_label} {{id:"Field:{field}", name:"{field}"}}) '
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
    Create a relationship between two entities.
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
    Update an entity by adding new fields to it.
    """
    statements = []

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
        for i, field in enumerate(fields_to_add):
            var = f"f{i}"
            # Sanitize field name for Neo4j label (remove spaces, special chars)
            field_label = "".join(c if c.isalnum() else "_" for c in field)
            statements.append(
                f'MATCH (e:Entity {{id:"Entity:{entity}"}}) '
                f'MERGE ({var}:{field_label} {{id:"Field:{field}", name:"{field}"}}) '
                f"MERGE ({var})-[:BELONGS_TO]->(e)"
            )

        cypher = "\n".join(statements)
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
    Get an entity, its fields, and related entities directly from Neo4j. Return strict JSON.
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
    description="Fetch an entity with its fields and related entities from Neo4j. Input = entity name (e.g. 'Booking'). Output = strict JSON.",
)


create_entity_tool = FunctionTool.from_defaults(
    fn=create_entity,
    name="create_entity",
    description="Create an entity with fields inside a project in the Neo4j graph store.",
)

create_relation_tool = FunctionTool.from_defaults(
    fn=create_relation,
    name="create_relation",
    description="Create a relationship between two entities.",
)


update_entity_tool = FunctionTool.from_defaults(
    fn=update_entity,
    name="update_entity",
    description="Update an entity by adding new fields to it. Input = entity name and list of new fields. Output = strict JSON.",
)


agent = FunctionAgent(
    verbose=True,
    tools=[
        create_entity_tool,
        create_relation_tool,
        get_entity_tool,
        update_entity_tool,
    ],
    system_prompt="You are a Neo4j expert. You can create, update, and query entities in Neo4j using natural language instructions. Return strict JSON.",
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
    response = await agent.run("Get the detail User entity")
    print("Step 4 ✅", response)


if __name__ == "__main__":
    asyncio.run(main())
