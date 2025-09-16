// src/components/RectMagnifier.tsx
import { onMount, onCleanup, createSignal, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'

type Step = {
  x?: number
  y?: number
  w?: number
  h?: number // доли [0..1] видимой области
  scale?: number
  hide?: boolean // скрыть лупу и СНИТЬ blur на holdMs
  blur?: boolean // принудительно включить/выключить blur на шаге
  holdMs?: number
  transitionMs?: number
}

type ImgArea = {
  contentLeft: number
  contentTop: number
  contentW: number
  contentH: number
  offX: number
  offY: number
}

type Props = {
  targetRef: () => HTMLElement | undefined
  imgSelector?: string
  steps: Step[]
  blurOutside?: boolean
  blurPx?: number
  className?: string
  startDelayMs?: number // задержка перед стартом после показа секции
}

export default function RectMagnifier(props: Props): JSX.Element {
  // DOM
  let rootEl: HTMLDivElement | null = null
  let frameEl: HTMLDivElement | null = null
  let imgInFrameEl: HTMLImageElement | null = null

  // state
  let baseImg: HTMLImageElement | null = null
  const [running, setRunning] = createSignal(false)
  let timer: number | null = null
  let startDelayTimer: number | null = null
  let idx = 0
  let introNext = true
  let blurApplied = false
  let savedInlineFilter = '' // исходное inline-значение filter

  const steps = props.steps ?? []
  const blurPx = props.blurPx ?? 2
  const startDelay = props.startDelayMs ?? 800

  function clearTimer() {
    if (timer) window.clearTimeout(timer)
    timer = null
  }
  function clearStartDelay() {
    if (startDelayTimer) window.clearTimeout(startDelayTimer)
    startDelayTimer = null
  }

  function findBaseImg(): HTMLImageElement | null {
    const t = props.targetRef()
    if (!t) return null
    return (
      props.imgSelector
        ? t.querySelector(props.imgSelector)
        : t.querySelector('img')
    ) as HTMLImageElement | null
  }

  function measureImageArea(img: HTMLImageElement): ImgArea {
    const r = img.getBoundingClientRect()
    const cs = getComputedStyle(img)
    const fit = cs.objectFit as string
    const natW = img.naturalWidth || r.width
    const natH = img.naturalHeight || r.height

    let drawW = r.width,
      drawH = r.height
    if (fit === 'contain' || fit === 'scale-down') {
      const s = Math.min(r.width / natW, r.height / natH)
      drawW = natW * s
      drawH = natH * s
    } else if (fit === 'cover') {
      const s = Math.max(r.width / natW, r.height / natH)
      drawW = natW * s
      drawH = natH * s
    } else if (fit === 'none') {
      drawW = natW
      drawH = natH
    }
    const [ox, oy] = (cs.objectPosition || '50% 50%').split(/\s+/)
    const toFrac = (s: string) =>
      s.endsWith('%')
        ? +s.replace('%', '') / 100
        : s === 'left' || s === 'top'
        ? 0
        : s === 'right' || s === 'bottom'
        ? 1
        : 0.5
    const offX = (r.width - drawW) * toFrac(ox || '50%')
    const offY = (r.height - drawH) * toFrac(oy || '50%')
    return {
      contentLeft: r.left + offX,
      contentTop: r.top + offY,
      contentW: drawW,
      contentH: drawH,
      offX,
      offY,
    }
  }

  // Надёжное включение/снятие blur на оригинальном img
  function setBlur(on: boolean) {
    if (!baseImg) return
    if (on) {
      if (!blurApplied) {
        savedInlineFilter = baseImg.style.filter || ''
        blurApplied = true
      }
      baseImg.style.transition =
        baseImg.style.transition || 'filter 150ms linear'
      // ставим blur как inline-свойство
      baseImg.style.setProperty('filter', `blur(${blurPx}px)`)
    } else {
      // снять inline blur и вернуть исходное inline-значение
      if (blurApplied) {
        if (savedInlineFilter)
          baseImg.style.setProperty('filter', savedInlineFilter)
        else baseImg.style.removeProperty('filter')
      }
      blurApplied = false
    }
  }

  function syncInnerImageSize() {
    if (!baseImg || !imgInFrameEl) return
    const r = baseImg.getBoundingClientRect()
    imgInFrameEl.style.width = `${r.width}px`
    imgInFrameEl.style.height = `${r.height}px`
    imgInFrameEl.style.left = '0px'
    imgInFrameEl.style.top = '0px'
  }

  function centerTransform(
    a: ImgArea,
    x: number,
    y: number,
    w: number,
    h: number,
    s: number
  ) {
    const cxImg = a.offX + x + w / 2
    const cyImg = a.offY + y + h / 2
    const cxFr = w / 2
    const cyFr = h / 2
    return { tx: cxFr - s * cxImg, ty: cyFr - s * cyImg }
  }

  function applyVisibleStep(step: Step) {
    if (!baseImg || !frameEl || !imgInFrameEl) return
    const a = measureImageArea(baseImg)
    const xR = step.x ?? 0,
      yR = step.y ?? 0
    const wR = step.w ?? 0.3,
      hR = step.h ?? 0.2
    const s = step.scale ?? 2
    const dur = step.transitionMs ?? 650

    const x = xR * a.contentW,
      y = yR * a.contentH
    const w = wR * a.contentW,
      h = hR * a.contentH
    let fx = a.contentLeft + x,
      fy = a.contentTop + y

    if (fx < 0) {
      fx = 3
    }

    frameEl.style.transition = 'none'
    frameEl.style.left = `${fx}px`
    frameEl.style.top = `${fy}px`
    frameEl.style.width = `${w}px`
    frameEl.style.height = `${h}px`

    if (introNext) {
      const { tx: tx1, ty: ty1 } = centerTransform(a, x, y, w, h, 1)
      imgInFrameEl.style.transition = 'none'
      imgInFrameEl.style.transformOrigin = 'top left'
      imgInFrameEl.style.transform = `translate(${tx1}px, ${ty1}px) scale(1)`
      frameEl.style.opacity = '0'
      void frameEl.getBoundingClientRect()

      const { tx, ty } = centerTransform(a, x, y, w, h, s)
      frameEl.style.transition = `opacity 120ms`
      imgInFrameEl.style.transition = `transform ${dur}ms ease`
      frameEl.style.opacity = '1'
      imgInFrameEl.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`
      introNext = false
    } else {
      const { tx, ty } = centerTransform(a, x, y, w, h, s)
      frameEl.style.transition = `left ${dur}ms ease, top ${dur}ms ease, width ${dur}ms ease, height ${dur}ms ease, opacity 120ms`
      imgInFrameEl.style.transition = `transform ${dur}ms ease`
      frameEl.style.opacity = '1'
      imgInFrameEl.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`
    }
  }

  function applyStep(step: Step) {
    if (!baseImg) return
    // hide всегда снимает blur
    const wantBlur = step.hide ? false : step.blur ?? props.blurOutside ?? false
    setBlur(wantBlur)

    if (step.hide) {
      frameEl && (frameEl.style.opacity = '0')
      introNext = true
      return
    }
    applyVisibleStep(step)
  }

  function run() {
    if (!running() || !steps.length) return
    const s = steps[idx % steps.length]
    applyStep(s)
    const dur = s.transitionMs ?? 650
    const hold = s.holdMs ?? 1000
    clearTimer()
    timer = window.setTimeout(() => {
      idx++
      run()
    }, dur + hold)
  }

  async function start() {
    if (running()) return
    const t = props.targetRef()
    if (!t || !steps.length || !rootEl || !frameEl || !imgInFrameEl) return

    // задержка, чтобы закончилась анимация смены слайда и layout стабилизировался
    clearStartDelay()
    await new Promise<void>((res) => {
      startDelayTimer = window.setTimeout(() => res(), startDelay)
    })

    // повторная проверка на случай мгновенного ухода со слайда
    const section = t.closest('section') as HTMLElement | null
    const hidden =
      !section ||
      section.hasAttribute('hidden') ||
      section.getAttribute('aria-hidden') === 'true'
    if (hidden) return

    baseImg = findBaseImg()
    if (!baseImg) return
    if (!baseImg.complete || !baseImg.naturalWidth) {
      try {
        await (baseImg.decode
          ? baseImg.decode()
          : new Promise<void>((r) => (baseImg!.onload = () => r())))
      } catch {}
    }

    // подготовка
    imgInFrameEl.src = baseImg.currentSrc || baseImg.src
    syncInnerImageSize()
    idx = 0
    introNext = true

    rootEl.style.display = 'block'
    setRunning(true)
    run()
    window.addEventListener('resize', onResize, { passive: true })
  }

  function stop() {
    if (!running() && !startDelayTimer) return
    setRunning(false)
    clearTimer()
    clearStartDelay()
    window.removeEventListener('resize', onResize)
    setBlur(false) // гарантированно снять blur
    if (frameEl) frameEl.style.opacity = '0'
    if (rootEl) rootEl.style.display = 'none'
    idx = 0
    introNext = true
    baseImg = null
  }

  function onResize() {
    syncInnerImageSize()
    if (running()) {
      const cur = steps[idx % steps.length]
      if (!cur?.hide) applyVisibleStep(cur)
    }
  }

  onMount(() => {
    const t = props.targetRef()
    const section = t?.closest('section') as HTMLElement | null
    if (!section) return

    const check = () => {
      const visible =
        section.classList.contains('present') &&
        !section.hasAttribute('hidden') &&
        !(section.getAttribute('aria-hidden') === 'true')
      if (!visible) stop()
      else start()
    }

    const mo = new MutationObserver(check)
    mo.observe(section, {
      attributes: true,
      attributeFilter: ['hidden', 'aria-hidden', 'class'],
    })
    check()

    onCleanup(() => {
      mo.disconnect()
      stop()
    })
  })

  return (
    <Portal mount={document.body}>
      <div
        ref={(el) => (rootEl = el)}
        style={{
          position: 'fixed',
          inset: '0',
          'pointer-events': 'none',
          'z-index': 2147483647,
          overflow: 'visible',
          display: 'none',
        }}
      >
        <div
          ref={(el) => (frameEl = el)}
          class={
            props.className ?? 'rounded-lg ring-2 ring-red-400/80 bg-black/10'
          }
          style={{ position: 'fixed', overflow: 'hidden', opacity: 0 }}
        >
          <img
            ref={(el) => (imgInFrameEl = el)}
            alt=""
            style={{ position: 'absolute' }}
          />
        </div>
      </div>
    </Portal>
  )
}
