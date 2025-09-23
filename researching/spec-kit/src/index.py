import os
import openai
from llama_index.vector_stores.neo4jvector import Neo4jVectorStore
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core import StorageContext
from dotenv import load_dotenv
from llama_index.llms.openai import OpenAI

load_dotenv()

llm = OpenAI(model="gpt-4o")

documents = SimpleDirectoryReader("./specs").load_data()
print(documents)

username = "neo4j"
password = "admin"
url = "bolt://localhost:7687"
database = "neo4j"
embed_dim = 1536
neo4j_vector = Neo4jVectorStore(username, password, url, embed_dim)

# storage_context = StorageContext.from_defaults(vector_store=neo4j_vector)
# index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
