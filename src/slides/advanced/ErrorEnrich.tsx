import SlideFrame from '../../components/SlideFrame'

export default function AdvancedErrorEnrich() {
  return (
    <SlideFrame
      title="Обогащение span"
      notes={
        <>RecordError + SetStatus + AddEvent; в логи — trace_id/span_id.</>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left my-0">
        <code data-trim data-line-numbers="1-25" class="language-go">
          {`
func ProcessPayment(ctx context.Context, userID string, amount int) error {
    ctx, span := tracer.Start(ctx, "process.payment")
    defer span.End()

    span.SetAttributes(
        attribute.String("user.id", userID),
        attribute.Int("amount", amount),
    )

    span.AddEvent("validation.started")

    if err := validate(userID, amount); err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, "validation failed")
        return err
    }

    sc := span.SpanContext()
    logger.Info("payment ok",
        "trace_id", sc.TraceID().String(),
    )

    return nil
}
`}
        </code>
      </pre>
    </SlideFrame>
  )
}
