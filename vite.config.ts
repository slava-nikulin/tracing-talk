import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'
import { githubPagesSpa } from '@sctg/vite-plugin-github-pages-spa';

export default defineConfig({
  base: '/tracing-talk/',
  plugins: [solid(), tailwindcss(), githubPagesSpa({ verbose: true })],
  build: { outDir: 'dist' }
})
