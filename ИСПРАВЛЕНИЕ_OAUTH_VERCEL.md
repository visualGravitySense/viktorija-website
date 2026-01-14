# Исправление: OAuth перенаправляет на localhost вместо Vercel

## Проблема

После входа через Google на Vercel происходит перенаправление на `localhost` вместо Vercel домена.

## Быстрое решение

### Шаг 1: Найдите ваш Vercel домен

Откройте ваш проект на Vercel и скопируйте URL, например:
- `https://viktorija-bot.vercel.app`
- или ваш кастомный домен: `https://yourdomain.com`

### Шаг 2: Настройте Supabase

1. Откройте [Supabase Dashboard](https://app.supabase.com)
2. Выберите ваш проект
3. Перейдите в **Authentication** → **URL Configuration**
4. Установите **Site URL** на ваш Vercel домен:
   ```
   https://your-project.vercel.app
   ```
   (замените на ваш реальный домен)

5. В разделе **Redirect URLs** добавьте:
   ```
   http://localhost:3000/bot
   https://your-project.vercel.app/bot
   ```
   (замените `your-project.vercel.app` на ваш реальный домен)

6. Нажмите **Save**

### Шаг 3: Проверьте

1. Подождите 1-2 минуты (изменения могут применяться не сразу)
2. Откройте ваш бот на Vercel
3. Попробуйте войти через Google
4. Должно перенаправить обратно на Vercel домен, а не на localhost

## Почему это происходит?

Код использует `window.location.origin`, который автоматически определяет текущий домен:
- На localhost: `http://localhost:3000`
- На Vercel: `https://your-project.vercel.app`

Однако Supabase проверяет `redirectTo` URL против списка разрешенных Redirect URLs. Если ваш Vercel домен не добавлен в этот список, Supabase может перенаправить на Site URL (который может быть localhost) или выдать ошибку.

## Отладка

Если проблема сохраняется:

1. Откройте консоль браузера (F12) на странице бота на Vercel
2. Проверьте, что выводится в консоли при нажатии "Login via Google"
3. Должно быть: `OAuth redirect URL: https://your-project.vercel.app/bot`
4. Если видите `http://localhost:3000/bot`, значит проблема в другом месте

## Дополнительная информация

Подробная инструкция: `VERCEL_OAUTH_SETUP.md`
