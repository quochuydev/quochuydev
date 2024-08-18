import { trace } from "@opentelemetry/api";
import { SeverityNumber } from "@opentelemetry/api-logs";
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
  [SEMRESATTRS_SERVICE_NAME]: "myapp",
  [SEMRESATTRS_SERVICE_INSTANCE_ID]: "instance-id",
  [SEMRESATTRS_SERVICE_VERSION]: "v1.0.0",
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
    log: (body: any) => {
      logger.emit({
        severityNumber: SeverityNumber.INFO,
        severityText: "info",
        body,
        attributes: {
          "log.type": "custom",
          "user.id": "12345",
          "transaction.id": "67890",
          "error.message": "None",
        },
      });
    },
    error: (body: any) => {
      logger.emit({
        severityNumber: SeverityNumber.ERROR,
        severityText: "error",
        body,
        attributes: {
          "log.type": "custom",
          "user.id": "12345",
          "transaction.id": "67890",
          "error.message": "None",
        },
      });
    },
  };
}
