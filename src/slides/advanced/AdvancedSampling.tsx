import SlideFrame from '../../components/SlideFrame'

export default function AdvancedSampling() {
  return (
    <SlideFrame
      title="Sampling"
      notes={
        <>
          Prod: parentbased_traceidratio + tail sampling в Collector. Dev:
          always_on.
        </>
      }
    >
      <div class="grid gap-4 md:grid-cols-2">
        <ul class="space-y-2 text-neutral-100 text-base sm:text-lg text-left list-none leading-10">
          <li>
            <code class="px-2 py-0.5 bg-zinc-800/70 rounded">
              OTEL_TRACES_SAMPLER
            </code>
            :
          </li>
          <li class="pl-4">
            • <code>traceidratio</code>
          </li>
          <li class="pl-4">
            • <code>parentbased_always_off</code>
          </li>
          <li class="pl-4">
            • <code>parentbased_traceidratio</code>
          </li>
          <li class="mt-2">
            <code class="px-2 py-0.5 bg-zinc-800/70 rounded">
              OTEL_TRACES_SAMPLER_ARG
            </code>
            : <code>0.05</code>
          </li>
        </ul>
        <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left">
          {`# prod
OTEL_TRACES_SAMPLER=parentbased_traceidratio
OTEL_TRACES_SAMPLER_ARG=0.05

# stage
OTEL_TRACES_SAMPLER=traceidratio
OTEL_TRACES_SAMPLER_ARG=0.25

# dev
OTEL_TRACES_SAMPLER=always_on`}
        </pre>
      </div>
    </SlideFrame>
  )
}
