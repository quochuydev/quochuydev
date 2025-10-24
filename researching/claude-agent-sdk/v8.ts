import {
  createSdkMcpServer,
  query,
  tool,
} from "@anthropic-ai/claude-agent-sdk";
import fs from "fs";

const createLayoutTool = tool(
  "create_layout",
  "Create layout for event storming",
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
    <!-- <Bounded Context> -->
      <!-- <Flow> -->
        <!-- <Element> -->
        <!-- <Connection> -->
      <!-- </Flow> -->
    <!-- </Bounded Context> -->
  </root>
</mxGraphModel>`,
        },
      ],
    };
  }
);

const createContextTool = tool(
  "create_bounded_context",
  "Create bounded context for event storming",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: `<mxCell id="{context_id}" value="{context_name}" style="container=1;recursiveResize=1;collapsible=0;horizontal=1;startSize=30;fillColor=#fff;strokeColor=#64b5f6;" vertex="1" parent="1">
  <mxGeometry x="{x}" y="{y}" width="1500" height="800" as="geometry"/>
</mxCell>`,
        },
      ],
    };
  }
);

const createFlowTool = tool(
  "create_flow",
  "Create flow for event storming",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: `<mxCell id="{flow_id}" value="{flow_name}" style="container=1;recursiveResize=1;collapsible=0;horizontal=1;startSize=20;fillColor=#f1f8e9;strokeColor=#9ccc65;" vertex="1" parent="1"></mxCell>`,
        },
      ],
    };
  }
);

const createElementTool = tool(
  "create_element",
  "Create element for event storming",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: `<mxCell id="{element_id}" value="{name}" style="shape=note;whiteSpace=wrap;html=1;fillColor={color};strokeColor=none;container=0;" vertex="1" parent="{1}">
  <mxGeometry x="{x}" y="{y}" width="150" height="80" as="geometry"/>
</mxCell>`,
        },
      ],
    };
  }
);

const createConnectionTool = tool(
  "create_connection",
  "Create connection for event storming",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: `<mxCell id="{id}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
  edge="1" parent="1" source="{source_id}" target="{target_id}">
  <mxGeometry relative="1" as="geometry" width="150" />
</mxCell>`,
        },
      ],
    };
  }
);

const customServer = createSdkMcpServer({
  name: "drawio",
  version: "1.0.0",
  tools: [
    createLayoutTool,
    // createContextTool,
    createFlowTool,
    createElementTool,
    createConnectionTool,
  ],
});

const allowedTools = [
  "Read",
  "Edit",
  "Write",
  "mcp__drawio__create_layout",
  // "mcp__drawio__create_bounded_context",
  "mcp__drawio__create_flow",
  "mcp__drawio__create_element",
  "mcp__drawio__create_connection",
];

for await (const message of query({
  prompt: fs.readFileSync("v8.prompt-yaml.md", "utf-8").trim(),
  options: {
    systemPrompt: fs.readFileSync("v8.event-storming.md", "utf-8").trim(),
    mcpServers: {
      drawio: customServer,
    },
    allowedTools,
  },
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
