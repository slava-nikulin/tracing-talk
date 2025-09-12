// src/slides/integration/IntegrationSpans.tsx
import SlideFrame from '../../components/SlideFrame'

export default function IntegrationSpans() {
  return (
    <SlideFrame
      title="Спаны"
      notes={
        <>
          Всегда завершай спан. Ошибки: RecordError + SetStatus. Добавляй
          атрибуты и события. Логи связывай trace_id/span_id.
        </>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left  my-0">
        <code data-trim data-line-numbers="4-7,9-12" class="language-go">
          {`var tr = otel.Tracer("payments-api")

func Handler(w http.ResponseWriter, r *http.Request) {
	ctx, span := tr.Start(r.Context(), "GET /payments",
		trace.WithSpanKind(trace.SpanKindServer),
	)
	defer span.End()

	span.SetAttributes( // опционально
		attribute.String("user.id", userID(r)),
		attribute.String("route", "/payments"),
	)

	//...
}`}
        </code>
      </pre>
    </SlideFrame>
  )
}
