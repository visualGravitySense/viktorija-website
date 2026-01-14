/**
 * Тестовая страница для проверки работы с контентом из Supabase
 * Используйте эту страницу для тестирования локально
 */

import React from 'react';
import { useContent } from '../hooks/useContent';
import type { FAQ, BlogPost, Testimonial } from '../types/content';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Tabs,
  Tab,
  Stack,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function TestContentPage() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as 'ru' | 'et' | 'en';
  const [tab, setTab] = React.useState(0);

  // Загружаем контент из Supabase
  const { content: faqs, loading: faqsLoading, error: faqsError } = useContent<FAQ>('faq', currentLanguage);
  const { content: blogPosts, loading: blogLoading, error: blogError } = useContent<BlogPost>('blog_post', currentLanguage);
  const { content: testimonials, loading: testimonialsLoading, error: testimonialsError } = useContent<Testimonial>('testimonial', currentLanguage);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Тестовая страница контента из Supabase
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Текущий язык: {currentLanguage}
      </Typography>

      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
        <Tab label={`FAQ (${faqs.length})`} />
        <Tab label={`Блог (${blogPosts.length})`} />
        <Tab label={`Отзывы (${testimonials.length})`} />
      </Tabs>

      {/* FAQ Tab */}
      {tab === 0 && (
        <Box>
          <Typography variant="h4" gutterBottom>
            Часто задаваемые вопросы
          </Typography>
          {faqsLoading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : faqsError ? (
            <Alert severity="error">
              Ошибка загрузки FAQ: {faqsError.message}
            </Alert>
          ) : faqs.length === 0 ? (
            <Alert severity="info">
              FAQ пока нет. Создайте их через админ-панель на http://localhost:3001
            </Alert>
          ) : (
            <Stack spacing={2}>
              {faqs.map((faq) => (
                <Card key={faq.id}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {faq.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {faq.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      ID: {faq.id} | Опубликовано: {faq.published ? 'Да' : 'Нет'}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      )}

      {/* Blog Posts Tab */}
      {tab === 1 && (
        <Box>
          <Typography variant="h4" gutterBottom>
            Блог-посты
          </Typography>
          {blogLoading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : blogError ? (
            <Alert severity="error">
              Ошибка загрузки блога: {blogError.message}
            </Alert>
          ) : blogPosts.length === 0 ? (
            <Alert severity="info">
              Блог-постов пока нет. Создайте их через админ-панель на http://localhost:3001
            </Alert>
          ) : (
            <Stack spacing={2}>
              {blogPosts.map((post) => (
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
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      {post.content}
                    </Typography>
                    {post.metadata?.author && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        Автор: {post.metadata.author}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Slug: {post.slug || 'нет'} | Опубликовано: {post.published ? 'Да' : 'Нет'}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      )}

      {/* Testimonials Tab */}
      {tab === 2 && (
        <Box>
          <Typography variant="h4" gutterBottom>
            Отзывы
          </Typography>
          {testimonialsLoading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : testimonialsError ? (
            <Alert severity="error">
              Ошибка загрузки отзывов: {testimonialsError.message}
            </Alert>
          ) : testimonials.length === 0 ? (
            <Alert severity="info">
              Отзывов пока нет. Создайте их через админ-панель на http://localhost:3001
            </Alert>
          ) : (
            <Stack spacing={2}>
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {testimonial.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {testimonial.content}
                    </Typography>
                    {testimonial.metadata?.author_name && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        Автор: {testimonial.metadata.author_name}
                        {testimonial.metadata.rating && ` | Рейтинг: ${testimonial.metadata.rating}/5`}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Опубликовано: {testimonial.published ? 'Да' : 'Нет'}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      )}
    </Container>
  );
}
