import Summary from './integration/Summary'
import Init from './integration/Init'
import Span from './integration/Span'
import KafkaProducer from './integration/KafkaProducer'
import KafkaConsumer from './integration/KafkaConsumer'
import Redis from './integration/Redis'

export default function Advanced() {
  return (
    <section>
      <Summary />
      <Init />
      <Span />
      <KafkaProducer />
      <KafkaConsumer />
      <Redis />
    </section>
  )
}
