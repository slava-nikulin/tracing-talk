import SlideFrame from '../../components/SlideFrame'

export default function AdvancedSampling() {
  return (
    <SlideFrame
      title="Sampling: head-based"
      notes={
        <>
          <b>Во-вторых</b>, стоит настроить <i>сэмплирование</i>. Это механизм,
          который <b>контролирует объём трейсов</b>. Делается это чтобы не
          загружать излишне сеть и хранилище. На highload сервисах собирать
          каждый трейс будет слишком дорого.
          <p>Настроить сэмплирование можно в SDK</p> - это называется{' '}
          <i>Head-based sampling</i>. Здесь решение о том «сохранять трейс или
          нет» принимается перед его созданием.
        </>
      }
    >
      <div class="grid gap-4 md:grid-cols-2">
        <ul class="space-y-2 text-neutral-100 text-base sm:text-lg text-left leading-10">
          <li>
            <code class="px-2 bg-zinc-800/70 rounded">OTEL_TRACES_SAMPLER</code>
          </li>
          <ul class="my-0">
            <li>
              <code>always_on</code>
            </li>
            <li>
              <code>always_off</code>
            </li>
            <li>
              <code>traceidratio</code>
            </li>
            <li>
              <code>parentbased_always_on</code>
            </li>
            <li>
              <code>parentbased_always_off</code>
            </li>
            <li>
              <code>parentbased_traceidratio</code>
            </li>
          </ul>
          <li class="mt-2">
            <code class="px-2 py-0.5 bg-zinc-800/70 rounded">
              OTEL_TRACES_SAMPLER_ARG
            </code>
            : <code>0.05</code>
          </li>
        </ul>
        <pre class=" border-zinc-600/60 bg-zinc-900/70 p-4 text-sky-100 text-sm text-left">
          <code data-trim data-line-numbers="" class="language-ini">
            {`# prod
OTEL_TRACES_SAMPLER=parentbased_traceidratio
OTEL_TRACES_SAMPLER_ARG=0.05

# stage
OTEL_TRACES_SAMPLER=parentbased_traceidratio
OTEL_TRACES_SAMPLER_ARG=0.25

# dev
OTEL_TRACES_SAMPLER=always_on`}
          </code>
        </pre>
      </div>
    </SlideFrame>
  )
}
