import nest_asyncio
import asyncio
from datetime import datetime
from dotenv import load_dotenv
from typing import List, Dict, Any

from pydantic import BaseModel, Field
from llama_index.core import Document, StorageContext
from llama_index.llms.openai import OpenAI
from llama_index.core.agent.workflow import FunctionAgent, AgentWorkflow
from llama_index.graph_stores.neo4j import Neo4jPropertyGraphStore
from llama_index.core import PropertyGraphIndex

# ---------------------------
# Setup
# ---------------------------
nest_asyncio.apply()
load_dotenv()

llm = OpenAI(model="gpt-4")

username = "neo4j"
password = "Qwerty@123"
url = "bolt://localhost:7687"
database = "neo4j"

property_graph_store = Neo4jPropertyGraphStore(
    username=username,
    password=password,
    url=url,
)


# ---------------------------
# Tool schemas
# ---------------------------
class DocumentInput(BaseModel):
    text: str = Field(..., description="The text content of the document")
    metadata: Dict[str, Any] = Field(
        default_factory=dict,
        description="Optional metadata such as project, timestamp, version",
    )


class InsertRequest(BaseModel):
    documents: List[DocumentInput] = Field(
        ..., description="List of documents to insert"
    )
    project: str = Field(..., description="Project name")
    version: int = Field(..., description="Version number of documents")


class QueryRequest(BaseModel):
    query: str = Field(..., description="User query in natural language or POML")


# ---------------------------
# Tools
# ---------------------------
async def insert_docs(req: InsertRequest):
    """Insert documents into the Neo4j property graph index."""
    docs = [
        Document(
            text=text,
            metadata={
                "project": req.project,
                "timestamp": datetime.now().timestamp(),
                "version": req.version,
            },
        )
        for text in req.documents
    ]

    storage_context = StorageContext.from_defaults(graph_store=property_graph_store)

    PropertyGraphIndex.from_documents(
        llm=llm,
        documents=docs,
        storage_context=storage_context,
        max_triplets_per_chunk=10,
        include_embeddings=True,
        property_graph_store=property_graph_store,
    )
    return f"Inserted {len(docs)} documents for project {req.project}"


async def query_graph(req: QueryRequest):
    """Query the property graph index."""
    kg_index = PropertyGraphIndex.from_existing(
        llm=llm, property_graph_store=property_graph_store
    )

    query_engine = kg_index.as_query_engine(include_text=True, similarity_top_k=2)
    response = query_engine.query(req.query)
    return str(response)


# ---------------------------
# Build Agent
# ---------------------------
insert_agent = FunctionAgent(
    name="insert_agent",
    description="Insert documents into the property graph",
    fn=insert_docs,
    input_model=InsertRequest,
    llm=llm,
)

query_agent = FunctionAgent(
    name="query_agent",
    description="Query the property graph index",
    fn=query_graph,
    input_model=QueryRequest,
    llm=llm,
)

task_agent = FunctionAgent(
    name="task_agent",
    description="rag agent manage all the data in property graph index.",
    system_prompt=(
        "You are the RAGAgent hold all the data in property graph index. "
        "You can insert documents into the property graph and query the property graph index."
    ),
    llm=llm,
    can_handoff_to=["insert_agent", "query_agent"],
)


workflow = AgentWorkflow(
    agents=[insert_agent, query_agent, task_agent],
    root_agent=task_agent.name,
    verbose=True,
)


# ---------------------------
# Run Example
# ---------------------------
async def main():
    # Insert BookingApp docs
    booking_docs = [
        "BookingApp project HAS_ENTITY: Booking, Room, Pricing, User",
        "Booking entity HAS_FIELD: guestDetails, BookingDates, room, paymentInformation",
        "Room entity HAS_FIELD: size, maximumOccupancy, amenities",
        "Pricing entity HAS_FIELD: price, discount",
        "User entity HAS_FIELD: guestPreferences, BookingHistory",
        "Hotel entity HAS_FIELD: hotelLocation, contactInformation, availableAmenities",
        """
        Booking RELATED_TO Hotel
        Booking RELATED_TO Room
        Booking RELATED_TO Pricing
        Booking RELATED_TO User
        """,
    ]

    await workflow.run(
        "insert_agent",
        InsertRequest(documents=booking_docs, project="BookingApp", version=1),
    )

    # Query Booking entity and related entities
    resp1 = await workflow.run(
        "query_agent",
        QueryRequest(
            query="""
            <poml>
                <role>You are an AI engineer</role>
                <task>
                    Get the detail Booking entity and detail related entities.
                    Show me as JSON schema
                </task>
            </poml>
            """
        ),
    )
    print("Q1 ✅", resp1)

    # Insert CreditApp docs
    credit_docs = [
        "CreditApp HAS_ENTITY: Loan, User",
        "Loan entity HAS_FIELD: loanAmount, loanTerm, interestRate",
    ]

    await workflow.run(
        "insert_agent",
        InsertRequest(documents=credit_docs, project="CreditApp", version=1),
    )

    # Query reuse entities
    resp2 = await workflow.run(
        "query_agent",
        QueryRequest(
            query="""
            <poml>
                <role>You are an AI engineer</role>
                <task>
                    I'm working on CreditApp project.
                    Recommend me the entities that I can reuse for CreditApp project.
                    CreditApp is a loan application system for the user and the bank.
                    Return output as JSON schema.
                </task>
            </poml>
            """
        ),
    )
    print("Q2 ✅", resp2)


if __name__ == "__main__":
    asyncio.run(main())
