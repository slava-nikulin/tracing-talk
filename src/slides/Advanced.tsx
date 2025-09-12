import Summary from './advanced/Summary'
import Sampling from './advanced/Sampling'
import Env from './advanced/Env'
import ErrorEnrich from './advanced/ErrorEnrich'
import SpanFilter from './advanced/SpanFilter'

export default function Advanced() {
  return (
    <section>
      <Summary />
      <Sampling />
      <SpanFilter />
      <ErrorEnrich />
      <Env />
    </section>
  )
}
