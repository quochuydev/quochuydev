const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const opentelemetry = require("@opentelemetry/api");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const { Resource } = require("@opentelemetry/resources");
const {
  SEMRESATTRS_SERVICE_NAME,
} = require("@opentelemetry/semantic-conventions");
const {
  diag,
  trace,
  context,
  DiagConsoleLogger,
  DiagLogLevel,
} = require("@opentelemetry/api");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: "myapp",
  [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: "instance-id",
  [SemanticResourceAttributes.SERVICE_VERSION]: "v1.0.0",
});

const exporter = new OTLPTraceExporter({
  url: "http://localhost:4318/v1/traces", // OTLP/HTTP endpoint for Tempo
});

const provider = new NodeTracerProvider({ resource });
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

const tracer = trace.getTracer("nodejs-tracing-app");

module.exports = tracer;
