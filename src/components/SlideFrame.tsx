import { type JSX, onMount } from 'solid-js'

type SlideFrameProps = {
  title?: JSX.Element | string
  notes?: JSX.Element | string
  children?: JSX.Element
  gradient?: string
  bgColor?: string
  transition?: string
  backgroundTransition?: string
  innerClass?: string
}

export default function SlideFrame(props: SlideFrameProps) {
  let sectionRef!: HTMLElement

  onMount(() => {
    const g =
      props.gradient ??
      'linear-gradient(160deg,#050507 0%,#101020 35%,#152030 65%,#050507 100%)'
    sectionRef.setAttribute('data-background-gradient', g)
    // sectionRef.setAttribute('data-transition', props.transition ?? 'slide')
    sectionRef.setAttribute('data-background-color', props.bgColor ?? '#000000')
    // sectionRef.setAttribute(
    //   'data-background-transition',
    //   'fade'
    // )
    // if (props.backgroundTransition) {
    //   sectionRef.setAttribute(
    //     'data-background-transition',
    //     props.backgroundTransition
    //   )
    // }
  })

  return (
    <section ref={sectionRef}>
      <div class="w-full h-full p-6 md:p-8">
        <div
          class={`w-full h-full rounded-lg shadow-lg border-2 border-zinc-600/60
                      bg-black/70 backdrop-blur-md backdrop-saturate-150
                      grid grid-rows-[auto,1fr] gap-4 md:gap-6 overflow-hidden ${
                        props.innerClass ?? ''
                      }`}
        >
          {props.title && (
            <header class="px-4 md:px-6 pt-4 md:pt-5">
              <h2
                class="neon-soft text-left uppercase tracking-[0.06em]
                         text-neutral-100/95 leading-tight
                         text-2xl sm:text-3xl md:text-[2rem]"
              >
                {props.title}
              </h2>
            </header>
          )}
          <main class="px-4 md:px-6 pb-5 md:pb-7">{props.children}</main>
        </div>
      </div>

      {props.notes && <aside class="notes">{props.notes}</aside>}
    </section>
  )
}
