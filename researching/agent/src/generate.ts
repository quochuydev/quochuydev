import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { createOpenAIService } from "./models/openai";

config();

const env = process.env as Record<string, string>;
const llmService = createOpenAIService(env.OPENAI_API_KEY);

const systemPrompt = fs.readFileSync("../prompts/system-prompt.md", "utf-8");

async function generateDiagram(query: string) {
  const answer = await llmService.generateAnswer(systemPrompt, query);
  console.log(answer);
  const content: CallToolResult["content"] = [{ type: "text", text: answer }];
  return { content, answer };
}

const folder = process.argv[2];
if (!folder) throw new Error("❌ Please provide the requirement folder name");

const requirement = fs.readFileSync(
  path.join(`../requirements/${folder}/requirement.md`),
  "utf-8"
);

generateDiagram(requirement)
  .then((res) => res.answer)
  .then((answer) => {
    const storePath = path.join(`../requirements/${folder}/analyzed.md`);
    fs.writeFileSync(storePath, answer);
    console.log(`✅ Analyzed`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
