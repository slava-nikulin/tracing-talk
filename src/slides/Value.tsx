import SlideFrame from '../components/SlideFrame'
import './usecases.css'

export default function UseCases() {
  return (
    <SlideFrame
      title="Ценность трейсинга"
      gradient="linear-gradient(160deg,#050507 0%,#101020 35%,#152030 65%,#050507 100%)"
      notes={
        <>
          Коротко: bottlenecks → куда оптимизировать; MTTR↓ → быстрее
          восстановление; прозрачность цепочек → меньше «чёрных ящиков».
          Пульсация у горлышка как метафора перегруза.
        </>
      }
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {/* бутылка: две кривые, сужение у шейки */}
            <path
              class="bnk-bottle"
              d="M40,80 H240 C300,80 320,110 360,130 C400,150 420,150 520,150"
            />
            <path
              class="bnk-bottle"
              d="M40,180 H240 C300,180 320,150 360,130 C400,110 420,110 520,110"
            />

            {/* точки: зелёные -> жёлтые -> оранжевые -> красные */}
            {/* зелёные */}
            <g>
              <circle class="bnk-dot g" cx="90" cy="120" r="10" />
              <circle class="bnk-dot g" cx="120" cy="100" r="10" />
              <circle class="bnk-dot g" cx="120" cy="140" r="10" />
              <circle class="bnk-dot g" cx="150" cy="120" r="10" />
              <circle class="bnk-dot g" cx="90" cy="160" r="10" />
              <circle class="bnk-dot g" cx="150" cy="160" r="10" />
            </g>

            {/* жёлтые */}
            <g>
              <circle class="bnk-dot y" cx="180" cy="100" r="10" />
              <circle class="bnk-dot y" cx="210" cy="120" r="10" />
              <circle class="bnk-dot y" cx="180" cy="140" r="10" />
              <circle class="bnk-dot y" cx="210" cy="160" r="10" />
              <circle class="bnk-dot y" cx="240" cy="140" r="10" />
            </g>

            {/* оранжевые */}
            <g>
              <circle class="bnk-dot o" cx="260" cy="120" r="10" />
              <circle class="bnk-dot o" cx="290" cy="130" r="10" />
              <circle class="bnk-dot o" cx="260" cy="150" r="10" />
              <circle class="bnk-dot o" cx="300" cy="150" r="10" />
            </g>

            {/* красные у шейки и после неё */}
            <g>
              <circle class="bnk-dot r" cx="330" cy="130" r="10" />
              {/* <circle class="bnk-dot r" cx="350" cy="132" r="10" /> */}
              <circle class="bnk-dot r" cx="370" cy="130" r="10" />
              <circle class="bnk-dot r" cx="540" cy="130" r="10" />
              <circle class="bnk-dot r" cx="490" cy="130" r="10" />
              <circle class="bnk-dot r" cx="430" cy="130" r="10" />
            </g>
          </svg>
        </div>
      </div>
    </SlideFrame>
  )
}
