import RectMagnifier from '../../components/RectMagnifier'
import SlideFrame from '../../components/SlideFrame'
import traceBottleneck from '../../assets/img/trace-bottleneck.png'

export default function Bottleneck() {
  let targetRef!: HTMLDivElement

  return (
    <SlideFrame
      title="Пример: трейс с bottleneck"
      notes={
        <>
          <p>
            Здесь также видна цепочка вызовов. Ошибки нет, но заметна задержка.
            Найти проблемное место просто:
          </p>
          <ul>
            <li>
              название сервиса - <i>payment-gateway</i>
            </li>
            <li>
              конкретная функция - <i>SetCardAmount</i>
            </li>
            <li>и время выполнения.</li>
          </ul>
        </>
      }
    >
      <div ref={targetRef!} class="relative">
        <figure class="w-full my-0 mx-0">
          <img
            src={traceBottleneck}
            alt="Трейс с bottleneck"
            class="w-full max-w-[1100px] mx-auto rounded-lg border border-zinc-600/60 shadow-lg object-contain"
            loading="lazy"
          />
          <figcaption class="mt-3 text-sm text-neutral-300">
            Узкое место подсвечено длительностью; дочерние спаны короче.
          </figcaption>
        </figure>

        <RectMagnifier
          targetRef={() => targetRef}
          startDelayMs={10000}
          imgSelector="img"
          blurOutside
          blurPx={2}
          steps={[
            {
              x: -0.16,
              y: 0.184,
              w: 0.62,
              h: 0.2,
              scale: 5,
              transitionMs: 800,
              holdMs: 2000,
            },
            {
              x: -0.13,
              y: 0.34,
              w: 0.55,
              h: 0.2,
              scale: 5,
              transitionMs: 800,
              holdMs: 2000,
            },
            {
              x: 0.5,
              y: 0.3,
              w: 0.62,
              h: 0.25,
              scale: 3,
              transitionMs: 800,
              holdMs: 2000,
            },

            { hide: true, holdMs: 2000 },
          ]}
          className="rounded-lg ring-2 ring-red-400/80 shadow-[0_0_0_2px_rgba(0,0,0,0.35)] bg-neutral-900/10"
        />
      </div>
    </SlideFrame>
  )
}
