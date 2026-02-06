import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True только если заданы оба значения и URL не placeholder (для проверок до запросов). */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  typeof supabaseUrl === 'string' &&
  !supabaseUrl.includes('placeholder')
);

// Создаем клиент Supabase, даже если переменные не заданы (для разработки)
// В этом случае запросы не должны выполняться — проверяйте isSupabaseConfigured перед вызовами
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createClient(
      'https://placeholder.supabase.co',
      'placeholder-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

// Проверяем наличие переменных и выводим предупреждение в консоль
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = `
⚠️ CRITICAL: Missing Supabase environment variables!

Current values:
- VITE_SUPABASE_URL: ${supabaseUrl || 'NOT SET'}
- VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'SET (but may be invalid)' : 'NOT SET'}

For local development:
Create a .env.local file with:
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

For Vercel deployment:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
3. Redeploy the project

See SUPABASE_SETUP.md or ИСПРАВЛЕНИЕ_ОШИБКИ_VERCEL.md for instructions.
  `;
  console.error(errorMessage);
  
  // В production также показываем alert для пользователя
  if (import.meta.env.PROD) {
    console.error('Supabase is not configured. Please check environment variables in Vercel.');
  }
}

// Проверяем, что URL правильный (не callback URL)
if (supabaseUrl && (supabaseUrl.includes('/auth/v1/callback') || supabaseUrl.includes('/callback'))) {
  const errorMessage = `
⚠️ CRITICAL ERROR: VITE_SUPABASE_URL is set incorrectly!

Current (WRONG): ${supabaseUrl}

This is a callback URL, not the base project URL!

CORRECT format should be:
https://[your-project-id].supabase.co

Example:
https://pkwrduyxqsqnbtgplzzj.supabase.co

NOT:
https://pkwrduyxqsqnbtgplzzj.supabase.co/auth/v1/callback ❌

How to fix:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Find VITE_SUPABASE_URL
3. Change it to: https://pkwrduyxqsqnbtgplzzj.supabase.co (without /auth/v1/callback)
4. Save and Redeploy

See КРИТИЧЕСКАЯ_ОШИБКА_SUPABASE_URL.md for details.
  `;
  console.error(errorMessage);
}
