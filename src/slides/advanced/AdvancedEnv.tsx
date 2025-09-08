import SlideFrame from '../../components/SlideFrame'

export default function AdvancedEnv() {
  return (
    <SlideFrame
      title="ENV"
      notes={
        <>Нормализуй service.name, endpoint, propagators, resource attrs.</>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left">
        {`OTEL_SERVICE_NAME=payments-api
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
OTEL_TRACES_EXPORTER=otlp
OTEL_PROPAGATORS=tracecontext,baggage
OTEL_RESOURCE_ATTRIBUTES=service.version=1.2.3,env=prod,region=eu`}
      </pre>
    </SlideFrame>
  )
}
