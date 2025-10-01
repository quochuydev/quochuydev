import "dotenv/config";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
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
  }),
);

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

const createToken = async () => {
  const roomName = "quickstart-room";
  const participantName = String(Date.now());

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantName,
      ttl: "10m",
    },
  );
  at.addGrant({
    roomJoin: true,
    room: roomName,
  });

  return await at.toJwt();
};

app.get("/get-token", async (req, res) => {
  const token = await createToken();
  res.send(token);
});

const svc = new RoomServiceClient(
  process.env.LIVEKIT_HOST as string,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET,
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
  console.log(`Server is running on port ${port}`);
});
