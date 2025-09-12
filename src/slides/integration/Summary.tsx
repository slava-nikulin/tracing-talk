import SlideFrame from '../../components/SlideFrame'

export default function IntegrationSummary() {
  return (
    <SlideFrame
      title="Интеграция — обзор"
      notes={
        <>
          Инициализация провайдера, спаны, пропагация контекста:
          HTTP/Kafka/DB/Redis. Код на Go, конфиг — через ENV.
        </>
      }
    >
      <ol class="space-y-3 text-neutral-100 text-lg sm:text-xl leading-relaxed text-left my-0">
        <li>
          <span class="font-semibold">Init</span>: TracerProvider, resource
          attributes, экспортер OTLP, propagators.
        </li>
        <li>
          <span class="font-semibold">Spans</span>: создание + атрибуты.
        </li>
        <li>
          <span class="font-semibold">Custom Propagation</span>: Kafka/Redis.
        </li>
      </ol>
    </SlideFrame>
  )
}
