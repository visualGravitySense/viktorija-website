import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Создаем клиент Supabase, даже если переменные не заданы (для разработки)
// В этом случае запросы будут падать, но приложение не упадет при загрузке
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
  console.warn(
    '⚠️ Missing Supabase environment variables!\n' +
    'Please create a .env.local file with:\n' +
    'VITE_SUPABASE_URL=https://your-project-id.supabase.co\n' +
    'VITE_SUPABASE_ANON_KEY=your-anon-key-here\n\n' +
    'See SUPABASE_SETUP.md for instructions.'
  );
}

