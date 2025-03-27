import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

export default defineConfig({
  base: '/mdx-resume-builder/', // GitHub repo name here!
  plugins: [react(), mdx()],
})