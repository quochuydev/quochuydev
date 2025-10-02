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

console.log(`debug:{
  NEO4J_URI: ${env.NEO4J_URI},
  NEO4J_USER: ${env.NEO4J_USER},
  NEO4J_PASSWORD: ${env.NEO4J_PASSWORD},
  OPENAI_API_KEY: ${env.OPENAI_API_KEY},
}`);

const llmService = createOpenAIService(env.OPENAI_API_KEY);

const memoryService = createNeo4jService(
  env.NEO4J_URI || "bolt://localhost:7687",
  env.NEO4J_USER || "neo4j",
  env.NEO4J_PASSWORD || "password"
);

const server = new McpServer({ name: "agent", version: "1.0.0" });

const systemPromptPath = path.resolve("./agent.md");
console.log(`debug:systemPromptPath`, systemPromptPath);

const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");
console.log(systemPrompt);

server.tool(
  "search_knowledge_base",
  `Search knowledge base. Ask questions about stored requirements.
Example: "What are the approval workflow rules for expenses over 20M VND?"
Example: "What entities are involved in budget management?"
Example: "Can employees edit expense requests after submission?"
`,
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
  `Store custom training data into memory (embedded & chunked).
Example: Feed feature specifications, requirements docs, or clarifications
`,
  {
    text: z.string(),
    source: z.string().optional(), // optional metadata (e.g. "requirements_doc.md")
  },
  async ({ text, source }) => {
    const chunks = chunkText(text);

    for (const chunk of chunks) {
      const chunkVector = await llmService.embed(chunk);

      await memoryService.upsertDocs(chunkVector, chunk, {
        source: source || "",
      });
    }

    const content: { type: "text"; text: string }[] = [
      {
        type: "text",
        text: `Stored ${chunks.length} chunks into training memory.`,
      },
    ];

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
