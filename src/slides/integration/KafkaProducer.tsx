import SlideFrame from '../../components/SlideFrame'

export default function IntegrationKafka() {
  return (
    <SlideFrame
      title="Kafka: пропагация контекста (Producer)"
      notes={
        <>
          Inject в producer headers, Extract на consumer. Дальше стартуй
          consumer-span с полученным контекстом.
        </>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left my-0">
        <code data-trim data-line-numbers="1-2,14-22" class="language-go">
          {`import "go.opentelemetry.io/otel/propagation"

func (p *Producer) WriteWithTrace(ctx context.Context,
	key string, value []byte) error {
	ctx, span := fotel.Tracer.Start(ctx, "Kafka Produce")
	defer span.End()

	span.SetAttributes(
		attribute.String("topic", p.GetTopic()),
	)

	msg := // ...

	carrier := propagation.HeaderCarrier{}
	otel.GetTextMapPropagator().Inject(ctx, carrier)

	for k, vals := range carrier {
		msg.Headers = append(msg.Headers, kafka.Header{
			Key:   k,
			Value: []byte(strings.Join(vals, headerValuesSeparator)),
		})
	}
	return p.Writer.WriteMessages(ctx, msg)
}`}
        </code>
      </pre>
    </SlideFrame>
  )
}
