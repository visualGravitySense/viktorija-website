import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Используем SWC для сверхбыстрой компиляции
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import compression from 'vite-plugin-compression2';

// Проверка env только на Vercel: локально .env.local подхватывается Vite при билде, но не попадает в process.env здесь
function checkSupabaseEnv() {
  return {
    name: 'check-supabase-env',
    configResolved(config) {
      if (config.mode !== 'production') return;
      if (process.env.VERCEL !== '1') return; // локальный билд — не проверяем (переменные из .env.local подхватит Vite)
      const url = process.env.VITE_SUPABASE_URL;
      const key = process.env.VITE_SUPABASE_ANON_KEY;
      if (!url || !key || url.includes('placeholder')) {
        throw new Error(
          '[Vite] Production build: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set and valid. ' +
          'On Vercel: Settings → Environment Variables, then Redeploy without build cache (Redeploy → do NOT check "Use existing cache").'
        );
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [
    checkSupabaseEnv(),
    react(),
    // 1. Оптимизация изображений (Критично для вашего сайта!)
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      // Исключаем файлы с нестандартным содержимым (Sharp не может их обработать)
      exclude: /(pattern\.png|static[\\/]images[\\/]avatar[\\/]\d+\.jpg)$/i,
      include: undefined,
      includePublic: true,
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [{ name: 'sortAttrs' }],
      },
      png: { quality: 80 },
      jpeg: { quality: 75 },
      webp: { quality: 80 },
      avif: { quality: 70 }, // AVIF дает лучшее сжатие в 2026
    }),
    // 2. Сжатие бандла (Brotli — стандарт для Lighthouse 100)
    compression({
      algorithms: ['brotliCompress'],
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    // 3. Визуализатор (активируется при билде для анализа тяжелых веток)
    mode === 'production' && visualizer({
      open: false,
      filename: 'bundle-analysis.html',
      gzipSize: true,
    }),
  ].filter(Boolean),
  base: '/',
  build: {
    target: 'esnext', // Ориентируемся на современные браузеры для уменьшения полифилов
    assetsDir: 'assets',
    // Используем esbuild для более надежной минификации (быстрее и безопаснее)
    // Terser может вызывать проблемы с инициализацией переменных
    // После исправления порядка загрузки i18n, минификация должна работать корректно
    minify: mode === 'production' ? 'esbuild' : false,
    // Для более агрессивной минификации можно использовать terser, но с осторожностью
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    // },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          let extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        // 4. Умное разделение на чанки (Chunk Splitting)
        manualChunks(id) {
          // react-i18next — отдельный чанк; загружается после нашего i18n (где уже есть i18next), иначе TDZ "$t before initialization"
          if (id.includes('react-i18next')) {
            return 'vendor-react-i18next';
          }
          // i18next и LanguageDetector — в чанк по запросу (наш import('./i18n/i18n')), не в общий vendor
          if (id.includes('i18next-browser-languagedetector')) return undefined;
          if (id.includes('node_modules') && id.includes('i18next')) return undefined;

          if (id.includes('node_modules')) {
            // Stripe - отдельный чанк (загружается только на checkout)
            if (id.includes('@stripe')) {
              return 'vendor-stripe';
            }
            // Supabase - отдельный чанк
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            // React core - должен загружаться первым
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            // MUI разделяем на material и icons
            if (id.includes('@mui/material')) {
              return 'vendor-mui';
            }
            if (id.includes('@mui/icons-material')) {
              return 'vendor-mui-icons';
            }
            // Animation libraries
            if (id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            return 'vendor'; // Все остальные либы в отдельный файл
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    reportCompressedSize: false, // Ускоряет билд
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-i18next',
      'i18next',
      'i18next-browser-languagedetector',
      'react-is', // Явно включаем для правильной резолюции версии
      'prop-types', // Исправление проблемы с CommonJS/ES модулями
      '@mui/material/Box',
      '@mui/material/Button',
      '@mui/material/Container',
      '@mui/material/Grid',
      '@mui/material/Typography',
    ],
    // Exclude heavy icon library from pre-bundling (tree-shaking)
    exclude: ['@mui/icons-material'],
    // Принудительная резолюция для всех зависимостей
    esbuildOptions: {
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
      // Правильная обработка CommonJS модулей
      mainFields: ['module', 'main'],
    },
  },
  resolve: {
    alias: {
      // Принудительно используем одну версию react-is
      'react-is': 'react-is',
    },
    dedupe: ['react-is', 'prop-types'], // Убираем дубликаты
  },
}));
