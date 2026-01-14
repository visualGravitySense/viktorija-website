// Сервис для аутентификации через Supabase Auth
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export class AuthService {
  // Вход через Google OAuth
  static async signInWithGoogle(): Promise<{ user: User | null; error: Error | null }> {
    try {
      const redirectTo = `${window.location.origin}/bot`;
      
      // Логирование для отладки (только в development)
      if (import.meta.env.DEV) {
        console.log('OAuth redirect URL:', redirectTo);
        console.log('Current origin:', window.location.origin);
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('OAuth sign in error:', error);
        return { user: null, error };
      }

      // OAuth редирект происходит автоматически
      return { user: null, error: null };
    } catch (err) {
      console.error('OAuth sign in exception:', err);
      return { user: null, error: err as Error };
    }
  }
  
  // Обработка OAuth редиректа
  static async handleOAuthCallback(): Promise<{ user: User | null; error: Error | null }> {
    try {
      // Проверяем наличие токена в URL hash
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      
      if (!accessToken) {
        return { user: null, error: null };
      }
      
      // Очищаем URL сразу для безопасности (токен уже в памяти Supabase)
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Supabase автоматически обрабатывает токен из hash при инициализации
      // Но нужно подождать, пока это произойдет
      // Используем Promise с таймаутом и проверкой сессии
      return new Promise((resolve) => {
        let resolved = false;
        let attempts = 0;
        const maxAttempts = 50; // 50 попыток по 300мс = максимум 15 секунд (для Vercel)
        
        const checkSession = async () => {
          attempts++;
          
          // Пробуем getSession (быстрее, из localStorage)
          let session = null;
          let error = null;
          
          try {
            const sessionResult = await supabase.auth.getSession();
            session = sessionResult.data?.session;
            error = sessionResult.error;
          } catch (err) {
            error = err as Error;
          }
          
          // Если getSession не сработал, пробуем getUser (делает запрос к серверу)
          if (!session?.user && attempts > 5) {
            try {
              const userResult = await supabase.auth.getUser();
              if (userResult.data?.user) {
                // Если getUser вернул пользователя, создаем сессию
                const sessionResult = await supabase.auth.getSession();
                session = sessionResult.data?.session;
              }
            } catch (err) {
              // Игнорируем ошибку getUser, продолжаем с getSession
            }
          }
          
          if (session?.user) {
            if (!resolved) {
              resolved = true;
              resolve({ user: session.user, error: null });
            }
            return;
          }
          
          if (error && attempts > 10) {
            // Только после нескольких попыток считаем ошибку критичной
            if (!resolved) {
              resolved = true;
              console.error('Error getting session after OAuth:', error);
              resolve({ user: null, error });
            }
            return;
          }
          
          // Если сессия еще не получена, пробуем еще раз
          if (attempts < maxAttempts && !resolved) {
            setTimeout(checkSession, 300); // Увеличено до 300мс для Vercel
          } else if (!resolved) {
            resolved = true;
            resolve({ user: null, error: new Error('Timeout waiting for session after OAuth') });
          }
        };
        
        // Начинаем проверку сразу
        checkSession();
        
        // Также слушаем событие SIGNED_IN как резервный вариант
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user && !resolved) {
            resolved = true;
            subscription.unsubscribe();
            resolve({ user: session.user, error: null });
          }
        });
        
        // Таймаут для подписки (чтобы не висеть вечно)
        setTimeout(() => {
          if (!resolved) {
            subscription.unsubscribe();
          }
        }, 20000); // 20 секунд максимум
      });
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
