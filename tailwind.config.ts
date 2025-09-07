import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // Make utilities outrank Reveal theme selectors
  // by scoping under #root (adds an ID to specificity).
  important: '#root',
  theme: {},
  plugins: [],
} satisfies Config

