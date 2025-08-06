import{u as l,j as s}from"./index-BDA9Jfbt.js";const r={title:"PayPal and Stripe transaction",description:"Implement PayPal and Stripe transaction for woocommerce"};function a(e){const n={a:"a",code:"code",div:"div",h2:"h2",pre:"pre",span:"span",...l(),...e.components};return s.jsxs(s.Fragment,{children:[s.jsxs(n.h2,{id:"implementation-steps",children:["Implementation Steps",s.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#implementation-steps",children:s.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(s.Fragment,{children:s.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:s.jsxs(n.code,{children:[s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"flowchart TD"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    subgraph Client"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        A[User submits payment request]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    end"})}),`
`,s.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    subgraph Backend (Node.js)"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        B[API Route: /api/payment]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        C[Process Payment Request]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        D{Choose Payment Provider}"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        E1[Call Stripe API]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        E2[Call PayPal API]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        F[Save Transaction to DB]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        G[Return Payment Result]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        H[API Route: /api/payout]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        I[Validate Payout Request]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        J[Call PayPal Payout API]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        K[Save Payout to DB]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        L[Return Payout Result]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    end"})}),`
`,s.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    subgraph DB"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        M[Transaction Table]"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    end"})}),`
`,s.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    A --> B"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    B --> C"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    C --> D"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    D -- Stripe --> E1"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    D -- PayPal --> E2"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    E1 --> F"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    E2 --> F"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    F --> M"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    M --> G"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    G --> A"})}),`
`,s.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    A --> H"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    H --> I"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    I --> J"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    J --> K"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    K --> M"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    M --> L"})}),`
`,s.jsx(n.span,{className:"line",children:s.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    L --> A"})})]})})})]})}function c(e={}){const{wrapper:n}={...l(),...e.components};return n?s.jsx(n,{...e,children:s.jsx(a,{...e})}):a(e)}export{c as default,r as frontmatter};
