// Типы для бота автошколы

export type Platform = 'web' | 'telegram' | 'whatsapp';

export interface BotUser {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  platform: Platform;
  telegram_id: number | null;
  whatsapp_id: string | null;
  anxiety_level: number | null;
  selected_instructor_id: string | null;
  created_at: string;
  updated_at: string;
  last_active_at: string;
}

export interface Instructor {
  id: string;
  name: string;
  style: string;
  experience: string;
  pass_rate: string;
  photo_url: string | null;
  specialty: string | null;
  reviews_count: number;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  instructor_id: string;
  student_name: string;
  text: string;
  video_url: string | null;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

export interface Progress {
  id: string;
  user_id: string;
  theory_progress: number;
  driving_progress: number;
  completed_lessons: number;
  total_lessons: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  user_id: string;
  skill_name: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  user_id: string;
  instructor_id: string | null;
  date: string;
  type: 'theory' | 'driving';
  status: 'scheduled' | 'completed' | 'cancelled';
  video_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupportMessage {
  id: string;
  user_id: string;
  message: string;
  response: string | null;
  status: 'pending' | 'answered' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface AnxietyTestResult {
  anxiety_level: number;
  user_id?: string;
}

export interface BookLessonRequest {
  user_id: string;
  instructor_id: string;
  date: string;
  type: 'theory' | 'driving';
}

export interface UserNote {
  id: string;
  user_id: string;
  note_text: string;
  lesson_id: string | null;
  created_at: string;
  updated_at: string;
}
