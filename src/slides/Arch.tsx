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
    const T_SPAN = 1300
    const T_SERVICE_GAP = 1400
    const T_AFTER = 1000
    const T_PULSE = 650

    // подготовка путей к анимации dashoffset
    async function primeAnimPath(groupId: string, speed = 0.45) {
      const p = document.querySelector<SVGPathElement>(`#${groupId} .anim`)
      if (!p) return null
      const L = p.getTotalLength()
      p.style.setProperty('--dash', `${L}`)
      p.style.setProperty('--off', `${L}`)
      // длительность пропорциональна длине пути
      const durMs = Math.max(200, Math.round(L / speed))
      p.style.setProperty('--dur', `${durMs}ms`)
      // один кадр на фиксацию стартовых значений
      await new Promise((r) => requestAnimationFrame(r))
      return p
    }

    async function pulseUplink(id: string, durMs = 3000) {
      await sleep(T_SPAN) // твоя синхронизация
      const g = document.getElementById(id)
      if (!g) return
      g.style.setProperty('--dur', `${durMs}ms`)
      // один кадр, чтобы браузер зафиксировал стартовые стили (offset=1)
      requestAnimationFrame(() => g.classList.add('send'))
    }

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

    async function run() {
      while (running && !disposed) {
        resetAll()

        await sleep(T_SPAN)

        add($('.svc--collector'), 'active')

        // === A ===
        add($('.svc--a'), 'active')
        await sleep(T_SPAN)
        if (!running || disposed) break
        add($('.svc--a .dot.a1'), 'active')
        add($('.svc--a .label.a1'), 'active')
        await sleep(T_SPAN)
        if (!running || disposed) break
        add($('.svc--a .dot.a2'), 'active')
        add($('.svc--a .label.a2'), 'active')

        // экспорт из A → Collector (uplink-a)
        await pulseUplink('uplink-a', 800)

        await sleep(T_SERVICE_GAP)
        if (!running || disposed) break

        // === B ===
        add($('.svc--b'), 'active')
        await sleep(T_SPAN)
        if (!running || disposed) break
        add($('.svc--b .dot.b1'), 'active')
        add($('.svc--b .label.b1'), 'active')
        await sleep(T_SPAN)
        if (!running || disposed) break
        add($('.svc--b .dot.b2'), 'active')
        add($('.svc--b .label.b2'), 'active')

        // экспорт из B → Collector (uplink-b)
        await pulseUplink('uplink-b', 400)

        await sleep(T_SERVICE_GAP)
        if (!running || disposed) break

        // === C ===
        add($('.svc--c'), 'active')
        await sleep(T_SPAN)
        if (!running || disposed) break
        add($('.svc--c .dot.c1'), 'active')
        add($('.svc--c .label.c1'), 'active')
        await sleep(T_SPAN)
        if (!running || disposed) break
        add($('.svc--c .dot.c2'), 'active')
        add($('.svc--c .label.c2'), 'active')

        // экспорт из C → Collector (uplink-c) и лёгкая подсветка коллектора
        await pulseUplink('uplink-c', 800)

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
              Здесь я попытался заанимировать весь процесс, давайте разберем,
              что здесь происходит.
            </li>
            <li>
              В основе трейсинга лежит <i>traceID</i> — это идентификатор
              запроса, который передаётся через все сервисы.
            </li>
            <li>
              Сначала каждый сервис создаёт <i>span</i> — это{' '}
              <i>отрезок операции</i> внутри <i>trace</i>.
            </li>
            <li>Спаны батчами отправляются в коллектор</li>
            <li>
              <p>
                Перед вызовом следующего сервиса, в <b>контекст запроса</b>,
                добавляется <i>TraceID</i> и <i>SpanID</i> вызывающей функции
              </p>
              Затем контекст передаётся по цепочке. Этот процесс называется{' '}
              <i>пропагация</i>.
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
