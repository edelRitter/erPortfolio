import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'portfolio',
  plugins: [vue()],
  alias: {
    '@': path.resolve(__dirname, './src'),
    'vue$': 'vue/dist/vue.esm-bundler.js'
  }
})
