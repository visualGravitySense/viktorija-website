-- Добавление поля для выбранного инструктора в таблицу bot_users

ALTER TABLE bot_users 
ADD COLUMN IF NOT EXISTS selected_instructor_id UUID REFERENCES bot_instructors(id) ON DELETE SET NULL;

-- Создание индекса для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_bot_users_selected_instructor ON bot_users(selected_instructor_id);
