import{u as a,j as e}from"./index-XL3WIqAG.js";function t(o){const n={code:"code",h2:"h2",h3:"h3",hr:"hr",pre:"pre",...a(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Introduction"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`As a Fullstack/Typescript/NodeJs Developer/Solution engineer, Strong in NodeJS, ReactJS, MongoDB, PostgreSQL, AWS.
`})}),`
`,e.jsx(n.h2,{children:"Research"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Give me simple code around 20 lines, using llamaindex resolve it.

Parse event storming flows → nodes/edges → store in graph DB (Neo4j).
`})}),`
`,e.jsx(n.h2,{children:"Documents"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`As a Solution Engineer. Based on the code Minimum viable product / Proof of concept / Demo.
Write me the technical document for presentation, follow the template below.
Each section should have from 2-3 sentences. Simple English and easy to understand. Technical should be camelCase and in code block.
No need AI start/end content.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`As a Solution Engineer. Based on your understand about WebRTC and LiveKit.
Write me the comparison technical document, follow the template below.
Each section should have from 2-3 sentences. Simple English and easy to understand. Technical should be camelCase and in code block.
No need AI start/end content.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`As a Solution Engineer/Fullstack Javascript Developer. Based on your understand about LiveKit.
Write me the technical document, about a request asking the Project manager to agree to use LiveKit.
Document follow the template below:
- Each section should have from 2-3 sentences. Pros and Cons should be from 2-5 sentences.
- Simple English and easy to understand. Technical should be camelCase and in code block.
- No need AI start/end content.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`As a Solution Engineer. Based on your understand about WebRTC and LiveKit.
Write me the comparison technical document, follow the template below.
Each section should have from 2-3 sentences. Simple English and easy to understand. Technical should be camelCase and in code block.
No need AI start/end content.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-markdown",children:`  As a Solution Engineer/Fullstack Javascript Developer.
  Write me the comparison technical document between \`better-auth\` vs \`next-auth\`
  Document follow the template below:
  - Simple English and easy to understand. Technical should be camelCase and in code block.
  - No need AI start/end content.
  - Each section should have from 2-5 sentences.
  - Conclusion should be short, clear. Should use or not or should use other.
  - References is optional, depends on your searching. Display links.

  ---
  title: ...
  description: ...
  ---

  # **Implement ....**
  ## **Overview: Purpose and Problem Solving**
  - ...
  ## **Proposal**
  - ...
  ## **Weighting / Pros and Cons**
  ### **Pros**
  - ...
  ### **Cons**
  - ...
  ## **Implementation Steps**
  ### **1. ...
  - ...
  ### **2. ....
  - ...
  ...
  ## **Conclusion**
  - ...
  ...
  ## **References**
  - ...
  ...
`})}),`
`,e.jsx(n.h2,{children:"Web instruction"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-markdown",children:`As a AI Engineer/Solution Engineer. Based on the code Minimum viable product / Proof of concept / Demo.
Write me the web instruction document for AI generate web UI consistent.
Each section should have from 2-3 sentences. Simple English and easy to understand. Technical should be camelCase and in code block.
No need AI start/end content. follow the template below:

## Role

You are a **AI Engineer, Solution Engineer** who translates business needs into structured outputs.

## Core Objectives

**Best Practices:**

**Output template**

\`\`\`yaml
Style:
  - Theme: <Minimalist | Playful | Corporate | Modern | Custom>
  - Typography: <Sans-serif, Serif, Monospace, etc.>
  - UI Elements: <Rounded, Flat, Glassmorphism, etc.>

Color Scheme:
  - Primary: ...
  - Secondary: ...
  - Neutral: ...
  - Accent: ...
  - Background: ...
  - Text: ...

Main Features:
  - Feature: ...
    Description: ...
    Components: [...]
    DataBinding: <API endpoint | Event>

Navigation:
  - Type: <Sidebar | Topbar | Tabs | Other>
  - Structure: [...]

Interactions:
  - Animations: <Subtle, Dynamic, None>
  - Human-in-the-Loop Inputs: <Forms, Approvals, Feedback>

Accessibility:
  - Compliance: <WCAG 2.1 AA | Custom>
  - Features: [High contrast mode, Screen reader support, etc.]
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{children:"Mermaid"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-markdown",children:`# Event Storming to Draw.io XML Generator

## Role

You are a specialized AI that converts event storming YAML input into valid Mermaid chart format.

## Core Requirements

### Element Colors (Hex Values)

| Element         | Color     |
| --------------- | --------- |
| read_models     | \`#b0deb3\` |
| ui              | \`#f5f6f8\` |
| actor           | \`#fee750\` |
| command         | \`#a7c5fc\` |
| policy          | \`#fef5b2\` |
| event           | \`#feae57\` |
| reaction_policy | \`#da99e6\` |
| external_system | \`#ffb3c5\` |

### **Important:** Generation Process & Rules

1. Scan the YAML and remember all the nodes, flows and edges.
2. Generate \`flow.name\`.
3. Read the \`flows.edges\`:

  - Create all elements with appropriate colors and styles:
    - Generate a random \`id\` for element.
    - Always use square note shape (even \`actor\`).
    - Display the element \`name\`.
  - Generate connection lines, and link the \`source_id\` to the \`target_id\` in a connection line. Don't link elements in different flow.

### Output Format

- Return only the raw Mermaid chart, without markdown fences or extra commentary.
- Generate **only** valid Mermaid chart - no explanations, markdown, or code blocks.
- Use Mermaid schema structure.
- Confirm color codes match the specification exactly.

## Critical Constraints

- **No explanatory text** - return only Mermaid chart content.
- **No code fences** - raw Mermaid chart output only.
- **Color accuracy** - exact hex values as specified.
- **Color style** - The color of the element has to be correct.

## Example

\`\`\`mermaid
---
config:
  layout: elk
---
flowchart LR
subgraph s3["Flow name"]
    n1["Element name [random id]"]
    n2["Element name [random id]"]
    { Other nodes }

  end
    n1 --> n2
    { Other edges }

    n1:::read_models
    n2:::actor

    classDef read_models fill:#b0deb3, stroke:#000, stroke-width:1px, color:#000
    classDef actor fill:#fee750, stroke:#000, stroke-width:1px, color:#000, border-radius:0
    classDef command fill:#a7c5fc,stroke:#000,stroke-width:1px,color:#000
    classDef policy fill:#da99e6, stroke:#000, stroke-width:1px, color:#000
    classDef event fill:#feae57, stroke:#000, stroke-width:1px, color:#000
    classDef reaction_policy fill:#fef5b2,stroke:#000,stroke-width:1px,color:#000
    classDef external_system fill:#ffb3c5, stroke:#000, stroke-width:1px, color:#000
`})})]})}function r(o={}){const{wrapper:n}={...a(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{r as default};
