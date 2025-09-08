import { onCleanup, onMount } from 'solid-js'
import Reveal from 'reveal.js'
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js'
import RevealZoom from 'reveal.js/plugin/zoom/zoom.esm.js'
import RevealSearch from 'reveal.js/plugin/search/search.esm.js'
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm.js'
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm.js'
// import 'reveal.js/dist/reset.css'
import 'reveal.js/dist/reveal.css'
// import 'reveal.js/dist/theme/black.css'
import 'reveal.js/plugin/highlight/monokai.css'

type Props = { children: any }

export default function RevealRoot(props: Props) {
  let deck: Reveal.Api | null = null
  let host!: HTMLDivElement
  let handleEnsure: EventListener

  const ensureBackgroundVideoPlaying = () => {
    // Scope query to this deck's host element
    const v = host.querySelector<HTMLVideoElement>(
      '.backgrounds .slide-background.present video'
    )
    if (v) {
      v.muted = true
      v.playsInline = true
      // Best-effort play without surfacing errors
      v.play().catch(() => {})
    }
  }

  onMount(() => {
    // Initialize against the first `.reveal` container (our host)
    deck = new Reveal({
      embedded: true,
      hash: true,
      transition: 'slide',
      // backgroundTransition: 'slide',
      slideNumber: true,
      autoPlayMedia: true,
      plugins: [
        RevealNotes,
        RevealZoom,
        RevealSearch,
        RevealMarkdown,
        RevealHighlight,
      ],
      width: 1024,
      navigationMode: 'default',
    })

    // Attach listeners before initialize so we catch the initial ready event
    handleEnsure = () => ensureBackgroundVideoPlaying()
    deck.on('ready', handleEnsure)
    deck.on('slidechanged', handleEnsure)
    deck.initialize()
  })

  onCleanup(() => {
    deck?.off('ready', handleEnsure)
    deck?.off('slidechanged', handleEnsure)
    deck?.destroy()
  })

  return (
    <div class="reveal" ref={(el) => (host = el)}>
      <div class="slides">{props.children}</div>
    </div>
  )
}
