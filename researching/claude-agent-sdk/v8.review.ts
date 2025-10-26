import { query } from "@anthropic-ai/claude-agent-sdk";
import fs from "fs";

for await (const message of query({
  prompt: `Review the quality, then make it more beauty:
- Update the layout: Arrange -> Layout -> Horizontal Flow
- Bounded context have to cover all Elements and Connections inside.
 
Current XML:

${fs.readFileSync("v8.script.xml", "utf-8").trim()} `,
})) {
  if (message.type === "user") {
    // console.log("user", message.message.content);

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
    fs.writeFileSync(`v8_${Date.now()}.md`, message.result);
  }
}
