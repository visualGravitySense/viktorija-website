# 🔍 Performance Audit Report - viktorijaautokool.ee
**Текущий Lighthouse Score: 33** | **Цель: 90+**

Дата аудита: 29 января 2026

---

## 📊 Executive Summary

Проект имеет серьезные проблемы с производительностью, которые блокируют достижение высокого Lighthouse score. Основные проблемы:
- **Синхронная загрузка Google Fonts** блокирует рендеринг
- **Тяжелые библиотеки** (MUI Material ~500KB, MUI Icons ~300KB)
- **Большие изображения** (600-700KB каждое) без оптимизации
- **Блокирующие скрипты** в `<head>` (Google Analytics, Inspectlet)
- **Отсутствие lazy loading** для изображений ниже fold

---

## 📋 Таблица проблем и решений

| Проблема | Влияние на FPS/LCP | Сложность | Приоритет | Ожидаемый прирост |
|----------|-------------------|-----------|-----------|-------------------|
| **1. Google Fonts синхронная загрузка** | 🔴 Критично: блокирует FCP на 1-2s | 🟢 Легко (30 мин) | P0 | +15-20 баллов |
| **2. Большие изображения без оптимизации** | 🔴 Критично: LCP > 4s (600-700KB/img) | 🟡 Средне (2-3 часа) | P0 | +20-25 баллов |
| **3. MUI Icons-material полный импорт** | 🟡 Высокое: +300KB к бандлу | 🟡 Средне (1-2 часа) | P1 | +10-15 баллов |
| **4. Блокирующие скрипты в head** | 🔴 Критично: блокирует TTI на 500-800ms | 🟢 Легко (15 мин) | P0 | +10-15 баллов |
| **5. Отсутствие lazy loading для изображений** | 🟡 Среднее: загружает невидимые img | 🟢 Легко (1 час) | P1 | +5-10 баллов |
| **6. MUI Material полный бандл** | 🟡 Высокое: +500KB к бандлу | 🔴 Сложно (4-6 часов) | P2 | +15-20 баллов |
| **7. Нет font-display: swap** | 🟡 Среднее: FOIT (Flash of Invisible Text) | 🟢 Легко (5 мин) | P1 | +3-5 баллов |
| **8. Изображения импортируются напрямую** | 🟡 Среднее: нет code splitting | 🟢 Легко (30 мин) | P1 | +5-8 баллов |

**Легенда:**
- 🔴 Критично | 🟡 Высокое | 🟢 Среднее
- 🟢 Легко (до 1 часа) | 🟡 Средне (1-3 часа) | 🔴 Сложно (3+ часа)

---

## 🚀 Quick Wins (Быстрые победы) - +20-30 баллов

### ⚡ Quick Win #1: Оптимизация Google Fonts (+15-20 баллов)
**Время: 30 минут | Сложность: Легко**

**Проблема:** Google Fonts загружается синхронно через `@import`, блокируя рендеринг на 1-2 секунды.

**Решение:**
1. Заменить `@import` на `link` с `preconnect`
2. Добавить `font-display: swap`
3. (Опционально) Self-host шрифты для полного контроля

**Код:**

```css
/* src/index.css - ЗАМЕНИТЬ */
/* БЫЛО: */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* СТАНЕТ: */
/* Удалить @import, добавить в index.html */
```

```html
<!-- index.html - ДОБАВИТЬ в <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link 
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
  rel="stylesheet"
  media="print" 
  onload="this.media='all'"
/>
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</noscript>
```

---

### ⚡ Quick Win #2: Дефер аналитических скриптов (+10-15 баллов)
**Время: 15 минут | Сложность: Легко**

**Проблема:** Google Analytics и Inspectlet загружаются синхронно в `<head>`, блокируя рендеринг.

**Решение:** Переместить скрипты в конец `<body>` или использовать `defer`.

**Код:**

```html
<!-- index.html - ПЕРЕМЕСТИТЬ скрипты в конец <body> -->
<body>
  <div id="root"></div>
  
  <!-- Google Analytics - загружается после рендеринга -->
  <script>
    // Defer loading
    window.addEventListener('load', function() {
      // Google tag (gtag.js)
      var script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-GR33YJ9WC5';
      document.head.appendChild(script1);
      
      script1.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-GR33YJ9WC5');
        gtag('config', 'AW-17804500858');
      };
      
      // Inspectlet - загружается через 2 секунды после load
      setTimeout(function() {
        window.__insp = window.__insp || [];
        __insp.push(['wid', 1009173257]);
        var insp = document.createElement('script');
        insp.type = 'text/javascript';
        insp.async = true;
        insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + 
                   '://cdn.inspectlet.com/inspectlet.js?wid=1009173257&r=' + 
                   Math.floor(new Date().getTime()/3600000);
        document.head.appendChild(insp);
      }, 2000);
    });
  </script>
</body>
```

---

### ⚡ Quick Win #3: Оптимизация изображений Hero (+5-10 баллов)
**Время: 1 час | Сложность: Легко**

**Проблема:** Hero изображение `main-hero-1.jpg` весит 591KB, блокирует LCP.

**Решение:**
1. Конвертировать в WebP/AVIF
2. Добавить responsive images с `srcset`
3. Использовать `loading="eager"` только для hero

**Код:**

```tsx
// src/components/marketing-page/components/Hero.tsx
// ЗАМЕНИТЬ:
<img
  src={imageUrl}
  alt={imageAlt || displayTitle}
  loading="eager"
  fetchPriority="high"
  width="1200"
  height="400"
/>

// НА:
<picture>
  <source 
    srcSet={`${imageUrl.replace('.jpg', '.avif')} 1200w, ${imageUrl.replace('.jpg', '-800.avif')} 800w`}
    type="image/avif"
  />
  <source 
    srcSet={`${imageUrl.replace('.jpg', '.webp')} 1200w, ${imageUrl.replace('.jpg', '-800.webp')} 800w`}
    type="image/webp"
  />
  <img
    src={imageUrl}
    alt={imageAlt || displayTitle}
    loading="eager"
    fetchPriority="high"
    width="1200"
    height="400"
    decoding="async"
  />
</picture>
```

---

## 🔧 Детальные исправления

### 1. Оптимизация MUI Icons (Tree-shaking)

**Проблема:** Импорты `@mui/icons-material/IconName` создают большой бандл.

**Решение:** Использовать path imports для лучшего tree-shaking.

```tsx
// БЫЛО:
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// СТАНЕТ (уже оптимально, но можно улучшить):
// Использовать lucide-react для простых иконок где возможно
import { Star, CheckCircle } from 'lucide-react';
```

**Альтернатива:** Заменить простые иконки на `lucide-react` (уже установлен, легче на 70%).

---

### 2. Lazy Loading для изображений ниже fold

**Проблема:** Все изображения загружаются сразу, даже те что вне viewport.

**Решение:**

```tsx
// src/components/marketing-page/components/LogoCollection.tsx
// УЖЕ ЕСТЬ loading="lazy" ✅

// src/pages/CategoryBPage.tsx - ДОБАВИТЬ:
<Box
  component="img"
  src={...}
  alt={benefit.title}
  loading="lazy"  // ← ДОБАВИТЬ
  decoding="async"  // ← ДОБАВИТЬ
  onError={...}
/>
```

---

### 3. Оптимизация импортов изображений

**Проблема:** Изображения импортируются напрямую в компонентах, нет code splitting.

**Решение:** Использовать динамические импорты для не-критичных изображений.

```tsx
// src/pages/MarketingPage.tsx
// БЫЛО:
import aCatImg from '/a-cat.jpg';
import bCatImg from '/b-cat.jpg';

// СТАНЕТ (для изображений ниже fold):
// Оставить только mainHeroImg как статический импорт
// Остальные загружать динамически или через public path
const aCatImg = '/a-cat.jpg'; // Просто строка, не импорт
```

---

### 4. Оптимизация MUI Material

**Проблема:** MUI Material очень тяжелый (~500KB).

**Решение:** Использовать tree-shaking и импортировать только нужные компоненты.

```tsx
// УЖЕ ОПТИМАЛЬНО в большинстве случаев:
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// НО можно использовать barrel imports с настройкой:
// vite.config.ts - уже настроено ✅
```

**Альтернатива:** Рассмотреть замену на более легкую библиотеку (Radix UI, Headless UI) для некритичных компонентов.

---

## 📦 Анализ зависимостей

### Тяжелые библиотеки:

| Библиотека | Размер (gzip) | Альтернатива | Экономия |
|------------|---------------|--------------|----------|
| `@mui/material` | ~150KB | Radix UI (частично) | ~100KB |
| `@mui/icons-material` | ~80KB | `lucide-react` | ~60KB |
| `@emotion/react` + `@emotion/styled` | ~30KB | (необходимо для MUI) | - |
| `react-i18next` + `i18next` | ~25KB | (необходимо) | - |

**Рекомендация:** Заменить простые иконки MUI на `lucide-react` где возможно.

---

## 🎯 План действий (Roadmap)

### Фаза 1: Quick Wins (1-2 дня) - +30-40 баллов
- [x] ✅ Установлен terser
- [ ] ⬜ Оптимизация Google Fonts
- [ ] ⬜ Дефер аналитических скриптов
- [ ] ⬜ Оптимизация Hero изображения

### Фаза 2: Средние оптимизации (3-5 дней) - +15-20 баллов
- [ ] ⬜ Lazy loading для всех изображений
- [ ] ⬜ Замена MUI Icons на lucide-react (где возможно)
- [ ] ⬜ Оптимизация всех изображений в WebP/AVIF

### Фаза 3: Долгосрочные (1-2 недели) - +10-15 баллов
- [ ] ⬜ Частичная замена MUI на более легкие альтернативы
- [ ] ⬜ Service Worker для кеширования
- [ ] ⬜ Resource hints (preload, prefetch)

---

## 📝 Готовый код для исправлений

### 1. index.html - Оптимизированная версия

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/jpeg" href="/viktorija-fav.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="..." />
    
    <!-- Preconnect для быстрой загрузки -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
    <link rel="dns-prefetch" href="https://cdn.inspectlet.com" />
    
    <!-- Preload критичных ресурсов -->
    <link rel="preload" as="image" href="/main-hero-1.jpg" fetchpriority="high" />
    
    <!-- Google Fonts - асинхронная загрузка -->
    <link 
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
      rel="stylesheet"
      media="print" 
      onload="this.media='all'"
    />
    <noscript>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </noscript>
    
    <title>Viktorija Autokool Nõmme</title>
    <script type="module" src="/src/main.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
    
    <!-- Аналитика загружается после рендеринга -->
    <script>
      window.addEventListener('load', function() {
        // Google Analytics
        var gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-GR33YJ9WC5';
        document.head.appendChild(gaScript);
        
        gaScript.onload = function() {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GR33YJ9WC5');
          gtag('config', 'AW-17804500858');
        };
        
        // Inspectlet - задержка 2 секунды
        setTimeout(function() {
          window.__insp = window.__insp || [];
          __insp.push(['wid', 1009173257]);
          var insp = document.createElement('script');
          insp.async = true;
          insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + 
                     '://cdn.inspectlet.com/inspectlet.js?wid=1009173257&r=' + 
                     Math.floor(new Date().getTime()/3600000);
          document.head.appendChild(insp);
        }, 2000);
      });
    </script>
  </body>
</html>
```

---

### 2. vite.config.ts - Дополнительные оптимизации

```typescript
// Добавить в vite.config.ts:

export default defineConfig(({ mode }) => ({
  // ... существующие настройки ...
  
  build: {
    // ... существующие настройки ...
    
    rollupOptions: {
      output: {
        // ... существующие настройки ...
        
        // Оптимизация: разделение больших чанков
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Stripe - отдельный чанк (загружается только на checkout)
            if (id.includes('@stripe')) {
              return 'vendor-stripe';
            }
            // Supabase - отдельный чанк
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            // ... остальные правила ...
          }
        },
      },
    },
  },
  
  // Оптимизация зависимостей
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material/Box',
      '@mui/material/Button',
      // Только критичные компоненты MUI
    ],
    exclude: ['@mui/icons-material'], // Исключить из pre-bundling
  },
}));
```

---

## 🎯 Ожидаемые результаты

После реализации всех Quick Wins:

| Метрика | Текущее | После Quick Wins | Цель |
|---------|---------|-----------------|------|
| **Lighthouse Score** | 33 | 65-75 | 90+ |
| **FCP (First Contentful Paint)** | ~3.5s | ~1.5s | <1.8s |
| **LCP (Largest Contentful Paint)** | ~5.2s | ~2.5s | <2.5s |
| **TTI (Time to Interactive)** | ~8s | ~4s | <3.8s |
| **Total Bundle Size** | ~1.2MB | ~800KB | <600KB |

---

## 📚 Дополнительные ресурсы

- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse Scoring Guide](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
- [Vite Performance Optimization](https://vitejs.dev/guide/performance.html)

---

**Следующие шаги:**
1. Реализовать Quick Wins (1-2 дня)
2. Запустить билд и проверить размеры чанков
3. Протестировать на Lighthouse
4. Итеративно улучшать до достижения 90+
