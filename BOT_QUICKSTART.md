# Быстрый старт бота автошколы

## ✅ Что уже сделано:

1. **База данных** - SQL миграция создана (`supabase/migrations/002_create_bot_tables.sql`)
2. **API сервисы** - `BotService` для работы с данными
3. **Компонент бота** - доработан и подключен к API
4. **Веб-интеграция** - страница `/bot` добавлена в приложение
5. **Зависимости** - установлены `lucide-react` и `tailwindcss`
 
## 🚀 Как запустить:

### 0. Настроить переменные окружения (ОБЯЗАТЕЛЬНО!)

**Если вы видите ошибку "Missing Supabase environment variables":**

1. Создайте файл `.env.local` в корне проекта `viktorija-web`
2. Добавьте в него:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Получите эти значения в Supabase Dashboard:
   - **Project URL**: **Settings** → **API** (вверху страницы) или **Settings** → **General**
   - **API Key**: **Settings** → **API** → секция **"Publishable key"** (новый формат) или вкладка **"Legacy anon, service_role API keys"** (старый формат)
4. Перезапустите dev-сервер

📖 Подробная инструкция: см. `ENV_SETUP.md`

### 1. Выполнить SQL миграцию в Supabase

Откройте Supabase Dashboard → SQL Editor и выполните файл:
```
supabase/migrations/002_create_bot_tables.sql
```

### 2. Настроить RLS (Row Level Security)

В Supabase SQL Editor выполните:

```sql
-- Включить RLS
ALTER TABLE bot_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_support_messages ENABLE ROW LEVEL SECURITY;

-- Политики для чтения
CREATE POLICY "Anyone can read active instructors"
ON bot_instructors FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can read approved reviews"
ON bot_reviews FOR SELECT
USING (is_approved = true);

-- Политики для записи
CREATE POLICY "Anyone can insert users"
ON bot_users FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update users"
ON bot_users FOR UPDATE
USING (true);

CREATE POLICY "Anyone can insert progress"
ON bot_progress FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update progress"
ON bot_progress FOR UPDATE
USING (true);

CREATE POLICY "Anyone can insert skills"
ON bot_skills FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update skills"
ON bot_skills FOR UPDATE
USING (true);

CREATE POLICY "Anyone can insert lessons"
ON bot_lessons FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can insert support messages"
ON bot_support_messages FOR INSERT
WITH CHECK (true);
```

### 3. Запустить приложение

```bash
cd viktorija-web
npm run dev
```

### 4. Открыть бота

Перейдите на: `http://localhost:5173/bot`

## 📋 Структура проекта

```
viktorija-web/
├── src/
│   ├── components/bot/
│   │   └── DrivingSchoolBot.tsx    # Компонент бота
│   ├── pages/
│   │   └── BotPage.tsx             # Страница /bot
│   ├── services/
│   │   └── botService.ts            # API сервис
│   └── types/
│       └── bot.ts                    # TypeScript типы
├── supabase/migrations/
│   └── 002_create_bot_tables.sql    # SQL миграция
└── BOT_SETUP.md                     # Подробная документация
```

## 🎯 Функционал бота

- ✅ Регистрация пользователя
- ✅ Тест на тревожность
- ✅ Выбор инструктора
- ✅ Просмотр прогресса
- ✅ Отзывы учеников
- ✅ Поддержка и FAQ
- ✅ Запись на занятие (базовая версия)

## 🔄 Следующие шаги (по плану)

1. **Интеграция с Telegram** - создать бота в Telegram
2. **Интеграция с WhatsApp** - подключить WhatsApp API
3. **Дополнительные функции** - уведомления, видео, рекомендации

Подробнее в `BOT_SETUP.md` и `bot-plan.md`
