import SlideFrame from '../components/SlideFrame'
import './css/value.css'

export default function UseCases() {
  return (
    <SlideFrame
      title="Ценность трейсинга"
      gradient="linear-gradient(160deg,#050507 0%,#101020 35%,#152030 65%,#050507 100%)"
      notes={
        <>
          Итак, трейсинг показывает, где именно узкое место или ошибка, а также
          помогает оптимизировать код. Это полезно разработчикам, но также даёт
          два ключевых бизнес-эффекта.
          <ul>
            <li>
              <b>Во-первых,</b> это cнижение{' '}
              <i>среднего времени на устранение инцидента — MTTR</i>, а также
              увеличение скорости <i>анализа первопричины — RCA</i>.
            </li>
            <li>
              <b>Во-вторых,</b> трейсинг даёт <i>прозрачность</i> распределённых
              вызовов и границ сервисов, что упрощает коммуникацию команд.
            </li>
          </ul>
          Все это экономит время и деньги компании.
          <b>
            <i>Переход:</i>
          </b>{' '}
          Окей, теперь посмотрим, из чего складывается типичный инструментарий
          трейсинга.
        </>
      }
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-0">
        <div class="grid md:grid-cols-2 gap-8">
          <ol class="list-disc marker:text-fuchsia-500 list-outside pl-6 text-left text-xl space-y-5 text-amber-50">
            <li>Быстрый поиск bottlenecks и ошибок</li>
            <li>
              Снижение MTTR(
              <span class="italic text-amber-100">Mean Time to Repair</span>) и
              ускорение RCA(
              <span class="italic text-amber-100">Root Cause Analysis</span>)
            </li>
            <li>Прозрачность распределённых вызовов и границ сервисов</li>
          </ol>

          <svg
            viewBox="0 0 560 260"
            class="bnk-svg"
            role="img"
            aria-label="Bottleneck"
          >
            <defs>
              {/* <!-- мягкое свечение для точек --> */}
              <filter
                id="dotGlow"
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
                color-interpolation-filters="sRGB"
              >
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <path
                id="tube"
                d="M40,80 H240 C300,80 320,110 360,130 C400,150 420,150 520,150
         M40,180 H240 C300,180 320,150 360,130 C400,110 420,110 520,110"
              />
            </defs>

            <use
              href="#tube"
              fill="none"
              stroke="hsl(195 100% 72% / .28)"
              stroke-width="22"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            />
            <use
              href="#tube"
              fill="none"
              stroke="hsl(195 100% 72%)"
              stroke-width="7"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            />

            <g filter="url(#dotGlow)">
              {/* <!-- green --> */}
              <circle class="bnk-dot g" cx="90" cy="120" r="10" />
              <circle class="bnk-dot g" cx="120" cy="100" r="10" />
              <circle class="bnk-dot g" cx="120" cy="140" r="10" />
              <circle class="bnk-dot g" cx="150" cy="120" r="10" />
              <circle class="bnk-dot g" cx="90" cy="160" r="10" />
              <circle class="bnk-dot g" cx="150" cy="160" r="10" />
              {/* <!-- yellow --> */}
              <circle class="bnk-dot y" cx="180" cy="100" r="10" />
              <circle class="bnk-dot y" cx="210" cy="120" r="10" />
              <circle class="bnk-dot y" cx="180" cy="140" r="10" />
              <circle class="bnk-dot y" cx="210" cy="160" r="10" />
              <circle class="bnk-dot y" cx="230" cy="100" r="10" />
              <circle class="bnk-dot y" cx="240" cy="135" r="10" />
              {/* <!-- orange --> */}
              <circle class="bnk-dot o" cx="260" cy="110" r="10" />
              <circle class="bnk-dot o" cx="290" cy="120" r="10" />
              <circle class="bnk-dot o" cx="270" cy="150" r="10" />
              <circle class="bnk-dot o" cx="300" cy="150" r="10" />
              {/* <!-- red --> */}
              <circle class="bnk-dot r" cx="330" cy="130" r="10" />
              <circle class="bnk-dot r" cx="365" cy="130" r="10" />
              <circle class="bnk-dot r" cx="430" cy="130" r="10" />
              <circle class="bnk-dot r" cx="490" cy="130" r="10" />
              <circle class="bnk-dot r" cx="540" cy="130" r="10" />
            </g>
          </svg>
        </div>
      </div>
    </SlideFrame>
  )
}
