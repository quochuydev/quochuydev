import { query } from "@anthropic-ai/claude-agent-sdk";

const response = query({
  prompt: `
1. Add console.log current date to main.ts file
2. Create a git repo (ignore)
3. Push to github (ignore)
4. Add expressjs with router /health-check to main.ts file
5. Push to github (ignore)
`,
  options: {
    systemPrompt: {
      type: "preset",
      preset: "claude_code",
    },
    mcpServers: {
      github: {
        type: "http",
        url: "https://api.githubcopilot.com/mcp/",
      },
      filesystem: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-filesystem"],
      },
    },
    allowedTools: ["Read", "Edit", "Write", "Glob", "Grep", "Bash"],
  },
});

for await (const message of response) {
  if (message.type === "user") {
    console.log("user:", message.message.content);
  } else if (message.type === "result" && message.subtype === "success") {
    console.log(`result:`, message.result);
  } else {
    console.log("message:", message);
  }
}
