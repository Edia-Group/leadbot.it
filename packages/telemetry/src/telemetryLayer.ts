import { Layer } from "effect";

// OpenTelemetry tracing (OTLP exporter) was used by Typebot cloud. Disabled in
// NUCLEO: an empty layer keeps existing Effect consumers type-compatible.
export const TelemetryLayer = Layer.empty;
