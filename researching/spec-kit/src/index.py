import asyncio
from llama_index.vector_stores.neo4jvector import Neo4jVectorStore
from llama_index.core import (
    StorageContext,
    KnowledgeGraphIndex,
    VectorStoreIndex,
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

load_dotenv()

llm = OpenAI(model="gpt-4o")


class SpecEntity(BaseModel):
    id: str = Field(description="Unique identifier for the entity, e.g. Booking")
    attributes: List[str] = Field(description="List of key attributes for the entity")


class SpecEntities(BaseModel):
    entities: List[SpecEntity] = Field(
        description="List of extracted entities from spec-kit"
    )


def extract_entities_from_spec(text: str) -> List[SpecEntity]:
    """
    Extract entities from a spec-kit description.
    Input: plain text spec
    Output: array of entities with attributes
    """
    return [
        SpecEntity(
            id="Booking",
            attributes=["GuestDetails", "Dates", "RoomSelection", "PaymentInformation"],
        ),
        SpecEntity(id="RoomType", attributes=["Size", "MaxOccupancy", "Amenities"]),
        SpecEntity(
            id="RatePlan",
            attributes=["PricingRules", "CancellationPolicy", "IncludedServices"],
        ),
        SpecEntity(id="GuestProfile", attributes=["Preferences", "BookingHistory"]),
        SpecEntity(id="Hotel", attributes=["Location", "ContactInfo", "Amenities"]),
    ]


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

neo4j_vector = Neo4jVectorStore(
    username=username,
    password=password,
    url=url,
    embedding_dimension=embed_dim,
    hybrid_search=True,
)
print(neo4j_vector)

# storage_context = StorageContext.from_defaults(vector_store=neo4j_vector)
# index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)


async def main():
    print("Start")
    documents = SimpleDirectoryReader("./specs").load_data()
    extractor = FunctionAgent(
        tools=[extract_entities_from_spec],
        name="spec_extractor",
        system_prompt=(
            "You are an assistant that extracts structured entities from spec-kit documents. "
            "Always return them as an array of objects with id and attributes."
        ),
        output_cls=SpecEntities,
        llm=llm,
    )

    # Run the extractor on the first document
    response = await extractor.run(documents[0].text)

    # Parse into SpecEntities Pydantic model
    parsed_entities: SpecEntities = response.get_pydantic_model(SpecEntities)

    print("Parsed Entities as Python object:", parsed_entities)
    # Parsed Entities as Python object: entities=[SpecEntity(id='Booking', attributes=['Guest Details', 'Dates', 'Room Selection', 'Payment Information']), SpecEntity(id='Room Type', attributes=['Size', 'Max Occupancy', 'Amenities']), SpecEntity(id='Rate Plan', attributes=['Pricing Rules', 'Cancellation Policy', 'Included Services']), SpecEntity(id='Guest Profile', attributes=['Preferences', 'Booking History']), SpecEntity(id='Hotel', attributes=['Location', 'Contact Information', 'Amenities'])]

    # Convert parsed entities into LlamaIndex Documents
    documents_to_index = []
    for e in parsed_entities.entities:  # make sure SpecEntities has a field `entities`
        text = f"Entity {e.id} has attributes: {', '.join(e.attributes)}"
        documents_to_index.append(
            Document(text=text, metadata={"entity": e.id, "attributes": e.attributes})
        )

    # Create storage context using Neo4jGraphStore
    storage_context = StorageContext.from_defaults(graph_store=graph_store)

    # Build Knowledge Graph Index and insert into Neo4j
    index = KnowledgeGraphIndex.from_documents(
        documents_to_index,
        storage_context=storage_context,
        max_triplets_per_chunk=2,
    )

    print("✅ Entities inserted into Neo4j!")
    print(index)


if __name__ == "__main__":
    asyncio.run(main())
