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
          text: `<mxCell id="2" value="{context_name}" style="swimlane;startSize=30;horizontal=1;" vertex="1" parent="1">
    <mxGeometry x="0" y="0" width="2000" height="800" as="geometry" />
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
          text: `<object label="{flow_name}" type="flow" id="2">
    <mxCell
    style="swimlane;whiteSpace=wrap;html=1;strokeColor=#666666;swimlaneLine=0;fillColor={color};gradientColor=none;swimlaneFillColor=#ffffff;fontStyle=1;fontColor=#2E7D32;glass=0;shadow=1;fontSize=16;"
    vertex="1"
    parent="{bounded_context_id}">
    <mxGeometry x="{x}" y="{y}" width="1900" height="700" as="geometry"/>
    </mxCell>
</object>`,
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
          text: `<mxCell id="{reference_id or id}" value="{name}"
  style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor={color};strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
  vertex="1" parent="{flow_id}">
  <mxGeometry x="{x}" y="{y}" width="120" height="120" as="geometry" />
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
  edge="1" parent="{flow_id}" source="{source_id}" target="{target_id}">
  <mxGeometry relative="1" as="geometry" />
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
    createContextTool,
    createFlowTool,
    createElementTool,
    createConnectionTool,
  ],
});

for await (const message of query({
  prompt: fs.readFileSync("v8.prompt-yaml.md", "utf-8").trim(),
  options: {
    // systemPrompt: {
    //   type: "preset",
    //   preset: "claude_code",
    //   append: fs.readFileSync("v8.event-storming.md", "utf-8").trim(),
    // },
    systemPrompt: fs.readFileSync("v8.event-storming.md", "utf-8").trim(),
    mcpServers: {
      drawio: customServer,
    },
    agents: {
      review: {
        description: "Review drawio xml is generate",
        tools: ["Read", "Edit", "Write"],
        prompt: `You are an expert generator drawio, the out come have to be look perfect, beautiful, professional. If not, delegate back to fix.
Check list:
- The Bounded Context size have to be enough to  cover all element in side.
- The Flows size have to be enough to  cover all element in side.
- The Element don't overlap with others, be square and valid code
- The Connection have to be enough.`,
      },
    },
    allowedTools: [
      "Read",
      "Edit",
      "Write",
      "mcp__drawio__create_layout",
      "mcp__drawio__create_bounded_context",
      "mcp__drawio__create_flow",
      "mcp__drawio__create_element",
      "mcp__drawio__create_connection",
    ],
  },
})) {
  if (message.type === "user") {
    console.log("user", message.message.content);
  }

  if (message.type === "assistant") {
    console.log("assistant", message.message.content);
  }

  if (message.type === "result" && message.subtype === "success") {
    console.log("result", message.result);
    fs.writeFileSync(`v8_${Date.now()}.md`, message.result);
  }
}
