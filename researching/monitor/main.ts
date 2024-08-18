const express = require("express");
import { SeverityNumber } from "@opentelemetry/api-logs";
import { tracer, logger } from "./tracing-v2";

const app = express();
const port = 3001;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/rolldice", (req, res) => {
  const result = getRandomNumber(1, 6).toString();

  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: "info",
    body: "this is a log body",
    attributes: { "log.type": "custom" },
  });

  const span = tracer.startSpan("span-v2");
  span.setAttribute("result-v2", result);
  span.end();
  res.header("x-myapp-trace-id", span.spanContext().traceId);

  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
