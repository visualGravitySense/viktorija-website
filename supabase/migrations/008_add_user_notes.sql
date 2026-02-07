-- Таблица для заметок ученика
CREATE TABLE IF NOT EXISTS bot_user_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES bot_users(id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  lesson_id UUID REFERENCES bot_lessons(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекс для быстрого поиска заметок пользователя
CREATE INDEX IF NOT EXISTS idx_bot_user_notes_user_id ON bot_user_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_bot_user_notes_lesson_id ON bot_user_notes(lesson_id);

-- Триггер для автоматического обновления updated_at
CREATE TRIGGER update_bot_user_notes_updated_at BEFORE UPDATE ON bot_user_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Включаем RLS
ALTER TABLE bot_user_notes ENABLE ROW LEVEL SECURITY;

-- Политики для публичного доступа (бот работает без аутентификации)
CREATE POLICY "Allow public access to bot_user_notes"
ON bot_user_notes FOR ALL
USING (true)
WITH CHECK (true);
