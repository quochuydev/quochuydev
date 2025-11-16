import{u as r,j as e}from"./index-Biz2SnAx.js";function t(n){const a={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a.h1,{children:"Event Storming with Mermaid"}),`
`,e.jsx(a.p,{children:"This page demonstrates how to use Mermaid diagrams in your blog posts."}),`
`,e.jsx(a.h2,{children:"Sequence Diagram Example"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-mermaid",children:`sequenceDiagram
    participant User
    participant CartCommand as UpdateCartCommand
    participant CartEvent as CartUpdatedEvent
    participant ReadModel as CartItemsReadModel
    participant Policy as CartAccessPolicy
    participant External as CartExternalSystem

    User->>CartCommand: Update cart
    CartCommand->>CartEvent: Emit event
    CartEvent->>ReadModel: Update read model
    ReadModel->>Policy: Check access
    Policy->>External: Sync with external system
    External-->>User: Confirmation
`})}),`
`,e.jsx(a.h2,{children:"Flowchart Example"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-mermaid",children:`graph TD
    A[UpdateCartCommand] -->|triggers| B[CartUpdatedEvent]
    B --> C[CartItemsReadModel]
    C --> D[CartAccessPolicy]
    D --> E[CartExternalSystem]
    E --> F[CartSubProcess]
`})}),`
`,e.jsx(a.h2,{children:"State Diagram Example"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-mermaid",children:`stateDiagram-v2
    [*] --> CartEmpty
    CartEmpty --> CartUpdated: Add Item
    CartUpdated --> CartAccessCheck: Apply Policy
    CartAccessCheck --> ExternalSync: Validate
    ExternalSync --> [*]: Complete
`})})]})}function c(n={}){const{wrapper:a}={...r(),...n.components};return a?e.jsx(a,{...n,children:e.jsx(t,{...n})}):t(n)}export{c as default};
