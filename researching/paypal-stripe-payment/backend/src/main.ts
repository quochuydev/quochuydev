import * as trpcExpress from "@trpc/server/adapters/express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { appRouter, createContext } from "./trpc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

const app = express();

app.use(cors());

app.use((req: any, _res: any, next: any) => {
  console.log("⬅️", req.method, req.path, req.body ?? req.query);
  next();
});

app.use(bodyParser.json());

// trpc middleware (optional, for tRPC clients)
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: (opts) => createContext(opts),
  })
);

// Serve frontend in production (if you build frontend into ../frontend/dist)
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(staticPath));

  app.get("/*", (_req: any, res: any) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

app.get("/", (_req: any, res: any) => {
  res.send("PayApp backend running.");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});
