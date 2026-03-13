import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';
import compression from 'vite-plugin-compression2';
import { createHtmlPlugin } from 'vite-plugin-html';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import sitemap from 'vite-plugin-sitemap';
const htmlFiles = glob.sync('**/*.html', {
  ignore: ['node_modules/**', 'dist/**', '.nuxt/**', '.output/**']
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
          if (!assetInfo.name) {
            return 'assets/[name]-[hash][extname]';
          }
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
    // Compression Brotli pour de meilleures performances
    compression({
      algorithms: [
        ["brotliCompress", { level: 11 }],
      ],
      threshold: 1024,
      deleteOriginalAssets: false,
    }),
    
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    
    ViteImageOptimizer({
      png: {
        quality: 85,
      },
      jpeg: {
        quality: 85,
      },
      jpg: {
        quality: 85,
      },
      webp: {
        quality: 85,
      },
    }),
    
    sitemap({
      hostname: 'https://bytemeuh.phildaiguille.fr',
      exclude: ['/404', '/404.html'],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      readable: true,
    }),
  ]
});
