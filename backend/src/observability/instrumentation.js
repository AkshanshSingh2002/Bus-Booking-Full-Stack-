import "dotenv/config";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";

const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4318";
const traceExporter = new OTLPTraceExporter({ url: `${endpoint}/v1/traces` });
const metricExporter = new OTLPMetricExporter({ url: `${endpoint}/v1/metrics` });

const sdk = new NodeSDK({
    traceExporter,
    metricReader: new PeriodicExportingMetricReader({ exporter: metricExporter, exportIntervalMillis: 10000 }),
    instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();

export default sdk;
