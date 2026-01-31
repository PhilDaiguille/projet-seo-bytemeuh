import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';
import compression from 'vite-plugin-compression2';
const htmlFiles = glob.sync('**/*.html', {
  ignore: ['node_modules/**', 'dist/**']
});

const input = {};
htmlFiles.forEach(file => {
  const name = file.replace(/\.html$/, '').replace(/\//g, '_');
  input[name] = resolve(__dirname, file);
});

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css|scss|sass)$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        unused: true
      },
      mangle: true,
      format: {
        comments: false
      }
    },
    cssMinify: true,
    assetsInlineLimit: 4096,
    sourcemap: false,
    target: 'es2023'
  },
  css: {
    devSourcemap: true
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  },
  plugins: [
    compression({
      algorithms: [
        ["brotliCompress", { level: 11 }],
      ],

      threshold: 1024,
      deleteOriginalAssets: false,
    })]
});
