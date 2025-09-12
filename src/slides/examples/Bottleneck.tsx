import SlideFrame from '../../components/SlideFrame'

export default function Bottleneck() {
  return (
    <SlideFrame
      title="Пример: трейс с bottleneck"
      notes={
        <>
          Вставь прод-скрин. Видно «горячий» span по времени. Обсуди, где
          оптимизировать.
        </>
      }
    >
      <figure class="w-full my-0 mx-0">
        <img
          src="/img/trace-bottleneck.png"
          alt="Трейс с bottleneck"
          class="w-full max-w-[1100px] mx-auto rounded-lg border border-zinc-600/60 shadow-lg object-contain"
          loading="lazy"
        />
        <figcaption class="mt-3 text-sm text-neutral-300">
          Узкое место подсвечено длительностью; дочерние спаны короче.
        </figcaption>
      </figure>
    </SlideFrame>
  )
}
