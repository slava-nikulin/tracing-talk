import SlideFrame from '../components/SlideFrame'

// Ограничения 2 — Хранение/стоимость
export default function RestrictionsStore() {
  return (
    <SlideFrame
      title="Ограничения: storage overhead"
      gradient="linear-gradient(160deg,#050507 0%,#101020 35%,#152030 65%,#050507 100%)"
      notes={
        <>
          Помимо нагрузки на CPU растет нагрузка на хранилище. <br />
          Предположим, у нас генерируется 20 000 спанов/с, в сумме все 20К
          занимают, например, 1МБ. Тогда за сутки ~90 ГБ данных. Что много.
          <p>
            Снизить этот объем можно с помощью того же head-based sampling, а
            также, если настроить фильтрацию на стороне коллектора
          </p>
          Это называется Tail-based sampling
        </>
      }
    >
      <div class="mt-6 space-y-6 text-gray-200">
        <p class="text-lg">
          Миллионы трейсов — <span class="font-semibold">гигабайты</span> в
          сутки. Стоимость растёт с частотой и кардинальностью атрибутов.
        </p>

        <div class="grid gap-3 sm:grid-cols-3">
          <div class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="text-sm uppercase tracking-wide text-gray-400">
              Поток
            </div>
            <div class="mt-1 text-xl font-semibold">20 000 спанов/с</div>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="text-sm uppercase tracking-wide text-gray-400">
              Секунда
            </div>
            <div class="mt-1 text-xl font-semibold">≈ 1–1.2 МБ/с</div>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="text-sm uppercase tracking-wide text-gray-400">
              Сутки
            </div>
            <div class="mt-1 text-xl font-semibold">~ 90 ГБ/день</div>
          </div>
        </div>

        <ul class="space-y-3 text-base">
          <li class="flex items-start">
            <span class="mr-2 text-cyan-400">•</span>
            <span class="font-semibold mr-2">Head-based sampling:</span> простой
            и дешёвый, уменьшает общий объём.
          </li>
          <li class="flex items-start">
            <span class="mr-2 text-cyan-400">•</span>
            <span class="font-semibold mr-2">
              Tail-based sampling + Retention:
            </span>{' '}
            фильтрует спаны в коллекторе.
          </li>
        </ul>
      </div>
    </SlideFrame>
  )
}
