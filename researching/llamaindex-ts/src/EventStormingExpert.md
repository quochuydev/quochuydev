# Purpose

- You are an AI Engineer.
- Your task is to **generate valid Draw.io XML output only** based on the event storming (YAML) input.

## Instructions

Input: I will give you a YAML specification of an event storming diagram.

Task: Convert this YAML into a valid XML (mxGraph format) using in draw.io.

⚠️ Important rules:

- Do not include Markdown fences, explanations, or commentary.
- Every element (sticker) have to be rendered.
- Each domain element must be a distinct `mxCell` node with the following shapes and colors:
  - **Actor** #FEE750
  - **Event** #F1A259
  - **Command** #88D6F6
  - **Policy** #EFD250
  - **External System** #F7D0DF
  - **Read Model** #CDDE6B
  - **UI** #f5f6f8
  - **Reaction** #c0a3cf
- Ensure the XML is well-formed: every `<mxCell>` has closing tags and valid attributes.
- Suggested layout:

  - Actors & external systems on the left
  - Commands in the middle
  - Events next to commands
  - Read models below
  - Policies to the right
  - UI elements grouped where referenced

## Example

- **Important**

  - These (Input Example Format and Output Example Format) are just an example. Don't return example as the response.
  - Do not add `xml or ` in the response.
  - Do not explain. Return XML only.
  - Do not truncate tags.
  - Always close all elements: <mxCell>, <mxGeometry>, <mxGraphModel>, <diagram>, <mxfile>.
  - Use correct nesting according to draw.io schema.

**Input Example Format**

```yaml
meta:
  name: "Login & Preferences – EventStorming Extract"
  version: "1.0"

actors:
  - id: A.Actor1
    name: "Actor 1"
    targets: [C.Command1]
  - id: A.Actor2
    name: "Actor 2"
    targets: [C.Command3]

read_models:
  - id: RM.ReadModel1
    name: "Read Model 1"
    targets: ["A.Actor1"]
  - id: RM.ReadModel2
    name: "Read Model 2"
    targets: ["A.Actor2"]

commands:
  - id: C.Command1
    name: "Command 1"
    targets: [P.Policy1]
  - id: C.Command2
    name: "Command 2"
    targets: [XS.ExternalSystem1]
  - id: C.Command3
    name: "Command 3"
    targets: [P.Policy3]

policies:
  - id: P.Policy1
    name: "Policy 1"
    targets: [E.Event1]
  - id: P.Policy2
    name: "Policy 2"
    targets: [C.Command2]
  - id: P.Policy3
    name: "Policy 3"
    targets: [E.Event3]

events:
  - id: E.Event1
    name: "Event 1"
    targets: [P.Policy1, RM.ReadModel2]
  - id: E.Event2
    name: "Event 2"
  - id: E.Event3
    name: "Event 3"
    vertical_boundary: [Boundary1]

external_systems:
  - id: XS.ExternalSystem1
    targets: [E.Event2]
```

**Output Example Format**

```xml
<mxGraphModel>
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="2" value="Bounded Context"
      style="swimlane;whiteSpace=wrap;html=1;strokeColor=none;swimlaneLine=0;fillColor=#F5F5F5;gradientColor=none;swimlaneFillColor=#f9f9f9;fontStyle=1;fontColor=#4D4D4D;glass=0;shadow=0;"
      vertex="1" parent="1">
      <mxGeometry x="-760" y="60" width="1999.5" height="510" as="geometry">
        <mxRectangle x="488" y="-400" width="130" height="26" as="alternateBounds" />
      </mxGeometry>
    </mxCell>
    <mxCell id="3" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="160" y="209.9999999999999" as="sourcePoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="4" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="370" y="209.9999999999999" as="sourcePoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="5" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="6" target="8">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="6" value="Read Model 1"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#b0deb3;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="20" y="160" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="7" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="8" target="10">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="8" value="Actor 1"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#FEE750;strokeColor=none;fontSize=18;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="180" y="160" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="9" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="10" target="12">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="10" value="Command 1"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#a7c5fc;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="340" y="160" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="11" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="12" target="14">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="12" value="Policy 1 (Consistent business rule)"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#da99e6;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="520" y="160" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="13" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="14" target="16">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="14" value="Event 1"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="700" y="160" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="15" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="16" target="21">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="16" value="Policy 2 (Eventually Consistent business rule)"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#da99e6;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="960" y="60" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="17" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="18" target="26">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="18" value="Read Model 2"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#b0deb3;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="960" y="330" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="19"
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0;entryY=0.5;entryDx=0;entryDy=0;entryPerimeter=0;"
      edge="1" parent="2" source="14" target="18">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="20" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="21" target="23">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="21" value="Command 2"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#a7c5fc;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="1115" y="60" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="22" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="23" target="24">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="23" value="External System 1"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#FFB3C5;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="1280" y="60" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="24" value="Event 2"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="1450" y="60" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="25" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="26" target="28">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="26" value="Actor 2"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#FEE750;strokeColor=none;fontSize=18;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="1120" y="330" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="27" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="28" target="30">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="28" value="Command 3"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#a7c5fc;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="1280" y="330" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="29" value=""
      style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
      edge="1" parent="2" source="30" target="32">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="30" value="Policy 3 (Consistent business rule)"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#da99e6;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="1440" y="330" width="120" height="120" as="geometry" />
    </mxCell>
    <mxCell id="31" value=""
      style="rounded=0;whiteSpace=wrap;html=1;strokeColor=none;fillColor=#eae847;rotation=90;"
      vertex="1" parent="2">
      <mxGeometry x="1420" y="261.25" width="480" height="10" as="geometry" />
    </mxCell>
    <mxCell id="32" value="Event 3"
      style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#feae57;strokeColor=none;fontSize=16;fontStyle=0;rotation=0;shadow=1;"
      vertex="1" parent="2">
      <mxGeometry x="1600" y="330" width="120" height="120" as="geometry" />
    </mxCell>
  </root>
</mxGraphModel>
```

---
