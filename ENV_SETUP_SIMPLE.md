# Простая инструкция: Что взять из Supabase

## 📍 Шаг 1: Project URL (VITE_SUPABASE_URL)

**Где вы сейчас:** Settings → General

1. Найдите поле **"Project ID"** (например: `pkwrduyxqsqnbtgplzzj`)
2. Нажмите кнопку **"Copy"** рядом с ним
3. Постройте URL по формуле:
   ```
   https://[ваш Project ID].supabase.co
   ```
4. **Пример:** Если Project ID = `pkwrduyxqsqnbtgplzzj`, то:
   ```
   VITE_SUPABASE_URL=https://pkwrduyxqsqnbtgplzzj.supabase.co
   ```

## 🔑 Шаг 2: API Key (VITE_SUPABASE_ANON_KEY)

**Куда перейти:** В левом меню нажмите **"API Keys"** (под "PROJECT SETTINGS")

1. Найдите секцию **"Publishable key"**
2. Скопируйте ключ, который начинается с `sb_publishable_...`
3. Это ваш `VITE_SUPABASE_ANON_KEY`

**Если не видите Publishable key:**
- Перейдите на вкладку **"Legacy anon, service_role API keys"**
- Скопируйте **anon public** ключ (длинный, начинается с `eyJ...`)

## ✅ Шаг 3: Создайте файл `.env.local`

В корне проекта `viktorija-web` создайте файл `.env.local`:

```env
VITE_SUPABASE_URL=https://pkwrduyxqsqnbtgplzzj.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_ваш_ключ_здесь
```

## 🔄 Шаг 4: Перезапустите сервер

```bash
# Остановите сервер (Ctrl+C)
npm run dev
```

Готово! 🎉
