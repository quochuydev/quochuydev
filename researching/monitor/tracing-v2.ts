import { trace } from "@opentelemetry/api";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import {
  BatchLogRecordProcessor,
  ConsoleLogRecordExporter,
  LoggerProvider,
  SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs";
import {
  BatchSpanProcessor,
  NodeTracerProvider,
} from "@opentelemetry/sdk-trace-node";
import {
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";

const resource = new Resource({
  [SEMRESATTRS_SERVICE_NAME]: "myapp-v2",
  [SEMRESATTRS_SERVICE_INSTANCE_ID]: "instance-id",
  [SEMRESATTRS_SERVICE_VERSION]: "v2.0.0",
});

const loggerProvider = new LoggerProvider({ resource });

loggerProvider.addLogRecordProcessor(
  new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
);

const logExporter = new OTLPLogExporter({
  url: "http://localhost:4318/v1/logs",
  concurrencyLimit: 1,
});

loggerProvider.addLogRecordProcessor(new BatchLogRecordProcessor(logExporter));

logExporter.export([], (result) => {
  if (result.error) {
    console.error("Log Exporter Error:", result.error);
  } else {
    console.log("Logs sent successfully");
  }
});

const logger = loggerProvider.getLogger("default", "1.0.0");

const traceExporter = new OTLPTraceExporter({
  url: "http://localhost:4318/v1/traces",
});

const provider = new NodeTracerProvider({ resource });
provider.addSpanProcessor(new BatchSpanProcessor(traceExporter));
provider.register();

traceExporter.export([], (result) => {
  if (result.error) {
    console.error("Trace Exporter Error:", result.error);
  } else {
    console.log("Traces sent successfully");
  }
});

const tracer = trace.getTracer("nodejs-tracing-app");

export { logger, tracer };
