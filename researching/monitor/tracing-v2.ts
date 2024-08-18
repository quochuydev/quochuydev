const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from "@opentelemetry/sdk-logs";
import {
  BatchSpanProcessor,
  NodeTracerProvider,
} from "@opentelemetry/sdk-trace-node";
const { trace } = require("@opentelemetry/api");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");

const logExporter = new OTLPLogExporter({
  url: "http://localhost:4318/v1/logs",
});

logExporter.export([], (result) => {
  if (result.error) {
    console.error("Log Exporter Error:", result.error);
  } else {
    console.log("Logs sent successfully");
  }
});

const loggerProvider = new LoggerProvider();
loggerProvider.addLogRecordProcessor(new BatchLogRecordProcessor(logExporter));
const logger = loggerProvider.getLogger("default", "1.0.0");

const traceExporter = new OTLPTraceExporter({
  url: "http://localhost:4318/v1/traces",
});

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: "myapp-v2",
  [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: "instance-id",
  [SemanticResourceAttributes.SERVICE_VERSION]: "v2.0.0",
});
const provider = new NodeTracerProvider({ resource });
provider.addSpanProcessor(new BatchSpanProcessor(traceExporter));
provider.register();

registerInstrumentations({
  instrumentations: [new HttpInstrumentation()],
});

traceExporter.export([], (result) => {
  if (result.error) {
    console.error("Trace Exporter Error:", result.error);
  } else {
    console.log("Traces sent successfully");
  }
});

const tracer = trace.getTracer("nodejs-tracing-app");

export { logger, tracer };
