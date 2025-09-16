import { onCleanup, onMount } from 'solid-js'
import SlideFrame from '../components/SlideFrame'
import './css/arch.css'

export default function TracingArch() {
  let root!: HTMLDivElement

  onMount(() => {
    const t = root
    if (!t) return
    const section = t.closest('section') as HTMLElement | null
    if (!section) return

    let disposed = false
    let running = false

    const start = () => {
      if (running || disposed) return
      running = true
      run()
    }
    const stopAll = () => {
      if (!running) return
      running = false
      resetAll()
    }

    const check = (): boolean => {
      const visible =
        section.classList.contains('present') &&
        !section.hasAttribute('hidden') &&
        section.getAttribute('aria-hidden') !== 'true'
      if (visible) start()
      else stopAll()
      return visible
    }

    const mo = new MutationObserver(() => check())
    mo.observe(section, {
      attributes: true,
      attributeFilter: ['hidden', 'aria-hidden', 'class'],
    })
    check()

    const $ = (s: string) => root.querySelector<HTMLElement>(s)!
    const add = (e: Element | null, c: string) => e && e.classList.add(c)
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

    // ваши константы
    const T_SPAN = 500
    const T_SERVICE_GAP = 1400
    const T_AFTER = 1000

    function resetAll() {
      root
        .querySelectorAll('.active,.send')
        .forEach((el) => el.classList.remove('active', 'send'))
      root
        .querySelectorAll('.span-label')
        .forEach((el) => el.classList.remove('active'))
    }

    async function run() {
      while (running && !disposed) {
        resetAll()

        await sleep(T_SPAN * 3)

        // A
        add($('.svc--a'), 'active')
        await sleep(T_SPAN * 2)
        if (!running || disposed) break
        add($('.svc--a .dot.a1'), 'active')
        add($('.svc--a .label.a1'), 'active')
        await sleep(T_SPAN)
        if (!running || disposed) break
        add($('.svc--a .dot.a2'), 'active')
        add($('.svc--a .label.a2'), 'active')

        await sleep(T_SERVICE_GAP)
        if (!running || disposed) break

        // B
        add($('.svc--b'), 'active')
        await sleep(T_SPAN * 2)
        if (!running || disposed) break
        add($('.svc--b .dot.b1'), 'active')
        add($('.svc--b .label.b1'), 'active')
        await sleep(T_SPAN)
        if (!running || disposed) break
        add($('.svc--b .dot.b2'), 'active')
        add($('.svc--b .label.b2'), 'active')

        await sleep(T_SERVICE_GAP)
        if (!running || disposed) break

        // C
        add($('.svc--c'), 'active')
        await sleep(T_SPAN * 2)
        if (!running || disposed) break
        add($('.svc--c .dot.c1'), 'active')
        add($('.svc--c .label.c1'), 'active')
        await sleep(T_SPAN)
        if (!running || disposed) break
        add($('.svc--c .dot.c2'), 'active')
        add($('.svc--c .label.c2'), 'active')

        await sleep(T_SERVICE_GAP)
        if (!running || disposed) break
        add($('.svc--collector'), 'active')
        add($('.collector-dot'), 'active')

        await sleep(T_AFTER * 1.5)
      }
    }

    onCleanup(() => {
      disposed = true
      stopAll()
      mo.disconnect()
    })
  })

  return (
    <SlideFrame
      title="Как работает distributed tracing"
      gradient="linear-gradient(160deg,#050507 0%,#101020 35%,#152030 65%,#050507 100%)"
      notes={
        <>
          <ul>
            <li>
              В основе трейсинга лежит <i>traceID</i> — идентификатор запроса,
              который передаётся через все сервисы.
            </li>
            <li>
              Каждый сервис создаёт <i>span</i> — отрезок операции внутри{' '}
              <i>trace</i> — и добавляет его в <b>контекст запроса</b>.
            </li>
            <li>
              Далее <b>контекст запроса</b> вместе с <i>traceID</i> передаётся в
              следующий сервис. Этот процесс называется <i>пропагация</i>.
            </li>
            <li>
              В результате <i>span-ы</i> со всех сервисов формируют цепочку
              запроса. Эта цепочка с общим <i>traceID</i> отправляется в
              коллектор, который агрегирует и сохраняет её как единый трейс.
            </li>
          </ul>
          <p>
            <b>
              <i>Переход:</i>
            </b>{' '}
            Посмотрим, какие задачи решает трейсинг.
          </p>
        </>
      }
    >
      <div ref={root} class="w-full h-full">
        <svg
          class="w-full h-full"
          viewBox="0 0 1024 520"
          role="img"
          aria-label="Distributed tracing flow"
        >
          {/* ===== СЕРВИС A ===== */}
          <g class="svc svc--a" transform="translate(40,200)">
            <rect
              class="svc-frame a"
              x="0"
              y="0"
              width="280"
              height="180"
              rx="18"
            />
            <text class="svc-title" x="0" y="-20">
              SERVICE A
            </text>

            {/* точки-спаны: по 2 на сервис */}
            <circle class="dot a1" cx="85" cy="110" r="7" />
            <text
              class="span-label label a1"
              x="85"
              y="90"
              text-anchor="middle"
            >
              spanID
            </text>
            <circle class="dot a2" cx="195" cy="110" r="7" />
            <text
              class="span-label label a2"
              x="195"
              y="90"
              text-anchor="middle"
            >
              spanID
            </text>

            {/* traceID над рамкой — появляется при активации сервиса */}
            <g class="trace-badge">
              <rect
                class="badge"
                x="70"
                y="-80"
                width="140"
                height="28"
                rx="12"
              />
              <text class="badge-text" x="140" y="-62" text-anchor="middle">
                traceID
              </text>
            </g>
          </g>

          {/* ===== СЕРВИС B ===== */}
          <g class="svc svc--b" transform="translate(372,200)">
            <rect
              class="svc-frame b"
              x="0"
              y="0"
              width="280"
              height="180"
              rx="18"
            />
            <text class="svc-title" x="0" y="-20">
              SERVICE B
            </text>

            <circle class="dot b1" cx="85" cy="110" r="7" />
            <text
              class="span-label label b1"
              x="85"
              y="90"
              text-anchor="middle"
            >
              spanID
            </text>
            <circle class="dot b2" cx="195" cy="110" r="7" />
            <text
              class="span-label label b2"
              x="195"
              y="90"
              text-anchor="middle"
            >
              spanID
            </text>

            <g class="trace-badge">
              <rect
                class="badge"
                x="70"
                y="-80"
                width="140"
                height="28"
                rx="12"
              />
              <text class="badge-text" x="140" y="-62" text-anchor="middle">
                traceID
              </text>
            </g>
          </g>

          {/* ===== СЕРВИС C ===== */}
          <g class="svc svc--c" transform="translate(704,200)">
            <rect
              class="svc-frame c"
              x="0"
              y="0"
              width="280"
              height="180"
              rx="18"
            />
            <text class="svc-title" x="0" y="-20">
              SERVICE C
            </text>

            <circle class="dot c1" cx="85" cy="110" r="7" />
            <text
              class="span-label label c1"
              x="85"
              y="90"
              text-anchor="middle"
            >
              spanID
            </text>
            <circle class="dot c2" cx="195" cy="110" r="7" />
            <text
              class="span-label label c2"
              x="195"
              y="90"
              text-anchor="middle"
            >
              spanID
            </text>

            <g class="trace-badge">
              <rect
                class="badge"
                x="70"
                y="-80"
                width="140"
                height="28"
                rx="12"
              />
              <text class="badge-text" x="140" y="-62" text-anchor="middle">
                traceID
              </text>
            </g>
          </g>

          {/* ===== ФРАГМЕНТ 2: COLLECTOR сверху справа от Service C ===== */}

          <g
            class="svc svc--collector collector-fragment"
            transform="translate(828,5)"
          >
            <rect
              class="svc-frame collector"
              x="0"
              y="0"
              width="156"
              height="88"
              rx="14"
            />
            <text
              class="svc-title collector-title"
              x="78"
              y="32"
              text-anchor="middle"
            >
              COLLECTOR
            </text>
            <circle class="dot collector-dot" cx="77" cy="55" r="7" />
          </g>
        </svg>
      </div>
    </SlideFrame>
  )
}
