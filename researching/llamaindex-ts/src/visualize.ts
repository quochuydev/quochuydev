import "dotenv/config";
import { openai } from "@llamaindex/openai";
import { agent } from "@llamaindex/workflow";
import fs from "fs";
import path from "path";
import { agentToolCallEvent, agentStreamEvent } from "@llamaindex/workflow";

const systemPromptPath = path.resolve("./src/visualize.md");
const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");
console.log(`debug:systemPromptPath`, systemPromptPath);

const eventStormingPath = path.resolve("./src/es.yaml");
const eventStorming = fs.readFileSync(eventStormingPath, "utf-8");
console.log(`debug:eventStormingPath`, eventStormingPath);

const xmlOutputPath = path.resolve(`./src/result/${Date.now()}.xml`);
const drawioOutputPath = path.resolve(`./src/result/${Date.now()}.drawio`);
console.log(`debug:xmlOutputPath`, xmlOutputPath);

const llm: "deepseek-chat" | "openai" = "openai";

async function main() {
  const myAgent = agent({
    systemPrompt,
    llm:
      llm === "deepseek-chat"
        ? openai({
            baseURL: "https://api.deepseek.com",
            apiKey: process.env.DEEPSEEK_API_KEY,
            model: "deepseek-chat",
          })
        : openai({
            apiKey: process.env.OPENAI_API_KEY,
            model: "gpt-4o-mini",
          }),
    verbose: false,
  });

  const events = myAgent.runStream(eventStorming);

  let finalText = "";

  for await (const event of events) {
    if (agentToolCallEvent.include(event)) {
      console.log(`Tool being called: ${event.data.toolName}`);
    }

    if (agentStreamEvent.include(event)) {
      process.stdout.write(event.data.delta);
      finalText += event.data.delta;
    }
  }

  fs.writeFileSync(drawioOutputPath, finalText, "utf-8");
  fs.writeFileSync(xmlOutputPath, finalText, "utf-8");
  console.log(`\n\n✅ Final result written to ${xmlOutputPath}`);
}

main().catch((error) => {
  console.error("Error:", error);
});
