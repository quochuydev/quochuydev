import{u as s,j as e}from"./index-YOFkxIrC.js";const r={title:"Zitadel and LemonLDAP (SAML) integration",description:"undefined"};function d(i){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"zitadel-and-lemonldap-saml-integration",children:["Zitadel and LemonLDAP (SAML) integration",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#zitadel-and-lemonldap-saml-integration",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"overview",children:["Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"This document describes the integration of Zitadel with LemonLDAP. It covers the following topics:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Setting up LemonLDAP"}),`
`,e.jsx(n.li,{children:"Configuring Zitadel"}),`
`,e.jsx(n.li,{children:"Testing the integration"}),`
`]}),`
`,e.jsxs(n.h2,{id:"implementation-steps",children:["Implementation Steps",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#implementation-steps",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"setting-up-zitadel",children:["Setting up ZITADEL",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setting-up-zitadel",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"https://zitadel.com/docs/self-hosting/deploy/compose#docker-compose",children:"https://zitadel.com/docs/self-hosting/deploy/compose#docker-compose"})}),`
`,e.jsxs(n.h3,{id:"setting-up-lemonldap",children:["Setting up LemonLDAP",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setting-up-lemonldap",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -d"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -p"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" 80:80"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" coudot/lemonldap-ng"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" lemonldap"})]})})}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"General Parameters > Cookies > Unsecured & Strict"})}),`
`,e.jsxs(n.h3,{id:"setup-saml-for-lemonldap",children:["Setup SAML for LemonLDAP",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setup-saml-for-lemonldap",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"SAML2 Service > Security parameters > Signature"})}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"General Parameters > Issuer modules > SAML"})}),`
`,e.jsxs(n.h3,{id:"configuring-zitadel",children:["Configuring Zitadel",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configuring-zitadel",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Current ZITADEL version v2.59.0"}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"In ZITADEL console, Create a SAML IDP"}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Settings > Identity Providers > SAML"})}),`
`,e.jsxs(n.p,{children:["Name: ",e.jsx(n.code,{children:"LemonLDAP"})]}),`
`,e.jsx(n.p,{children:"Metadata Xml: Base64 encoded metadata"}),`
`,e.jsxs(n.p,{children:["Binding: ",e.jsx(n.code,{children:"SAML_BINDING_POST"})]}),`
`,e.jsxs(n.p,{children:["Signed Request: ",e.jsx(n.code,{children:"Yes"})]}),`
`,e.jsxs(n.p,{children:["NameID Format: ",e.jsx(n.code,{children:"SAML_NAME_ID_FORMAT_EMAIL_ADDRESS"})]}),`
`,e.jsxs(n.p,{children:["Automatic creation: ",e.jsx(n.code,{children:"false"})]}),`
`,e.jsxs(n.p,{children:["Automatic creation: ",e.jsx(n.code,{children:"false"})]}),`
`,e.jsxs(n.p,{children:["Automatic update: ",e.jsx(n.code,{children:"false"})]}),`
`,e.jsxs(n.p,{children:["Account creation allowed (manually): ",e.jsx(n.code,{children:"false"})]}),`
`,e.jsxs(n.p,{children:["Account linking allowed (manually): ",e.jsx(n.code,{children:"false"})]}),`
`,e.jsxs(n.p,{children:["Determines whether an identity will be prompted to be linked to an existing account: ",e.jsx(n.code,{children:"Disabled"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["After created, we get ",e.jsx(n.code,{children:"idpId"})]}),`
`]}),`
`,e.jsxs(n.h3,{id:"in-lemonldap-management-setup-a-saml-service-provider",children:["In LemonLDAP Management, Setup a SAML Service Provider",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#in-lemonldap-management-setup-a-saml-service-provider",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"SAML Service Providers > Add SAML IDP > MyApplication"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"MyApplication > Metadata"}),":"]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"http://localhost:8080/idps/%7BidpId%7D/saml/metadata",children:"http://localhost:8080/idps/{idpId}/saml/metadata"})}),`
`,e.jsxs(n.h3,{id:"testing-the-integration",children:["Testing the Integration",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#testing-the-integration",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})]})}function a(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}export{a as default,r as frontmatter};
