// Типы для управления контентом через Supabase

export interface ContentItem {
  id: string;
  type: ContentType;
  language: 'ru' | 'et' | 'en';
  title: string;
  content: string;
  slug?: string;
  metadata?: Record<string, any>;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type ContentType =
  | 'page'
  | 'blog_post'
  | 'faq'
  | 'testimonial'
  | 'instructor'
  | 'course'
  | 'pricing'
  | 'announcement';

export interface PageContent extends ContentItem {
  type: 'page';
  slug: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

export interface BlogPost extends ContentItem {
  type: 'blog_post';
  slug: string;
  excerpt?: string;
  featured_image?: string;
  author?: string;
  published_at?: string;
}

export interface FAQ extends ContentItem {
  type: 'faq';
  category?: string;
  order?: number;
}

export interface Testimonial extends ContentItem {
  type: 'testimonial';
  author_name: string;
  author_role?: string;
  author_image?: string;
  rating?: number;
}

export interface Instructor extends ContentItem {
  type: 'instructor';
  name: string;
  photo?: string;
  experience_years?: number;
  specializations?: string[];
  contact_info?: Record<string, string>;
}

export interface Course extends ContentItem {
  type: 'course';
  category: 'A' | 'B' | 'C';
  price?: number;
  duration_hours?: number;
  features?: string[];
}

export interface Pricing extends ContentItem {
  type: 'pricing';
  category: 'A' | 'B' | 'C';
  price: number;
  currency: string;
  features?: string[];
  popular?: boolean;
}

export interface Announcement extends ContentItem {
  type: 'announcement';
  priority: 'low' | 'medium' | 'high';
  start_date?: string;
  end_date?: string;
  target_audience?: string[];
}

