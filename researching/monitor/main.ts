const express = require("express");
import { SeverityNumber } from "@opentelemetry/api-logs";
import { tracer, logger } from "./tracing-v2";

const app = express();
const port = 3001;

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.get("/rolldice", (req: any, res: any) => {
  const result = getRandomNumber(1, 6).toString();

  console.log(`debug:this is console.log`, 10001, {
    value: 123123,
  });

  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: "info",
    body: { a: 1, b: 2, c: 3 },
    attributes: {
      "log.type": "custom",
      "user.id": "12345",
      "transaction.id": "67890",
      "error.message": "None",
    },
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
