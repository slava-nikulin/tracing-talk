import Init from './integration/Init'
import Span from './integration/Span'
import KafkaProducer from './integration/KafkaProducer'
import KafkaConsumer from './integration/KafkaConsumer'
import Redis from './integration/Redis'
import Env from './integration/Env'

export default function Advanced() {
  return (
    <section>
      <Init />
      <Env />
      <Span />
      <KafkaProducer />
      <KafkaConsumer />
      <Redis />
    </section>
  )
}
