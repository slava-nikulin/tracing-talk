import SlideFrame from '../../components/SlideFrame'

export default function AdvancedErrorEnrich() {
  return (
    <SlideFrame
      title="Sampling: tail-based"
      notes={
        <>RecordError + SetStatus + AddEvent; в логи — trace_id/span_id.</>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left my-0">
        <code data-trim data-line-numbers="" class="language-yml">
          {`# collector config
processors:
  filter:
    error_mode: ignore
    traces:
      span:
        - attributes["db.statement"] == "cluster slots"
        - name == "redis.dial"
        - name == "db.Connect"
        - name == "db.Ping"
        `}
        </code>
      </pre>
    </SlideFrame>
  )
}
