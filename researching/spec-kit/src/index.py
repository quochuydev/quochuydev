import asyncio
import re
from llama_index.vector_stores.neo4jvector import Neo4jVectorStore
from llama_index.core import (
    StorageContext,
    KnowledgeGraphIndex,
    SimpleDirectoryReader,
    Document,
)
from dotenv import load_dotenv
from llama_index.llms.openai import OpenAI
from llama_index.core.agent.workflow import FunctionAgent, AgentWorkflow
from pydantic import BaseModel, Field
from typing import List, Any
from llama_index.graph_stores.neo4j import Neo4jGraphStore
from llama_index.core import PropertyGraphIndex
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.query_engine import KnowledgeGraphQueryEngine
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.graph_stores.neo4j import Neo4jPGStore
from llama_index.graph_stores.neo4j import Neo4jPropertyGraphStore
from llama_index.core.graph_stores import (
    SimplePropertyGraphStore,
    EntityNode,
    Relation,
)
from llama_index.core.schema import TextNode

load_dotenv()

llm = OpenAI(model="gpt-4o-mini")


username = "neo4j"
password = "Qwerty@123"
url = "bolt://localhost:7687"
embed_dim = 768
database = "neo4j"

graph_store = Neo4jGraphStore(
    username=username,
    password=password,
    url=url,
)


property_graph_store = Neo4jPGStore(
    username=username,
    password=password,
    url=url,
)

vector_store = Neo4jVectorStore(
    username=username,
    password=password,
    url=url,
    embedding_dimension=embed_dim,
    database=database,
)


class SpecRelationship(BaseModel):
    source: str = Field(description="The source entity ID, e.g. Booking")
    target: str = Field(description="The target entity ID, e.g. Hotel")
    type: str = Field(
        description="The relationship type, e.g. HAS, BELONGS_TO, APPLIES_TO"
    )


class SpecEntity(BaseModel):
    id: str = Field(description="Unique identifier for the entity, e.g. Booking")
    fields: List[str] = Field(description="List of key fields for the entity")


class SpecSchema(BaseModel):
    entities: List[SpecEntity] = Field(
        description="List of extracted entities from spec-kit"
    )
    relationships: List[SpecRelationship] = Field(
        description="List of relationships between entities"
    )


async def main():
    # documents = SimpleDirectoryReader("./specs").load_data()
    # response = await extractor.run(documents[0].text)

    KG_TRIPLET_EXTRACT_TMPL = """
        You are an assistant that extracts structured entities and relationships from spec-kit documents.
        - Use camelCase for both nodes and relationships.
        - Entity have Fields (like SQL).
        - Stay consistent across runs."""

    extractor = FunctionAgent(
        system_prompt=(KG_TRIPLET_EXTRACT_TMPL),
        llm=llm,
    )

    # response = await extractor.run(
    #     """## Key Entities
    # - **Booking**: Contains guest details, dates, room selection, and payment information
    # - **Room Type**: Defines room categories and their fields (size, max occupancy, amenities)
    # - **Rate Plan**: Includes pricing rules, cancellation policies, and included services
    # - **Guest Profile**: Stores guest preferences and booking history
    # - **Hotel**: Contains location, contact information, and available amenities"""
    # )

    # print("Response:", response)
    # parsed_entities: SpecSchema = response.get_pydantic_model(SpecSchema)
    # print("Parsed Entities as Python object:", parsed_entities)
    # storage_context = StorageContext.from_defaults(graph_store=graph_store)

    project_id = "bookingApp"

    documents = [
        Document(
            text="booking is a process. It has fields: guestDetails, bookingDates, roomSelection, paymentInformation.",
            metadata={"projectId": project_id},
        ),
        Document(
            text="roomType is a category. It has fields: size, maximumOccupancy, amenities.",
            metadata={"projectId": project_id},
        ),
        Document(
            text="ratePlan is a policy. It has fields: pricingRules, cancellationPolicies, includedServices.",
            metadata={"projectId": project_id},
        ),
        Document(
            text="guestProfile is a record. It has fields: guestPreferences, bookingHistory.",
            metadata={"projectId": project_id},
        ),
        Document(
            text="hotel is a location. It has fields: hotelLocation, contactInformation, availableAmenities.",
            metadata={"projectId": project_id},
        ),
        Document(
            text="""
            booking includes roomType.
            booking applies ratePlan.
            booking relatesTo guestProfile.
            booking takesPlaceAt hotel.
            """,
            metadata={"projectId": project_id},
        ),
        Document(
            text="User has field nodes: preferences, bookingHistory.",
            metadata={"projectId": project_id},
        ),
    ]

    kg_index = KnowledgeGraphIndex.from_documents(
        documents=documents,
        graph_store=graph_store,
        max_triplets_per_chunk=2,
    )

    query_engine = kg_index.as_query_engine()

    response = query_engine.query(
        """
        I'm working on BookingApp project.
        Detail Booking entity, show me as JSON schema.
        """
    )
    print("Q1 ✅", response)

    # kg_index = KnowledgeGraphIndex.from_documents(
    #     documents=[
    #         Document(
    #             text="CreditApp is a Project node",
    #             metadata={"project": "CreditApp"},
    #         ),
    #         Document(
    #             text="CreditApp has entity nodes: Loan, User",
    #             metadata={"project": "CreditApp"},
    #         ),
    #     ],
    #     graph_store=graph_store,
    #     max_triplets_per_chunk=2,
    # )

    # response = query_engine.query(
    #     """
    #     I'm working on CreditApp project.
    #     Get all the entities that I can reuse for CreditApp project.
    #     Return output as JSON schema.
    #     """
    # )
    # print("Q2 ✅", response)

    # response = query_engine.query(
    #     """
    #     I'm working on CreditApp project.
    #     Get newest User entity.
    #     Return output as JSON schema.
    #     """
    # )
    # print("Q3 ✅", response)

    # kg_index = KnowledgeGraphIndex.from_documents(
    #     documents=[
    #         Document(
    #             text="User set field nodes to current User entity: firstName, lastName, email, phone, address.",
    #             metadata={"project": "CreditApp"},
    #         )
    #     ],
    #     graph_store=graph_store,
    #     max_triplets_per_chunk=2,
    # )

    # response = query_engine.query(
    #     """
    #     I'm working on CreditApp project.
    #     Get newest User entity.
    #     Return output as JSON schema.
    #     """
    # )
    # print("Q4 ✅", response)

    # response = query_engine.query(
    #     """
    #     I'm working on BookingApp project.
    #     Get current User entity.
    #     Return output as JSON schema.
    #     """
    # )
    # print("Q5 ✅", response)


if __name__ == "__main__":
    asyncio.run(main())
