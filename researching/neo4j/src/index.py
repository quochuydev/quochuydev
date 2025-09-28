import nest_asyncio
from datetime import datetime

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

property_graph_store = Neo4jPropertyGraphStore(
    username=username,
    password=password,
    url=url,
)


def insert(documents):
    storage_context = StorageContext.from_defaults(graph_store=property_graph_store)

    PropertyGraphIndex.from_documents(
        llm=llm,
        documents=documents,
        storage_context=storage_context,
        max_triplets_per_chunk=10,
        include_embeddings=True,
        property_graph_store=property_graph_store,
    )


index = PropertyGraphIndex.from_existing(
    llm=llm, property_graph_store=property_graph_store
)


def run_cypher(query: str) -> str:
    result = property_graph_store.structured_query(query)
    return result


run_cypher_tool = FunctionTool.from_defaults(
    fn=run_cypher,
    name="run_cypher",
    description="Execute arbitrary Cypher queries against the Neo4j property graph store.",
)

graph_tool = QueryEngineTool.from_defaults(
    query_engine=index.as_query_engine(),
    name="booking_graph",
    description="Graph schema of the BookingApp domain with entities and fields like Booking, Room, Pricing, User, Hotel.",
)


class CreateEntityResponse(BaseModel):
    project: str
    entity: str
    fields: List[str]
    status: str = "success"


def create_entity(project: str, entity: str, fields: list) -> str:
    statements = []

    statements.append(
        f'MERGE (p{project}: Project {{id:"Project:{project}", name:"{project}"}})'
    )

    statements.append(
        f'MERGE (e{entity}: Entity {{id:"Entity:{entity}"}}) '
        f"MERGE (e{entity})-[:BELONGS_TO]->(p{project})"
    )

    for field in fields:
        statements.append(
            f"""MERGE (f{field}: Field {{id:"Field:{field}"}}) """
            f"MERGE (f{field})-[:BELONGS_TO]->(e{entity})"
        )

    cypher = "\n".join(statements)
    print(cypher)

    property_graph_store.structured_query(cypher)

    return CreateEntityResponse(project=project, entity=entity, fields=fields).dict()


create_entity_tool = FunctionTool.from_defaults(
    fn=create_entity,
    name="create_entity",
    description="Create an entity with fields inside a project in the Neo4j graph store.",
)

agent = FunctionAgent(
    tools=[graph_tool, create_entity_tool],
    verbose=True,
)


async def main():

    response = await agent.run(
        """create BookingApp project HAS_ENTITY: Booking, Room, Pricing, User"""
        """create Booking entity HAS_FIELD: user, bookingDates, room, pricing"""
        """create Room entity HAS_FIELD: size, maximumOccupancy, amenities, hotel"""
        """create Pricing entity HAS_FIELD: price, discount"""
        """create User entity HAS_FIELD: firstName, lastName, bookingHistory"""
        """create Hotel entity HAS_FIELD: location, contactInformation, availableAmenities"""
        """create Hotel RELATED_TO Room"""
        """create Booking RELATED_TO Room"""
        """create Booking RELATED_TO Pricing"""
        """create Booking RELATED_TO User"""
    )
    print("Insert 1 ✅", response)

    response = await agent.run(
        """Get the detail Booking entity and detail related entities"""
    )
    print("Q1 ✅", response)

    response = await agent.run("""create Credit project HAS_ENTITY: Loan, User""")
    print("Insert 2 ✅", response)

    response = await agent.run(
        """create Loan entity HAS_FIELD: amount, term, interestRate"""
    )
    print("Insert 3 ✅", response)

    response = await agent.run(
        """Recommend me the entities that I can reuse for CreditApp project"""
    )
    print("Q2 ✅", response)

    response = await agent.run("""Add User entity fields: email, phone, address""")
    print("Insert 4 ✅", response)

    response = await agent.run("""Get the detail User entity""")
    print("Q3 ✅", response)


if __name__ == "__main__":
    asyncio.run(main())
