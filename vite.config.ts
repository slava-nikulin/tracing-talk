import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'
import { githubPagesSpa } from '@sctg/vite-plugin-github-pages-spa';

const fullReloadAlways = {
  name: 'full-reload',
  handleHotUpdate({ server }: { server: import('vite').ViteDevServer }) {
    server.ws.send({ type: 'full-reload' });
    return [];
  }
};

export default defineConfig({
  base: '/tracing-talk/',
  plugins: [solid(), tailwindcss(), githubPagesSpa({ verbose: true }), fullReloadAlways],
  build: { outDir: 'dist' }
})
