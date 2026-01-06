-- Удаление тестовых инструкторов из базы данных
-- Этот скрипт удаляет тестовых инструкторов: Иван Петров, Мария Сидорова, Алексей Козлов

-- Удаление тестовых инструкторов
-- Отзывы (bot_reviews) будут удалены автоматически благодаря ON DELETE CASCADE
-- Занятия (bot_lessons) останутся, но instructor_id станет NULL благодаря ON DELETE SET NULL

DELETE FROM bot_instructors 
WHERE name IN ('Иван Петров', 'Мария Сидорова', 'Алексей Козлов');

-- Проверка: показать оставшихся инструкторов
-- SELECT id, name, is_active FROM bot_instructors ORDER BY created_at;
