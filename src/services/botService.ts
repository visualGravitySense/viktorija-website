// Сервис для работы с API бота
import { supabase } from '../lib/supabase';
import type {
  BotUser,
  Instructor,
  Review,
  Progress,
  Skill,
  Lesson,
  SupportMessage,
  AnxietyTestResult,
  BookLessonRequest,
  UserNote,
  Platform,
} from '../types/bot';

export class BotService {
  // Регистрация/создание пользователя
  static async registerUser(data: {
    name?: string;
    phone?: string;
    email?: string;
    platform: Platform;
    telegram_id?: number;
    whatsapp_id?: string;
  }): Promise<BotUser> {
    const { data: user, error } = await supabase
      .from('bot_users')
      .insert({
        name: data.name || null,
        phone: data.phone || null,
        email: data.email || null,
        platform: data.platform,
        telegram_id: data.telegram_id || null,
        whatsapp_id: data.whatsapp_id || null,
      })
      .select()
      .single();

    if (error) throw error;
    return user;
  }

  // Получить или создать пользователя
  static async getOrCreateUser(data: {
    name?: string;
    phone?: string;
    email?: string;
    platform: Platform;
    telegram_id?: number;
    whatsapp_id?: string;
  }): Promise<BotUser> {
    // Попытка найти существующего пользователя
    let query = supabase.from('bot_users').select('*');

    if (data.telegram_id) {
      query = query.eq('telegram_id', data.telegram_id);
    } else if (data.whatsapp_id) {
      query = query.eq('whatsapp_id', data.whatsapp_id);
    } else if (data.email) {
      query = query.eq('email', data.email);
    } else if (data.phone) {
      query = query.eq('phone', data.phone);
    } else {
      // Если нет идентификаторов, создаем нового
      return this.registerUser(data);
    }

    const { data: existingUser, error } = await query.single();

    if (error && error.code === 'PGRST116') {
      // Пользователь не найден, создаем нового
      return this.registerUser(data);
    }

    if (error) throw error;

    // Обновляем last_active_at
    await supabase
      .from('bot_users')
      .update({ last_active_at: new Date().toISOString() })
      .eq('id', existingUser.id);

    return existingUser;
  }

  // Сохранить результат теста на тревожность
  static async saveAnxietyTest(userId: string, anxietyLevel: number): Promise<void> {
    const { error } = await supabase
      .from('bot_users')
      .update({ anxiety_level: anxietyLevel })
      .eq('id', userId);

    if (error) throw error;
  }

  // Сохранить выбранного инструктора
  static async saveSelectedInstructor(userId: string, instructorId: string): Promise<void> {
    const { error } = await supabase
      .from('bot_users')
      .update({ selected_instructor_id: instructorId })
      .eq('id', userId);

    if (error) throw error;
  }

  // Получить список инструкторов
  static async getInstructors(): Promise<Instructor[]> {
    const { data, error } = await supabase
      .from('bot_instructors')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Получить отзывы об инструкторе
  static async getInstructorReviews(instructorId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('bot_reviews')
      .select('*')
      .eq('instructor_id', instructorId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Получить все одобренные отзывы (для страницы testimonials)
  static async getTestimonials(limit: number = 10): Promise<Review[]> {
    const { data, error } = await supabase
      .from('bot_reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Создать отзыв
  static async createReview(data: {
    instructor_id: string;
    student_name: string;
    text: string;
    rating: number;
    video_url?: string;
  }): Promise<Review> {
    const { data: review, error } = await supabase
      .from('bot_reviews')
      .insert({
        instructor_id: data.instructor_id,
        student_name: data.student_name,
        text: data.text,
        rating: data.rating,
        video_url: data.video_url || null,
        is_approved: false, // Требует модерации
      })
      .select()
      .single();

    if (error) throw error;
    return review;
  }

  // Получить прогресс пользователя
  static async getProgress(userId: string): Promise<Progress | null> {
    try {
      const { data, error } = await supabase
        .from('bot_progress')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle(); // Используем maybeSingle вместо single для избежания ошибок 406

      // Если ошибка и это не "не найдено", выбрасываем её
      if (error) {
        // PGRST116 = "The result contains 0 rows" - это нормально
        if (error.code === 'PGRST116' || error.message?.includes('0 rows')) {
          return null;
        }
        console.error('Error fetching progress:', error);
        throw error;
      }
      
      return data;
    } catch (err) {
      console.error('Exception in getProgress:', err);
      // Возвращаем null вместо выброса ошибки, чтобы не ломать UI
      return null;
    }
  }

  // Создать или обновить прогресс
  static async upsertProgress(
    userId: string,
    progress: {
      theory_progress?: number;
      driving_progress?: number;
      completed_lessons?: number;
      total_lessons?: number;
    }
  ): Promise<Progress> {
    const { data, error } = await supabase
      .from('bot_progress')
      .upsert(
        {
          user_id: userId,
          ...progress,
        },
        { onConflict: 'user_id' }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Получить навыки пользователя
  static async getSkills(userId: string): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('bot_skills')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Обновить навык
  static async updateSkill(skillId: string, completed: boolean): Promise<Skill> {
    const { data, error } = await supabase
      .from('bot_skills')
      .update({ completed })
      .eq('id', skillId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Создать навык
  static async createSkill(userId: string, skillName: string): Promise<Skill> {
    const { data, error } = await supabase
      .from('bot_skills')
      .insert({
        user_id: userId,
        skill_name: skillName,
        completed: false,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Записаться на занятие
  static async bookLesson(request: BookLessonRequest): Promise<Lesson> {
    const { data, error } = await supabase
      .from('bot_lessons')
      .insert({
        user_id: request.user_id,
        instructor_id: request.instructor_id,
        date: request.date,
        type: request.type,
        status: 'scheduled',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Получить занятия пользователя
  static async getLessons(userId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('bot_lessons')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Отправить сообщение в поддержку
  static async sendSupportMessage(userId: string, message: string): Promise<SupportMessage> {
    const { data, error } = await supabase
      .from('bot_support_messages')
      .insert({
        user_id: userId,
        message,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Получить сообщения поддержки пользователя
  static async getSupportMessages(userId: string): Promise<SupportMessage[]> {
    const { data, error } = await supabase
      .from('bot_support_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Обновить прогресс пользователя (для самостоятельного обновления)
  static async updateProgress(
    userId: string,
    updates: {
      theory_progress?: number;
      driving_progress?: number;
      completed_lessons?: number;
    }
  ): Promise<Progress> {
    const { data, error } = await supabase
      .from('bot_progress')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Отметить навык как освоенный/не освоенный
  static async toggleSkill(skillId: string): Promise<Skill> {
    // Сначала получаем текущее состояние
    const { data: currentSkill, error: fetchError } = await supabase
      .from('bot_skills')
      .select('*')
      .eq('id', skillId)
      .single();

    if (fetchError) throw fetchError;

    // Переключаем состояние
    const { data, error } = await supabase
      .from('bot_skills')
      .update({ completed: !currentSkill.completed })
      .eq('id', skillId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Добавить заметку
  static async addNote(userId: string, noteText: string, lessonId?: string): Promise<UserNote> {
    const { data, error } = await supabase
      .from('bot_user_notes')
      .insert({
        user_id: userId,
        note_text: noteText,
        lesson_id: lessonId || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Получить заметки пользователя
  static async getNotes(userId: string): Promise<UserNote[]> {
    const { data, error } = await supabase
      .from('bot_user_notes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Удалить заметку
  static async deleteNote(noteId: string): Promise<void> {
    const { error } = await supabase
      .from('bot_user_notes')
      .delete()
      .eq('id', noteId);

    if (error) throw error;
  }
}
