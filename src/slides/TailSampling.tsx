import SlideFrame from '../components/SlideFrame'
import { fixCodeSplit } from '../utils/fixCodeSplit'
import { setupFragmentObserver } from '../utils/setupFragmentObserver'

export default function AdvancedErrorEnrich() {
  return (
    <SlideFrame
      onSectionReady={(section) => {
        return setupFragmentObserver(section, fixCodeSplit)
      }}
      title="Sampling: tail-based"
      notes={
        <>
          <i>tail-based sampling</i> позволяет сохранять, например,
          <ul>
            <li>только ошибки</li>
            <li>или только медленные запросы</li>
            <li>
              Можно также фильтровать по названию спана, например, исключить{' '}
              <i>Ping</i> или <i>Healthcheck</i>
            </li>
          </ul>{' '}
        </>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left my-0">
        <code
          data-trim
          data-line-numbers="6-9|10-13|14-20"
          class="language-yml"
        >
          {`
processors:
  tailsampling:
    decision_wait: 5s
    num_traces: 50000
    policies:
      - name: errors
        type: status_code
        status_code:
          status_codes: [ERROR]
      - name: slow_requests
        type: latency
        latency:
          threshold_ms: 500
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
