import{u as r,j as n}from"./index-QxudILHE.js";function i(s){const e={a:"a",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:n.jsx(e.strong,{children:"3000 mails free per month for woocommerce with resend.com"})}),`
`,n.jsx(e.h2,{children:n.jsx(e.strong,{children:"Overview the purpose, the problem it is solving"})}),`
`,n.jsx(e.p,{children:"For SME woocommerce, we need to send email to customer/shop admin, when woocommerce order/invoice/account are changed."}),`
`,n.jsx(e.h2,{children:n.jsx(e.strong,{children:"Proposal"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"On resend.com, Register resend.com account, verify domain, create API key"}),`
`,n.jsx(e.li,{children:"On wordpress website, install and configure Mail SMTP Plugin, manage Woocommerce email settings"}),`
`]}),`
`,n.jsx(e.h2,{children:n.jsx(e.strong,{children:"Weighting / Pros and cons"})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Pros"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Free 3000 mails per month"}),`
`,n.jsx(e.li,{children:"Not spam mail"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Cons"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Resend free account allows creating only 1 domains, it should be your domain or company's domain"}),`
`]}),`
`,n.jsx(e.h2,{children:n.jsx(e.strong,{children:"Implementation steps"})}),`
`,n.jsx(e.h3,{children:"Register a Resend service account"}),`
`,n.jsxs(e.p,{children:["go to: ",n.jsx(e.a,{href:"https://resend.com",children:"https://resend.com"})]}),`
`,n.jsx(e.h3,{children:"Create Resend API key"}),`
`,n.jsxs(e.p,{children:["go to: ",n.jsx(e.a,{href:"https://resend.com/api-keys",children:"https://resend.com/api-keys"})]}),`
`,n.jsx("img",{src:"woocommerce-resend/resend-create-API-key.png",alt:"resend-create-API-key",width:"600"}),`
`,n.jsx(e.h3,{children:"Register domain"}),`
`,n.jsxs(e.p,{children:["go to: ",n.jsx(e.a,{href:"https://resend.com/domains",children:"https://resend.com/domains"})]}),`
`,n.jsx("img",{src:"woocommerce-resend/resend-domain-detail.png",alt:"resend-domain-detail",width:"600"}),`
`,n.jsx(e.h3,{children:"Download WordPress Mail SMTP Plugin"}),`
`,n.jsx(e.p,{children:n.jsx(e.a,{href:"https://vi.wordpress.org/plugins/wp-mail-smtp/",children:"https://vi.wordpress.org/plugins/wp-mail-smtp/"})}),`
`,n.jsx(e.h3,{children:"Install Mail SMTP Plugin"}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Login into your wordpress admin"})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Install plugin in admin site"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"On the left menu:"})," Plugins -> Add New Plugin -> Upload plugin"]}),`
`,n.jsx(e.li,{children:"Select plugin downloaded from step 1 -> Install now"}),`
`]}),`
`,n.jsx("img",{src:"woocommerce-resend/wp-install-plugin.png",alt:"wp-install-plugin",width:"600"}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Update Mail SMPT config"})}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:["When install plugin successfully, on the left menu will display item ",n.jsx(e.em,{children:"WP Mail SMTP"})]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:"Update to these configs"}),`
`]}),`
`]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"License Key:"})," Free version, empty value"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"From Email:"})," Must have domain is registerd on resend.com/domains, exp: ",n.jsx(e.a,{href:"mailto:admin@quochuy.dev",children:"admin@quochuy.dev"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"From Name:"})," (can be your branding or your website)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Force From Name:"})," default false"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Return Path:"})," default false"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Mailer:"})," Other SMTP"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"SMTP Host:"})," smtp.resend.com"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Encryption:"})," TLS"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"SMTP Port:"})," 587"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Authentication:"})," On"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"SMTP Username:"})," resend"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"SMTP Password:"})," (value is from API key created on Resend)"]}),`
`]}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsxs(e.li,{children:["Click ",n.jsx(e.em,{children:"Save settings"})]}),`
`]}),`
`,n.jsx("img",{src:"woocommerce-resend/wp-update-smtp-config.png",alt:"wp-update-smtp-config",width:"600"}),`
`,n.jsx(e.h3,{children:"Define email notifications"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"On the left menu: WooCommerce -> Settings -> Emails"}),`
`,n.jsx(e.li,{children:"Manage Email notifications"}),`
`,n.jsxs(e.li,{children:["Click ",n.jsx(e.em,{children:"Save changes"})]}),`
`]}),`
`,n.jsx("img",{src:"woocommerce-resend/woocommerce-setting-mail-1.png",alt:"woocommerce-setting-mail",width:"600"}),`
`,n.jsx("img",{src:"woocommerce-resend/woocommerce-setting-mail-2.png",alt:"woocommerce-setting-mail",width:"600"}),`
`,n.jsx(e.h3,{children:"Testing"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"On woocommerce website, add to cart products then checkout order"}),`
`,n.jsx(e.li,{children:"Check admin gmail"}),`
`]}),`
`,n.jsx("img",{src:"woocommerce-resend/mail-template.png",alt:"mail-template",width:"600"})]})}function o(s={}){const{wrapper:e}={...r(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{o as default};
