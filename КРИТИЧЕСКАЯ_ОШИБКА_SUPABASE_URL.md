# ⚠️ КРИТИЧЕСКАЯ ОШИБКА: Неправильный VITE_SUPABASE_URL

## Проблема

В Console видно:
```
VITE_SUPABASE_URL is correct: https://pkwrduyxqsqnbtgplzzj.supabase.co/auth/v1/callback
```

**ЭТО НЕПРАВИЛЬНО!** Это URL callback, а не базовый URL проекта.

## Правильный URL

**VITE_SUPABASE_URL** должен быть:
```
https://pkwrduyxqsqnbtgplzzj.supabase.co
```

**БЕЗ** `/auth/v1/callback` в конце!

## Как исправить

### 1. Открой Vercel Dashboard

1. Перейди в **Vercel Dashboard** → твой проект → **Settings** → **Environment Variables**
2. Найди переменную `VITE_SUPABASE_URL`
3. Проверь её значение

### 2. Исправь значение

**Неправильно:**
```
https://pkwrduyxqsqnbtgplzzj.supabase.co/auth/v1/callback
```

**Правильно:**
```
https://pkwrduyxqsqnbtgplzzj.supabase.co
```

### 3. Где найти правильный URL

**Supabase Dashboard** → **Settings** → **General**:

1. Найди **Project ID**: `pkwrduyxqsqnbtgplzzj`
2. Построй URL: `https://[Project-ID].supabase.co`
3. Пример: `https://pkwrduyxqsqnbtgplzzj.supabase.co`

**Или:**

**Supabase Dashboard** → **Settings** → **API**:

1. Найди **Project URL**
2. Это и есть правильный `VITE_SUPABASE_URL`

### 4. После исправления

1. **Сохрани** изменения в Vercel
2. **Redeploy** проект (обязательно!)
3. Очисти кеш браузера
4. Попробуй снова

## Почему это важно

Неправильный URL приводит к:
- ❌ CORS ошибкам
- ❌ OAuth state parameter missing
- ❌ Не работают запросы к Supabase
- ❌ Timeout при получении пользователя

## Проверка

После исправления в Console должно быть:
```
VITE_SUPABASE_URL is correct: https://pkwrduyxqsqnbtgplzzj.supabase.co
```

**БЕЗ** `/auth/v1/callback`!
