import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { config } from "dotenv";
import express from "express";
import fs from "fs";
import { z } from "zod";
import { createNeo4jService } from "./tools/neo4j";
import { createOpenAIService } from "./tools/openai";
import { chunkText } from "./utils";
import path from "path";

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
    const vector = await llmService.embed(query);
    const context = await memoryService.searchDocs(vector);

    const answer = await llmService.generateAnswer(
      systemPrompt,
      `Context:${context}\n\nQuestion: ${query}`
    );

    console.log(answer);
    console.log("🔎✅");

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
  "search_entity",
  "Search entity. Ask questions about stored entity.",
  {
    query: z.string(),
  },
  async ({ query }) => {
    const vector = await llmService.embed(query);
    const context = await memoryService.searchDocs(vector);

    const answer = await llmService.generateAnswer(
      entityPrompt,
      `Context:${context}\n\nQuestion: ${query}`
    );

    console.log(answer);
    console.log("🔎✅");

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
    type: z
      .enum(["spec", "erd", "eventStorming", "intentLayout"])
      .default("spec"),
  },
  async ({ text, type }) => {
    const chunks = chunkText(text);

    for (const chunk of chunks) {
      const chunkVector = await llmService.embed(chunk);
      await memoryService.upsertDocs(chunkVector, chunk, { type });
    }

    const content: { type: "text"; text: string }[] = [
      {
        type: "text",
        text: `Stored ${chunks.length} chunks into training memory.`,
      },
    ];

    console.log("📖✅");
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
