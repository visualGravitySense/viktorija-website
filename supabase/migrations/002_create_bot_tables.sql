-- Создание таблиц для бота автошколы

-- Таблица пользователей бота
CREATE TABLE IF NOT EXISTS bot_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  phone TEXT,
  email TEXT,
  platform TEXT NOT NULL DEFAULT 'web', -- 'web', 'telegram', 'whatsapp'
  telegram_id BIGINT,
  whatsapp_id TEXT,
  anxiety_level INTEGER CHECK (anxiety_level >= 1 AND anxiety_level <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица инструкторов
CREATE TABLE IF NOT EXISTS bot_instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  style TEXT NOT NULL,
  experience TEXT NOT NULL,
  pass_rate TEXT NOT NULL,
  photo_url TEXT,
  specialty TEXT,
  reviews_count INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица отзывов
CREATE TABLE IF NOT EXISTS bot_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID REFERENCES bot_instructors(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  text TEXT NOT NULL,
  video_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица прогресса ученика
CREATE TABLE IF NOT EXISTS bot_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES bot_users(id) ON DELETE CASCADE,
  theory_progress INTEGER DEFAULT 0 CHECK (theory_progress >= 0 AND theory_progress <= 100),
  driving_progress INTEGER DEFAULT 0 CHECK (driving_progress >= 0 AND driving_progress <= 100),
  completed_lessons INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 28,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Таблица навыков
CREATE TABLE IF NOT EXISTS bot_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES bot_users(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица занятий
CREATE TABLE IF NOT EXISTS bot_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES bot_users(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES bot_instructors(id) ON DELETE SET NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  type TEXT NOT NULL, -- 'theory', 'driving'
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled'
  video_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица сообщений поддержки
CREATE TABLE IF NOT EXISTS bot_support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES bot_users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'answered', 'closed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_bot_users_platform ON bot_users(platform);
CREATE INDEX IF NOT EXISTS idx_bot_users_telegram_id ON bot_users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_bot_reviews_instructor_id ON bot_reviews(instructor_id);
CREATE INDEX IF NOT EXISTS idx_bot_progress_user_id ON bot_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_bot_skills_user_id ON bot_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_bot_lessons_user_id ON bot_lessons(user_id);
CREATE INDEX IF NOT EXISTS idx_bot_lessons_instructor_id ON bot_lessons(instructor_id);
CREATE INDEX IF NOT EXISTS idx_bot_lessons_date ON bot_lessons(date);
CREATE INDEX IF NOT EXISTS idx_bot_support_user_id ON bot_support_messages(user_id);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_bot_users_updated_at BEFORE UPDATE ON bot_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bot_instructors_updated_at BEFORE UPDATE ON bot_instructors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bot_progress_updated_at BEFORE UPDATE ON bot_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bot_skills_updated_at BEFORE UPDATE ON bot_skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bot_lessons_updated_at BEFORE UPDATE ON bot_lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bot_support_messages_updated_at BEFORE UPDATE ON bot_support_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Функция для обновления статистики инструктора
CREATE OR REPLACE FUNCTION update_instructor_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_approved = true AND (OLD.is_approved IS NULL OR OLD.is_approved = false) THEN
    UPDATE bot_instructors
    SET 
      reviews_count = (
        SELECT COUNT(*) FROM bot_reviews 
        WHERE instructor_id = NEW.instructor_id AND is_approved = true
      ),
      rating = (
        SELECT COALESCE(AVG(rating), 0) FROM bot_reviews 
        WHERE instructor_id = NEW.instructor_id AND is_approved = true
      )
    WHERE id = NEW.instructor_id;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_instructor_stats_trigger
  AFTER INSERT OR UPDATE ON bot_reviews
  FOR EACH ROW EXECUTE FUNCTION update_instructor_stats();

-- Вставка тестовых данных инструкторов
INSERT INTO bot_instructors (name, style, experience, pass_rate, photo_url, specialty, reviews_count, rating) VALUES
  ('Иван Петров', 'Спокойный и терпеливый', '12 лет', '94%', '👨‍🏫', 'Работа с тревожными учениками', 156, 4.9),
  ('Мария Сидорова', 'Дружелюбная и внимательная', '8 лет', '91%', '👩‍🏫', 'Специализация на женщинах-водителях', 203, 4.8),
  ('Алексей Козлов', 'Требовательный профессионал', '15 лет', '96%', '👨‍✈️', 'Подготовка к сложным условиям', 187, 4.9)
ON CONFLICT DO NOTHING;

-- Вставка тестовых отзывов
INSERT INTO bot_reviews (instructor_id, student_name, text, video_url, rating, is_approved) 
SELECT 
  i.id,
  'Анна, 28 лет',
  'Боялась водить 5 лет после аварии. Здесь мне помогли!',
  NULL,
  5,
  true
FROM bot_instructors i WHERE i.name = 'Иван Петров'
ON CONFLICT DO NOTHING;

INSERT INTO bot_reviews (instructor_id, student_name, text, video_url, rating, is_approved) 
SELECT 
  i.id,
  'Дмитрий, 35 лет',
  'Сдал с первого раза благодаря терпению инструктора',
  NULL,
  5,
  true
FROM bot_instructors i WHERE i.name = 'Мария Сидорова'
ON CONFLICT DO NOTHING;
