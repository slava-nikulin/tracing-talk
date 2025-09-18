import SlideFrame from '../components/SlideFrame'

export default function LogsPain() {
  return (
    <SlideFrame
      title="Проблема: нет трейсинга"
      notes={
        <>
          <p>
            Примерно так выглядят логи в распределённой системе: у каждого
            сервиса свой поток записей и свой формат.
          </p>
          Информации много, она полезна по отдельности, но нет <i>цельной</i>{' '}
          картины.
          <p>
            Когда что-то ломается, поиск причины только по логам может занять
            много времени, особенно если ситуация нетривиальная.
          </p>
          <p>
            <b>
              <i>Переход:</i>
            </b>{' '}
            Вот тут-то нам на помощь и приходит трейсинг.
          </p>
        </>
      }
    >
      <div class="bg-zinc-900/90 rounded-lg border border-zinc-600/60 shadow-lg p-4 h-[28rem] overflow-hidden my-0">
        <pre class="text-xs sm:text-sm text-neutral-300 font-mono leading-snug overflow-y-hidden h-full text-left">
          {`2025-09-11 12:01:03 [auth-service] INFO  User 123 login attempt
2025-09-11 12:01:03 [auth-service] DEBUG Querying DB for user
2025-09-11 12:01:03 [db]          INFO  SELECT * FROM users WHERE id=123
2025-09-11 12:01:04 [auth-service] ERROR Timeout waiting for DB
2025-09-11 12:01:04 [gateway]     WARN  Upstream auth-service did not respond
2025-09-11 12:01:05 [payments]    INFO  Starting charge flow
2025-09-11 12:01:05 [payments]    DEBUG Calling fraud-check service
2025-09-11 12:01:06 [fraud-check] INFO  Analyzing transaction for user 123
2025-09-11 12:01:06 [fraud-check] ERROR Service unavailable
2025-09-11 12:01:07 [payments]    ERROR Fraud-check failed
2025-09-11 12:01:07 [gateway]     INFO  POST /api/v1/charge status=502 dur=1204ms
2025-09-11 12:01:07 [payments]    WARN  Partial failure, scheduling retry
2025-09-11 12:01:08 [worker]      INFO  Enqueued job "charge#retry" id=7a3d2 user=123 delay=200ms
2025-09-11 12:01:08 [worker]      DEBUG Dequeued job id=7a3d2 queue=critical
2025-09-11 12:01:08 [payments]    DEBUG Calling fraud-check service
2025-09-11 12:01:08 [fraud-check] WARN  Circuit breaker open
2025-09-11 12:01:08 [payments]    ERROR Retry failed reason=circuit_open
2025-09-11 12:01:08 [metrics]     INFO  observe payment_latency_ms=1308 route=/api/v1/charge
2025-09-11 12:01:09 [gateway]     INFO  POST /api/v1/charge status=502 dur=1331ms
2025-09-11 12:01:09 [alerts]      WARN  Pager trigger: payments.error rate=2/1m
... и так далее
`}
        </pre>
      </div>
    </SlideFrame>
  )
}
