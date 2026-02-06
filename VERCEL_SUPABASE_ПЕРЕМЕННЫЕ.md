# Переменные Supabase на Vercel — быстрое исправление

Если после переноса на Vercel видите ошибки:
- **VITE_SUPABASE_URL: NOT SET** / **VITE_SUPABASE_ANON_KEY: NOT SET**
- **GET https://placeholder.supabase.co/... net::ERR_NAME_NOT_RESOLVED**
- «Supabase is not configured»

значит переменные окружения не заданы при сборке (или не выбран нужный Environment).

## Что сделать (3 шага)

### 1. Откройте настройки проекта в Vercel

1. Зайдите на [vercel.com/dashboard](https://vercel.com/dashboard).
2. Выберите проект (сайт viktorijaautokool).
3. Откройте **Settings** → **Environment Variables**.

### 2. Добавьте две переменные

| Key (имя) | Value (значение) | Environment |
|-----------|------------------|-------------|
| `VITE_SUPABASE_URL` | `https://pkwrduyxqsqnbtgplzzj.supabase.co` | **Production**, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | ваш anon key из Supabase | **Production**, Preview, Development |

- Имена должны быть **точно** `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY` (с префиксом `VITE_`).
- Для Production обязательно отметьте **Production**.
- Значения возьмите из [Supabase](https://app.supabase.com) → ваш проект → **Settings** → **API** (Project URL и anon public key).

### 3. Пересоберите проект без кэша (обязательно)

Переменные подставляются в код **только во время сборки**. Если переменные уже были добавлены, но в браузере всё ещё «NOT SET», скорее всего использовалась **старая сборка из кэша**. Нужна пересборка **без кэша**:

1. В Vercel откройте вкладку **Deployments**.
2. У последнего деплоя нажмите **⋯** (три точки) → **Redeploy**.
3. **Важно:** в диалоге Redeploy **не ставьте галочку** «Use existing build cache» (или аналогичную). Нужна полная пересборка.
4. Подтвердите и дождитесь окончания сборки.

Если переменные не подхватятся, сборка теперь **упадёт** с явной ошибкой про `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` — тогда будет видно, что среда сборки не видит переменные.

После успешного Redeploy без кэша ошибки «NOT SET» и запросы к `placeholder.supabase.co` должны пропасть.

---

Подробнее: **ИСПРАВЛЕНИЕ_ОШИБКИ_VERCEL.md** или **SUPABASE_SETUP.md**.
