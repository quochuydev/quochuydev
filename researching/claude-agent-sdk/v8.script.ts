import { data } from "./v8.json";
import fs from "fs";

const randomId = () => Math.random().toString(36).substring(2, 9);

const xmlBuilder = () => {
  let xml = "";

  const start = () => {
    xml += `<mxGraphModel><root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />`;
  };

  const end = () => {
    xml += `</root></mxGraphModel>`;
  };

  const addFlow = (flow: { id: string; name: string }) => {
    xml += `<mxCell id="${flow.id}" value="${flow.name}" style="container=1;recursiveResize=1;collapsible=0;horizontal=1;startSize=20;fillColor=#f1f8e9;strokeColor=#9ccc65;" vertex="1" parent="1"></mxCell>`;
  };

  const addElement = (element: { id: string; name: string }) => {
    xml += `
<mxCell id="${element.id}" value="${element.name}" style="shape=note;whiteSpace=wrap;html=1;fillColor={color};strokeColor=none;container=0;" vertex="1" parent="1">
  <mxGeometry x="{x}" y="{y}" width="150" height="80" as="geometry"/>
</mxCell>    
`;

    return element.id;
  };

  const addConnection = (connection: {
    id: string;
    source_id: string;
    target_id: string;
  }) => {
    xml += `
<mxCell id="${connection.id}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;"
  edge="1" parent="1" source="${connection.source_id}" target="${connection.target_id}">
  <mxGeometry relative="1" as="geometry" width="150" />
</mxCell> `;
  };

  return {
    start,
    addConnection,
    addElement,
    addFlow,
    end,
    getXml: () => xml,
  };
};

const builder = xmlBuilder();

builder.start();

for (const flow of data.flows) {
  builder.addFlow({ id: randomId(), name: flow.name });

  for (const element of flow.edges) {
    const target_id = builder.addElement({
      id: randomId(),
      name: element.target_id,
    });

    const source_id = builder.addElement({
      id: randomId(),
      name: element.source_id,
    });

    builder.addConnection({ id: randomId(), source_id, target_id });
  }
}

builder.end();

fs.writeFileSync("v8.script.xml", builder.getXml());
