import './css/observability.css'
import SlideFrame from '../components/SlideFrame'

export default function Observability() {
  return (
    <SlideFrame
      title="Observability: три столпа"
      gradient="linear-gradient(160deg,#050507 0%,#101020 35%,#152030 65%,#050507 100%)"
      notes={
        <>
          Metrics — тренды/SLO. Logs — детали. Traces — связи и латентность.
          Вместе отвечают на «что/где/почему».
        </>
      }
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 place-items-center">
        {/* METRICS */}
        <div class="obs-item">
          <svg viewBox="0 0 64 64" class="obs-icon metrics" aria-hidden="true">
            {/* <path d="M10 54H50" /> */}
            <rect x="14" y="34" width="6" height="20" rx="1" />
            <rect x="26" y="26" width="6" height="28" rx="1" />
            <rect x="38" y="18" width="6" height="36" rx="1" />
            {/* <path d="M14 38l12-12 12 2 6-10" transform="translate(0,-10)" /> */}
          </svg>
          <div class="obs-label metrics">Metrics</div>
        </div>

        {/* LOGS */}
        <div class="obs-item">
          <svg viewBox="0 0 64 64" class="obs-icon logs" aria-hidden="true">
            <rect x="14" y="10" width="36" height="44" rx="3" />
            <path d="M22 20H42M22 28H42M22 36H38M22 44H33" />
          </svg>
          <div class="obs-label logs">Logs</div>
        </div>

        {/* TRACES */}
        <div class="obs-item">
          <svg viewBox="0 0 64 64" class="obs-icon traces" aria-hidden="true">
            <circle cx="20" cy="44" r="6" />
            <circle cx="44" cy="20" r="6" />
            <circle cx="44" cy="44" r="6" />
            <path d="M24 40 L40 24 M24 44 L38 44" />
          </svg>
          <div class="obs-label traces">Traces</div>
        </div>
      </div>
    </SlideFrame>
  )
}
