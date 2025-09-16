import SlideFrame from '../../components/SlideFrame'

export default function IntegrationKafka() {
  return (
    <SlideFrame
      title="Kafka: пропагация контекста (Producer)"
      notes={
        <>
          <p>
            В случае, если сервисы общаются по HTTP, всё работает «из коробки» —{' '}
            <i>traceID</i> прокидывается в заголовках автоматически. Для
            остальных случаев нужно <b>вручную</b> выполнять пропагацию{' '}
            <i>trace context</i>.
          </p>
          <p>
            Например, для <b>Kafka</b> в <i>producer</i>, с помощью пакета{' '}
            <i>propagation</i>, нужно достать <i>trace</i> из переменной
            контекста и записать в заголовки передаваемого сообщения
          </p>
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
