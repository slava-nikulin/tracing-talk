import SlideFrame from '../../components/SlideFrame'

export default function AdvancedErrorEnrich() {
  return (
    <SlideFrame
      title="Sampling: tail-based"
      notes={
        <>
          <p>
            Также есть возможность фильтровать трейсы на стороне{' '}
            <i>коллектора</i> перед сохранением. Это называется{' '}
            <i>tail-based sampling</i>.
          </p>
          <p>
            Он позволяет сохранять, например, только ошибки или медленные
            запросы.{' '}
          </p>
        </>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left my-0">
        <code data-trim data-line-numbers="" class="language-yml">
          {`# collector config
processors:
  tailsampling:
    decision_wait: 5s
    num_traces: 50000
    policies:
      # 1. Ошибки
      - name: errors
        type: status_code
        status_code:
          status_codes: [ERROR]

      # 2. Медленные запросы
      - name: slow_requests
        type: latency
        latency:
          threshold_ms: 500

      # 3. Исключить "ping" и "healthcheck"
      - name: drop_ping
        type: span
        span:
          name:
            match_type: regexp
            value: ".*(ping|healthcheck).*"
          invert_match: true
        `}
        </code>
      </pre>
    </SlideFrame>
  )
}
