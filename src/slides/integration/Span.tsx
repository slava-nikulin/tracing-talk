import SlideFrame from '../../components/SlideFrame'
import { fixCodeSplit } from '../../utils/fixCodeSplit'
import { setupFragmentObserver } from '../../utils/setupFragmentObserver'

export default function Span() {
  return (
    <SlideFrame
      title="Создание span"
      onSectionReady={(section) => {
        return setupFragmentObserver(section, fixCodeSplit)
      }}
      notes={
        <>
          Спан создается в начале функции и обязательно закрывается в конце
          <p>
            Очень полезно обогащать спаны <i>метаинформацией</i>:
          </p>
          <ul>
            <li>
              Например, если добавить <b>в атрибуты</b> спана параметры метода,
              это может облегчить поиск трейса в ui.
            </li>
            <li>
              Также в спан можно добавлять <i>события</i>. Основная польза от
              событий - это фиксация ключевых шагов внутри операции.
              <br />
              Это облегчает troubleshooting - в случае многоэтапной операции
              легко понять, где произошла проблема.
            </li>
            <li>
              <b>Ошибки</b> стоит фиксировать через <i>RecordError</i> и{' '}
              <i>SetStatus</i>. С ними спан подсветится красным.
            </li>
            <li>
              Наконец, рекомендую добавлять корреляцию с логами: <b>trace_id</b>{' '}
              в логах позволит быстро переходить от лог-записи к трейсу
            </li>
          </ul>
        </>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left my-0">
        <code
          data-trim
          data-line-numbers="2-3|5-8|10|13-14|18-21"
          class="language-go"
        >
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
