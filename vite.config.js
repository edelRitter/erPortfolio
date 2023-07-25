import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio',
  plugins: [vue()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@/': `${__dirname}/src/`,
      '~/': `${__dirname}/public/`
    },
  },

  build: {
		entry: 'src/main.js',
		rollupOptions: {
			output: {
				dir: 'docs/',
				entryFileNames: 'js/portfolio-app-[name].js',
				assetFileNames: 'css/portfolio-[name].css',
				chunkFileNames: "js/chunk-[name].js",
				manualChunks: undefined,
			}
		}
	}
})
