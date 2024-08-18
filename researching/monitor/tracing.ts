import { trace } from "@opentelemetry/api";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import {
  BatchLogRecordProcessor,
  LoggerProvider,
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
  [SEMRESATTRS_SERVICE_NAME]: "myapp",
  [SEMRESATTRS_SERVICE_INSTANCE_ID]: "instance-id",
  [SEMRESATTRS_SERVICE_VERSION]: "v1.0.0",
});

const loggerProvider = new LoggerProvider({ resource });

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

const logger = Logger(loggerProvider);

export { logger, tracer };

function Logger(loggerProvider: LoggerProvider) {
  const logger = loggerProvider.getLogger("default", "1.0.0");

  return {
    log: (entry: any) => {
      logger.emit({
        severityNumber: SeverityNumber.INFO,
        severityText: "info",
        body: JSON.stringify(entry),
      });
    },
    error: (entry: any) => {
      logger.emit({
        severityNumber: SeverityNumber.ERROR,
        severityText: "error",
        body: JSON.stringify(entry),
      });
    },
  };
}
