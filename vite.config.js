import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio',
  plugins: [vue()],
  resolve: {
    alias: {
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
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
    outDir: 'docs/',
    sourcemap: true,
    manifest: true,
    reportCompressedSize: true,
    emptyOutDir: true,
    entry: 'src/main.js',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',

        assetFileNames: ({ name }) => {
          if (/\.(mp4|webm)$/.test(name ?? '')) {
            return 'video/[name][extname]';
          }

          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'img/[name][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'css/[name][extname]';
          }

          return '[name][extname]';
        },
      },
    },
  },
})