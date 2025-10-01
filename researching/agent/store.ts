import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { createLLMService } from "./models";

config();

const llmService = createLLMService("openai");

const systemPrompt = fs.readFileSync(
  "../ignore/EventStormingExpert.md",
  "utf-8"
);

const folder = process.argv[2];
if (!folder) throw new Error("❌ Please provide the requirement folder name");

const eventStorming = fs.readFileSync(
  path.join(`./requirements//es.yaml`),
  "utf-8"
);

(async () => {
  try {
    const answer = await llmService.generateAnswer(systemPrompt, eventStorming);
    console.log(`debug:answer`, answer);
    console.log(`✅ Generated`);
  } catch (error) {
    console.error(error);
  }

  process.exit(1);
})();
