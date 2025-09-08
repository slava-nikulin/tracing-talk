import AdvancedSummary from './advanced/AdvancedSummary'
import AdvancedSampling from './advanced/AdvancedSampling'
import AdvancedEnv from './advanced/AdvancedEnv'
import AdvancedErrorEnrich from './advanced/AdvancedErrorEnrich'
import AdvancedSpanFilter from './advanced/AdvancedSpanFilter'

export default function Advanced() {
  return (
    <section>
      <AdvancedSummary />
      <AdvancedSampling />
      <AdvancedSpanFilter />
      <AdvancedErrorEnrich />
      <AdvancedEnv />
    </section>
  )
}
