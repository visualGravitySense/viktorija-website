# Настройка переменных окружения

## Проблема: "Missing Supabase environment variables"

Если вы видите эту ошибку, значит не настроены переменные окружения для Supabase.

## Решение

### 1. Создайте файл `.env.local`

В корне проекта `viktorija-web` создайте файл `.env.local` (если его нет).

### 2. Добавьте переменные Supabase

Откройте файл `.env.local` и добавьте:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Где взять эти значения?

1. Перейдите на [supabase.com](https://supabase.com) и войдите в свой аккаунт
2. Выберите ваш проект (или создайте новый)
3. Перейдите в **Settings** → **API**

#### Для Project URL (`VITE_SUPABASE_URL`):

**Шаг 1:** На текущем экране **Settings** → **General** найдите поле **"Project ID"**
- Вы увидите что-то вроде: `pkwrduyxqsqnbtgplzzj`
- Нажмите кнопку **"Copy"** рядом с Project ID

**Шаг 2:** Постройте URL по формуле:
```
https://[Project ID].supabase.co
```

**Пример:** Если Project ID = `pkwrduyxqsqnbtgplzzj`, то URL будет:
```
https://pkwrduyxqsqnbtgplzzj.supabase.co
```

Это и есть ваш `VITE_SUPABASE_URL`!

#### Для API Key (`VITE_SUPABASE_ANON_KEY`):

**Шаг 1:** В левом меню (сайдбаре) найдите и нажмите **"API Keys"** (под разделом "PROJECT SETTINGS")

**Шаг 2:** На странице API Keys вы увидите два варианта:

**Вариант 1: Новые API ключи (рекомендуется)**
- Найдите секцию **"Publishable key"**
- Скопируйте ключ, который начинается с `sb_publishable_...` (нажмите на иконку копирования)
- Это ваш `VITE_SUPABASE_ANON_KEY`

**Вариант 2: Legacy ключи (если новые не работают)**
- Перейдите на вкладку **"Legacy anon, service_role API keys"** (вверху страницы)
- Скопируйте **anon public** ключ (длинный ключ, начинается с `eyJ...`)
- Это ваш `VITE_SUPABASE_ANON_KEY`

### 4. Перезапустите dev-сервер

После создания/изменения `.env.local`:

1. Остановите сервер (Ctrl+C)
2. Запустите снова: `npm run dev`

## Пример файла `.env.local`

```env
# Supabase Configuration
# 1. Project URL - возьмите Project ID из Settings → General
#    Формула: https://[Project ID].supabase.co
#    Пример: если Project ID = pkwrduyxqsqnbtgplzzj
VITE_SUPABASE_URL=https://pkwrduyxqsqnbtgplzzj.supabase.co

# 2. API Key - возьмите из Settings → API Keys
#    Вариант 1: Publishable key (новый формат, начинается с sb_publishable_)
#    Вариант 2: Legacy anon key (старый формат, начинается с eyJ...)
VITE_SUPABASE_ANON_KEY=sb_publishable_gANvHLUIYfYuRzmtNuSalg_zJOBT...

# Stripe (опционально)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Backend API (опционально)
VITE_API_URL=http://localhost:3001/api
```

**Примечание:** Если вы используете новый Publishable key (начинается с `sb_publishable_`), убедитесь, что у вас включен Row Level Security (RLS) для таблиц в Supabase.

## Важно

- ✅ Файл `.env.local` уже должен быть в `.gitignore` (не коммитится в Git)
- ✅ Не используйте реальные ключи в примерах/документации
- ✅ Для продакшена используйте переменные окружения на хостинге

## Дополнительная информация

- Подробная инструкция по настройке Supabase: `SUPABASE_SETUP.md`
- Быстрый старт бота: `BOT_QUICKSTART.md`
