import RevealRoot from './RevealRoot'
import Intro from './slides/Intro'
import Observability from './slides/Observability'
import TracingArch from './slides/TracingArch'
import UseCases from './slides/UseCases'
import Integration101 from './slides/Integration101'
import UsageExamples from './slides/UsageExamples'
import Tools from './slides/Tools'
import Advanced from './slides/Advanced'

export default function App() {
  return (
    <RevealRoot>
      <Intro />
      <Observability />
      <TracingArch />
      <UseCases />
      <Integration101 />
      <UsageExamples />
      <Tools />
      <Advanced />
    </RevealRoot>
  )
}
