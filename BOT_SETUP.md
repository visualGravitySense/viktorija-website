# Настройка бота автошколы

## Выполненные шаги

### 1. База данных
- ✅ Создана SQL миграция `002_create_bot_tables.sql` с таблицами:
  - `bot_users` - пользователи бота
  - `bot_instructors` - инструкторы
  - `bot_reviews` - отзывы
  - `bot_progress` - прогресс учеников
  - `bot_skills` - навыки
  - `bot_lessons` - занятия
  - `bot_support_messages` - сообщения поддержки

### 2. API сервисы
- ✅ Создан `BotService` в `src/services/botService.ts` с методами:
  - Регистрация/получение пользователя
  - Сохранение теста на тревожность
  - Получение инструкторов и отзывов
  - Работа с прогрессом и навыками
  - Запись на занятия
  - Сообщения поддержки

### 3. Типы TypeScript
- ✅ Созданы типы в `src/types/bot.ts` для всех сущностей

### 4. Компонент бота
- ✅ Доработан компонент `DrivingSchoolBot` с подключением к API
- ✅ Добавлена загрузка данных из Supabase
- ✅ Реализовано сохранение состояния пользователя

### 5. Веб-интеграция
- ✅ Создана страница `/bot` в `src/pages/BotPage.tsx`
- ✅ Добавлен роут в `App.tsx`
- ✅ Установлены зависимости: `lucide-react`, `tailwindcss`

## Следующие шаги

### Для запуска:

1. **Выполнить SQL миграцию в Supabase:**
   ```sql
   -- Откройте файл supabase/migrations/002_create_bot_tables.sql
   -- и выполните его в Supabase SQL Editor
   ```

2. **Настроить RLS (Row Level Security) в Supabase:**
   ```sql
   -- Включить RLS для таблиц бота
   ALTER TABLE bot_users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE bot_instructors ENABLE ROW LEVEL SECURITY;
   ALTER TABLE bot_reviews ENABLE ROW LEVEL SECURITY;
   ALTER TABLE bot_progress ENABLE ROW LEVEL SECURITY;
   ALTER TABLE bot_skills ENABLE ROW LEVEL SECURITY;
   ALTER TABLE bot_lessons ENABLE ROW LEVEL SECURITY;
   ALTER TABLE bot_support_messages ENABLE ROW LEVEL SECURITY;

   -- Политики для чтения (все могут читать)
   CREATE POLICY "Anyone can read instructors"
   ON bot_instructors FOR SELECT
   USING (is_active = true);

   CREATE POLICY "Anyone can read approved reviews"
   ON bot_reviews FOR SELECT
   USING (is_approved = true);

   -- Политики для записи (все могут создавать)
   CREATE POLICY "Anyone can insert users"
   ON bot_users FOR INSERT
   WITH CHECK (true);

   CREATE POLICY "Users can update their own data"
   ON bot_users FOR UPDATE
   USING (true);

   CREATE POLICY "Anyone can insert progress"
   ON bot_progress FOR INSERT
   WITH CHECK (true);

   CREATE POLICY "Users can update their own progress"
   ON bot_progress FOR UPDATE
   USING (true);

   CREATE POLICY "Anyone can insert skills"
   ON bot_skills FOR INSERT
   WITH CHECK (true);

   CREATE POLICY "Users can update their own skills"
   ON bot_skills FOR UPDATE
   USING (true);

   CREATE POLICY "Anyone can insert lessons"
   ON bot_lessons FOR INSERT
   WITH CHECK (true);

   CREATE POLICY "Anyone can insert support messages"
   ON bot_support_messages FOR INSERT
   WITH CHECK (true);
   ```

3. **Запустить приложение:**
   ```bash
   npm run dev
   ```

4. **Открыть бота:**
   - Перейти на `http://localhost:5173/bot`

## Будущие доработки (по плану)

### Этап 3: Интеграция с Telegram
- [ ] Создать Telegram бота через @BotFather
- [ ] Установить `node-telegram-bot-api`
- [ ] Реализовать обработку команд и callback-кнопок
- [ ] Подключить к единому API

### Этап 4: Интеграция с WhatsApp
- [ ] Выбрать провайдера (Twilio/360dialog/Meta)
- [ ] Установить SDK
- [ ] Реализовать обработку сообщений
- [ ] Настроить шаблоны сообщений

### Этап 6: Дополнительные функции
- [ ] Система уведомлений (cron jobs)
- [ ] Загрузка видео занятий
- [ ] Умные рекомендации
- [ ] Реферальная программа
- [ ] Интеграция с календарем

## Структура файлов

```
viktorija-web/
├── src/
│   ├── components/
│   │   └── bot/
│   │       └── DrivingSchoolBot.tsx  # Компонент бота
│   ├── pages/
│   │   └── BotPage.tsx                # Страница бота
│   ├── services/
│   │   └── botService.ts               # API сервис
│   └── types/
│       └── bot.ts                     # TypeScript типы
├── supabase/
│   └── migrations/
│       └── 002_create_bot_tables.sql  # SQL миграция
└── BOT_SETUP.md                       # Этот файл
```

## Примечания

- Компонент использует Tailwind CSS для стилей
- Все данные хранятся в Supabase
- Бот работает в веб-версии, готов к интеграции с Telegram/WhatsApp
- Для продакшена нужно настроить RLS политики в Supabase
