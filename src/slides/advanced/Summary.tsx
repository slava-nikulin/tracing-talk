import SlideFrame from '../../components/SlideFrame'

export default function AdvancedSummary() {
  return (
    <SlideFrame
      title="Advanced techniques"
      notes={
        <>
          Sampling, CorrelationID vs TraceID, trace context, best practices,
          env-конфиг.
        </>
      }
    >
      <ul class="space-y-3 marker:text-neutral-100 text-neutral-100 text-lg sm:text-xl leading-relaxed text-left mx-5 my-0">
        <li>
          <span class="font-semibold">Sampling</span>: контроль объема traces
        </li>
        <li>
          <span class="font-semibold">Обогащение span</span>: ошибки, события в
          span.
        </li>
        <li>
          <span class="font-semibold">ENV</span>: sampler, endpoint,
          propagators, resource attrs.
        </li>
      </ul>
    </SlideFrame>
  )
}
