import{u as i,j as n}from"./index-DNpcHpGe.js";const l={title:"PayPal and Stripe transaction",description:"Implement PayPal and Stripe transaction for woocommerce"};function t(s){const e={a:"a",code:"code",div:"div",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...i(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h2,{id:"implementation-steps",children:["Implementation Steps",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#implementation-steps",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.p,{children:["Got it 👍 Since you can’t render Mermaid, here’s your flowchart rewritten as ",n.jsx(e.strong,{children:"plain Markdown text"})," with indentation to show the structure:"]}),`
`,n.jsxs(e.h3,{id:"payment-flow",children:["Payment Flow",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#payment-flow",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"API Route"}),": ",n.jsx(e.code,{children:"/api/payment"})]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.strong,{children:"Process Payment Request"}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.strong,{children:"Choose Payment Provider"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Stripe → Call ",n.jsx(e.strong,{children:"Stripe API"})]}),`
`,n.jsxs(e.li,{children:["PayPal → Call ",n.jsx(e.strong,{children:"PayPal API"})]}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.strong,{children:"Save Transaction to DB"}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Return Payment Result"})," → back to ",n.jsx(e.strong,{children:"Client"})]}),`
`]}),`
`]}),`
`,n.jsxs(e.h3,{id:"payout-flow",children:["Payout Flow",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#payout-flow",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"API Route"}),": ",n.jsx(e.code,{children:"/api/payout"})]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.strong,{children:"Validate Payout Request"}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.strong,{children:"Call PayPal Payout API"}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.strong,{children:"Save Payout to DB"}),`
`]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Return Payout Result"})," → back to ",n.jsx(e.strong,{children:"Client"})]}),`
`]}),`
`,n.jsxs(e.h3,{id:"database-db",children:["Database (DB)",n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#database-db",children:n.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.strong,{children:"User"}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.strong,{children:"Payment method"}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.strong,{children:"Transaction"}),`
`]}),`
`]})]})}function a(s={}){const{wrapper:e}={...i(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(t,{...s})}):t(s)}export{a as default,l as frontmatter};
