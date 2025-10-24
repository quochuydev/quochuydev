import { query } from "@anthropic-ai/claude-agent-sdk";
import fs from "fs";

for await (const message of query({
  prompt: fs.readFileSync("v8.prompt.md", "utf-8").trim(),
  options: {
    systemPrompt: fs.readFileSync("v8.analyze.md", "utf-8").trim(),
    allowedTools: ["Read", "Edit", "Write"],
  },
})) {
  if (message.type === "user") {
    console.log("user", message.message.content);
  }

  if (message.type === "assistant") {
    console.log("assistant", message.message.content);
  }

  if (message.type === "result" && message.subtype === "success") {
    console.log("result", message.result);
    fs.writeFileSync(`v8_${Date.now()}.analyzed.md`, message.result);
  }
}
