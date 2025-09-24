import nest_asyncio

nest_asyncio.apply()
import asyncio
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
from llama_index.llms.openai import OpenAI
from pydantic import BaseModel, Field
from typing import List
from llama_index.graph_stores.neo4j import Neo4jGraphStore
from llama_index.graph_stores.neo4j import Neo4jPropertyGraphStore
from llama_index.core import (
    PropertyGraphIndex,
    SimpleDirectoryReader,
    StorageContext,
)

load_dotenv()

llm = OpenAI(model="gpt-4")


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

property_graph_store = Neo4jPropertyGraphStore(
    username=username,
    password=password,
    url=url,
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

    KG_TRIPLET_EXTRACT_TMPL = """
        You are an assistant that extracts structured entities and relationships from spec-kit documents.
        - Use camelCase for both nodes and relationships.
        - Entity have Fields (like SQL).
        - Stay consistent across runs."""

    extractor = FunctionAgent(
        name="spec_extractor",
        system_prompt=(KG_TRIPLET_EXTRACT_TMPL),
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

    # storage_context = StorageContext.from_defaults(graph_store=graph_store)

    documents = [
        Document(
            text="BookingApp has entities: Booking, Room, Pricing, User",
            metadata={"projectId": "BookingApp"},
        ),
        Document(
            text="Booking entity HAS_FIELD: guestDetails, BookingDates, room, paymentInformation",
            metadata={"projectId": "BookingApp"},
        ),
        Document(
            text="Room entity HAS_FIELD: size, maximumOccupancy, amenities",
            metadata={"projectId": "BookingApp"},
        ),
        Document(
            text="Pricing entity HAS_FIELD: price, discount",
            metadata={"projectId": "BookingApp"},
        ),
        Document(
            text="User entity HAS_FIELD: guestPreferences, BookingHistory",
            metadata={"projectId": "BookingApp"},
        ),
        Document(
            text="Hotel entity HAS_FIELD: hotelLocation, contactInformation, availableAmenities",
            metadata={"projectId": "BookingApp"},
        ),
        Document(
            text="""
            Booking RELATED_TO Hotel
            Booking RELATED_TO Room
            Booking RELATED_TO Pricing
            Booking RELATED_TO User
            """,
            metadata={"projectId": "BookingApp"},
        ),
    ]

    try:
        storage_context = StorageContext.from_defaults(persist_dir="./storage_n4")

        kg_index = PropertyGraphIndex.from_existing(
            llm=llm, property_graph_store=property_graph_store
        )
        print("✅ Existing index")
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

    kg_index = KnowledgeGraphIndex.from_documents(
        documents=[
            Document(
                text="CreditApp has entities: Loan, User",
                metadata={"project": "CreditApp"},
            ),
            Document(
                text="Loan entity HAS_FIELD: loanAmount, loanTerm, interestRate",
                metadata={"project": "CreditApp"},
            ),
        ],
        storage_context=storage_context,
        max_triplets_per_chunk=2,
    )

    response = query_engine.query(
        """<poml>
  <role>You are a AI engineer</role>
  <task>
    I'm working on CreditApp project.
    Get all the entities that I can reuse for CreditApp project.
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

    kg_index = KnowledgeGraphIndex.from_documents(
        documents=[
            Document(
                text="User entity has fields: firstName, lastName, email, phone, address.",
                metadata={"project": "CreditApp"},
            )
        ],
        storage_context=storage_context,
        max_triplets_per_chunk=2,
    )

    response = query_engine.query(
        """
        <poml>
        <role>You are a AI engineer</role>
        <task>
            I'm working on CreditApp project.
            Get newest User entity.
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
            I'm working on BookingApp project.
            Get current User entity.
            Return output as JSON schema.
        </task>
    </poml>"""
    )
    print("Q5 ✅", response)


if __name__ == "__main__":
    asyncio.run(main())
