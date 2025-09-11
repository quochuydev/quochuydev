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

const getFiles = (rootDir: string) => {
  console.log(`📂 rootDir`, rootDir);

  const result: Array<{
    fileName: string;
    fileDir: string;
    filePath: string;
    content: string;
  }> = [];

  const subDirs = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(rootDir, entry.name));

  for (const fileDir of subDirs) {
    const entries = fs.readdirSync(fileDir, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);

    console.log(`📂 Found ${files.length}:`, files);

    for (const fileName of files) {
      const filePath = path.join(fileDir, fileName);
      const content = fs.readFileSync(filePath, "utf-8");
      result.push({ fileName, fileDir, filePath, content });
    }
  }

  return result;
};

const rootDir = path.resolve("../requirements");
const files = getFiles(rootDir);

// for (const file of files) {
//   if (file.fileName === "requirement.md") {
//     console.log(`Processing file: [${file.fileName}]`);
//     const { answer } = await analyzeKnowledgeBase(file.content);
//     fs.writeFileSync(path.join(file.fileDir, "analyzed.md"), answer);
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

analyzeKnowledgeBase(requirement)
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
