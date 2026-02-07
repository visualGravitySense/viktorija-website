# Исправление ошибки "OAuth state parameter missing"

## Проблема

После нажатия "Login via Google" на Vercel:
- Ошибка: `error=invalid_request&error_code=bad_oauth_callback&error_description=OAuth+state+parameter+missing`
- Перенаправление на главную страницу вместо `/bot`
- Логин не происходит

## Причина

Ошибка `OAuth state parameter missing` означает, что Supabase не может проверить `state` параметр (защита от CSRF). Это происходит когда:

1. **Redirect URL не совпадает** с тем, что указано в Supabase Redirect URLs
2. **Проблемы с cookies** - Supabase не может сохранить `state` в сессии
3. **Site URL неправильный** в Supabase

## Решение

### 1. Проверь Supabase Redirect URLs (КРИТИЧНО!)

**Supabase Dashboard** → **Authentication** → **URL Configuration**:

**Site URL** должен быть:
```
https://viktorija-website.vercel.app
```

**Redirect URLs** должны включать **ТОЧНО**:
```
https://viktorija-website.vercel.app/bot
```

**ВАЖНО**: 
- URL должен быть **точно** таким, как на Vercel
- Без слеша в конце для Site URL
- Со слешем `/bot` для Redirect URLs
- **Обязательно** `https://` (не `http://`)

### 2. Проверь, что Redirect URL правильный в коде

В `src/services/authService.ts` должен быть:
```typescript
const redirectTo = `${window.location.origin}/bot`;
```

Это создаст: `https://viktorija-website.vercel.app/bot`

### 3. Проверь Google Cloud Console

**Google Cloud Console** → **APIs & Services** → **Credentials** → твой OAuth 2.0 Client:

**Authorized redirect URIs** должен включать:
```
https://pkwrduyxqsqnbtgplzzj.supabase.co/auth/v1/callback
```

(Замени `pkwrduyxqsqnbtgplzzj` на твой Project ID из Supabase)

### 4. Очисти кеш браузера

После изменения настроек в Supabase:
1. Очисти кеш браузера (Ctrl+Shift+Delete)
2. Или открой в режиме инкогнито
3. Попробуй снова

### 5. Проверь Console (F12)

Открой бота на Vercel → F12 → Console:

Ищи сообщения:
- `🔐 OAuth sign in:` - показывает redirectTo URL
- `✅ OAuth redirect initiated:` - редирект начался
- `❌ OAuth sign in error:` - ошибка

## Пошаговая проверка

1. ✅ **Supabase Redirect URLs** настроены правильно
2. ✅ **Site URL** = `https://viktorija-website.vercel.app`
3. ✅ **Redirect URLs** включает `https://viktorija-website.vercel.app/bot`
4. ✅ **Google Cloud Console** настроен правильно
5. ✅ **Кеш браузера** очищен
6. ✅ **Console** не показывает ошибок

## Если всё ещё не работает

### Вариант A: Проверь точное совпадение URL

1. Открой бота: `https://viktorija-website.vercel.app/bot`
2. F12 → Console
3. Нажми "Login via Google"
4. Смотри в Console: `🔐 OAuth sign in:` → `redirectTo`
5. Убедись, что этот URL **точно** совпадает с Redirect URL в Supabase

### Вариант B: Попробуй добавить wildcard

В Supabase Redirect URLs добавь также:
```
https://viktorija-website.vercel.app/bot/**
```

### Вариант C: Проверь cookies

F12 → Application → Cookies → проверь, есть ли cookies от Supabase:
- Должны быть cookies от `viktorija-website.vercel.app`
- И от `pkwrduyxqsqnbtgplzzj.supabase.co`

Если cookies нет → проблема с SameSite или доменом

## Технические детали

**Как работает OAuth state:**

1. При нажатии "Login via Google":
   - Supabase создаёт случайный `state` параметр
   - Сохраняет его в сессии/cookies
   - Отправляет пользователя на Google с этим `state`

2. Google редиректит обратно на Supabase:
   - Supabase проверяет `state` из cookies
   - Если `state` совпадает → создаёт токены
   - Редиректит на `redirectTo` URL

3. Если `state` не совпадает:
   - Ошибка: `OAuth state parameter missing`
   - Редирект на Site URL с ошибкой

**Почему может не работать:**

- Cookies не сохраняются (SameSite, Secure флаги)
- Redirect URL не совпадает → Supabase не может найти сессию
- Site URL неправильный → Supabase редиректит не туда
