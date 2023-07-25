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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$base-dir: '../';`,
      },
    },
  }, 
  build: {
		entry: 'src/main.js',
		rollupOptions: {
			output: {
				dir: 'docs/',
			}
		}
	}
})
