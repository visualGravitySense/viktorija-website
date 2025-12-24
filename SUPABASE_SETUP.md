# Настройка Supabase для управления контентом

## 📋 Обзор

Supabase интегрирован в проект для управления контентом сайта. Это позволяет управлять всеми текстами, страницами, блог-постами, FAQ, отзывами и другими элементами контента через удобный интерфейс Supabase.

## 🚀 Быстрый старт

### 1. Создание проекта Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте аккаунт или войдите
3. Создайте новый проект
4. Выберите регион (рекомендуется ближайший к вашей аудитории)
5. Дождитесь завершения создания проекта

### 2. Получение ключей API

1. В панели управления Supabase перейдите в **Settings** → **API**
2. Скопируйте следующие значения:
   - **Project URL** (это ваш `VITE_SUPABASE_URL`)
   - **anon/public key** (это ваш `VITE_SUPABASE_ANON_KEY`)

### 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта (если его еще нет) и добавьте:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Важно**: Не коммитьте файл `.env.local` в Git! Он уже должен быть в `.gitignore`.

### 4. Создание таблицы контента в Supabase

#### Вариант A: Через SQL Editor (рекомендуется)

1. В панели Supabase перейдите в **SQL Editor**
2. Выполните следующий SQL запрос:

```sql
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
```

#### Вариант B: Через Table Editor

1. Перейдите в **Table Editor** в панели Supabase
2. Создайте новую таблицу `content` со следующими колонками:

| Column Name | Type | Default | Nullable | Unique |
|------------|------|---------|----------|--------|
| id | uuid | gen_random_uuid() | No | Yes (Primary Key) |
| type | text | - | No | No |
| language | text | - | No | No |
| title | text | - | No | No |
| content | text | - | No | No |
| slug | text | - | Yes | No |
| metadata | jsonb | '{}' | Yes | No |
| published | boolean | false | No | No |
| created_at | timestamptz | now() | No | No |
| updated_at | timestamptz | now() | No | No |

3. Добавьте проверки (constraints):
   - Для `type`: `CHECK (type IN ('page', 'blog_post', 'faq', 'testimonial', 'instructor', 'course', 'pricing', 'announcement'))`
   - Для `language`: `CHECK (language IN ('ru', 'et', 'en'))`

4. Настройте Row Level Security (RLS) в разделе **Authentication** → **Policies**

### 5. Настройка аутентификации (опционально)

Если вы хотите управлять контентом через веб-интерфейс:

1. Перейдите в **Authentication** → **Providers**
2. Включите нужные провайдеры (Email, Google, и т.д.)
3. Настройте политики доступа в **Authentication** → **Policies**

## 📚 Использование в коде

### Базовое использование

```typescript
import { useContent } from '../hooks/useContent';
import { ContentService } from '../services/contentService';

// В компоненте React
function MyComponent() {
  const { content, loading, error } = useContent('faq', 'ru');
  
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  
  return (
    <div>
      {content.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
```

### Управление контентом

```typescript
import { useContentManagement } from '../hooks/useContentManagement';

function ContentEditor() {
  const { createContent, updateContent, deleteContent, loading } = useContentManagement();
  
  const handleCreate = async () => {
    await createContent({
      type: 'faq',
      language: 'ru',
      title: 'Новый вопрос',
      content: 'Ответ на вопрос',
      published: true,
    });
  };
  
  // ...
}
```

### Прямое использование сервиса

```typescript
import { ContentService } from '../services/contentService';

// Получить все FAQ на русском
const faqs = await ContentService.getFAQs('ru');

// Получить конкретную страницу
const page = await ContentService.getContentBySlug('about', 'page', 'ru');

// Создать новый контент
const newContent = await ContentService.createContent({
  type: 'blog_post',
  language: 'ru',
  title: 'Новый пост',
  content: 'Содержание поста',
  slug: 'new-post',
  published: true,
});
```

## 🎯 Типы контента

Проект поддерживает следующие типы контента:

- **page** - Статические страницы (О нас, Контакты и т.д.)
- **blog_post** - Блог посты
- **faq** - Часто задаваемые вопросы
- **testimonial** - Отзывы клиентов
- **instructor** - Информация об инструкторах
- **course** - Описания курсов
- **pricing** - Информация о ценах
- **announcement** - Объявления

## 🔒 Безопасность

1. **Row Level Security (RLS)** включен по умолчанию
2. Только опубликованный контент доступен для чтения всем
3. Для создания/обновления/удаления требуется аутентификация
4. Настройте политики доступа в соответствии с вашими требованиями

## 📝 Примеры данных

### FAQ

```json
{
  "type": "faq",
  "language": "ru",
  "title": "Сколько стоит обучение?",
  "content": "Стоимость обучения зависит от выбранной категории...",
  "metadata": {
    "category": "pricing",
    "order": 1
  },
  "published": true
}
```

### Блог пост

```json
{
  "type": "blog_post",
  "language": "ru",
  "title": "Новые правила дорожного движения",
  "content": "Полный текст статьи...",
  "slug": "new-traffic-rules-2024",
  "metadata": {
    "excerpt": "Краткое описание",
    "featured_image": "/images/blog/new-rules.jpg",
    "author": "Иван Иванов"
  },
  "published": true
}
```

### Отзыв

```json
{
  "type": "testimonial",
  "language": "ru",
  "title": "Отличная автошкола!",
  "content": "Очень доволен обучением...",
  "metadata": {
    "author_name": "Петр Петров",
    "author_role": "Студент",
    "rating": 5
  },
  "published": true
}
```

## 🛠️ Дополнительные возможности

### Реальное время (Realtime)

Supabase поддерживает обновления в реальном времени. Вы можете подписаться на изменения:

```typescript
import { supabase } from '../lib/supabase';

supabase
  .channel('content-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'content' },
    (payload) => {
      console.log('Content changed:', payload);
    }
  )
  .subscribe();
```

### Хранение файлов (Storage)

Для изображений и других файлов используйте Supabase Storage:

```typescript
import { supabase } from '../lib/supabase';

// Загрузка файла
const { data, error } = await supabase.storage
  .from('content-images')
  .upload('path/to/file.jpg', file);
```

## 📞 Поддержка

Если у вас возникли вопросы:
- Документация Supabase: https://supabase.com/docs
- Документация проекта: см. README.md

