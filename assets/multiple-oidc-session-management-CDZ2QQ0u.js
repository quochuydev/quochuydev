import{u as s,j as e}from"./index-DeogMZcw.js";const o={title:"Multi-OIDC Session Management  Application",description:"undefined"};function t(i){const n={a:"a",br:"br",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"multi-oidc-session-management--application",children:["Multi-OIDC Session Management  Application",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#multi-oidc-session-management--application",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"Managing multiple OpenID Connect (OIDC) sessions across different applications can be complex. Inspired by the NextAuth framework, this open-source project provides a robust solution for handling multi-OIDC sessions efficiently. This blog walks you through the benefits, implementation steps, and references for getting started with this powerful authentication framework."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"outcome-and-benefit",children:["Outcome and Benefit",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#outcome-and-benefit",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"centralized-session-management",children:["Centralized Session Management",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#centralized-session-management",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The primary outcome of this project is a centralized authentication system that efficiently manages multiple OIDC sessions across different applications. By centralizing session management, you gain:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Consistent User Experience"}),": Users can seamlessly switch between multiple applications (",e.jsx(n.code,{children:"app.example.local/app1"}),", ",e.jsx(n.code,{children:"app.example.local/app2"}),") without needing to re-authenticate."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Simplified Integration"}),": With a shared authentication service (",e.jsx(n.code,{children:"auth.example.local"}),"), integrating new applications into your ecosystem becomes much easier and less error-prone."]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"implementation-steps",children:["Implementation Steps",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#implementation-steps",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"1-set-up-the-repository",children:["1. Set Up the Repository",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-set-up-the-repository",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Clone the GitHub repository and explore the three core applications:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:e.jsx(n.code,{children:"app.example.local/app1"})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:e.jsx(n.code,{children:"app.example.local/app2"})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:e.jsx(n.code,{children:"auth.example.local"})}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"Each of these applications is designed to work together to provide a seamless authentication experience across different domains."}),`
`,e.jsxs(n.h3,{id:"2-configure-the-auth-service-authexamplelocal",children:["2. Configure the Auth Service (",e.jsx(n.code,{children:"auth.example.local"}),")",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-configure-the-auth-service-authexamplelocal",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"auth.example.local"})," application acts as the central authentication hub. Here’s how to set it up:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"OIDC Configuration"}),": Configure your OIDC providers (like Google, Facebook, etc.) within the ",e.jsx(n.code,{children:"auth.example.local"})," application. This includes setting up client IDs, secrets, and redirect URIs."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Session Management"}),": Implement session handling logic that supports multiple active sessions per user, allowing seamless switching between applications."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"3-integrate-with-application-1-appexamplelocalapp1",children:["3. Integrate with Application 1 (",e.jsx(n.code,{children:"app.example.local/app1"}),")",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-integrate-with-application-1-appexamplelocalapp1",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"OIDC Client Setup"}),": In ",e.jsx(n.code,{children:"app.example.local/app1"}),", set up the OIDC client to interact with the ",e.jsx(n.code,{children:"auth.example.local"})," service."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Session Handling"}),": Ensure that ",e.jsx(n.code,{children:"app.example.local/app1"})," correctly handles session tokens received from the authentication service. Store and manage these tokens securely."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"4-integrate-with-application-2-appexamplelocalapp2",children:["4. Integrate with Application 2 (",e.jsx(n.code,{children:"app.example.local/app2"}),")",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-integrate-with-application-2-appexamplelocalapp2",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Repeat the Process"}),": Just like in ",e.jsx(n.code,{children:"app.example.local/app1"}),", set up the OIDC client in ",e.jsx(n.code,{children:"app.example.local/app2"}),". Ensure seamless session management between ",e.jsx(n.code,{children:"app.example.local/app2"})," and the central ",e.jsx(n.code,{children:"auth.example.local"}),"."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"5-test-across-applications",children:["5. Test Across Applications",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#5-test-across-applications",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cross-Application Testing"}),": Test user logins and session management across ",e.jsx(n.code,{children:"app.example.local/app1"})," and ",e.jsx(n.code,{children:"app.example.local/app2"}),". Ensure that sessions persist and that users can switch between applications without re-authentication."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Security Audits"}),": Conduct thorough security testing to ensure that session tokens are handled securely and that no vulnerabilities exist in cross-application session management."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"authentication.drawio.png",alt:"authentication.drawio.png"})}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"references",children:["References",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#references",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"NextAuth.js Documentation"}),": ",e.jsx(n.a,{href:"https://next-auth.js.org/getting-started/introduction",children:"https://next-auth.js.org/getting-started/introduction"}),e.jsx(n.br,{}),`
`,"A comprehensive guide to understanding the concepts behind NextAuth, which inspired this project."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"OpenID Connect Endpoints in ZITADEL"}),": ",e.jsx(n.a,{href:"https://zitadel.com/docs/apis/openidoauth/endpoints",children:"https://zitadel.com/docs/apis/openidoauth/endpoints"})]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"PKCE - Recommendation for authorization flow"}),": ",e.jsx(n.a,{href:"https://zitadel.com/docs/guides/integrate/login/oidc/oauth-recommended-flows#our-recommended-authorization-flows",children:"https://zitadel.com/docs/guides/integrate/login/oidc/oauth-recommended-flows#our-recommended-authorization-flows"})]}),`
`]}),`
`]})]})}function r(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{r as default,o as frontmatter};
