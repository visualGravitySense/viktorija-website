import { useState } from 'react';
import { ContentService } from '../services/contentService';
import type { ContentItem } from '../types/content';

/**
 * Хук для управления контентом (создание, обновление, удаление)
 */
export function useContentManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createContent = async (content: Partial<ContentItem>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ContentService.createContent(content);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: string, updates: Partial<ContentItem>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ContentService.updateContent(id, updates);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await ContentService.deleteContent(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createContent,
    updateContent,
    deleteContent,
    loading,
    error,
  };
}

