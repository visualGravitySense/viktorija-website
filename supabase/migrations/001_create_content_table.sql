-- Миграция для создания таблицы контента
-- Выполните этот SQL в Supabase SQL Editor

-- Создание таблицы для контента
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('page', 'blog_post', 'faq', 'testimonial', 'instructor', 'course', 'pricing', 'announcement')),
  language TEXT NOT NULL CHECK (language IN ('ru', 'et', 'en')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT,
  metadata JSONB DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);
CREATE INDEX IF NOT EXISTS idx_content_language ON content(language);
CREATE INDEX IF NOT EXISTS idx_content_slug ON content(slug);
CREATE INDEX IF NOT EXISTS idx_content_published ON content(published);
CREATE INDEX IF NOT EXISTS idx_content_type_language ON content(type, language);

-- Создание уникального индекса для slug + type + language
CREATE UNIQUE INDEX IF NOT EXISTS idx_content_slug_type_language 
ON content(slug, type, language) 
WHERE slug IS NOT NULL;

-- Включение Row Level Security (RLS)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Политика для чтения: все могут читать опубликованный контент
CREATE POLICY "Anyone can read published content"
ON content FOR SELECT
USING (published = true);

-- Политика для записи: только аутентифицированные пользователи могут создавать/обновлять
-- ВАЖНО: Настройте эти политики в соответствии с вашими требованиями безопасности
CREATE POLICY "Authenticated users can insert content"
ON content FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update content"
ON content FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete content"
ON content FOR DELETE
USING (auth.role() = 'authenticated');

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для автоматического обновления updated_at
CREATE TRIGGER update_content_updated_at
BEFORE UPDATE ON content
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Комментарии к таблице и колонкам
COMMENT ON TABLE content IS 'Таблица для управления контентом сайта';
COMMENT ON COLUMN content.type IS 'Тип контента: page, blog_post, faq, testimonial, instructor, course, pricing, announcement';
COMMENT ON COLUMN content.language IS 'Язык контента: ru, et, en';
COMMENT ON COLUMN content.slug IS 'URL-friendly идентификатор для страниц и постов';
COMMENT ON COLUMN content.metadata IS 'Дополнительные данные в формате JSON';
COMMENT ON COLUMN content.published IS 'Опубликован ли контент (true = виден всем, false = черновик)';

