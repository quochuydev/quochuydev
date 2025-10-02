import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { createChromaService } from "./tools/chroma";
import { createOpenAIService } from "./tools/openai";
import { chunkText } from "./utils";

config();

const env = process.env as Record<string, string>;
const llmService = createOpenAIService(env.OPENAI_API_KEY);
const memoryService = createChromaService(env.CHROMA_API_KEY);

const systemPrompt = fs.readFileSync("./prompts/system-prompt.md", "utf-8");

async function analyze(query: string) {
  const vector = await llmService.embed(query);
  const context = await memoryService.searchDocs(vector);

  const answer = await llmService.generateAnswer(
    systemPrompt,
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

const fileName = process.argv[2];
if (!fileName) throw new Error("❌ Please provide the requirement folder name");

const requirement = fs.readFileSync(
  path.join(`./requirements/${fileName}.md`),
  "utf-8"
);

analyze(requirement)
  .then((res) => res.answer)
  .then((answer) => {
    const storePath = path.join(`./requirements/${fileName}-analyzed.md`);
    fs.writeFileSync(storePath, answer);
    console.log(`✅ Analyzed`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
