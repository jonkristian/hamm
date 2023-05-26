import path from 'path'
import process from 'process'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      '@': path.resolve('src/renderer/src'),
    },
  },
  root: path.resolve(process.cwd(), 'src/renderer'),
  base: './',
})
