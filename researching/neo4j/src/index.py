import nest_asyncio
import os
from datetime import datetime
from neo4j import GraphDatabase
import sys

nest_asyncio.apply()
import asyncio
from llama_index.core import StorageContext
from llama_index.core.schema import Document
from dotenv import load_dotenv
from llama_index.llms.openai import OpenAI
from llama_index.core.agent.workflow import FunctionAgent
from pydantic import BaseModel, Field
from typing import List
from llama_index.graph_stores.neo4j import Neo4jPropertyGraphStore
from llama_index.core import PropertyGraphIndex
from llama_index.core.tools import QueryEngineTool
from llama_index.core.tools import FunctionTool

# from llama_index.graph_stores.memgraph import MemgraphPropertyGraphStore

load_dotenv()

llm = OpenAI(
    model="gpt-4.1",
    api_key=os.getenv("OPENAI_API_KEY"),
    temperature=0.1,
)

username = "neo4j"
password = "Qwerty@123"
url = "bolt://localhost:7687"
embed_dim = 768
database = "neo4j"


def check_neo4j_connection():
    """Check Neo4j connectivity before starting the agent."""
    try:
        driver = GraphDatabase.driver(url, auth=(username, password))
        with driver.session(database=database) as session:
            result = session.run("RETURN 1 AS ok")
            record = result.single()
            if record and record["ok"] == 1:
                print("✅ Connected to Neo4j.")
                return True
            else:
                print("❌ Failed to verify Neo4j query.")
                return False
    except Exception as e:
        print(f"❌ Neo4j connection error: {e}")
        return False


if not check_neo4j_connection():
    raise RuntimeError("Neo4j is not available. Please check credentials or DB status.")


property_graph_store = Neo4jPropertyGraphStore(
    username=username,
    password=password,
    url=url,
)


def insert(documents):
    storage_context = StorageContext.from_defaults(graph_store=property_graph_store)

    # Convert the input string to a Document object
    doc_object = Document(text=documents)

    PropertyGraphIndex.from_documents(
        llm=llm,
        documents=[doc_object],
        storage_context=storage_context,
        max_triplets_per_chunk=10,
        include_embeddings=True,
        property_graph_store=property_graph_store,
    )


agent = FunctionAgent(
    llm=llm,
    # verbose=True,
    tools=[],
    system_prompt="""You are a Neo4j expert assistant that manages entities and relationships in a graph database.""",
    # output_cls=EntityDetails,
)


async def main():
    """Main function that determines which function to run based on command-line arguments."""
    function_to_run = ""

    if len(sys.argv) > 1:
        function_to_run = sys.argv[1]

    try:
        if function_to_run == "step_0":
            await step_0()
        elif function_to_run == "step_1":
            await step_1()
        elif function_to_run == "step_2":
            await step_2()
        elif function_to_run == "step_3":
            await step_3()
        elif function_to_run == "step_4":
            await step_4()
        elif function_to_run == "step_5":
            await step_5()
        elif function_to_run == "step_6":
            await step_6()
        elif function_to_run == "all":
            await run_all_steps()
        else:
            print(f"❌ Unknown function: {function_to_run}")
            return
    except Exception as e:
        print(f"\n❌ Error: {e}")
        raise


async def step_0():
    property_graph_store.structured_query("MATCH (n) DETACH DELETE n")


async def step_1():
    print("============= Step 1 =============")

    insert(
        """
## Role

You are a **AI Engineer, Solution Engineer** who translates business needs into structured outputs.
Your task is to create a consistent web UI specification for a **Feature Product Management** demo system.
This will serve as a minimum viable product for showing how AI-generated UI can look and behave.

## Core Objectives

The main objective is to make a simple, clear, and reusable structure for feature management.
It should allow users to view product features, create new features, and track their lifecycle.
Consistency in style and easy data binding are key to keep the demo simple but realistic.

**Best Practices:**

Use minimalist UI with clear typography for readability.
Keep all components lightweight, responsive, and easy to navigate.
Define components and flows in camelCase to keep consistency across system and API.

**Output template**

```yaml
Style:
  - Theme: Minimalist
  - Typography: Sans-serif
  - UI Elements: Rounded

ColorScheme:
  - Primary: "#2D6CDF"
  - Secondary: "#4CAF50"
  - Neutral: "#F5F5F5"
  - Accent: "#FF9800"
  - Background: "#FFFFFF"
  - Text: "#333333"

MainFeatures:
  - Feature: featureList
    Description: "Show all product features with status and priority."
    Components: [tableView, statusBadge, filterDropdown]
    DataBinding: "/api/features"

  - Feature: createFeature
    Description: "Add a new feature with name, description, and owner."
    Components: [formInput, textArea, submitButton]
    DataBinding: "/api/features/create"

  - Feature: featureDetail
    Description: "View and update details of a selected feature."
    Components: [detailCard, editButton, historyTimeline]
    DataBinding: "/api/features/{id}"

Navigation:
  - Type: Sidebar
  - Structure: [Dashboard, Features, Reports, Settings]

Interactions:
  - Animations: Subtle
  - HumanInTheLoopInputs: [forms, approvals, feedback]

Accessibility:
  - Compliance: WCAG 2.1 AA
  - Features: [HighContrastMode, ScreenReaderSupport, KeyboardNavigation]
```
"""
    )
    print("Step 1 ✅")


async def step_2():
    print("============= Step 2 =============")
    insert(
        """
## Role

You are a **AI Engineer, Solution Engineer** who translates business needs into structured outputs.
Your focus is to design a consistent UI for a **User Management** demo system.
The goal is to make it simple for admins to create, view, and manage users in a product environment.

## Core Objectives

The objective is to enable basic user lifecycle management: creation, editing, and role assignment.
It should show user data clearly and allow interaction with forms and tables.
Consistency in colors, layouts, and endpoints will make the MVP usable and easy to extend.

**Best Practices:**

Use minimalist design with clear table layouts for listing users.
Forms should be clean, with validation and feedback for user actions.
Always keep naming in camelCase for all components and endpoints.

**Output template**

```yaml
Style:
  - Theme: Minimalist
  - Typography: Sans-serif
  - UIElements: Rounded

ColorScheme:
  - Primary: "#1E88E5"
  - Secondary: "#43A047"
  - Neutral: "#F0F0F0"
  - Accent: "#FB8C00"
  - Background: "#FFFFFF"
  - Text: "#212121"

MainFeatures:
  - Feature: userList
    Description: "Display all users with roles and status."
    Components: [tableView, filterDropdown, statusBadge]
    DataBinding: "/api/users"

  - Feature: createUser
    Description: "Add a new user with name, email, and role."
    Components: [formInput, dropdownSelect, submitButton]
    DataBinding: "/api/users/create"

  - Feature: userDetail
    Description: "View and update details of a single user."
    Components: [detailCard, editButton, roleSelector]
    DataBinding: "/api/users/id"

Navigation:
  - Type: Sidebar
  - Structure: [Dashboard, Users, Roles, Settings]

Interactions:
  - Animations: Subtle
  - HumanInTheLoopInputs: [forms, approvals, feedback]

Accessibility:
  - Compliance: WCAG 2.1 AA
  - Features: [HighContrastMode, ScreenReaderSupport, KeyboardNavigation]
```
"""
    )
    print("Step 2 ✅")


async def step_3():
    print("============= Step 3 =============")
    response = await agent.run(
        "with (id:project is 1993), Update User entity, add fields: firstName, lastName, phoneNumber, insuranceNumber"
    )
    print("Step 3 ✅", response)


async def step_4():
    response = await agent.run("Get the detail User entity, Return strict JSON")
    print("Step 4 ✅", response)


async def step_5():
    print("============= Step 5 =============")
    response = await agent.run("Remove avatarUrl field from User entity")
    print("Step 5 ✅", response)


async def step_6():
    print("============= Step 6 =============")
    response = await agent.run("Get the detail User entity, Return strict JSON")
    print("Step 6 ✅", response)


async def run_all_steps():
    """Run all steps sequentially in one command."""
    print("🚀 Running all Neo4j steps sequentially...\n")

    print("============= Step 0 =============")
    print("Clearing all data from Neo4j...")
    await step_0()
    print("Step 0 ✅ Complete\n")

    print("============= Step 1 =============")
    print("Creating Image and User entities...")
    await step_1()
    print("Step 1 ✅ Complete\n")

    print("============= Step 2 =============")
    print("Getting User entity details...")
    await step_2()
    print("Step 2 ✅ Complete\n")

    print("============= Step 3 =============")
    print("Updating User entity with new fields...")
    await step_3()
    print("Step 3 ✅ Complete\n")

    print("============= Step 4 =============")
    print("Getting updated User entity details...")
    await step_4()
    print("Step 4 ✅ Complete\n")

    print("============= Step 5 =============")
    print("Removing avatarUrl field from User entity...")
    await step_5()
    print("Step 5 ✅ Complete\n")

    print("============= Step 6 =============")
    print("Verifying avatarUrl has been removed from User entity...")
    await step_6()
    print("Step 6 ✅ Complete\n")

    print("🎉 All steps completed successfully!")


if __name__ == "__main__":
    asyncio.run(main())
