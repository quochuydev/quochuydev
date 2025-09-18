import "dotenv/config";
import { openai } from "@llamaindex/openai";
import { agent } from "@llamaindex/workflow";
import fs from "fs";
import path from "path";
import { agentToolCallEvent, agentStreamEvent } from "@llamaindex/workflow";

const xmlInputOutputPath = path.resolve("./src/result/1758194330947.xml");
const xmlInputOutput = fs.readFileSync(xmlInputOutputPath, "utf-8");
console.log(`debug:xmlInputOutputPath`, xmlInputOutputPath);

const xmlOutputPath = path.resolve(`./src/result/${Date.now()}.xml`);
const drawioOutputPath = path.resolve(`./src/result/${Date.now()}.drawio`);
console.log(`debug:xmlOutputPath`, xmlOutputPath);

const llm: "deepseek-chat" | "openai" = "openai";

async function main() {
  const myAgent = agent({
    systemPrompt: `## Instruction
- You are a specialized AI that help re-order Draw.io XML format
- Make it more beautiful and easy to understand.
- Width/height should be calculated based on the elements existing.
- Elements should be placed in the swimlane container; don't overlap; wisely.
- Connections should be placed in the swimlane container; don't overlap with other elements or connections.
- Don't let Connection line go thought Element
- Don't let Element in front of other Element
## Output Format
- Generate **only** valid and beautiful Draw.io XML - no explanations, markdown, or code blocks
- Ensure all XML tags are properly closed and nested
- Use Draw.io's mxGraphModel schema structure
`,
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

  const events = myAgent.runStream(xmlInputOutput);

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
