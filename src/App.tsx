import RevealRoot from './RevealRoot'
import Intro from './slides/Intro'
import Observability from './slides/Observability'
import Arch from './slides/Arch'
import Value from './slides/Value'
import Integration101 from './slides/Integration101'
import Tools from './slides/Tools'
import Advanced from './slides/Advanced'
import LogsPain from './slides/LogsPain'
import Examples from './slides/Examples'

export default function App() {
  return (
    <RevealRoot>
      <Intro />
      <Observability />
      <Arch />
      <LogsPain />
      <Examples />
      <Value />
      <Tools />
      <Integration101 />
      <Advanced />
    </RevealRoot>
  )
}
