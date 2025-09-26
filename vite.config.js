import { defineConfig } from 'vite'
import { resolve } from 'path'
import { singleFilePlugin, standalonePlugin } from './vite-plugin-single-file.js'

export default defineConfig(({ mode }) => {
  const isSingleFile = mode === 'single-file'
  
  return {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          entryFileNames: isSingleFile ? 'assets/[name].js' : 'assets/[name]-[hash].js',
          chunkFileNames: isSingleFile ? 'assets/[name].js' : 'assets/[name]-[hash].js',
          assetFileNames: isSingleFile ? 'assets/[name].[ext]' : 'assets/[name]-[hash].[ext]',
          manualChunks: undefined
        }
      },
      target: 'es2015',
      minify: 'terser',
      sourcemap: false,
      cssCodeSplit: false,
      assetsInlineLimit: isSingleFile ? 0 : 4096,
      outDir: 'dist'
    },
    server: {
      port: 3000,
      open: true
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    plugins: [
      // Плагин для создания единого HTML файла
      ...(isSingleFile ? [
        singleFilePlugin(),
        standalonePlugin()
      ] : [])
    ]
  }
})
