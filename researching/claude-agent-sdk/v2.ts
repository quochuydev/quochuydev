import { query } from "@anthropic-ai/claude-agent-sdk";

const response = query({
  prompt: "create for me a simple todo app",
  options: {
    systemPrompt: {
      type: "preset",
      preset: "claude_code",
    },
    allowedTools: ["Read", "Edit", "Write", "Glob", "Grep", "Bash"],
  },
});

for await (const message of response) {
  switch (message.type) {
    case "result":
      if (message.subtype === "success") {
        console.log("\n✅ Result:", message.result);
      }
      break;

    default:
      console.log("other:", message);
  }
}
