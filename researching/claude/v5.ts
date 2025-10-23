import {
  createSdkMcpServer,
  query,
  tool,
} from "@anthropic-ai/claude-agent-sdk";
import fs from "fs";
import { z } from "zod";

const createLayoutTool = tool(
  "create_layout",
  "Generate diagram layout",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: `<mxGraphModel>
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <!-- Context -->
    <!-- ElementsAndConnections -->
  </root>
</mxGraphModel>`,
        },
      ],
    };
  }
);

const createContextTool = tool(
  "create_context",
  "Generate bounded context",
  {
    context_name: z.string().describe("Context name of the diagram"),
    width: z.number().describe("Width of the diagram"),
    height: z.number().describe("Height of the diagram"),
    startSize: z.number().describe("Start size of the diagram"),
  },
  async (args) => {
    return {
      content: [
        {
          type: "text",
          text: `<mxCell id="2" value="${args.context_name}" style="swimlane;startSize=${args.startSize};horizontal=1;" vertex="1" parent="1">
  <mxGeometry x="0" y="0" width="${args.width}" height="${args.height}" as="geometry" />
</mxCell>`,
        },
      ],
    };
  }
);

const createElementTool = tool(
  "create_element",
  "Generate element",
  {
    reference_id_or_id: z
      .string()
      .describe("Reference id or id of the element"),
    name: z.string().describe("Name of the element"),
    color: z.string().describe("Color of the element"),
    x: z.number().describe("X position of the element"),
    y: z.number().describe("Y position of the element"),
  },
  async (args) => {
    return {
      content: [
        {
          type: "text",
          text: `<mxCell id="${args.reference_id_or_id}" value="${args.name}"
  style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=${args.color};strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
  vertex="1" parent="2">
  <mxGeometry x="${args.x}" y="${args.y}" width="120" height="120" as="geometry" />
</mxCell>`,
        },
      ],
    };
  }
);

const createConnectionTool = tool(
  "create_connection",
  "Generate connection",
  {
    id: z.string().describe("Id of the connection"),
    source_id: z.string().describe("Source id of the connection"),
    target_id: z.string().describe("Target id of the connection"),
  },
  async (args) => {
    return {
      content: [
        {
          type: "text",
          text: `<mxCell id="${args.id}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
  edge="1" parent="2" source="${args.source_id}" target="${args.target_id}">
  <mxGeometry relative="1" as="geometry" />
</mxCell>`,
        },
      ],
    };
  }
);

const server = createSdkMcpServer({
  name: "draw_io",
  version: "1.0.0",
  tools: [
    createLayoutTool,
    createContextTool,
    createElementTool,
    createConnectionTool,
  ],
});

const response = query({
  prompt: fs.readFileSync("v5.insight.md", "utf-8"),
  options: {
    mcpServers: {
      draw_io: server,
    },
    systemPrompt: {
      type: "preset",
      preset: "claude_code",
      append: fs.readFileSync("v5.es.md", "utf-8"),
    },
    allowedTools: ["Read", "Edit", "Write", "Glob", "Grep", "Bash"],
  },
});

for await (const message of response) {
  if (message.type === "assistant") {
    console.log("assistant", message.message.content);
  }

  if (message.type === "user") {
    console.log("user", message.message.content);
  }

  if (message.type === "result") {
    if (message.subtype === "success") {
      console.log("\n✅ Result:", message.result);
      const es = message.result.replace("```xml", "").replace("```", "");
      fs.writeFileSync("v5.es.drawio", es);
    }
  }
}
