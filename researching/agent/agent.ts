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

config();

const env = process.env as Record<string, string>;
const llmService = createOpenAIService(env.OPENAI_API_KEY);

const memoryService = createNeo4jService(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  process.env.NEO4J_USER || "neo4j",
  process.env.NEO4J_PASSWORD || "Qwerty@123"
);

const server = new McpServer({ name: "agent", version: "1.0.0" });

const systemPrompt = fs.readFileSync("./main.md", "utf-8");
console.log(`debug:systemPrompt`, systemPrompt);

server.tool(
  "analyze_requirement",
  "Analyze the requirement.",
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
  "Store custom training data into memory (embedded & chunked).",
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
