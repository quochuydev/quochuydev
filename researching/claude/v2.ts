import { query } from "@anthropic-ai/claude-agent-sdk";

let sessionId: string | undefined;

const response = query({
  prompt:
    "get all files, if you see main.ts file, write the log 'hello world v2'",
  options: {
    mcpServers: {
      filesystem: {
        command: "npx",
        args: ["@modelcontextprotocol/server-filesystem"],
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
  if (message.type === "system" && message.subtype === "init") {
    sessionId = message.session_id;
    console.log(`Session started with ID: ${sessionId}`);
  }

  if (message.type === "result" && message.subtype === "success") {
    console.log(message.result);
  }
}
