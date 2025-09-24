import nest_asyncio
from datetime import datetime

nest_asyncio.apply()
import asyncio
from llama_index.core import (
    StorageContext,
    SimpleDirectoryReader,
    Document,
)
from dotenv import load_dotenv
from llama_index.llms.openai import OpenAI
from llama_index.core.agent.workflow import FunctionAgent, AgentWorkflow
from llama_index.llms.openai import OpenAI
from pydantic import BaseModel, Field
from typing import List
from llama_index.graph_stores.neo4j import Neo4jPropertyGraphStore
from llama_index.core import PropertyGraphIndex

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
    documents = SimpleDirectoryReader("./specs").load_data()

    extractor = FunctionAgent(
        system_prompt=(
            """You are an assistant that extracts structured entities and relationships from spec-kit documents.
        - Use camelCase for both nodes and relationships.
        - Entity have Fields (like SQL).
        - Stay consistent across runs."""
        ),
        output_cls=SpecSchema,
        llm=llm,
    )

    # response = await extractor.run(documents[0].text)

    #     response = await extractor.run(
    #         """## Key Entities
    # - **Booking**: Contains guest details, dates, room selection, and payment information
    # - **Room Type**: Defines room categories and their fields (size, max occupancy, amenities)
    # - **Rate Plan**: Includes pricing rules, cancellation policies, and included services
    # - **Guest Profile**: Stores guest preferences and Booking history
    # - **Hotel**: Contains location, contact information, and available amenities"""
    #     )

    #     print("Response:", response)

    # parsed_entities: SpecSchema = response.get_pydantic_model(SpecSchema)
    # print("Parsed Entities as Python object:", parsed_entities)

    documents = [
        Document(
            text="BookingApp project HAS_ENTITY: Booking, Room, Pricing, User",
            metadata={
                "projectId": "BookingApp",
                "timestamp": datetime.now().timestamp(),
                "version": 1,
            },
        ),
        Document(
            text="Booking entity HAS_FIELD: guestDetails, BookingDates, room, paymentInformation",
            metadata={
                "projectId": "BookingApp",
                "timestamp": datetime.now().timestamp(),
                "version": 1,
            },
        ),
        Document(
            text="Room entity HAS_FIELD: size, maximumOccupancy, amenities",
            metadata={
                "projectId": "BookingApp",
                "timestamp": datetime.now().timestamp(),
                "version": 1,
            },
        ),
        Document(
            text="Pricing entity HAS_FIELD: price, discount",
            metadata={
                "projectId": "BookingApp",
                "timestamp": datetime.now().timestamp(),
                "version": 1,
            },
        ),
        Document(
            text="User entity HAS_FIELD: guestPreferences, BookingHistory",
            metadata={
                "projectId": "BookingApp",
                "timestamp": datetime.now().timestamp(),
                "version": 1,
            },
        ),
        Document(
            text="Hotel entity HAS_FIELD: hotelLocation, contactInformation, availableAmenities",
            metadata={
                "projectId": "BookingApp",
                "timestamp": datetime.now().timestamp(),
                "version": 1,
            },
        ),
        Document(
            text="""
            Booking RELATED_TO Hotel
            Booking RELATED_TO Room
            Booking RELATED_TO Pricing
            Booking RELATED_TO User
            """,
            metadata={
                "projectId": "BookingApp",
                "timestamp": datetime.now().timestamp(),
                "version": 1,
            },
        ),
    ]

    try:
        storage_context = StorageContext.from_defaults(persist_dir="./storage_n4")

        kg_index = PropertyGraphIndex.from_existing(
            llm=llm, property_graph_store=property_graph_store
        )
    except FileNotFoundError as e:
        print("❌ Creating new index")
        storage_context = StorageContext.from_defaults(graph_store=property_graph_store)

        kg_index = PropertyGraphIndex.from_documents(
            llm=llm,
            documents=documents,
            storage_context=storage_context,
            max_triplets_per_chunk=10,
            include_embeddings=True,
            property_graph_store=property_graph_store,
        )

        storage_context.persist(persist_dir="./storage_n4")

    query_engine = kg_index.as_query_engine(
        include_text=True,
        similarity_top_k=2,
    )

    response = query_engine.query(
        """<poml>
    <role>You are an AI engineer</role>
    <task>
        Get the detail Booking entity and detail related entities.
        Show me as JSON schema
    </task>
</poml>"""
    )

    print("Q1 ✅", response)

    insert(
        [
            Document(
                text="CreditApp HAS_ENTITY: Loan, User",
                metadata={
                    "project": "CreditApp",
                    "timestamp": datetime.now().timestamp(),
                    "version": 1,
                },
            ),
            Document(
                text="Loan entity HAS_FIELD: loanAmount, loanTerm, interestRate",
                metadata={
                    "project": "CreditApp",
                    "timestamp": datetime.now().timestamp(),
                    "version": 1,
                },
            ),
        ]
    )

    response = query_engine.query(
        """<poml>
  <role>You are a AI engineer</role>
  <task>
    I'm working on CreditApp project.
    Recommend me the entities that I can reuse for CreditApp project.
    CreditApp is a loan application system for the user and the bank.
    Return output as JSON schema.
  </task>
</poml>"""
    )
    print("Q2 ✅", response)

    response = query_engine.query(
        """<poml>
    <role>You are a AI engineer</role>
    <task>
        I'm working on CreditApp project.
        Get newest User entity.
        Return output as JSON schema.
    </task>
</poml>"""
    )
    print("Q3 ✅", response)

    insert(
        documents=[
            Document(
                text="User entity HAS_FIELD: firstName, lastName, email, phone, address.",
                metadata={
                    "project": "CreditApp",
                    "timestamp": datetime.now().timestamp(),
                    "version": 2,
                },
            )
        ],
    )

    response = query_engine.query(
        """<poml>
    <role>You are a AI engineer</role>
    <task>
        I'm working on CreditApp project.
        Get User entity version 1.
        Return output as JSON schema.
    </task>
</poml>
        """
    )
    print("Q4 ✅", response)

    response = query_engine.query(
        """<poml>
    <role>You are a AI engineer</role>
    <task>
        I'm working on CreditApp project.
        Get User entity version 2.
        Return output as JSON schema.
    </task>
</poml>"""
    )
    print("Q5 ✅", response)

    response = query_engine.query(
        """<poml>
    <role>You are a AI engineer</role>
    <task>
        I'm working on BookingApp project.
        Get User entity.
        Return output as JSON schema.
    </task>
</poml>"""
    )
    print("Q6 ✅", response)


if __name__ == "__main__":
    asyncio.run(main())
