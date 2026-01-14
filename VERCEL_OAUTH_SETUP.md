# Настройка OAuth для Vercel (Production)

## Проблема

После входа через Google на Vercel происходит перенаправление на `localhost` вместо Vercel домена.

## Решение

### 1. Настройка Supabase для Production

В Supabase нужно добавить production URL (Vercel домен) в настройки аутентификации:

1. Перейдите в [Supabase Dashboard](https://app.supabase.com)
2. Выберите ваш проект
3. Перейдите в **Authentication** → **URL Configuration**
4. В разделе **Site URL** укажите ваш Vercel домен:
   ```
   https://your-project.vercel.app
   ```
   или если у вас кастомный домен:
   ```
   https://yourdomain.com
   ```

5. В разделе **Redirect URLs** добавьте оба URL (через запятую или каждый с новой строки):
   ```
   http://localhost:3000/bot
   https://your-project.vercel.app/bot
   ```
   
   Если у вас кастомный домен, также добавьте:
   ```
   https://yourdomain.com/bot
   ```

6. Нажмите **Save**

### 2. Как это работает

Код в `authService.ts` использует `window.location.origin`, который автоматически определяет текущий домен:
- В development: `http://localhost:3000`
- В production на Vercel: `https://your-project.vercel.app`

Однако, Supabase проверяет `redirectTo` URL против списка разрешенных Redirect URLs. Если ваш Vercel домен не добавлен в этот список, Supabase может перенаправить на Site URL (который может быть localhost) или выдать ошибку.

### 3. Проверка текущего домена

Чтобы проверить, какой домен используется, откройте консоль браузера (F12) на странице бота на Vercel и выполните:

```javascript
console.log(window.location.origin);
```

Это должно показать ваш Vercel домен, например: `https://your-project.vercel.app`

### 4. Если проблема сохраняется

**Проверьте:**
1. ✅ Site URL в Supabase установлен на Vercel домен
2. ✅ Redirect URLs включают Vercel домен с путем `/bot`
3. ✅ Переменные окружения в Vercel настроены (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
4. ✅ Google OAuth настроен в Supabase (Client ID и Client Secret)

**Отладка:**
- Откройте консоль браузера (F12) на странице бота на Vercel
- Проверьте, есть ли ошибки в консоли
- Проверьте Network tab - какие запросы отправляются к Supabase
- Проверьте, какой `redirectTo` отправляется в запросе OAuth

### 5. Пример правильной настройки

**Supabase → Authentication → URL Configuration:**

```
Site URL:
https://viktorija-bot.vercel.app

Redirect URLs:
http://localhost:3000/bot
https://viktorija-bot.vercel.app/bot
```

**Важно:** После изменения настроек в Supabase может потребоваться несколько минут, чтобы изменения вступили в силу.
