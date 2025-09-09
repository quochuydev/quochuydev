import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { createChromaService } from "./memory/chroma";
import { createOpenAIService } from "./models/openai";
import { chunkText } from "./utils";

config();

const memoryService = createChromaService(process.env.CHROMA_API_KEY);
const llmService = createOpenAIService(process.env.OPENAI_API_KEY);

async function learn() {
  const filesDir = path.resolve("./docs");
  const files = fs.readdirSync(filesDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(filesDir, file), "utf-8");
    const chunks = chunkText(content);

    console.log(`debug:chunks.length`, chunks.length);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const pointId = uuidv4();

      const vector = await llmService.embed(chunk);
      await memoryService.upsertDocs(vector);

      console.log(`upsert:pointId`, pointId);
    }
  }

  console.log("✅ Ingestion complete!");
}

learn().catch((err) => {
  console.error(err);
  process.exit(1);
});
