import { query } from "@anthropic-ai/claude-agent-sdk";

const response = query({
  prompt:
    "get all files, if you see main.ts file, write the current iso string date",
  options: {
    systemPrompt: {
      type: "preset",
      preset: "claude_code",
    },
    mcpServers: {
      filesystem: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-filesystem"],
        env: {
          ALLOWED_PATHS: "./src",
        },
      },
    },
    allowedTools: [
      "mcp__filesystem__list_files",
      "Read",
      "Edit",
      "Write",
      "Glob",
      "Grep",
      "Bash",
    ],
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
