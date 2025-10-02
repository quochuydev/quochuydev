import asyncio
import os
from fastapi import FastAPI
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from neo4j import GraphDatabase
from dotenv import load_dotenv
from llama_index.graph_stores.neo4j import Neo4jPropertyGraphStore
from llama_index.core import StorageContext
from llama_index.llms.openai import OpenAI
from llama_index.core import PropertyGraphIndex
from llama_index.core.schema import Document

load_dotenv()


llm = OpenAI(
    model="gpt-4.1",
    api_key=os.getenv("OPENAI_API_KEY"),
    temperature=0.1,
)

url = os.getenv("NEO4J_URI", "bolt://localhost:7687")
username = os.getenv("NEO4J_USER", "neo4j")
password = os.getenv("NEO4J_PASSWORD", "password")
embed_dim = 768
database = "neo4j"

property_graph_store = Neo4jPropertyGraphStore(
    username=username,
    password=password,
    url=url,
)

index = None

app = FastAPI()


@app.get("/")
def root():
    return {"status": "MCP server running with llamaindex + neo4j"}


@app.get("/init")
def init():
    global index

    documents = SimpleDirectoryReader("./training_data").load_data()
    index = PropertyGraphIndex.from_documents(
        documents=documents,
        llm=llm,
        max_triplets_per_chunk=10,
        include_embeddings=True,
        property_graph_store=property_graph_store,
    )

    print("index ✅", index)
    return {"status": "Index built", "documents": len(documents)}


@app.get("/clear")
def clear():
    property_graph_store.structured_query("MATCH (n) DETACH DELETE n")
    return {"status": "Index cleared"}


@app.get("/query")
def query(q: str):
    global index
    if index is None:
        return {"error": "Index not initialized. Call /init first."}

    query_engine = index.as_query_engine()
    response = query_engine.query(q)

    print("run_cypher_query ✅", response)
    return {"query": q, "response": str(response)}


# uvicorn mcp_server:app --reload --host 0.0.0.0 --port 8088
