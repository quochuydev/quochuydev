import { query } from "@anthropic-ai/claude-agent-sdk";
import fs from "fs";

const response = query({
  prompt: fs.readFileSync("v5.prompt.md", "utf-8"),

  options: {
    agents: {
      analyze: {
        description:
          "Analyze business requirement then generate event storming yaml",
        tools: ["Read", "Edit", "Write"],
        prompt: fs.readFileSync("v5.analyze.md", "utf-8").trim(),
      },
      draw_io: {
        description: "Generate drawio xml from event storming yaml",
        tools: ["Read", "Edit", "Write"],
        prompt: fs.readFileSync("v5.es.md", "utf-8").trim(),
      },
    },
    systemPrompt: {
      type: "preset",
      preset: "claude_code",
      append:
        "You are a helpful assistant that can analyze business requirement then generate drawio xml from yaml.",
    },
    allowedTools: ["Read", "Edit", "Write"],
  },
});

for await (const message of response) {
  if (message.type === "assistant") {
    for (const element of message.message.content) {
      if (element.type === "tool_use") {
        console.log("assistant", element.type, element.name);
      }
    }
  }

  if (message.type === "user") {
    console.log("user", message.message.content);
  }

  if (message.type === "result") {
    if (message.subtype === "success") {
      console.log("\n✅ Result:", message.result);
    }
  }
}
