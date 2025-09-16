import SlideFrame from '../../components/SlideFrame'

export default function AdvancedEnv() {
  return (
    <SlideFrame
      title="ENV вместо кода"
      notes={
        <>
          <p>
            В дополнение к этому есть также несколько приёмов, которые сделают
            работу с трейсингом эффективнее.
          </p>
          <p>
            <b>Во-первых</b>, большинство настроек можно вынести в переменные
            окружения. В коде создается только TracerProvider, а все остальное
            управляются через переменные. Это удобно потому как конфигурация
            меняется без перекомпиляции.
          </p>
        </>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left my-0">
        <code data-trim data-line-numbers="" class="language-ini">
          {`OTEL_SERVICE_NAME=payments-api
OTEL_TRACES_EXPORTER=otlp
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
OTEL_EXPORTER_OTLP_PROTOCOL=grpc
OTEL_PROPAGATORS=tracecontext,baggage
OTEL_TRACES_SAMPLER=parentbased_traceidratio
OTEL_TRACES_SAMPLER_ARG=0.05
OTEL_RESOURCE_ATTRIBUTES=service.version=1.2.3,env=prod,region=eu`}
        </code>
      </pre>
    </SlideFrame>
  )
}
