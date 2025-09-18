import RevealRoot from './RevealRoot'
import Intro from './slides/Intro'
import Observability from './slides/Observability'
import Arch from './slides/Arch'
import Value from './slides/Value'
import Integration101 from './slides/Integration101'
import Tools from './slides/Tools'
import LogsPain from './slides/LogsPain'
import Examples from './slides/Examples'
import TheEnd from './slides/TheEnd'
import RestrictionsCpu from './slides/RestrictionsCpu'
import HeadSampling from './slides/HeadSampling'
import RestrictionsStore from './slides/RestrictionsStore'
import TailSampling from './slides/TailSampling'
import NotSilverBullet from './slides/NotSilverBullet'

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
      <RestrictionsCpu />
      <HeadSampling />
      <RestrictionsStore />
      <TailSampling />
      <NotSilverBullet />
      <TheEnd />
    </RevealRoot>
  )
}
