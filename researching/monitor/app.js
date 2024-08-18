const express = require("express");

const tracer = require("./tracing");

const app = express();
const port = 3001;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/rolldice", (req, res) => {
  const span = tracer.startSpan("root_span");
  const result = getRandomNumber(1, 6).toString();
  console.log("loki:result", result);
  span.setAttribute("result", result);
  span.end();
  res.header("x-myapp-trace-id", span.spanContext().traceId);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
