import SlideFrame from '../../components/SlideFrame'

export default function AdvancedSampling() {
  return (
    <SlideFrame
      title="Sampling: head-based"
      notes={
        <>
          Prod: parentbased_traceidratio + tail sampling в Collector. Dev:
          always_on.
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
