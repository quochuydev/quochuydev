import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { createLLMService } from "./models";

config();

const llmService = createLLMService("deepseek-chat");

const systemPrompt = fs.readFileSync(
  "../ignore/EventStormingExpert.md",
  "utf-8"
);

const validateSystemPrompt = fs.readFileSync(
  "./prompts/validate-drawio-prompt.md",
  "utf-8"
);

async function generateDiagram(eventStorming: string) {
  // console.log(systemPrompt);
  // console.log(query);

  const answer = await llmService.generateAnswer(systemPrompt, eventStorming);
  console.log(`debug:answer`, answer);

  const isValid = await llmService.generateAnswer(validateSystemPrompt, answer);
  console.log(`debug:isValid`, isValid);

  const storePath = path.join(`./requirements/${folder}/${Date.now()}.xml`);
  fs.writeFileSync(storePath, answer);

  console.log(`✅ Generated`);
}

const folder = process.argv[2];
if (!folder) throw new Error("❌ Please provide the requirement folder name");

const eventStorming = fs.readFileSync(
  path.join(`./requirements/${folder}/es.yaml`),
  "utf-8"
);

generateDiagram(eventStorming).catch((err) => {
  console.error(err);
  process.exit(1);
});
