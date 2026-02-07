-- Исправление RLS политик для bot_progress
-- Проблема: ошибка 406 (Not Acceptable) при запросах к bot_progress

-- Включаем RLS для bot_progress (если еще не включен)
ALTER TABLE bot_progress ENABLE ROW LEVEL SECURITY;

-- Удаляем старые политики, если они есть
DROP POLICY IF EXISTS "Allow public read access to bot_progress" ON bot_progress;
DROP POLICY IF EXISTS "Allow public insert to bot_progress" ON bot_progress;
DROP POLICY IF EXISTS "Allow public update to bot_progress" ON bot_progress;

-- Политика для чтения: разрешаем всем читать прогресс (так как бот работает без аутентификации)
CREATE POLICY "Allow public read access to bot_progress"
ON bot_progress FOR SELECT
USING (true);

-- Политика для вставки: разрешаем всем создавать записи прогресса
CREATE POLICY "Allow public insert to bot_progress"
ON bot_progress FOR INSERT
WITH CHECK (true);

-- Политика для обновления: разрешаем всем обновлять свой прогресс
CREATE POLICY "Allow public update to bot_progress"
ON bot_progress FOR UPDATE
USING (true)
WITH CHECK (true);

-- Политика для удаления: разрешаем всем удалять свой прогресс
CREATE POLICY "Allow public delete to bot_progress"
ON bot_progress FOR DELETE
USING (true);
