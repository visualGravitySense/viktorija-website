// Service for working with bot API
import { supabase } from '../lib/supabase';
import { TelegramService } from './telegramService';
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
import type { User } from '@supabase/supabase-js';

export class BotService {
  // Получить или создать профиль пользователя бота из auth.users
  static async getOrCreateBotProfile(authUser: User): Promise<BotUser> {
    // Проверяем, есть ли уже профиль в bot_users
    const { data: existingProfile, error: fetchError } = await supabase
      .from('bot_users')
      .select('*')
      .eq('auth_user_id', authUser.id)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    // Если профиль существует, обновляем last_active_at и возвращаем
    if (existingProfile) {
      await supabase
        .from('bot_users')
        .update({ last_active_at: new Date().toISOString() })
        .eq('id', existingProfile.id);
      return existingProfile;
    }

    // Create new profile
    const { data: newProfile, error: insertError } = await supabase
      .from('bot_users')
      .insert({
        auth_user_id: authUser.id,
        name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || null,
        email: authUser.email || null,
        phone: authUser.phone || null,
        platform: 'web',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_active_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // Send Telegram notification about new user (non-blocking)
    TelegramService.notifyNewUser({
      name: newProfile.name,
      email: newProfile.email,
      phone: newProfile.phone,
      anxietyLevel: newProfile.anxiety_level,
    }).catch((err) => {
      console.error('Failed to send Telegram notification for new user:', err);
    });

    return newProfile;
  }

  // Получить профиль пользователя бота по auth_user_id
  static async getBotProfile(authUserId: string): Promise<BotUser | null> {
    const { data, error } = await supabase
      .from('bot_users')
      .select('*')
      .eq('auth_user_id', authUserId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data || null;
  }

  // Сохранить результат теста на тревожность
  static async saveAnxietyTest(authUserId: string, anxietyLevel: number): Promise<void> {
    // Сначала получаем профиль бота
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      throw new Error('Bot profile not found');
    }

    const { error } = await supabase
      .from('bot_users')
      .update({ anxiety_level: anxietyLevel })
      .eq('auth_user_id', authUserId);

    if (error) throw error;
  }

  // Сохранить выбранного инструктора
  static async saveSelectedInstructor(authUserId: string, instructorId: string): Promise<void> {
    const { error } = await supabase
      .from('bot_users')
      .update({ selected_instructor_id: instructorId })
      .eq('auth_user_id', authUserId);

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

  // Создать отзыв (используем auth_user_id)
  static async createReview(authUserId: string, data: {
    instructor_id: string;
    student_name: string;
    text: string;
    rating: number;
    video_url?: string;
  }): Promise<Review> {
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      throw new Error('Bot profile not found');
    }

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

  // Получить прогресс пользователя (используем auth_user_id)
  static async getProgress(authUserId: string): Promise<Progress | null> {
    try {
      // Получаем профиль бота
      const profile = await this.getBotProfile(authUserId);
      if (!profile) {
        return null;
      }

      const { data, error } = await supabase
        .from('bot_progress')
        .select('*')
        .eq('user_id', profile.id)
        .maybeSingle();

      if (error) {
        if (error.code === 'PGRST116' || error.message?.includes('0 rows')) {
          return null;
        }
        console.error('Error fetching progress:', error);
        throw error;
      }
      
      return data;
    } catch (err) {
      console.error('Exception in getProgress:', err);
      return null;
    }
  }

  // Создать или обновить прогресс (используем auth_user_id)
  static async upsertProgress(
    authUserId: string,
    progress: {
      theory_progress?: number;
      driving_progress?: number;
      completed_lessons?: number;
      total_lessons?: number;
    }
  ): Promise<Progress> {
    // Получаем профиль бота
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      throw new Error('Bot profile not found');
    }

    const { data, error } = await supabase
      .from('bot_progress')
      .upsert(
        {
          user_id: profile.id,
          ...progress,
        },
        { onConflict: 'user_id' }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Получить навыки пользователя (используем auth_user_id)
  static async getSkills(authUserId: string): Promise<Skill[]> {
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      return [];
    }

    const { data, error } = await supabase
      .from('bot_skills')
      .select('*')
      .eq('user_id', profile.id)
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

  // Создать навык (используем auth_user_id)
  static async createSkill(authUserId: string, skillName: string): Promise<Skill> {
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      throw new Error('Bot profile not found');
    }

    const { data, error } = await supabase
      .from('bot_skills')
      .insert({
        user_id: profile.id,
        skill_name: skillName,
        completed: false,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Book a lesson (using auth_user_id)
  static async bookLesson(authUserId: string, instructorId: string, date: string, type: 'theory' | 'driving'): Promise<Lesson> {
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      throw new Error('Bot profile not found');
    }

    // Get instructor information
    const { data: instructor, error: instructorError } = await supabase
      .from('bot_instructors')
      .select('name')
      .eq('id', instructorId)
      .single();

    const instructorName = instructor?.name || 'Unknown Instructor';

    const { data, error } = await supabase
      .from('bot_lessons')
      .insert({
        user_id: profile.id,
        instructor_id: instructorId,
        date,
        type,
        status: 'scheduled',
      })
      .select()
      .single();

    if (error) throw error;

    // Format date and time for notification
    const lessonDate = new Date(date);
    const formattedDate = lessonDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Europe/Tallinn',
    });
    const formattedTime = lessonDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Tallinn',
    });

    // Send Telegram notification about lesson booking (non-blocking)
    TelegramService.notifyLessonBooking({
      userName: profile.name,
      userEmail: profile.email,
      instructorName,
      date: formattedDate,
      time: formattedTime,
      type,
    }).catch((err) => {
      console.error('Failed to send Telegram notification for lesson booking:', err);
    });

    return data;
  }

  // Получить занятия пользователя (используем auth_user_id)
  static async getLessons(authUserId: string): Promise<Lesson[]> {
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      return [];
    }

    const { data, error } = await supabase
      .from('bot_lessons')
      .select('*')
      .eq('user_id', profile.id)
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Send support message (using auth_user_id)
  static async sendSupportMessage(authUserId: string, message: string): Promise<SupportMessage> {
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      throw new Error('Bot profile not found');
    }

    const { data, error } = await supabase
      .from('bot_support_messages')
      .insert({
        user_id: profile.id,
        message,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // Send Telegram notification about support message (non-blocking)
    TelegramService.notifySupportMessage({
      userName: profile.name,
      userEmail: profile.email,
      anxietyLevel: profile.anxiety_level,
      messageText: message,
    }).catch((err) => {
      console.error('Failed to send Telegram notification for support message:', err);
    });

    return data;
  }

  // Получить сообщения поддержки пользователя (используем auth_user_id)
  static async getSupportMessages(authUserId: string): Promise<SupportMessage[]> {
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      return [];
    }

    const { data, error } = await supabase
      .from('bot_support_messages')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Обновить прогресс пользователя (используем auth_user_id)
  static async updateProgress(
    authUserId: string,
    updates: {
      theory_progress?: number;
      driving_progress?: number;
      completed_lessons?: number;
    }
  ): Promise<Progress> {
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      throw new Error('Bot profile not found');
    }

    const { data, error } = await supabase
      .from('bot_progress')
      .update(updates)
      .eq('user_id', profile.id)
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

  // Добавить заметку (используем auth_user_id)
  static async addNote(authUserId: string, noteText: string, lessonId?: string): Promise<UserNote> {
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      throw new Error('Bot profile not found');
    }

    const { data, error } = await supabase
      .from('bot_user_notes')
      .insert({
        user_id: profile.id,
        note_text: noteText,
        lesson_id: lessonId || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Получить заметки пользователя (используем auth_user_id)
  static async getNotes(authUserId: string): Promise<UserNote[]> {
    const profile = await this.getBotProfile(authUserId);
    if (!profile) {
      return [];
    }

    const { data, error } = await supabase
      .from('bot_user_notes')
      .select('*')
      .eq('user_id', profile.id)
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
