# Исправление OAuth Timeout на Vercel

## Проблема
После логина через Google на Vercel появлялась ошибка: **"OAuth callback timeout"**

## Что было исправлено

1. ✅ **Увеличен таймаут обработки OAuth** - с 2 секунд до 15 секунд (50 попыток)
2. ✅ **Улучшена логика получения сессии** - теперь пробует и `getSession()` и `getUser()`
3. ✅ **URL очищается сразу** - токен уже в памяти Supabase, URL можно очистить сразу
4. ✅ **Улучшена подписка на auth события** - обрабатывает `SIGNED_IN` и `TOKEN_REFRESHED`
5. ✅ **Таймаут в компоненте увеличен** - с 10 до 20 секунд

## Что делать дальше

1. **Сделай commit и push изменений**:
   ```bash
   git add .
   git commit -m "Fix OAuth timeout on Vercel"
   git push
   ```

    https://viktorija-website.vercel.app
    https://viktorija-website.vercel.app/bot
    https://viktorija-website.vercel.app/bot/**

2. **Vercel автоматически задеплоит** (или сделай Redeploy вручную)

3. **Проверь работу**:
   - Открой бота на Vercel
   - Нажми "Login via Google"
   - Должно работать без таймаута

## Если всё ещё не работает

1. **Проверь Supabase Redirect URLs**:
   - Supabase Dashboard → Authentication → URL Configuration
   - Должен быть: `https://твой-домен.vercel.app/bot`
   - И: `https://твой-домен.vercel.app/bot/**`

2. **Проверь Console (F12)**:
   - Нет ли других ошибок
   - Что именно происходит при логине

3. **Проверь Network tab**:
   - Есть ли запросы к Supabase
   - Какие статусы (200, 401, 500?)

## Технические детали

- **Таймаут в `handleOAuthCallback`**: 15 секунд (50 попыток по 300мс)
- **Таймаут в компоненте**: 20 секунд
- **Методы получения сессии**: `getSession()` (быстро) → `getUser()` (если не сработало)
- **Очистка URL**: сразу после обнаружения токена
