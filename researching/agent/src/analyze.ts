import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { createChromaService } from "./memory/chroma";
import { createOpenAIService } from "./models/openai";
import { chunkText } from "./utils";

config();

const env = process.env as Record<string, string>;
const llmService = createOpenAIService(env.OPENAI_API_KEY);
const memoryService = createChromaService(env.CHROMA_API_KEY);

const analyzeSystemPrompt = fs.readFileSync(
  "../prompts/analyze-prompt.md",
  "utf-8"
);

const searchSystemPrompt = fs.readFileSync(
  "../prompts/search-prompt.md",
  "utf-8"
);

async function analyzeKnowledgeBase(query: string) {
  const vector = await llmService.embed(query);
  const context = await memoryService.searchDocs(vector);

  const answer = await llmService.generateAnswer(
    analyzeSystemPrompt,
    `Context:${context}\n\nQuestion: ${query}`
  );

  console.log(answer);

  const content: CallToolResult["content"] = [{ type: "text", text: answer }];

  const chunks = chunkText(answer);

  for (const chunk of chunks) {
    const chunkVector = await llmService.embed(chunk);
    await memoryService.upsertDocs(chunkVector, chunk, { query });
  }

  return { content };
}

async function searchKnowledgeBase(query: string) {
  const vector = await llmService.embed(query);
  const context = await memoryService.searchDocs(vector);

  const answer = await llmService.generateAnswer(
    searchSystemPrompt,
    `Context:${context}\n\nQuestion: ${query}`
  );

  console.log(answer);

  const content: CallToolResult["content"] = [{ type: "text", text: answer }];

  const chunks = chunkText(answer);

  for (const chunk of chunks) {
    const chunkVector = await llmService.embed(chunk);
    await memoryService.upsertDocs(chunkVector, chunk, { query });
  }

  return { content, answer };
}

const rootDir = path.resolve("../requirements");

const subDirs = fs
  .readdirSync(rootDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(rootDir, entry.name));

for (const dir of subDirs) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  console.log(`📂 Found ${files.length}:`, files);

  for (const fileName of files) {
    console.log(`Processing file: [${fileName}]`);

    if (fileName === "requirement.md") {
      const filePath = path.join(dir, fileName);
      const requirement = fs.readFileSync(filePath, "utf-8");

      const { answer } = await searchKnowledgeBase(requirement);
      fs.writeFileSync(path.join(dir, "searched.md"), answer);
    }
  }
}
