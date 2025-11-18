import{u as r,j as e}from"./index-fJNdF3ED.js";function t(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",pre:"pre",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:e.jsx(n.strong,{children:"Implement LiveKit for Real-Time Communication"})}),`
`,e.jsx(n.h2,{children:e.jsx(n.strong,{children:"Overview: Purpose and Problem Solving"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Our project requires stable realTimeVideo and realTimeAudio features to support collaboration between users."}),`
`,e.jsx(n.li,{children:"Building a custom webrtcServer is complex and time-consuming, while LiveKit provides tested sdkTools and serverInfra ready to use."}),`
`]}),`
`,e.jsx(n.h2,{children:e.jsx(n.strong,{children:"Proposal"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use LiveKit as the communication platform for videoCall, audioCall, and screenShare."}),`
`,e.jsxs(n.li,{children:["Connect frontend with ",e.jsx(n.code,{children:"livekitClient"})," and backend with token generation endpoint ",e.jsx(n.code,{children:"getAccessToken"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:e.jsx(n.strong,{children:"Weighting / Pros and Cons"})}),`
`,e.jsx(n.h3,{children:e.jsx(n.strong,{children:"Pros"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"LiveKit is scalable and supports adaptiveStream and dynacast, which reduce bandwidth usage."}),`
`,e.jsxs(n.li,{children:["Provides React components like ",e.jsx(n.code,{children:"GridLayout"}),", ",e.jsx(n.code,{children:"ParticipantTile"}),", and ",e.jsx(n.code,{children:"ControlBar"})," to build UI faster."]}),`
`,e.jsx(n.li,{children:"Security is built-in using signed accessToken with roomName and participantIdentity."}),`
`,e.jsx(n.li,{children:"Reduces development time compared to building and maintaining our own signaling system."}),`
`]}),`
`,e.jsx(n.h3,{children:e.jsx(n.strong,{children:"Cons"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Adds dependency on a third-party service which increases monthly cost."}),`
`,e.jsx(n.li,{children:"The team needs time to learn LiveKit sdk and understand realTime media flows."}),`
`,e.jsx(n.li,{children:"Internet connection quality of users can affect performance, which we must handle in UI/UX."}),`
`]}),`
`,e.jsx(n.h2,{children:e.jsx(n.strong,{children:"Implementation Steps"})}),`
`,e.jsx(n.h3,{children:e.jsx(n.strong,{children:"1. Setup backend token service"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import "dotenv/config";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";
import cors from "cors";
import express from "express";
import { RoomServiceClient, AccessToken } from "livekit-server-sdk";

import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.get("/get-token", async (req, res) => {
  const roomName = "quickstart-room";
  const participantName = String(Date.now());

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantName,
      ttl: "10m",
    }
  );
  at.addGrant({
    roomJoin: true,
    room: roomName,
  });

  const token = await at.toJwt();
  res.send(token);
});

const svc = new RoomServiceClient(
  process.env.LIVEKIT_HOST as string,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

app.get("/rooms", async (req, res) => {
  const rooms = await svc.listRooms();
  res.json({ rooms });
});

app.get("/rooms/create", async (req, res) => {
  const opts = {
    name: "first room",
    emptyTimeout: 10 * 60,
    maxParticipants: 20,
  };

  const room = await svc.createRoom(opts);
  console.log("room created", room);

  res.json({ room });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});

`})}),`
`,e.jsx(n.h3,{children:e.jsx(n.strong,{children:"2. Connect frontend to LiveKit"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  RoomContext,
} from "@livekit/components-react";
import { Room, RoomEvent, Track } from "livekit-client";
import "@livekit/components-styles";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [room] = useState(
    () =>
      new Room({
        adaptiveStream: true,
        dynacast: true,
      }),
  );

  useEffect(() => {
    let mounted = true;

    const connect = async () => {
      const token = await fetch("http://localhost:3000/get-token").then((r) =>
        r.text(),
      );

      if (mounted) {
        await room.connect('wss://quochuydev-i4asls1o.livekit.cloud', token);
      }
    };

    connect();

    room.on("participantConnected", (p) => {
      console.log("Participant joined:", p.identity);
    });

    room.on("trackSubscribed", (track, pub, participant) => {
      console.log("Subscribed to:", track.kind, "from", participant.identity);
    });

    room.on(RoomEvent.Disconnected, () => {
      console.log("Left room");
    });

    return () => {
      mounted = false;
      room.disconnect();
    };
  }, [room]);

  return (
    <RoomContext.Provider value={room}>
      <div data-lk-theme="default" style={{ height: "100vh" }}>
        <MyVideoConference />
        <RoomAudioRenderer />
        <ControlBar />
      </div>
    </RoomContext.Provider>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      {
        source: Track.Source.Camera,
        withPlaceholder: true,
      },
      {
        source: Track.Source.ScreenShare,
        withPlaceholder: false,
      },
    ],
    {
      onlySubscribed: false,
    },
  );

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}

`})}),`
`,e.jsx(n.h2,{children:e.jsx(n.strong,{children:"Conclusion"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"LiveKit gives us a proven platform to handle video, audio, and data communication without building complex webrtc logic ourselves."}),`
`,e.jsx(n.li,{children:"It saves time, improves scalability, and allows the team to focus on core product features."}),`
`,e.jsx(n.li,{children:"I recommend moving forward with LiveKit integration to achieve reliable real-time collaboration."}),`
`]})]})}function s(o={}){const{wrapper:n}={...r(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{s as default};
