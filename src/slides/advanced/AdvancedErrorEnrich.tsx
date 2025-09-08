import SlideFrame from '../../components/SlideFrame'

export default function AdvancedErrorEnrich() {
  return (
    <SlideFrame
      title="Обогащение span при ошибке (Go)"
      notes={
        <>RecordError + SetStatus + AddEvent; в логи — trace_id/span_id.</>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left">
        <code data-trim data-line-numbers="6-14" class="language-go">
          {`ctx, span := tracer.Start(ctx, "db.query")
defer span.End()

err := doQuery(ctx, q)
if err != nil {
  span.RecordError(err)
  span.SetStatus(codes.Error, "db timeout")
  span.AddEvent("db.timeout", trace.WithAttributes(
    attribute.String("query", q),
    attribute.Int("retry", retry),
  ))
  if sc := trace.SpanFromContext(ctx).SpanContext(); sc.IsValid() {
    logger = logger.With("trace_id", sc.TraceID().String(), "span_id", sc.SpanID().String())
  }
  return err
}`}
        </code>
      </pre>
    </SlideFrame>
  )
}
