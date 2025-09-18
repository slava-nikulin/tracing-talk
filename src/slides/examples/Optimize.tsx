// slide file
import RectMagnifier from '../../components/RectMagnifier'
import SlideFrame from '../../components/SlideFrame'
import traceOptimize from '../../assets/img/trace-optimize.png'

export default function ExamplesError() {
  let targetRef!: HTMLDivElement

  return (
    <SlideFrame
      title="Пример: трейс с неоптимальным кодом"
      notes={
        <>
          В этом трейсе мы видим, что в операции <i>GetStatus</i> делается
          несколько sql вызовов подряд.
          <br />
          Некоторые запросы отличаются только одним параметром
          <br />
          Такой код может быть оптимизирован: как минимум, можно достать все
          данные одним запросо - тогда время выполнения сократится за счет
          уменьшения количества сетевых вызовов.
          <br />
          Либо же нужные данные можно кэшировать.
        </>
      }
    >
      <div ref={targetRef!} class="relative">
        <figure class="w-full my-0 mx-0">
          <img
            src={traceOptimize}
            alt="Неоптимальный код"
            class="w-full max-w-[1100px] mx-auto rounded-lg border border-zinc-600/60 shadow-lg object-contain"
            loading="lazy"
          />
          <figcaption class="mt-3 text-sm text-neutral-300">
            Неоптимальные SQL вызовы
          </figcaption>
        </figure>

        <RectMagnifier
          targetRef={() => targetRef}
          startDelayMs={5000}
          imgSelector="img"
          blurOutside
          blurPx={2}
          steps={[
            {
              x: -0.248,
              y: -0.101,
              w: 0.62,
              h: 0.25,
              scale: 5,
              transitionMs: 800,
              holdMs: 3000,
            },
            {
              x: -0.047,
              y: -0.15,
              w: 0.15,
              h: 1.1,
              scale: 3,
              transitionMs: 800,
              holdMs: 5000,
            },
            {
              x: 0.265,
              y: 0.52,
              w: 0.55,
              h: 0.6,
              scale: 2,
              transitionMs: 800,
              holdMs: 5000,
            },
            { hide: true, holdMs: 5000 },
          ]}
          className="rounded-lg ring-2 ring-red-400/80 shadow-[0_0_0_2px_rgba(0,0,0,0.35)] bg-neutral-900/10"
        />
      </div>
    </SlideFrame>
  )
}
