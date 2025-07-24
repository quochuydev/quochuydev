import{u as r,j as e}from"./index-Q38D4-u8.js";const d={title:"Configure LemonLDAP as an Identity Provider in ZITADEL",sidebar_label:"LemonLDAP"};function s(i){const n={a:"a",code:"code",div:"div",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"This guides shows you how to connect LemonLDAP as an identity provider in ZITADEL."}),`
`,e.jsx(n.p,{children:"You can configure two types of SAML SSO on LemonLDAP:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#lemonldap-saml",children:"LemonLDAP SAML"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#lemonldap-oidc",children:"LemonLDAP OIDC"})}),`
`]}),`
`,e.jsxs(n.h2,{id:"lemonldap-saml---zitadel-as-service-provider",children:["LemonLDAP SAML - ZITADEL as Service provider",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#lemonldap-saml---zitadel-as-service-provider",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"configure-saml-on-lemonldap",children:["Configure SAML on LemonLDAP",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configure-saml-on-lemonldap",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Setting up LemonLDAP"}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -d"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --name"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" lemonldap"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -p"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" 80:80"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --network"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" zitadel"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" coudot/lemonldap-ng"})]})})}),`
`,e.jsx(n.p,{children:"Setup SAML for LemonLDAP"}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"SAML2 Service > Security parameters > Signature > New certificate > Save"})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/1.png",alt:"alt"})}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"General Parameters > Issuer modules > SAML > Activation: On"})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/2.png",alt:"alt"})}),`
`,e.jsxs(n.p,{children:["Download and Encode Base64 metadata (",e.jsx(n.a,{href:"https://www.base64encode.org/",children:"https://www.base64encode.org/"}),")"]}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsx(n.span,{className:"line",children:e.jsx(n.span,{children:"http://auth.example.com/saml/metadata"})})})}),`
`,e.jsx(n.p,{children:e.jsxs(n.em,{children:["Fixing for error: ",e.jsx(n.code,{children:"An error occured during SAML single sign on"})]})}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"General Parameters > Cookies > Unsecured & Strict"})}),`
`,e.jsxs(n.h3,{id:"configure-idenity-provider-in-zitadel",children:["Configure Idenity Provider in ZITADEL",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configure-idenity-provider-in-zitadel",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.strong,{children:"Setting up ZITADEL"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"https://zitadel.com/docs/self-hosting/deploy/compose#docker-compose",children:"https://zitadel.com/docs/self-hosting/deploy/compose#docker-compose"})}),`
`,e.jsxs(n.p,{children:["ZITADEL running in docker network ",e.jsx(n.code,{children:"zitadel"})]}),`
`,e.jsx(n.p,{children:"Checking compose file:"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"https://github.com/quochuydev/quochuydev/blob/master/researching/zitadel/README.md",children:"https://github.com/quochuydev/quochuydev/blob/master/researching/zitadel/README.md"})}),`
`,e.jsx(n.strong,{children:"Create a SAML IDP in ZITADEL"}),`
`,e.jsx(n.p,{children:"For example I am setuping up at ZITADEL instance level"}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Settings > Identity Providers > SAML"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Name"}),": ",e.jsx(n.code,{children:"LemonLDAP SAML"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Metadata Xml"}),": Base64 encoded metadata"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Binding"}),": ",e.jsx(n.code,{children:"SAML_BINDING_POST"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Signed Request"}),": ",e.jsx(n.code,{children:"Yes"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"NameID Format"}),": ",e.jsx(n.code,{children:"SAML_NAME_ID_FORMAT_EMAIL_ADDRESS"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Automatic creation"}),": ",e.jsx(n.code,{children:"false"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Automatic creation"}),": ",e.jsx(n.code,{children:"false"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Automatic update"}),": ",e.jsx(n.code,{children:"false"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Account creation allowed (manually)"}),": ",e.jsx(n.code,{children:"false"})," or ",e.jsx(n.code,{children:"true"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Account linking allowed (manually)"}),": ",e.jsx(n.code,{children:"false"})," or ",e.jsx(n.code,{children:"true"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Determines whether an identity will be prompted to be linked to an existing account"}),": ",e.jsx(n.code,{children:"Disabled"})]}),`
`]}),`
`,e.jsx(n.strong,{children:"Download ZITADEL metadata"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/3.png",alt:"alt"})}),`
`,e.jsxs(n.h3,{id:"setup-a-saml-service-provider",children:["Setup a SAML Service Provider",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setup-a-saml-service-provider",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"SAML Service Providers > Add SAML IDP > MyApplication"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"MyApplication > Metadata"}),": use IDP metadata from step above"]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/4.png",alt:"alt"})}),`
`,e.jsxs(n.h3,{id:"testing",children:["Testing",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#testing",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Open other browser with url ",e.jsx(n.code,{children:"http://localhost:8080/ui/console/"}),", select login with ",e.jsx(n.code,{children:"LemonLDAP SAML"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/5.png",alt:"alt"})}),`
`,e.jsxs(n.p,{children:["ZITADEL redirect to LemonLDAP login page, using one of the testing accounts from: ",e.jsx(n.a,{href:"https://lemonldap-ng.org/documentation/2.0/authdemo.html#presentation",children:"https://lemonldap-ng.org/documentation/2.0/authdemo.html#presentation"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/6.png",alt:"alt"})}),`
`,e.jsx(n.p,{children:"Login successfully, you will be redirected to ZITADEL register form. Completed authentication flow with LemonLDAP SAML."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/7.png",alt:"alt"})}),`
`,e.jsxs(n.h2,{id:"lemonldap-oidc---zitadel-as-service-provider",children:["LemonLDAP OIDC - ZITADEL as Service provider",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#lemonldap-oidc---zitadel-as-service-provider",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"configure-oidc-on-lemonldap",children:["Configure OIDC on LemonLDAP",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configure-oidc-on-lemonldap",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"General Parameters > Issuer modules > OpenID Connect"})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/8.png",alt:"alt"})}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"OpenID Connect Service > Security > Keys > Signature keys > New certificate > Save"})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/9.png",alt:"alt"})}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"OpenID Connect Relying Parties > Add OpenID Connect Relying Party > rp-example > Basic"})}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"OpenID Connect Relying Parties > rp-example > Basic"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Client ID:"})," Generate a random string, exp: ",e.jsx(n.code,{children:"clientId"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Client secret:"})," Generate a random string, exp: ",e.jsx(n.code,{children:"clientSecret"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Allowed redirection addresses for login:"})," ",e.jsx(n.a,{href:"http://localhost:8080/ui/login/login/externalidp/callback",children:"http://localhost:8080/ui/login/login/externalidp/callback"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Token endpoint authentication method:"})," ",e.jsx(n.code,{children:"client_secret_post"})]}),`
`]}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" inspect"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -f"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" lemonldap_container_name"})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" exec"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -i"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" zitadel_container_name"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" sh"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -c"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:` "echo 'IP_address auth.example.com' >> /etc/hosts"`})]})]})}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" inspect"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -f"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" lemonldap"})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" exec"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -i"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" zitadel_test"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" sh"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -c"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:` "echo '172.23.0.4 auth.example.com' >> /etc/hosts"`})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" exec"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -i"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" zitadel_test"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" sh"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -c"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:' "cat /etc/hosts"'})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" exec"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -i"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" zitadel_test"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" sh"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -c"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:' "curl http://auth.example.com/.well-known/openid-configuration"'})]})]})}),`
`,e.jsxs(n.h3,{id:"configure-lemonldap-oidc-idenity-provider-in-zitadel",children:["Configure LemonLDAP OIDC Idenity Provider in ZITADEL",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configure-lemonldap-oidc-idenity-provider-in-zitadel",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Settings > Identity Providers > Generic OIDC"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Name"}),": ",e.jsx(n.code,{children:"LemonLDAP OIDC"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issuer"}),": ",e.jsx(n.code,{children:"http://auth.example.com/"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Client ID"}),": ",e.jsx(n.code,{children:"clientId"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Client Secret"}),": ",e.jsx(n.code,{children:"clientSecret"})]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/10.png",alt:"alt"})}),`
`,e.jsxs(n.h3,{id:"testing-1",children:["Testing",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#testing-1",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Open other browser with url ",e.jsx(n.code,{children:"http://localhost:8080/ui/console/"}),", select login with ",e.jsx(n.code,{children:"LemonLDAP OIDC"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/11.png",alt:"alt"})}),`
`,e.jsxs(n.p,{children:["ZITADEL redirect to LemonLDAP login page, using one of the testing accounts from: ",e.jsx(n.a,{href:"https://lemonldap-ng.org/documentation/2.0/authdemo.html#presentation",children:"https://lemonldap-ng.org/documentation/2.0/authdemo.html#presentation"})]}),`
`,e.jsx(n.p,{children:"Confirm authorization request."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/12.png",alt:"alt"})}),`
`,e.jsx(n.p,{children:"Login successfully, you will be redirected to ZITADEL register form. Completed authentication flow with LemonLDAP SAML."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/lemonldap/13.png",alt:"alt"})}),`
`,e.jsxs(n.h2,{id:"referrences",children:["Referrences",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#referrences",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://lemonldap-ng.org/documentation/2.0/docker.html",children:"https://lemonldap-ng.org/documentation/2.0/docker.html"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://lemonldap-ng.org/documentation/latest/authopenidconnect.html",children:"https://lemonldap-ng.org/documentation/latest/authopenidconnect.html"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://lemonldap-ng.org/documentation/3.0/openidconnectservice.html",children:"https://lemonldap-ng.org/documentation/3.0/openidconnectservice.html"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://lemonldap-ng.org/documentation/2.0/authdemo.html",children:"https://lemonldap-ng.org/documentation/2.0/authdemo.html"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://lemonldap-ng.org/documentation/latest/webserviceprotection.html",children:"https://lemonldap-ng.org/documentation/latest/webserviceprotection.html"})}),`
`]})]})}function c(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{c as default,d as frontmatter};
