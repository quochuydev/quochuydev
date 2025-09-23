import os
from dotenv import load_dotenv
from llama_index.llms.openai import OpenAI
from llama_index.core.agent.workflow import AgentWorkflow, FunctionAgent, AgentStream
from llama_index.core.workflow import Context
from pydantic import BaseModel, Field
from tavily import AsyncTavilyClient
from llama_index.core.agent.workflow import ReActAgent
from llama_index.core.agent.workflow import (
    AgentInput,
    AgentOutput,
    ToolCall,
    ToolCallResult,
    AgentStream,
)
import os
import asyncio
import gradio as gr


async def search_web(query: str) -> str:
    """Useful for using the web to answer questions."""
    api_key = os.getenv("TAVILY_API_KEY")
    client = AsyncTavilyClient(api_key=api_key)
    try:
        return str(await client.search(query))
    except Exception as e:
        return f"Search failed: {e}"


async def record_notes(ctx: Context, notes: str, notes_title: str) -> str:
    """Useful for recording notes on a given topic. Your input should be notes with a title to save the notes under."""
    async with ctx.store.edit_state() as ctx_state:
        if "research_notes" not in ctx_state["state"]:
            ctx_state["state"]["research_notes"] = {}
        ctx_state["state"]["research_notes"][notes_title] = notes
    return "Notes recorded."


async def write_report(ctx: Context, report_content: str) -> str:
    """Useful for writing a report on a given topic. Your input should be a markdown formatted report."""
    async with ctx.store.edit_state() as ctx_state:
        ctx_state["state"]["report_content"] = report_content
    return "Report written."


async def review_report(ctx: Context, review: str) -> str:
    """Useful for reviewing a report and providing feedback. Your input should be a review of the report."""
    async with ctx.store.edit_state() as ctx_state:
        ctx_state["state"]["review"] = review
    return "Report reviewed."


class MathResult(BaseModel):
    operation: str = Field(description="the performed operation")
    result: int = Field(description="the result of the operation")


def multiply(x: int, y: int):
    """Multiply two numbers"""
    return x * y


async def main():
    load_dotenv()

    llm = OpenAI(model="gpt-4o")

    research_agent = FunctionAgent(
        name="ResearchAgent",
        description="Useful for searching the web for information on a given topic and recording notes on the topic.",
        system_prompt=(
            "You are the ResearchAgent that can search the web for information on a given topic and record notes on the topic. "
            "Once notes are recorded and you are satisfied, you should hand off control to the WriteAgent to write a report on the topic. "
            "You should have at least some notes on a topic before handing off control to the WriteAgent."
        ),
        llm=llm,
        tools=[search_web, record_notes],
        can_handoff_to=["WriteAgent"],
    )

    write_agent = FunctionAgent(
        name="WriteAgent",
        description="Useful for writing a report on a given topic.",
        system_prompt=(
            "You are the WriteAgent that can write a report on a given topic. "
            "Your report should be in a markdown format. The content should be grounded in the research notes. "
            "Once the report is written, you should get feedback at least once from the ReviewAgent."
        ),
        llm=llm,
        tools=[write_report],
        can_handoff_to=["ReviewAgent"],
    )

    review_agent = FunctionAgent(
        name="ReviewAgent",
        description="Useful for reviewing a report and providing feedback.",
        system_prompt=(
            "You are the ReviewAgent that can review the written report and provide feedback. "
            "If changes are needed, request them and hand off to WriteAgent. "
            "If the report looks good, hand off to AskAgent so a human can approve the final version."
        ),
        llm=llm,
        tools=[review_report],
        can_handoff_to=["WriteAgent", "AskAgent"],
    )

    calculator_agent = FunctionAgent(
        name="CalculatorAgent",
        description="Calculates the product of two numbers.",
        tools=[multiply],
        system_prompt="You are a calculator agent who can multiply two numbers using the `multiply` tool.",
        output_cls=MathResult,
        llm=llm,
    )

    agent_workflow = AgentWorkflow(
        agents=[research_agent, write_agent, review_agent, calculator_agent],
        root_agent=research_agent.name,
        initial_state={
            "research_notes": {},
            "report_content": "Not written yet.",
            "review": "Review required.",
        },
    )

    handler = agent_workflow.run(user_msg=("Write the development of the Solana."))
    current_agent = None

    async for event in handler.stream_events():
        if (
            hasattr(event, "current_agent_name")
            and event.current_agent_name != current_agent
        ):
            current_agent = event.current_agent_name
            print(f"\n{'='*50}")
            print(f"🤖 Agent: {current_agent}")
            print(f"{'='*50}\n")
        if isinstance(event, AgentStream):
            if event.delta:
                print(event.delta, end="", flush=True)
        elif isinstance(event, AgentOutput):
            if event.response.content:
                print("\n📤 AgentOutput\n")  #
            print(event.response.content)
            if event.tool_calls:
                print(
                    "🛠️ Planning to use tools:",
                    [call.tool_name for call in event.tool_calls],
                )
        elif isinstance(event, ToolCall):
            print(f"🔨 Calling Tool: {event.tool_name}")
        elif isinstance(event, ToolCallResult):
            print(f"🔧 Tool Result: {event.tool_name}")

    state = await handler.ctx.store.get("state")
    print(state["report_content"])


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
