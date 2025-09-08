export default function Intro() {
  const bg = '/video/intro.mp4'

  return (
    <section
      // data-transition="slide"
      // data-background-transition="fade"
      data-background-video={bg}
      data-background-video-loop
      data-background-video-muted
      data-background-size="cover"
      data-background-opacity="0.6"
      data-background-color="rgb(0, 0, 0)"
    >
      <div class="fixed inset-0 z-10 flex items-center justify-center">
        <div class="ml-8 md:ml-12 translate-y-10 md:translate-y-40">
          <div class="bg-black/80 backdrop-blur-md backdrop-saturate-150 rounded-lg shadow-lg px-6 md:px-10 py-5 md:pb-12 md:pt-10 text-left border-2 border-zinc-600/60">
            <h1
              class="uppercase tracking-[0.2em] text-neutral-100 
                 text-3xl sm:text-3xl md:text-[2.25rem] xl:text-[2.50rem] my-0"
            >
              <span class="block">Distributed Tracing</span>
            </h1>

            <h3 class="text-sky-100/90 text-lg sm:text-xl md:text-2xl mb-2">
              Опыт внедрения и практики
            </h3>

            <p class="text-neutral-200 text-base sm:text-lg md:text-xl mb-0">
              Вячеслав Никулин · Freedom pay
            </p>
          </div>
        </div>
      </div>

      <aside class="notes">
        Вступление: кто я; end-to-end tracing. План: основы → trace/span → Kafka
        propagation → инструменты → sampling → кейсы. Формат: прикладной.
      </aside>
    </section>
  )
}
