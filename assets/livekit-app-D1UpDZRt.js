import{u as t,j as e}from"./index-CW6H0YUl.js";const s={title:"Proposal to Use LiveKit for Real-Time Communication",description:"Requesting approval to integrate LiveKit for video, audio, and data streaming in our application."};function r(i){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"implement-livekit-for-real-time-communication",children:[e.jsx(n.strong,{children:"Implement LiveKit for Real-Time Communication"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#implement-livekit-for-real-time-communication",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"overview-purpose-and-problem-solving",children:[e.jsx(n.strong,{children:"Overview: Purpose and Problem Solving"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview-purpose-and-problem-solving",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Our project requires stable realTimeVideo and realTimeAudio features to support collaboration between users."}),`
`,e.jsx(n.li,{children:"Building a custom webrtcServer is complex and time-consuming, while LiveKit provides tested sdkTools and serverInfra ready to use."}),`
`]}),`
`,e.jsxs(n.h2,{id:"proposal",children:[e.jsx(n.strong,{children:"Proposal"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#proposal",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use LiveKit as the communication platform for videoCall, audioCall, and screenShare."}),`
`,e.jsxs(n.li,{children:["Connect frontend with ",e.jsx(n.code,{children:"livekitClient"})," and backend with token generation endpoint ",e.jsx(n.code,{children:"getAccessToken"}),"."]}),`
`]}),`
`,e.jsxs(n.h2,{id:"weighting--pros-and-cons",children:[e.jsx(n.strong,{children:"Weighting / Pros and Cons"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#weighting--pros-and-cons",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"pros",children:[e.jsx(n.strong,{children:"Pros"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#pros",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"LiveKit is scalable and supports adaptiveStream and dynacast, which reduce bandwidth usage."}),`
`,e.jsxs(n.li,{children:["Provides React components like ",e.jsx(n.code,{children:"GridLayout"}),", ",e.jsx(n.code,{children:"ParticipantTile"}),", and ",e.jsx(n.code,{children:"ControlBar"})," to build UI faster."]}),`
`,e.jsx(n.li,{children:"Security is built-in using signed accessToken with roomName and participantIdentity."}),`
`,e.jsx(n.li,{children:"Reduces development time compared to building and maintaining our own signaling system."}),`
`]}),`
`,e.jsxs(n.h3,{id:"cons",children:[e.jsx(n.strong,{children:"Cons"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#cons",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Adds dependency on a third-party service which increases monthly cost."}),`
`,e.jsx(n.li,{children:"The team needs time to learn LiveKit sdk and understand realTime media flows."}),`
`,e.jsx(n.li,{children:"Internet connection quality of users can affect performance, which we must handle in UI/UX."}),`
`]}),`
`,e.jsxs(n.h2,{id:"implementation-steps",children:[e.jsx(n.strong,{children:"Implementation Steps"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#implementation-steps",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"1-setup-backend-token-service",children:[e.jsx(n.strong,{children:"1. Setup backend token service"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-setup-backend-token-service",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Create ",e.jsx(n.code,{children:"/getToken"})," endpoint using ",e.jsx(n.code,{children:"AccessToken(apiKey, apiSecret)"})," to generate secure token."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"2-connect-frontend-to-livekit",children:[e.jsx(n.strong,{children:"2. Connect frontend to LiveKit"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-connect-frontend-to-livekit",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"room.connect(livekitUrl, token)"})," and wrap components with ",e.jsx(n.code,{children:"RoomContext.Provider"}),"."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"3-enable-media-tracks",children:[e.jsx(n.strong,{children:"3. Enable media tracks"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-enable-media-tracks",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["On join, call ",e.jsx(n.code,{children:"room.localParticipant.setMicrophoneEnabled(true)"})," and ",e.jsx(n.code,{children:"room.localParticipant.setCameraEnabled(true)"}),"."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"4-render-participants",children:[e.jsx(n.strong,{children:"4. Render participants"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-render-participants",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"useTracks"})," hook and ",e.jsx(n.code,{children:"<GridLayout>"})," with ",e.jsx(n.code,{children:"<ParticipantTile trackRef={trackRef} />"})," to display users."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"5-handle-room-lifecycle",children:[e.jsx(n.strong,{children:"5. Handle room lifecycle"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#5-handle-room-lifecycle",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Call ",e.jsx(n.code,{children:"room.disconnect()"})," on leave action or component unmount, and listen for ",e.jsx(n.code,{children:"participantDisconnected"})," events."]}),`
`]}),`
`,e.jsxs(n.h2,{id:"conclusion",children:[e.jsx(n.strong,{children:"Conclusion"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"LiveKit gives us a proven platform to handle video, audio, and data communication without building complex webrtc logic ourselves."}),`
`,e.jsx(n.li,{children:"It saves time, improves scalability, and allows the team to focus on core product features."}),`
`,e.jsx(n.li,{children:"I recommend moving forward with LiveKit integration to achieve reliable real-time collaboration."}),`
`]})]})}function a(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{a as default,s as frontmatter};
