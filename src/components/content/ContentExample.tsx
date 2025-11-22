/**
 * Пример компонента для работы с контентом из Supabase
 * 
 * Этот компонент демонстрирует, как использовать хуки и сервисы
 * для получения и отображения контента из Supabase.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../../hooks/useContent';
import { useContentManagement } from '../../hooks/useContentManagement';
import type { FAQ, BlogPost } from '../../types/content';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
} from '@mui/material';

/**
 * Пример: Отображение FAQ из Supabase
 */
export function FAQExample() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as 'ru' | 'et' | 'en';
  
  const { content, loading, error } = useContent<FAQ>('faq', currentLanguage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Ошибка загрузки FAQ: {error.message}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Часто задаваемые вопросы
      </Typography>
      {content.length === 0 ? (
        <Typography>FAQ пока нет. Добавьте их через Supabase.</Typography>
      ) : (
        content.map((faq) => (
          <Card key={faq.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {faq.title}
              </Typography>
              <Typography variant="body1">{faq.content}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

/**
 * Пример: Отображение блог постов
 */
export function BlogPostsExample() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as 'ru' | 'et' | 'en';
  
  const { content, loading, error } = useContent<BlogPost>(
    'blog_post',
    currentLanguage
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Ошибка загрузки блога: {error.message}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Блог
      </Typography>
      {content.length === 0 ? (
        <Typography>Постов пока нет.</Typography>
      ) : (
        <Stack spacing={2}>
          {content.map((post) => (
            <Card key={post.id}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {post.title}
                </Typography>
                {post.metadata?.excerpt && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {post.metadata.excerpt}
                  </Typography>
                )}
                <Typography variant="body1">{post.content}</Typography>
                {post.metadata?.author && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    Автор: {post.metadata.author}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}

/**
 * Пример: Простой редактор контента (требует аутентификации)
 */
export function ContentEditorExample() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [language, setLanguage] = React.useState<'ru' | 'et' | 'en'>('ru');
  
  const { createContent, updateContent, loading, error } = useContentManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createContent({
        type: 'faq',
        language,
        title,
        content,
        published: false, // Сначала создаем как черновик
      });
      
      // Очистить форму после успешного создания
      setTitle('');
      setContent('');
      
      alert('Контент успешно создан!');
    } catch (err) {
      console.error('Ошибка создания контента:', err);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Создать новый FAQ
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Язык"
            select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'ru' | 'et' | 'en')}
            SelectProps={{ native: true }}
            fullWidth
          >
            <option value="ru">Русский</option>
            <option value="et">Eesti</option>
            <option value="en">English</option>
          </TextField>
          
          <TextField
            label="Вопрос"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          
          <TextField
            label="Ответ"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={4}
            fullWidth
            required
          />
          
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Создание...' : 'Создать FAQ'}
          </Button>
        </Stack>
      </form>
    </Card>
  );
}

