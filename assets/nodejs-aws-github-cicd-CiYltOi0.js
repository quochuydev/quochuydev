import{u as r,j as e}from"./index-_l4awBIy.js";function t(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"Node.js x AWS x Github Action"}),`
`,e.jsx(n.h2,{children:"Node.js backend application"}),`
`,e.jsx(n.h3,{children:"Codebase structure"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`├── __tests__
│ ├── api.v1.user.create.fixture.ts
│ ├── api.v1.user.create.spec.ts
├── apis
│ ├── api.v1.user.create.ts
├── core
│ ├── server.ts
│ ├── types.ts
│ ├── postgres-service.ts
├── types
│ ├── api.v1.user.ts
├── main.ts
`})}),`
`,e.jsx(n.h3,{children:"Testing APIs"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-sh",children:`curl -X POST http://localhost:3004/api/api.v1.user.create -H "Content-Type: application/json" -d '{"name":"name" }'

curl -X POST http://localhost:3004/api/api.v1.user.getList -H "Content-Type: application/json" -d '{"q":"name"}'
`})}),`
`,e.jsx(n.h2,{children:"Setup AWS services"}),`
`,e.jsx(n.h4,{children:"Create a new EC2 instance"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Application and OS Images:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ubuntu Server 24.04 LTS (HVM), SSD Volume Type"}),`
`,e.jsx(n.li,{children:"Architecture: 64-bit (x86)"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Allow HTTPS traffic from the internet: true"}),`
`,e.jsx(n.li,{children:"Allow HTTP traffic from the internet: true"}),`
`]}),`
`,e.jsx(n.h4,{children:"Install Docker"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-sh",children:`sudo apt-get update && sudo apt-get install docker.io -y && sudo systemctl start docker && sudo chmod 666 /var/run/docker.sock &&sudo systemctl enable docker

docker --version
`})}),`
`,e.jsx(n.h3,{children:"Setup github runner in EC2 instance"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners#adding-a-self-hosted-runner-to-a-repository",children:"https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners#adding-a-self-hosted-runner-to-a-repository"})}),`
`,e.jsx(n.h4,{children:"Build and push docker image"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-sh",children:`docker build -t quochuydev/myapp-backend .

docker push quochuydev/myapp-backend:latest
`})})]})}function c(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{c as default};
