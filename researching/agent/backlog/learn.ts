import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { createChromaService } from "./tools/chroma";
import { createOpenAIService } from "../tools/openai";
import { chunkText } from "../utils";

config();

const memoryService = createChromaService(process.env.CHROMA_API_KEY);
const llmService = createOpenAIService(process.env.OPENAI_API_KEY);

async function learn() {
  const rootDir = path.resolve("./docs");

  const subDirs = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(rootDir, entry.name));

  console.log(`📂 Found ${subDirs.length}:`, subDirs);

  for (const dir of subDirs) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);

    console.log(`📂 Found ${files.length}:`, files);

    for (const fileName of files) {
      const filePath = path.join(dir, fileName);
      const content = fs.readFileSync(filePath, "utf-8");
      const chunks = chunkText(content);

      console.log(`Processing file: [${fileName}] chunks [${chunks.length}]`);

      if (chunks.length > 15) {
        console.log(`Skipping file: [${fileName}]`);
        continue;
      }

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const vector = await llmService.embed(chunk);
        await memoryService.upsertDocs(vector, chunk, { fileName });
        console.log(`✅ [${fileName}] chunk [${i + 1}/${chunks.length}]`);
      }
    }
  }

  console.log("✅ Ingestion complete!");
}

learn().catch((err) => {
  console.error(err);
  process.exit(1);
});
