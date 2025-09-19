import { onCleanup, onMount } from 'solid-js'
import SlideFrame from '../components/SlideFrame'
import './css/arch.css'

const T_SPAN = 1300
const T_SERVICE_GAP = 1400
const T_AFTER = 1000

export default function TracingArch() {
  let root!: HTMLDivElement

  const add = (e: Element | null, c: string) => e && e.classList.add(c)
  const $ = (s: string) => root.querySelector<HTMLElement>(s)!

  onMount(() => {
    const t = root
    if (!t) return
    const section = t.closest('section') as HTMLElement | null
    if (!section) return

    let disposed = false
    let running = false
    let runToken = 0

    const timeouts = new Set<number>()
    const rafs = new Set<number>()

    const addTimeout = (cb: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id)
        cb()
      }, ms)
      timeouts.add(id)
      return id
    }
    const addRAF = (cb: FrameRequestCallback) => {
      const id = window.requestAnimationFrame((ts) => {
        rafs.delete(id)
        cb(ts)
      })
      rafs.add(id)
      return id
    }
    const clearAllAsync = () => {
      timeouts.forEach((id) => window.clearTimeout(id))
      timeouts.clear()
      rafs.forEach((id) => window.cancelAnimationFrame(id))
      rafs.clear()
    }

    const sleep = (ms: number, token: number) =>
      new Promise<void>((resolve) => {
        addTimeout(() => {
          if (!disposed && running && token === runToken) resolve()
        }, ms)
      })

    function resetAll() {
      root
        .querySelectorAll('.send')
        .forEach((el) => el.classList.remove('active', 'send'))
      root
        .querySelectorAll(
          '.span-label,.dot,.svc--a,.svc--b,.svc--c,.svc--collector'
        )
        .forEach((el) => el.classList.remove('active'))
      ;['uplink-a', 'uplink-b', 'uplink-c'].forEach((id) => {
        const g = document.getElementById(id)
        if (g) g.style.removeProperty('--dur')
        // верхний слой вернётся к stroke-dashoffset:1 по CSS при следующем цикле
      })
    }

    const start = () => {
      if (running || disposed) return
      running = true
      runToken++
      run(runToken)
    }
    const stopAll = () => {
      if (!running) return
      running = false
      clearAllAsync()
      resetAll()
    }

    async function pulseUplink(id: string, durMs = 3000, token: number) {
      await sleep(T_SPAN, token)
      if (!running || disposed || token !== runToken) return
      const g = document.getElementById(id)
      if (!g) return
      g.style.setProperty('--dur', `${durMs}ms`)
      addRAF(() => {
        if (!running || disposed || token !== runToken) return
        g.classList.add('send')
      })
    }

    async function run(token: number) {
      while (running && !disposed && token === runToken) {
        resetAll()

        await sleep(T_SPAN, token)
        if (!running || disposed || token !== runToken) break

        add($('.svc--collector'), 'active')

        // === A ===
        add($('.svc--a'), 'active')
        await sleep(T_SPAN, token)
        if (!running || disposed || token !== runToken) break
        add($('.svc--a .dot.a1'), 'active')
        add($('.svc--a .label.a1'), 'active')
        await sleep(T_SPAN, token)
        if (!running || disposed || token !== runToken) break
        add($('.svc--a .dot.a2'), 'active')
        add($('.svc--a .label.a2'), 'active')
        await pulseUplink('uplink-a', 800, token)

        await sleep(T_SERVICE_GAP, token)
        if (!running || disposed || token !== runToken) break

        // === B ===
        add($('.svc--b'), 'active')
        await sleep(T_SPAN, token)
        if (!running || disposed || token !== runToken) break
        add($('.svc--b .dot.b1'), 'active')
        add($('.svc--b .label.b1'), 'active')
        await sleep(T_SPAN, token)
        if (!running || disposed || token !== runToken) break
        add($('.svc--b .dot.b2'), 'active')
        add($('.svc--b .label.b2'), 'active')
        await pulseUplink('uplink-b', 400, token)

        await sleep(T_SERVICE_GAP, token)
        if (!running || disposed || token !== runToken) break

        // === C ===
        add($('.svc--c'), 'active')
        await sleep(T_SPAN, token)
        if (!running || disposed || token !== runToken) break
        add($('.svc--c .dot.c1'), 'active')
        add($('.svc--c .label.c1'), 'active')
        await sleep(T_SPAN, token)
        if (!running || disposed || token !== runToken) break
        add($('.svc--c .dot.c2'), 'active')
        add($('.svc--c .label.c2'), 'active')
        await pulseUplink('uplink-c', 800, token)

        await sleep(T_AFTER * 1.5, token)
      }
    }

    // ваш resetAll без изменений

    // видимость слайда (обновлено)
    const check = (): boolean => {
      const visible =
        section.classList.contains('present') &&
        !section.hasAttribute('hidden') &&
        section.getAttribute('aria-hidden') !== 'true'
      if (visible) start()
      else stopAll()
      return visible
    }

    // дебаунсируем частые мутации во время переходов
    let checkRAF = 0
    const scheduleCheck = () => {
      if (checkRAF) return
      checkRAF = addRAF(() => {
        checkRAF = 0
        check()
      })
    }

    const mo = new MutationObserver(() => scheduleCheck())
    mo.observe(section, {
      attributes: true,
      attributeFilter: ['hidden', 'aria-hidden', 'class'],
    })
    check()

    // Reveal события (если доступен глобальный Reveal)
    if ((window as any).Reveal?.on) {
      const onSlideEnd = (e: any) => {
        if (e.currentSlide === section) start()
        else stopAll()
      }
      ;(window as any).Reveal.on('slidetransitionend', onSlideEnd)
      onCleanup(() =>
        (window as any).Reveal.off?.('slidetransitionend', onSlideEnd)
      )
    }

    // Пауза при скрытии вкладки
    const onVis = () => {
      if (document.hidden) stopAll()
      else check()
    }
    document.addEventListener('visibilitychange', onVis)

    onCleanup(() => {
      disposed = true
      stopAll()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVis)
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
              На этом слайде я попытался заанимировать весь процесс, разберем,
              что здесь происходит.
            </li>
            <li>
              В основе трейсинга лежит <i>traceID</i> — это идентификатор
              запроса.
            </li>
            <li>
              В процессе работы каждый сервис создаёт <i>span</i> — это{' '}
              <i>отрезок операции</i> внутри <i>trace</i>.
            </li>
            <li>
              Все созданные спаны батчами асинхронно отправляются в коллектор
            </li>
            <li>
              Перед вызовом следующего сервиса, в <b>контекст запроса</b>,
              добавляется <i>TraceID</i> и <i>SpanID</i> вызывающей функции.
            </li>
            <li>
              Далее контекст передаётся по цепочке в следующий сервис. Этот
              процесс называется <i>пропагация</i>.
            </li>
            <li>
              В результате <i>span-ы</i> со всех сервисов агрегируются в
              коллекторе, который сохраняет все как единый трейс.
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
          {/* <!-- ===== СЕРВИС A ===== --> */}
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
            <circle class="dot a1" cx="85" cy="110" r="7" />
            <text
              class="span-label label a1"
              x="85"
              y="90"
              text-anchor="middle"
            >
              spanID_1
            </text>
            <circle class="dot a2" cx="195" cy="110" r="7" />
            <text
              class="span-label label a2"
              x="195"
              y="90"
              text-anchor="middle"
            >
              spanID_2
            </text>
            <g class="trace-badge">
              <rect
                class="badge"
                x="60"
                y="212"
                width="160"
                height="48"
                rx="12"
              />
              <text class="badge-text" x="140" y="230" text-anchor="start">
                <tspan x="70" dy="1">
                  traceID
                </tspan>
                <tspan x="70" dy="1.5em">
                  parent_span=
                </tspan>
                <tspan class="null">NULL</tspan>
              </text>
            </g>
          </g>

          {/* <!-- ===== СЕРВИС B ===== --> */}
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
              spanID_3
            </text>
            <circle class="dot b2" cx="195" cy="110" r="7" />
            <text
              class="span-label label b2"
              x="195"
              y="90"
              text-anchor="middle"
            >
              spanID_4
            </text>
            <g class="trace-badge">
              <rect
                class="badge"
                x="47"
                y="212"
                width="190"
                height="48"
                rx="12"
              />
              <text class="badge-text" x="140" y="230" text-anchor="start">
                <tspan x="57" dy="1">
                  traceID
                </tspan>
                <tspan x="57" dy="1.5em">
                  parent_span=
                </tspan>
                <tspan class="parent-val">spanID_2</tspan>
              </text>
            </g>
          </g>

          {/* <!-- ===== СЕРВИС C ===== --> */}
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
              spanID_5
            </text>
            <circle class="dot c2" cx="195" cy="110" r="7" />
            <text
              class="span-label label c2"
              x="195"
              y="90"
              text-anchor="middle"
            >
              spanID_6
            </text>
            <g class="trace-badge">
              <rect
                class="badge"
                x="47"
                y="212"
                width="190"
                height="48"
                rx="12"
              />
              <text class="badge-text" x="140" y="230" text-anchor="start">
                <tspan x="57" dy="1">
                  traceID
                </tspan>
                <tspan x="57" dy="1.5em">
                  parent_span=
                </tspan>
                <tspan class="parent-val">spanID_4</tspan>
              </text>
            </g>
          </g>

          {/* <!-- ===== COLLECTOR В ЦЕНТРЕ ===== --> */}
          <g
            class="svc svc--collector collector-fragment"
            transform="translate(434,18)"
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
              y="50"
              text-anchor="middle"
            >
              COLLECTOR
            </text>
          </g>

          {/* <!-- ===== УГЛОВЫЕ UPLINK-СТРЕЛКИ A/B/C → COLLECTOR ===== --> */}
          {/* <path id="uplink-a" class="uplink" d="M180,198 L180,65 L432,65" />
          <path id="uplink-b" class="uplink" d="M512,198 L512,108" />
          <path id="uplink-c" class="uplink" d="M844,198 L844,65 L592,65" /> */}

          {/* <!-- A → COLLECTOR --> */}
          <g id="uplink-a" class="uplink" style="color: var(--c-a)">
            <path class="bg" d="M180,200 L180,65 L432,65" />
            <path
              class="anim"
              d="M180,200 L180,65 L432,65"
              pathLength="1"
              marker-end="url(#arrow)"
            />
          </g>

          <g id="uplink-b" class="uplink" style="color: var(--c-b)">
            <path class="bg" d="M512,200 L512,108" />
            <path
              class="anim"
              d="M512,200 L512,108"
              pathLength="1"
              marker-end="url(#arrow)"
            />
          </g>

          <g id="uplink-c" class="uplink" style="color: var(--c-c)">
            <path class="bg" d="M844,200 L844,65 L592,65" />
            <path
              class="anim"
              d="M844,200 L844,65 L592,65"
              pathLength="1"
              marker-end="url(#arrow)"
            />
          </g>
        </svg>
      </div>
    </SlideFrame>
  )
}
