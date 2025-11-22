import { useState, useEffect } from 'react';
import { ContentService } from '../services/contentService';
import type { ContentItem, ContentType } from '../types/content';

/**
 * Хук для получения контента по типу
 */
export function useContent<T extends ContentItem>(
  type: ContentType,
  language?: string,
  publishedOnly: boolean = true
) {
  const [content, setContent] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);
        const data = await ContentService.getContentByType<T>(
          type,
          language,
          publishedOnly
        );
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [type, language, publishedOnly]);

  return { content, loading, error, refetch: () => {
    setLoading(true);
    ContentService.getContentByType<T>(type, language, publishedOnly)
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err : new Error('Unknown error')))
      .finally(() => setLoading(false));
  }};
}

/**
 * Хук для получения одного элемента контента по ID
 */
export function useContentById(id: string | null) {
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setContent(null);
      setLoading(false);
      return;
    }

    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);
        const data = await ContentService.getContentById(id);
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [id]);

  return { content, loading, error };
}

/**
 * Хук для получения контента по slug
 */
export function useContentBySlug(
  slug: string | null,
  type: ContentType,
  language?: string
) {
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setContent(null);
      setLoading(false);
      return;
    }

    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);
        const data = await ContentService.getContentBySlug(slug, type, language);
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [slug, type, language]);

  return { content, loading, error };
}

