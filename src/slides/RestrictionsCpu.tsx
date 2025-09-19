import SlideFrame from '../components/SlideFrame'

// Ограничения 1 — CPU/память
export default function RestrictionsCPU() {
  return (
    <SlideFrame
      title="Ограничения: CPU overhead"
      notes={
        <>
          Теперь немного о грустном
          <br />
          Cоздание и экспорт каждого спана добавляют нагрузку на CPU. В среднем
          прирост CPU при <i>полном</i> трейсинге: 10–40%. Это очень много.
          Создание самого спана в - это дешевая операция.
          <p>
            Основная причина оверхеда - BatchSpanProcessor, который формирует,
            сериализует, кодирует, батч со спанами перед экспортом.
          </p>
          <br />
          Чтобы снизить этот оверхед нужно включать семплирование.
        </>
      }
    >
      <div class="space-y-6 text-gray-200 my-0">
        <p class="text-lg">
          Создание и экспорт <span class="font-semibold">каждого спана</span>{' '}
          добавляют нагрузку на CPU.
        </p>

        <div class="rounded-xl border border-white/10 bg-white/5 p-4">
          <div class="text-sm uppercase tracking-wide text-gray-400">
            Типовой overhead при full tracing
          </div>
          <div class="mt-2 text-2xl font-semibold">
            CPU: 10–40%{' '}
            <span class="text-gray-400 text-base">(чаще 20–35%)</span>
          </div>
          <div class="mt-1 text-sm text-gray-300">
            Значения зависят от SDK(языка) и нагрузки.
          </div>
        </div>

        <ul class="space-y-3 text-base">
          <li class="flex items-start">
            <span class="mr-2 text-cyan-400">•</span>
            <span class="italic mr-2">BatchSpanProcessor</span>
            <span>
              – основной источник overhead: сериализация/encoding, I/O syscalls.
            </span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 text-cyan-400">•</span>
            <span class="mr-2">Решение:</span>
            <span class="font-semibold mr-2">тестируйте в своих условиях</span>
            <span>и подбирайте rate для Head-based sampling.</span>
          </li>
        </ul>
      </div>
    </SlideFrame>
  )
}
