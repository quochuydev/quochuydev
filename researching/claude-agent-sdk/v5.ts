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
        prompt: fs.readFileSync("v5.analyze.simple.md", "utf-8").trim(),
      },
      generate_draw_io: {
        description: "Generate drawio xml from event storming yaml",
        tools: ["Read", "Edit", "Write"],
        prompt: fs.readFileSync("v5.event-storming-os.md", "utf-8").trim(),
      },
      //       review_draw_io: {
      //         description: "Review drawio xml is generate",
      //         tools: ["Read", "Edit", "Write"],
      //         prompt: `
      // You are an expert generator drawio, the out come have to be look perfect, beautiful, professional. If not, delegate back to fix.
      // - The Bounded Context size have to be enough to  cover all element in side.
      // - The Flows size have to be enough to  cover all element in side.
      // - The Element don't overlap with others, be square and valid code
      // - The Connection have to be enough.
      //         `,
      //       },
    },
    systemPrompt: {
      type: "preset",
      preset: "claude_code",
      append:
        "You are a helpful assistant that can analyze business requirement then generate drawio xml from yaml, review and fix the layout.",
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
