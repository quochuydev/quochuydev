import express, { Request, Response } from "express";
import { logger, tracer } from "./tracing";

const app = express();
const port = 3001;

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/rolldice", (req: any, res: any) => {
  const span = tracer.startSpan("span");

  const result = getRandomNumber(1, 6).toString();

  logger.log({ a: 1, b: 2, c: 3, result });

  span.setAttribute("result", result);
  span.end();

  res.header("x-myapp-trace-id", span.spanContext().traceId);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
