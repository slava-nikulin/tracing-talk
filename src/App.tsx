import RevealRoot from './RevealRoot'
import Intro from './slides/Intro'
import Observability from './slides/Observability'
import Arch from './slides/Arch'
import UseCases from './slides/UseCases'
import Integration101 from './slides/Integration101'
// import UsageExamples from './slides/Examples'
import ExampleError from './slides/examples/Error'
import Tools from './slides/Tools'
import Advanced from './slides/Advanced'
import LogsPain from './slides/LogsPain'

export default function App() {
  return (
    <RevealRoot>
      <Intro />
      <LogsPain />
      <ExampleError />
      <Observability />
      <Arch />
      <UseCases />
      <Tools />
      <Integration101 />
      {/* <UsageExamples /> */}
      <Advanced />
    </RevealRoot>
  )
}
