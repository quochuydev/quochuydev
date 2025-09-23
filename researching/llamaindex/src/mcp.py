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
from llama_index.tools.mcp.utils import workflow_as_mcp


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


load_dotenv()

llm = OpenAI(model="gpt-4o")

calculator_agent = FunctionAgent(
    name="CalculatorAgent",
    description="Calculates the product of two numbers.",
    tools=[multiply],
    system_prompt="You are a calculator agent who can multiply two numbers using the `multiply` tool.",
    output_cls=MathResult,
    llm=llm,
)


class QueryEvent(StartEvent):
    query: str


mcp = workflow_as_mcp(calculator_agent, start_event_model=QueryEvent)
