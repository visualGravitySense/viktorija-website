# Критическая проверка OAuth на Vercel

## ⚠️ Если OAuth не работает на Vercel

### 1. Проверь Supabase Redirect URLs (КРИТИЧНО!)

**Supabase Dashboard** → **Authentication** → **URL Configuration**:

**Site URL** должен быть:
```
https://viktorija-website.vercel.app
```

**Redirect URLs** должны включать:
```
https://viktorija-website.vercel.app/bot
https://viktorija-website.vercel.app/bot/**
```

**ВАЖНО**: 
- URL должен быть **точно** таким, как на Vercel (с `https://`)
- Без слеша в конце для Site URL
- Со слешем для Redirect URLs

### 2. Проверь Google Cloud Console

**Google Cloud Console** → **APIs & Services** → **Credentials** → твой OAuth 2.0 Client:

**Authorized redirect URIs** должен включать:
```
https://pkwrduyxqsqnbtgplzzj.supabase.co/auth/v1/callback

```

**Где найти Project ID в Supabase:**

1. Открой [Supabase Dashboard](https://app.supabase.com)
2. Выбери свой проект
3. Перейди в **Settings** (в левом меню)
4. Выбери **General**
5. Найди поле **"Project ID"** — это строка из букв и цифр
   - Пример: `pkwrduyxqsqnbtgplzzj`
6. Скопируй этот Project ID и замени `[твой-Project-ID]` в URL выше

**Альтернативный способ:**
- Project ID также виден в URL Supabase Dashboard:
  - `https://app.supabase.com/project/[Project-ID]`
  - Например: `https://app.supabase.com/project/pkwrduyxqsqnbtgplzzj`

**Пример:** Если твой Project ID = `pkwrduyxqsqnbtgplzzj`, то:
```
https://pkwrduyxqsqnbtgplzzj.supabase.co/auth/v1/callback
```

### 3. Проверь Environment Variables на Vercel

Vercel → Settings → Environment Variables:

- ✅ `VITE_SUPABASE_URL` = `https://pkwrduyxqsqnbtgplzzj.supabase.co`
- ✅ `VITE_SUPABASE_ANON_KEY` = твой anon key

**ВАЖНО**: После изменения переменных → **Redeploy**!

### 4. Проверь Console в браузере (F12)

Открой бота на Vercel → F12 → Console:

Ищи сообщения:
- `OAuth callback: token found, processing...` ✅
- `Auth state change: SIGNED_IN` ✅
- `OAuth callback: success` ✅

Если видишь ошибки:
- `Failed to fetch` → проблема с Supabase URL
- `Invalid redirect URL` → проблема с Redirect URLs
- `OAuth callback timeout` → проблема с обработкой токена

### 5. Проверь Network tab (F12 → Network)

После нажатия "Login via Google":

1. Должен быть редирект на Google
2. После логина должен быть редирект обратно на Vercel с `#access_token=...`
3. Должны быть запросы к Supabase:
   - `auth/v1/user` (200 OK) ✅
   - `auth/v1/token?grant_type=refresh_token` (200 OK) ✅

Если запросов к Supabase нет → проблема с обработкой токена

### 6. Что делать если всё ещё не работает

#### Вариант A: Проверь, что токен действительно приходит

1. Открой бота на Vercel
2. Нажми "Login via Google"
3. После редиректа проверь URL - должен быть `#access_token=...`
4. Если токена нет → проблема с Redirect URLs

#### Вариант B: Попробуй вручную обновить страницу

1. После редиректа с токеном в URL
2. Нажми F5 (обновить страницу)
3. Supabase должен обработать токен и создать сессию

#### Вариант C: Проверь логи Vercel

Vercel → Deployments → выбери deployment → **Functions**:

Ищи ошибки в логах Serverless Functions

### 7. Технические детали

**Как работает OAuth на Vercel:**

1. Пользователь нажимает "Login via Google"
2. Редирект на Google: `https://accounts.google.com/...`
3. Google редиректит на Supabase: `https://pkwrduyxqsqnbtgplzzj.supabase.co/auth/v1/callback?code=...`
4. Supabase обменивает code на токены
5. Supabase редиректит на Vercel: `https://viktorija-website.vercel.app/bot#access_token=...`
6. Приложение обрабатывает токен из hash
7. Supabase создаёт сессию
8. Приложение получает пользователя

**Где может быть проблема:**

- Шаг 5: Supabase не редиректит на правильный URL → проверь Redirect URLs
- Шаг 6: Приложение не обрабатывает токен → проверь код обработки
- Шаг 7: Supabase не создаёт сессию → проверь Network tab

### 8. Быстрая проверка

Открой в браузере (после логина через Google):
```
https://viktorija-website.vercel.app/bot#access_token=...
```

Если токен в URL есть → проблема в обработке токена
Если токена нет → проблема в Redirect URLs
