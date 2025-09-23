import asyncio
import os
import openai
from llama_index.vector_stores.neo4jvector import Neo4jVectorStore
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core import StorageContext
from dotenv import load_dotenv
from llama_index.llms.openai import OpenAI
from llama_index.core.agent.workflow import FunctionAgent, AgentWorkflow
from llama_index.llms.openai import OpenAI
from pydantic import BaseModel, Field
from typing import List

load_dotenv()

llm = OpenAI(model="gpt-4o")


# === Define DTOs ===
class SpecEntity(BaseModel):
    id: str = Field(description="Unique identifier for the entity, e.g. Booking")
    attributes: List[str] = Field(description="List of key attributes for the entity")


class SpecEntities(BaseModel):
    entities: List[SpecEntity] = Field(
        description="List of extracted entities from spec-kit"
    )


# === Example Tool ===
def extract_entities_from_spec(text: str) -> List[SpecEntity]:
    """
    Extract entities from a spec-kit description.
    Input: plain text spec
    Output: array of entities with attributes
    """
    # 🔧 naive static example (replace with real parsing / NER later)
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
password = "admin"
url = "bolt://localhost:7687"
embed_dim = 768

# neo4j_vector = Neo4jVectorStore(
#     username=username,
#     password=password,
#     url=url,
#     embedding_dimension=embed_dim,
#     hybrid_search=True,
# )
# print(neo4j_vector)

# storage_context = StorageContext.from_defaults(vector_store=neo4j_vector)
# index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)


async def main():
    # === Run Agent ===
    documents = SimpleDirectoryReader("./specs").load_data()
    # print(documents)

    # === Define Agent ===
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

    # === Run extraction ===
    response = await extractor.run(documents[0].text)
    # print("Structured Response:", response.structured_response)
    parsed_entities = response.get_pydantic_model(SpecEntities)
    print("Parsed Entities as Python object:", parsed_entities)


if __name__ == "__main__":
    asyncio.run(main())
