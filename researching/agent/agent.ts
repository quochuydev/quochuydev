import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { config } from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { createNeo4jService } from "./tools/neo4j";
import { createOpenAIService } from "./tools/openai";
import { chunkText } from "./utils";

config();

const env = process.env as Record<string, string>;

const llmService = createOpenAIService(env.OPENAI_API_KEY);

const memoryService = createNeo4jService(
  env.NEO4J_URI || "bolt://localhost:7687",
  env.NEO4J_USER || "neo4j",
  env.NEO4J_PASSWORD || "password"
);

const server = new McpServer({
  name: "agent",
  version: env.VERSION,
});

const systemPromptPath = path.resolve("./agent.md");
const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");

const entityPromptPath = path.resolve("./entity_erd_schema_prompt.md");
const entityPrompt = fs.readFileSync(entityPromptPath, "utf-8");

console.log(`debug:systemPromptPath`, systemPromptPath);
console.log(`debug:entityPromptPath`, entityPromptPath);
console.log(`debug:version`, env.VERSION);

server.tool(
  "search_knowledge_base",
  "Search knowledge base. Ask questions about stored requirements.",
  {
    query: z.string(),
  },
  async ({ query }) => {
    // --- Step 1: classify the query ---
    const lowerQuery = query.toLowerCase();
    let selectedPrompt;

    if (
      lowerQuery.includes("entity") ||
      lowerQuery.includes("table") ||
      lowerQuery.includes("schema") ||
      lowerQuery.includes("erd") ||
      lowerQuery.includes("relation") ||
      lowerQuery.includes("field") ||
      lowerQuery.includes("column")
    ) {
      selectedPrompt = entityPrompt;
      console.log("🧩 Using Entity Prompt");
    } else {
      selectedPrompt = systemPrompt;
      console.log("📘 Using Knowledge Base Prompt");
    }

    // --- Step 2: embed and retrieve context ---
    const vector = await llmService.embed(query);
    const context = await memoryService.searchDocs(vector);

    // --- Step 3: generate answer ---
    const answer = await llmService.generateAnswer(
      selectedPrompt,
      `Context:\n${context}\n\nQuestion:\n${query}`
    );

    console.log("🔎✅", answer);

    // --- Step 4: standard return format ---
    const content: CallToolResult["content"] = [
      {
        type: "text",
        text: answer,
      },
    ];

    return { content };
  }
);

server.tool(
  "train_data",
  "Store custom training data into memory (embedded & chunked).",
  {
    text: z.string(),
  },
  async ({ text }) => {
    const chunks = chunkText(text);

    for (const chunk of chunks) {
      const chunkVector = await llmService.embed(chunk);
      await memoryService.upsertDocs(chunkVector, chunk, {});
    }

    const content: { type: "text"; text: string }[] = [
      {
        type: "text",
        text: `Stored ${chunks.length} chunks into training memory.`,
      },
    ];

    console.log("✅");
    return { content };
  }
);

const app = express();
app.use(express.json());

const transports = {
  streamable: {} as Record<string, StreamableHTTPServerTransport>,
  sse: {} as Record<string, SSEServerTransport>,
};

app.get("/sse", async (_, res) => {
  const transport = new SSEServerTransport("/messages", res);
  transports.sse[transport.sessionId] = transport;

  res.on("close", () => {
    delete transports.sse[transport.sessionId];
  });

  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports.sse[sessionId];

  if (transport) {
    await transport.handlePostMessage(req, res, req.body);
  } else {
    res.status(400).send("No transport found for sessionId");
  }
});

const port = 8079;
app.listen(port, () => console.log(`http://localhost:${port}/sse`));
