import { supabase } from '../lib/supabase';
import type {
  ContentItem,
  ContentType,
  PageContent,
  BlogPost,
  FAQ,
  Testimonial,
  Instructor,
  Course,
  Pricing,
  Announcement,
} from '../types/content';

// Базовые CRUD операции для контента

export class ContentService {
  /**
   * Получить все элементы контента определенного типа
   */
  static async getContentByType<T extends ContentItem>(
    type: ContentType,
    language?: string,
    publishedOnly: boolean = true
  ): Promise<T[]> {
    let query = supabase
      .from('content')
      .select('*')
      .eq('type', type);

    if (language) {
      query = query.eq('language', language);
    }

    if (publishedOnly) {
      query = query.eq('published', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching content:', error);
      throw error;
    }

    return (data || []) as T[];
  }

  /**
   * Получить контент по ID
   */
  static async getContentById(id: string): Promise<ContentItem | null> {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching content by ID:', error);
      return null;
    }

    return data as ContentItem;
  }

  /**
   * Получить контент по slug
   */
  static async getContentBySlug(
    slug: string,
    type: ContentType,
    language?: string
  ): Promise<ContentItem | null> {
    let query = supabase
      .from('content')
      .select('*')
      .eq('slug', slug)
      .eq('type', type);

    if (language) {
      query = query.eq('language', language);
    }

    const { data, error } = await query.single();

    if (error) {
      console.error('Error fetching content by slug:', error);
      return null;
    }

    return data as ContentItem;
  }

  /**
   * Создать новый элемент контента
   */
  static async createContent(content: Partial<ContentItem>): Promise<ContentItem> {
    const { data, error } = await supabase
      .from('content')
      .insert({
        ...content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating content:', error);
      throw error;
    }

    return data as ContentItem;
  }

  /**
   * Обновить элемент контента
   */
  static async updateContent(
    id: string,
    updates: Partial<ContentItem>
  ): Promise<ContentItem> {
    const { data, error } = await supabase
      .from('content')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating content:', error);
      throw error;
    }

    return data as ContentItem;
  }

  /**
   * Удалить элемент контента
   */
  static async deleteContent(id: string): Promise<void> {
    const { error } = await supabase.from('content').delete().eq('id', id);

    if (error) {
      console.error('Error deleting content:', error);
      throw error;
    }
  }

  /**
   * Получить страницы
   */
  static async getPages(language?: string): Promise<PageContent[]> {
    return this.getContentByType<PageContent>('page', language);
  }

  /**
   * Получить блог посты
   */
  static async getBlogPosts(language?: string): Promise<BlogPost[]> {
    return this.getContentByType<BlogPost>('blog_post', language);
  }

  /**
   * Получить FAQ
   */
  static async getFAQs(language?: string): Promise<FAQ[]> {
    return this.getContentByType<FAQ>('faq', language);
  }

  /**
   * Получить отзывы
   */
  static async getTestimonials(language?: string): Promise<Testimonial[]> {
    return this.getContentByType<Testimonial>('testimonial', language);
  }

  /**
   * Получить инструкторов
   */
  static async getInstructors(language?: string): Promise<Instructor[]> {
    return this.getContentByType<Instructor>('instructor', language);
  }

  /**
   * Получить курсы
   */
  static async getCourses(language?: string): Promise<Course[]> {
    return this.getContentByType<Course>('course', language);
  }

  /**
   * Получить цены
   */
  static async getPricing(language?: string): Promise<Pricing[]> {
    return this.getContentByType<Pricing>('pricing', language);
  }

  /**
   * Получить объявления
   */
  static async getAnnouncements(language?: string): Promise<Announcement[]> {
    return this.getContentByType<Announcement>('announcement', language);
  }
}

