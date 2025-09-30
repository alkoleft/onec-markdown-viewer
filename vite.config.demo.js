import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  return {
    base: './',
    build: {
      rollupOptions: {
        input: {
          demo: resolve(__dirname, 'demo.html')
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          manualChunks: undefined
        }
      },
      target: 'es2018',
      minify: 'terser',
      sourcemap: true,
      cssCodeSplit: false,
      assetsInlineLimit: 4096,
      outDir: 'dist'
    },
    server: {
      port: 3000,
      open: true
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    esbuild: {
      target: 'es2018'
    }
  }
})
