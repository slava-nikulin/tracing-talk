// slide file
import RectMagnifier from '../../components/RectMagnifier'
import SlideFrame from '../../components/SlideFrame'
import traceErr from '../../assets/img/trace-error.png'

export default function ExamplesError() {
  let targetRef!: HTMLDivElement

  return (
    <SlideFrame
      title="Пример: трейс с ошибкой"
      notes={
        <>
          Так выглядит трейс в ui. На скриншоте показана лишь его часть — обычно
          он длиннее. Здесь в запросе произошла ошибка, и она сразу подсвечена
          красным. Видно:
          <ul>
            <li>
              название сервиса - <i>payment-gateway</i>
            </li>
            <li>
              название функции - <i>SetCardAmount</i>
            </li>
            <li>
              данные по ошибке в атрибутах <i>span</i>.
            </li>
          </ul>
          <p>Также здесь видно, развернутый спан со всей метаинформацией</p>
          <b>
            <i>Переход:</i>
          </b>{' '}
          Ещё пример.
        </>
      }
    >
      <div ref={targetRef!} class="relative">
        <figure class="w-full my-0 mx-0">
          <img
            src={traceErr}
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
          startDelayMs={12000}
          imgSelector="img"
          blurOutside
          blurPx={2}
          steps={[
            {
              x: -0.242,
              y: -0.057,
              w: 0.62,
              h: 0.25,
              scale: 5,
              transitionMs: 800,
              holdMs: 3000,
            },
            {
              x: -0.159,
              y: 0.224,
              w: 0.447,
              h: 0.25,
              scale: 5,
              transitionMs: 800,
              holdMs: 3000,
            },
            {
              x: 0.072,
              y: 0.545,
              w: 0.69,
              h: 0.5,
              scale: 5,
              transitionMs: 800,
              holdMs: 5000,
            },
            {
              x: -0.127,
              y: 0.22,
              w: 1.27,
              h: 0.85,
              scale: 1.3,
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
