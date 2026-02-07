# Исправление зависания бота на Vercel

## Проблема
Бот зависает на экране "Laadimine..." (Loading...) на Vercel.

## Что было исправлено

1. ✅ **Добавлена проверка Supabase env переменных** - бот не будет зависать, если переменные не настроены
2. ✅ **Добавлен таймаут для auth инициализации** (5 секунд) - если Supabase не отвечает, бот покажет welcome экран
3. ✅ **Добавлен таймаут для OAuth callback** (10 секунд)
4. ✅ **Исправлен package-lock.json** - GitHub Actions больше не будет падать на `npm ci`

## Что нужно проверить на Vercel

### 1. Проверь Environment Variables

1. Открой **Vercel Dashboard** → твой проект → **Settings** → **Environment Variables**
2. Убедись, что есть **и выбраны для Production**:
   - `VITE_SUPABASE_URL` - должен быть типа `https://xxxxx.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` - длинный ключ из Supabase
   - `VITE_TELEGRAM_ADMIN_CHAT_ID` - (опционально, для Telegram уведомлений)

3. **ВАЖНО**: После добавления/изменения переменных **обязательно нажми "Redeploy"**!

### 2. Проверь Supabase Redirect URLs

1. Открой **Supabase Dashboard** → **Authentication** → **URL Configuration**
2. В **Redirect URLs** должны быть:
   - `https://твой-домен.vercel.app/bot`
   - `https://твой-домен.vercel.app/bot/**` (wildcard)

3. **Site URL** должен быть: `https://твой-домен.vercel.app`

### 3. Проверь Console в браузере

1. Открой бота на Vercel
2. Нажми **F12** → **Console**
3. Ищи ошибки:
   - `⚠️ Supabase environment variables are not configured!` - значит env переменные не подхватились
   - `getCurrentUser timeout` - значит Supabase не отвечает (проверь URL и ключ)
   - `ERR_NAME_NOT_RESOLVED` - неправильный `VITE_SUPABASE_URL`

## Что делать если всё ещё зависает

1. **Проверь, что переменные действительно добавлены**:
   - Vercel → Settings → Environment Variables
   - Убедись, что они выбраны для **Production** (не только Preview/Development)

2. **Сделай полный Redeploy**:
   - Vercel → Deployments → выбери последний deployment → **Redeploy**

3. **Проверь логи Vercel**:
   - Vercel → Deployments → выбери deployment → **Functions** → смотри ошибки

4. **Проверь Supabase Dashboard**:
   - Убедись, что проект активен и не заблокирован
   - Проверь **Settings** → **API** → скопируй правильные значения

## После исправления

После того как всё настроено:
1. Бот должен показать **welcome экран** (не зависать на loading)
2. При нажатии "Login via Google" должен произойти редирект
3. После логина должен показаться экран anxiety test или menu

## npm warnings (не критично)

Предупреждения типа:
```
npm warn deprecated rimraf@3.0.2
npm warn deprecated npmlog@5.0.1
```

Это **нормально** - это устаревшие зависимости через `@vercel/node`. Они не влияют на работу бота.
