// Сервис для аутентификации через Supabase Auth
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export class AuthService {
  // Вход через Google OAuth
  static async signInWithGoogle(): Promise<{ user: User | null; error: Error | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/bot`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        return { user: null, error };
      }

      // OAuth редирект происходит автоматически
      return { user: null, error: null };
    } catch (err) {
      return { user: null, error: err as Error };
    }
  }
  
  // Обработка OAuth редиректа
  static async handleOAuthCallback(): Promise<{ user: User | null; error: Error | null }> {
    try {
      // Проверяем наличие токена в URL hash
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken) {
        // Supabase автоматически обрабатывает токен из hash при инициализации
        // Но нужно явно получить сессию
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session after OAuth:', error);
          return { user: null, error };
        }
        
        if (session?.user) {
          // Очищаем URL от токена для безопасности
          window.history.replaceState({}, document.title, window.location.pathname);
          return { user: session.user, error: null };
        } else {
          // Если сессия не получена, возможно нужно подождать
          // Supabase обрабатывает hash асинхронно
          await new Promise(resolve => setTimeout(resolve, 500));
          const { data: { session: retrySession }, error: retryError } = await supabase.auth.getSession();
          
          if (retryError) {
            return { user: null, error: retryError };
          }
          
          if (retrySession?.user) {
            window.history.replaceState({}, document.title, window.location.pathname);
            return { user: retrySession.user, error: null };
          }
        }
      }
      
      return { user: null, error: null };
    } catch (err) {
      console.error('Error handling OAuth callback:', err);
      return { user: null, error: err as Error };
    }
  }

  // Вход через email/password
  static async signInWithEmail(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error };
      }

      return { user: data.user, error: null };
    } catch (err) {
      return { user: null, error: err as Error };
    }
  }

  // Регистрация через email/password
  static async signUpWithEmail(email: string, password: string, name?: string): Promise<{ user: User | null; error: Error | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || '',
          },
        },
      });

      if (error) {
        return { user: null, error };
      }

      return { user: data.user, error: null };
    } catch (err) {
      return { user: null, error: err as Error };
    }
  }

  // Выход
  static async signOut(): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (err) {
      return { error: err as Error };
    }
  }

  // Получить текущего пользователя
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (err) {
      console.error('Error getting current user:', err);
      return null;
    }
  }

  // Получить текущую сессию
  static async getSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (err) {
      console.error('Error getting session:', err);
      return null;
    }
  }

  // Подписаться на изменения аутентификации
  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });
  }

  // Сброс пароля
  static async resetPassword(email: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/bot?reset=true`,
      });
      return { error };
    } catch (err) {
      return { error: err as Error };
    }
  }
}
