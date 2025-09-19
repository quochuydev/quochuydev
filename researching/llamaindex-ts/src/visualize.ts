import { openai } from "@llamaindex/openai";
import {
  agent,
  agentStreamEvent,
  agentToolCallEvent,
} from "@llamaindex/workflow";
import "dotenv/config";
import fs from "fs";
import path from "path";

// System Prompt
const systemPromptPath = path.resolve("./src/visualize.md");
const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");
const llm: "deepseek-chat" | "openai" = "openai";

// Event Storming
const eventStormingYaml: "gsm-booking" | "gsm-registration" | "es-login" =
  "es-login";
const eventStormingPath = path.resolve(`./src/${eventStormingYaml}.yaml`);
const eventStorming = fs.readFileSync(eventStormingPath, "utf-8");

// Output
const xmlOutputPath = path.resolve(`./src/result/${Date.now()}.xml`);
const drawioOutputPath = path.resolve(`./src/result/${Date.now()}.drawio`);
const drawioOutputFormattedPath = path.resolve(
  `./src/result/${Date.now()}-2.drawio`
);

// Debug
console.log(`debug:systemPromptPath`, systemPromptPath);
console.log(`debug:eventStormingPath`, eventStormingPath);
console.log(`debug:xmlOutputPath`, xmlOutputPath);
console.log(`debug:drawioOutputPath`, drawioOutputPath);
console.log(`----- XML -----`);

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
            model: "gpt-4o",
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
  fs.writeFileSync(drawioOutputFormattedPath, finalText, "utf-8");
  console.log(`\n\n✅ Final result written to ${xmlOutputPath}`);
}

main().catch((error) => {
  console.error("Error:", error);
});
