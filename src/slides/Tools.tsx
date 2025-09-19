// src/slides/Tools.tsx
import SlideFrame from '../components/SlideFrame'

export default function Tools() {
  return (
    <SlideFrame
      title="Инструменты"
      gradient="linear-gradient(160deg,#050507 0%,#101020 35%,#152030 65%,#050507 100%)"
      notes={
        <>
          Сегодня стандартом де-факто является стек OpenTelemetry.
          <br />
          <b>Что нужно для работы:</b>
          <ul>
            <li>
              На стороне кода используем <b>OpenTelemetry SDK</b>.
            </li>
            <li>
              Далее поднимаем <b>OpenTelemetry Collector</b>.
            </li>
            <li>
              <b>Хранилищем</b> для трейсов может быть либо <i>Grafana Tempo</i>
              , либо <i>Jaeger</i>.
            </li>
            <li>
              И для визуализации используется либо <i>Grafana UI</i>, либо{' '}
              <i>Jaeger UI</i>.
            </li>
          </ul>
          У нас в команде для визуализации используется Grafana, а для хранения
          - Tempo
          <b>
            <i>Переход:</i>
          </b>{' '}
          Хорошо, выбрали инструменты. Теперь взглянем на примеры кода.
        </>
      }
    >
      <div class="grid gap-8 md:gap-10 md:grid-cols-2 text-neutral-100 my-0 px-5">
        {/* A. SDK */}
        <div>
          <h3 class="uppercase tracking-wider text-sm text-sky-200 mb-2 text-left mx-5">
            SDK
          </h3>
          <ul class="list-disc marker:text-sky-400 pl-5 space-y-2 text-lg text-left">
            <li>
              <span class="font-semibold">OpenTelemetry</span>
              <span class="ml-2 text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-200 border border-sky-500/30">
                стандарт
              </span>
            </li>
          </ul>
        </div>

        {/* B. Коллекторы */}
        <div>
          <h3 class="uppercase tracking-wider text-sm text-emerald-200 mb-2 text-left mx-5">
            Коллекторы
          </h3>
          <ul class="list-disc marker:text-emerald-400 pl-5 space-y-2 text-lg text-left">
            <li>
              <span class="font-semibold">OpenTelemetry Collector</span>
              <span class="ml-2 text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                стандарт
              </span>
            </li>
          </ul>
        </div>

        {/* C. Хранилище трейсинга */}
        <div>
          <h3 class="uppercase tracking-wider text-sm text-fuchsia-200 mb-2 text-left mx-5">
            Хранилище
          </h3>
          <ul class="list-disc marker:text-fuchsia-400 pl-5 space-y-2 text-lg text-left">
            <li>
              <span class="font-semibold">Tempo</span>{' '}
              <span class="text-neutral-300">（Grafana）</span>
            </li>
            <li>
              <span class="font-semibold">Jaeger backend</span>
            </li>
          </ul>
        </div>

        {/* D. UI / Визуализация */}
        <div>
          <h3 class="uppercase tracking-wider text-sm text-indigo-200 mb-2 text-left mx-5">
            UI
          </h3>
          <ul class="list-disc marker:text-indigo-400 pl-5 space-y-2 text-lg text-left">
            <li>
              <span class="font-semibold">Grafana Tempo</span> +{' '}
              <span class="font-semibold">Grafana UI</span>
            </li>
            <li>
              <span class="font-semibold">Jaeger UI</span>
            </li>
          </ul>
        </div>
      </div>
    </SlideFrame>
  )
}
