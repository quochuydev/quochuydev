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
    print("Start")
    documents = SimpleDirectoryReader("./specs").load_data()

    extractor = FunctionAgent(
        name="spec_extractor",
        system_prompt=(
            "You are an assistant that extracts structured entities and relationships from spec-kit documents."
            "Your output must always follow this format:"
            "- entities: an array of objects with 'id' (camelCase) and 'fields' (camelCase list)."
            "- relationships: an array of objects with 'source', 'target', and 'type'."
            "Use consistent IDs (Booking, RoomType, RatePlan, GuestProfile, Hotel)."
            "Use camelCase for fields."
            "Relationship types must be short verbs in UPPERCASE (e.g., HAS, BELONGS_TO, USES, OFFERS, MAKES)."
            "Do not invent extra entities or fields. Stay consistent across runs."
        ),
        output_cls=SpecEntities,
        llm=llm,
    )

    # response = await extractor.run(documents[0].text)

    response = await extractor.run(
        """## Key Entities
- **Booking**: Contains guest details, dates, room selection, and payment information
- **Room Type**: Defines room categories and their fields (size, max occupancy, amenities)
- **Rate Plan**: Includes pricing rules, cancellation policies, and included services
- **Guest Profile**: Stores guest preferences and booking history
- **Hotel**: Contains location, contact information, and available amenities"""
    )

    parsed_entities: SpecEntities = response.get_pydantic_model(SpecEntities)
    print("Parsed Entities as Python object:", parsed_entities)

    storage_context = StorageContext.from_defaults(graph_store=graph_store)

    documents_to_index = [
        Document(text="Project (node) BookingApp has entities: Booking, RoomType."),
    ]

    for e in parsed_entities.entities:
        documents_to_index.append(
            Document(text=f"Entity (node) {e.id} has fields: {', '.join(e.fields)}")
        )

    KnowledgeGraphIndex.from_documents(
        documents_to_index,
        storage_context=storage_context,
        max_triplets_per_chunk=2,
    )

    print("✅ Entities inserted into Neo4j")


if __name__ == "__main__":
    asyncio.run(main())
