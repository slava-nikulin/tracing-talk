// slide file
import RectMagnifier from '../../components/RectMagnifier'
import SlideFrame from '../../components/SlideFrame'

export default function ExamplesError() {
  let targetRef!: HTMLDivElement
  return (
    <SlideFrame
      title="Пример: трейс с ошибкой"
      notes={<>Вставь прод-скрин...</>}
    >
      <div ref={targetRef!} class="relative">
        <figure class="w-full my-0 mx-0">
          <img
            src="/img/trace-error.png"
            alt="Трейс с ошибкой"
            class="w-full max-w-[1100px] mx-auto rounded-lg border border-zinc-600/60 shadow-lg object-contain"
            loading="lazy"
          />
          <figcaption class="mt-3 text-sm text-neutral-300">
            Ошибка в спане, событие с причиной, статус Error.
          </figcaption>
        </figure>

        <RectMagnifier
          targetRef={() => targetRef}
          imgSelector="img"
          blurOutside
          blurPx={2}
          steps={[
            {
              x: -0.03,
              y: -0.02,
              w: 0.2,
              h: 0.2,
              scale: 1.5,
              transitionMs: 700,
              holdMs: 900,
            },
            {
              x: -0.03,
              y: 0.25,
              w: 0.2,
              h: 0.2,
              scale: 1.5,
              transitionMs: 700,
              holdMs: 900,
            },
            // {
            //   x: 0.29,
            //   y: 0.31,
            //   w: 0.2,
            //   h: 0.2,
            //   scale: 1.5,
            //   transitionMs: 700,
            //   holdMs: 900,
            // },
            { hide: true, holdMs: 800 },
          ]}
          className="rounded-lg ring-2 ring-red-400/80 shadow-[0_0_0_2px_rgba(0,0,0,0.35)] bg-neutral-900/10"
        />
      </div>
    </SlideFrame>
  )
}
