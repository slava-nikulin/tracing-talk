import SlideFrame from '../../components/SlideFrame'

export default function AdvancedSummary() {
  return (
    <SlideFrame
      title="Advanced"
      notes={
        <>
          Sampling, CorrelationID vs TraceID, trace context, best practices,
          env-конфиг.
        </>
      }
    >
      <ul class="space-y-3 marker:text-neutral-100 text-neutral-100 text-lg sm:text-xl leading-relaxed text-left mx-5">
        <li>
          <span class="font-semibold">Sampling</span>: контроль стоимости без
          потери сигналов.
        </li>
        <li>
          <span class="font-semibold">Correlation ID</span>:
          бизнес-ID.
        </li>
        <li>
          <span class="font-semibold">Trace context</span>:{' '}
          <code class="px-1 bg-zinc-800/70 rounded">traceparent</code>,{' '}
          <code class="px-1 bg-zinc-800/70 rounded">tracestate</code>,{' '}
          <code class="px-1 bg-zinc-800/70 rounded">baggage</code>.
        </li>
        <li>
          <span class="font-semibold">Best practices</span>: логи с{' '}
          <code>trace_id</code>, ошибки в span, span-фильр в collector 
        </li>
        <li>
          <span class="font-semibold">ENV</span>: sampler, endpoint,
          propagators, resource attrs.
        </li>
      </ul>
    </SlideFrame>
  )
}
