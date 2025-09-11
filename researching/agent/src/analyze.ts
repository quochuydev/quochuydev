import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { createChromaService } from "./memory/chroma";
import { createOpenAIService } from "./models/openai";
// import { chunkText } from "./utils";

config();

const env = process.env as Record<string, string>;
const llmService = createOpenAIService(env.OPENAI_API_KEY);
const memoryService = createChromaService(env.CHROMA_API_KEY);

const systemPrompt = fs.readFileSync("../prompts/system-prompt.md", "utf-8");

async function analyzeKnowledgeBase(query: string) {
  const vector = await llmService.embed(query);
  const context = await memoryService.searchDocs(vector);

  const answer = await llmService.generateAnswer(
    systemPrompt,
    `Context:${context}\n\nQuestion: ${query}`
  );

  console.log(answer);

  const content: CallToolResult["content"] = [{ type: "text", text: answer }];

  // const chunks = chunkText(answer);

  // for (const chunk of chunks) {
  //   const chunkVector = await llmService.embed(chunk);
  //   await memoryService.upsertDocs(chunkVector, chunk, { query });
  // }

  return { content, answer };
}

// const rootDir = path.resolve("../requirements");

// const subDirs = fs
//   .readdirSync(rootDir, { withFileTypes: true })
//   .filter((entry) => entry.isDirectory())
//   .map((entry) => path.join(rootDir, entry.name));

// for (const dir of subDirs) {
//   const entries = fs.readdirSync(dir, { withFileTypes: true });

//   const files = entries
//     .filter((entry) => entry.isFile())
//     .map((entry) => entry.name);

//   console.log(`📂 Found ${files.length}:`, files);

//   for (const fileName of files) {
//     if (fileName === "requirement.md") {
//       console.log(`Processing file: [${fileName}]`);

//       const filePath = path.join(dir, fileName);
//       const requirement = fs.readFileSync(filePath, "utf-8");

//       const { answer } = await analyzeKnowledgeBase(requirement);
//       fs.writeFileSync(path.join(dir, "analyzed.md"), answer);
//     }
//   }
// }

const folder = process.argv[2];

if (!folder) {
  console.error("❌ Please provide the requirement folder name");
  process.exit(1);
}

const requirement = fs.readFileSync(
  path.join(`../requirements/${folder}/requirement.md`),
  "utf-8"
);
console.log(`debug:requirement`, requirement);

analyzeKnowledgeBase(requirement)
  .then((res) => res.answer)
  .then((answer) => {
    console.log(answer);
    fs.writeFileSync(
      path.join(`../requirements/${folder}/analyzed.md`),
      answer
    );
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
