import { query } from "@anthropic-ai/claude-agent-sdk";
import fs from "fs";

for await (const message of query({
  prompt: fs.readFileSync("v9.yaml.md", "utf-8").trim(),
  options: {
    systemPrompt: fs.readFileSync("v9.event-storming.md", "utf-8").trim(),
    allowedTools: ["Read", "Edit", "Write"],
  },
})) {
  if (message.type === "user") {
    for (const content of message.message.content) {
      if (typeof content === "string") {
        //
      } else {
        if (content.type === "tool_result") console.log("", content.content);
      }
    }
  }

  if (message.type === "assistant") {
    console.log("assistant", message.message.content);
  }

  if (message.type === "result" && message.subtype === "success") {
    console.log("result", message.result);
    fs.writeFileSync(`v9_${Date.now()}.md`, message.result);
  }
}
