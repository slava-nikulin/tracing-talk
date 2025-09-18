import SlideFrame from '../../components/SlideFrame'

export default function IntegrationKafka() {
  return (
    <SlideFrame
      title="Kafka: пропагация контекста (Consumer)"
      notes={
        <>
          <p>
            В <i>consumer</i> нужно выполнить обратную операцию. Значения{' '}
            <i>Trace context</i> достается из заголовков сообщения и кладется в
            переменную контекста функции.
          </p>
        </>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left my-0">
        <code data-trim data-line-numbers="1,9-14" class="language-go">
          {`import "go.opentelemetry.io/otel/propagation"

func (c *ConsumerGroup) ReadMessageWithTrace(ctx context.Context) (Message, context.Context, error) {
	msg, err := c.ReadMessage(ctx)
	if err != nil {
		return Message{}, ctx, err
	}

	carrier := propagation.HeaderCarrier{}
	for _, h := range msg.Headers {
		carrier[h.Key] = strings.Split(string(h.Value), headerValuesSeparator)
	}

	otel.GetTextMapPropagator().Extract(ctx, carrier)

	ctx, span := fotel.Tracer.Start(ctx, spanName)
	defer span.End()
	// ....

	return msg, ctx, nil
}`}
        </code>
      </pre>
    </SlideFrame>
  )
}
