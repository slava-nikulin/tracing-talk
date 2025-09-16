import SlideFrame from '../../components/SlideFrame'
import { fixCodeSplit } from '../../utils/fixCodeSplit'
import { setupFragmentObserver } from '../../utils/setupFragmentObserver'

export default function IntegrationInit() {
  return (
    <SlideFrame
      onSectionReady={(section) => {
        return setupFragmentObserver(section, fixCodeSplit)
      }}
      title="Init: TracerProvider + Propagators"
      notes={
        <>
          <ul>
            <li>
              Чтобы трейсинг заработал, нужно задать <i>ресурс</i> — это
              метаданные, которые идентифицируют сервис внутри общего трейса.
              Без этого мы не сможем различить, в каком именно сервисе был
              создан спан.
            </li>
            <li>Задаём адрес коллектора.</li>
            <li>
              Создаём <i>TracerProvider</i> — он отвечает за создание спанов.
            </li>
            <li>
              И <i>Propagator</i> — он реализует формат передачи{' '}
              <i>trace context</i> между сервисами.
            </li>
          </ul>
        </>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto m-0 text-sky-100 text-sm text-left  my-0">
        <code
          data-trim
          data-line-numbers="1-7|9-11|13-20|22-26"
          class="language-go"
        >
          {`res, _ := resource.New(ctx, // метаданные сервиса
  resource.WithAttributes( 
    semconv.ServiceNameKey.String("payments-api"),
    semconv.ServiceVersionKey.String("1.2.3"),
    attribute.String("env", "prod"),
  ),
)

exp, _ := otlptracegrpc.New(ctx, // экспортер
  otlptracegrpc.WithEndpoint("otel-collector:4317"),
)

tp := sdktrace.NewTracerProvider( // провайдер - в global
  sdktrace.WithBatcher(exp),
  sdktrace.WithResource(res),
  sdktrace.WithSampler(
    sdktrace.ParentBased(sdktrace.TraceIDRatioBased(0.05)),
  ),
)
otel.SetTracerProvider(tp)

otel.SetTextMapPropagator( // протокол пропагации trace id
  propagation.NewCompositeTextMapPropagator(
    propagation.TraceContext{}
  ),
)`}
        </code>
      </pre>
    </SlideFrame>
  )
}
