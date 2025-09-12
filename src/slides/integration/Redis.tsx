// src/slides/integration/IntegrationRedis.tsx
import SlideFrame from '../../components/SlideFrame'

export default function IntegrationRedis() {
  return (
    <SlideFrame
      title="Redis: пропагация через клиент"
      notes={
        <>
          Инструментируй клиента, передавай исходный ctx в команды, чтобы
          связать спаны.
        </>
      }
    >
      <pre class="rounded-lg border border-zinc-600/60 bg-zinc-900/70 p-4 overflow-x-auto text-sky-100 text-sm text-left my-0">
        <code data-trim data-line-numbers="1-10" class="language-go">
          {`import "github.com/redis/go-redis/extra/redisotel/v9"

func initRedisWithTracing() redis.UniversalClient {
	rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379"})
        // под капотом добавляются хуки
	if err := redisotel.InstrumentTracing(rdb); err != nil {
		panic(err)
	}

	return rdb
}

func (c *Cache) Set(ctx context.Context, key, value string) error {
	return c.redis.Set(ctx, key, value).Err()
}
`}
        </code>
      </pre>
    </SlideFrame>
  )
}
