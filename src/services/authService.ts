// Сервис для аутентификации через Supabase Auth
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export class AuthService {
  // Вход через Google OAuth
  static async signInWithGoogle(): Promise<{ user: User | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { user: null, error: new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.') };
    }
    try {
      // Используем полный URL с протоколом для redirectTo
      const redirectTo = `${window.location.origin}/bot`;
      
      // Логирование для отладки (всегда, чтобы видеть на Vercel)
      console.log('🔐 OAuth sign in:', {
        redirectTo,
        origin: window.location.origin,
        href: window.location.href,
        isProduction: import.meta.env.PROD,
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          // Важно: skipBrowserRedirect должен быть false для автоматического редиректа
          skipBrowserRedirect: false,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('❌ OAuth sign in error:', error);
        return { user: null, error };
      }

      console.log('✅ OAuth redirect initiated:', data?.url);
      
      // OAuth редирект происходит автоматически
      return { user: null, error: null };
    } catch (err) {
      console.error('❌ OAuth sign in exception:', err);
      return { user: null, error: err as Error };
    }
  }
  
  // Обработка OAuth редиректа
  static async handleOAuthCallback(): Promise<{ user: User | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { user: null, error: null };
    }
    try {
      // Проверяем наличие токена в URL hash
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (!accessToken) {
        return { user: null, error: null };
      }
      
      console.log('OAuth callback: token found, processing...');
      
      // НЕ очищаем URL сразу - Supabase должен обработать токен из hash
      // Очистим после успешной обработки
      
      // Используем Promise с приоритетом на onAuthStateChange
      return new Promise((resolve) => {
        let resolved = false;
        const timeout = 20000; // 20 секунд максимум
        
        // Приоритетный способ: слушаем событие SIGNED_IN
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state change:', event, session?.user?.email);
          
          if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user && !resolved) {
            resolved = true;
            subscription.unsubscribe();
            // Очищаем URL после успешной обработки
            window.history.replaceState({}, document.title, window.location.pathname);
            console.log('OAuth callback: success via onAuthStateChange');
            resolve({ user: session.user, error: null });
          }
        });
        
        // Резервный способ: polling getSession
        let attempts = 0;
        const maxAttempts = 40; // 40 попыток по 500мс = 20 секунд
        
        const checkSession = async () => {
          if (resolved) return;
          
          attempts++;
          console.log(`OAuth callback: checking session (attempt ${attempts})...`);
          
          try {
            // Пробуем getSession
            const { data: { session }, error } = await supabase.auth.getSession();
            
            if (session?.user) {
              if (!resolved) {
                resolved = true;
                subscription.unsubscribe();
                // Очищаем URL после успешной обработки
                window.history.replaceState({}, document.title, window.location.pathname);
                console.log('OAuth callback: success via getSession');
                resolve({ user: session.user, error: null });
              }
              return;
            }
            
            if (error && attempts > 5) {
              console.error('Error getting session:', error);
              // Не считаем это критичной ошибкой сразу - продолжаем попытки
            }
            
            // Если есть refresh_token, пробуем использовать его
            if (refreshToken && attempts > 3 && !session) {
              try {
                console.log('OAuth callback: trying to set session with refresh token...');
                const { data: refreshData, error: refreshError } = await supabase.auth.setSession({
                  access_token: accessToken,
                  refresh_token: refreshToken,
                });
                
                if (refreshData?.session?.user) {
                  if (!resolved) {
                    resolved = true;
                    subscription.unsubscribe();
                    window.history.replaceState({}, document.title, window.location.pathname);
                    console.log('OAuth callback: success via setSession');
                    resolve({ user: refreshData.session.user, error: null });
                  }
                  return;
                }
              } catch (setSessionErr) {
                console.warn('setSession failed:', setSessionErr);
              }
            }
            
            // Продолжаем попытки
            if (attempts < maxAttempts && !resolved) {
              setTimeout(checkSession, 500);
            } else if (!resolved) {
              resolved = true;
              subscription.unsubscribe();
              // Очищаем URL даже при ошибке
              window.history.replaceState({}, document.title, window.location.pathname);
              console.error('OAuth callback: timeout after all attempts');
              resolve({ user: null, error: new Error('Timeout waiting for session after OAuth') });
            }
          } catch (err) {
            console.error('Error in checkSession:', err);
            if (attempts < maxAttempts && !resolved) {
              setTimeout(checkSession, 500);
            } else if (!resolved) {
              resolved = true;
              subscription.unsubscribe();
              window.history.replaceState({}, document.title, window.location.pathname);
              resolve({ user: null, error: err as Error });
            }
          }
        };
        
        // Начинаем проверку с небольшой задержкой, чтобы Supabase успел обработать hash
        setTimeout(() => {
          if (!resolved) {
            checkSession();
          }
        }, 100);
        
        // Общий таймаут
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            subscription.unsubscribe();
            window.history.replaceState({}, document.title, window.location.pathname);
            console.error('OAuth callback: overall timeout');
            resolve({ user: null, error: new Error('OAuth callback timeout') });
          }
        }, timeout);
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
    if (!isSupabaseConfigured) return null;
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
    if (!isSupabaseConfigured) return null;
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
    if (!isSupabaseConfigured) {
      callback(null);
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
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
