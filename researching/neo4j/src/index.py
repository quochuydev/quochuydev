import nest_asyncio
from datetime import datetime

nest_asyncio.apply()
import asyncio
from llama_index.core import (
    StorageContext,
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


async def main():
    # documents = [
    #     Document(
    #         text="BookingApp project HAS_ENTITY: Booking, Room, Pricing, User",
    #         metadata={
    #             "projectId": "BookingApp",
    #             "timestamp": datetime.now().timestamp(),
    #             "version": 1,
    #         },
    #     ),
    #     Document(
    #         text="Booking entity HAS_FIELD: guestDetails, BookingDates, room, paymentInformation",
    #         metadata={
    #             "projectId": "BookingApp",
    #             "timestamp": datetime.now().timestamp(),
    #             "version": 1,
    #         },
    #     ),
    #     Document(
    #         text="Room entity HAS_FIELD: size, maximumOccupancy, amenities",
    #         metadata={
    #             "projectId": "BookingApp",
    #             "timestamp": datetime.now().timestamp(),
    #             "version": 1,
    #         },
    #     ),
    #     Document(
    #         text="Pricing entity HAS_FIELD: price, discount",
    #         metadata={
    #             "projectId": "BookingApp",
    #             "timestamp": datetime.now().timestamp(),
    #             "version": 1,
    #         },
    #     ),
    #     Document(
    #         text="User entity HAS_FIELD: guestPreferences, BookingHistory",
    #         metadata={
    #             "projectId": "BookingApp",
    #             "timestamp": datetime.now().timestamp(),
    #             "version": 1,
    #         },
    #     ),
    #     Document(
    #         text="Hotel entity HAS_FIELD: hotelLocation, contactInformation, availableAmenities",
    #         metadata={
    #             "projectId": "BookingApp",
    #             "timestamp": datetime.now().timestamp(),
    #             "version": 1,
    #         },
    #     ),
    #     Document(
    #         text="""
    #         Booking RELATED_TO Hotel
    #         Booking RELATED_TO Room
    #         Booking RELATED_TO Pricing
    #         Booking RELATED_TO User
    #         """,
    #         metadata={
    #             "projectId": "BookingApp",
    #             "timestamp": datetime.now().timestamp(),
    #             "version": 1,
    #         },
    #     ),
    # ]

    # insert(documents)

    index = PropertyGraphIndex.from_existing(
        llm=llm, property_graph_store=property_graph_store
    )

    def run_cypher(query: str) -> str:
        result = property_graph_store.structured_query(query)

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

    # agent = AgentWorkflow.from_tools(
    #     tools=[run_cypher_tool, graph_tool],
    #     verbose=True,
    # )

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

    response = create_entity(
        "BookingApp",
        "Booking",
        ["guestDetails", "BookingDates", "room", "pricing"],
    )
    print("Insert 1 ✅", response)


#     response = agent.chat(
#         """<poml>
#     <role>You are an AI engineer</role>
#     <task>
#         Return the result strictly as JSON in the following format:
#         Get the detail Booking entity and detail related entities.
#         Show me as JSON schema
#     </task>
#     <output-format>
# {
#   "entity": "string",
#   "version": "integer",
#   "fields": {
#     "fieldName": "fieldType"
#   },
#   "relatedEntities": [
#     {
#       "entity": "string",
#       "version": "integer",
#       "fields": {...},
#       "relatedEntities": [...]
#     }
#   ]
# }
#     </output-format>
# </poml>"""
#     )

#     print("Q1 ✅", response)

# query_engine = index.as_query_engine(
#     include_text=True,
#     similarity_top_k=2,
# )

#     response = query_engine.query(
#         """<poml>
#     <role>You are an AI engineer</role>
#     <task>
#         Return the result strictly as JSON in the following format:
#         Get the detail Booking entity and detail related entities.
#         Show me as JSON schema
#     </task>
#     <output-format>
# {
#   "entity": "string",
#   "version": "integer",
#   "fields": {
#     "fieldName": "fieldType"
#   },
#   "relatedEntities": [
#     {
#       "entity": "string",
#       "version": "integer",
#       "fields": {...},
#       "relatedEntities": [...]
#     }
#   ]
# }
#     </output-format>
# </poml>"""
#     )

# print("Q1 ✅", response)


#     insert(
#         [
#             Document(
#                 text="CreditApp HAS_ENTITY: Loan, User",
#                 metadata={
#                     "project": "CreditApp",
#                     "timestamp": datetime.now().timestamp(),
#                     "version": 1,
#                 },
#             ),
#             Document(
#                 text="Loan entity HAS_FIELD: loanAmount, loanTerm, interestRate",
#                 metadata={
#                     "project": "CreditApp",
#                     "timestamp": datetime.now().timestamp(),
#                     "version": 1,
#                 },
#             ),
#         ]
#     )

#     response = query_engine.query(
#         """<poml>
#   <role>You are a AI engineer</role>
#   <task>
#     I'm working on CreditApp project.
#     Recommend me the entities that I can reuse for CreditApp project.
#     CreditApp is a loan application system for the user and the bank.
#     Return output as JSON schema.
#   </task>
#     <output-format>
# {
#   "entity": "string",
#   "version": "integer",
#   "fields": {
#     "fieldName": "fieldType"
#   },
#   "relatedEntities": [
#     {
#       "entity": "string",
#       "version": "integer",
#       "fields": {...},
#       "relatedEntities": [...]
#     }
#   ]
# }
#     </output-format>
# </poml>"""
#     )
#     print("Q2 ✅", response)

#     response = query_engine.query(
#         """<poml>
#     <role>You are a AI engineer</role>
#     <task>
#         I'm working on CreditApp project.
#         Get newest User entity.
#         Return output as JSON schema.
#     </task>
#     <output-format>
# {
#   "entity": "string",
#   "version": "integer",
#   "fields": {
#     "fieldName": "fieldType"
#   },
#   "relatedEntities": [
#     {
#       "entity": "string",
#       "version": "integer",
#       "fields": {...},
#       "relatedEntities": [...]
#     }
#   ]
# }
#     </output-format>
# </poml>"""
#     )
#     print("Q3 ✅", response)

#     insert(
#         documents=[
#             Document(
#                 text="User entity HAS_FIELD: firstName, lastName, email, phone, address.",
#                 metadata={
#                     "project": "CreditApp",
#                     "timestamp": datetime.now().timestamp(),
#                     "version": 2,
#                 },
#             )
#         ],
#     )

#     response = query_engine.query(
#         """<poml>
#     <role>You are a AI engineer</role>
#     <task>
#         I'm working on CreditApp project.
#         Get User entity version 1.
#         Return output as JSON schema.
#     </task>
#     <output-format>
# {
#   "entity": "string",
#   "version": "integer",
#   "fields": {
#     "fieldName": "fieldType"
#   }
# }
#     </output-format>
# </poml>
#         """
#     )
#     print("Q4 ✅", response)

#     response = query_engine.query(
#         """<poml>
#     <role>You are a AI engineer</role>
#     <task>
#         I'm working on CreditApp project.
#         Get User entity version 2.
#         Return output as JSON schema.
#     </task>
#     <output-format>
# {
#   "entity": "string",
#   "version": "integer",
#   "fields": {
#     "fieldName": "fieldType"
#   }
# }
#     </output-format>
# </poml>"""
#     )
#     print("Q5 ✅", response)

#     response = query_engine.query(
#         """<poml>
#     <role>You are a AI engineer</role>
#     <task>
#         I'm working on BookingApp project.
#         Get User entity.
#         Return output as JSON schema.
#     </task>
#     <output-format>
# {
#   "entity": "string",
#   "version": "integer",
#   "fields": {
#     "fieldName": "fieldType"
#   },
#   "relatedEntities": [
#     {
#       "entity": "string",
#       "version": "integer",
#       "fields": {...},
#       "relatedEntities": [...]
#     }
#   ]
# }
#     </output-format>
# </poml>"""
#     )
#     print("Q6 ✅", response)


if __name__ == "__main__":
    asyncio.run(main())
