# Настройка Google OAuth для бота

## Шаги настройки

### 1. Настройка Google OAuth в Supabase

1. Перейдите в [Supabase Dashboard](https://app.supabase.com)
2. Выберите ваш проект
3. Перейдите в **Authentication** → **Providers**
4. Найдите **Google** и нажмите **Enable**
5. Вам понадобятся:
   - **Client ID** (из Google Cloud Console)
   - **Client Secret** (из Google Cloud Console)

### 2. Настройка Google Cloud Console

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com)
2. Создайте новый проект или выберите существующий
3. Перейдите в **APIs & Services** → **Credentials**
4. Нажмите **Create Credentials** → **OAuth client ID**
5. Выберите **Web application**
6. Добавьте **Authorized redirect URIs**:
   ```
   https://pkwrduyxqsqnbtgplzzj.supabase.co/auth/v1/callback
   ```
   ⚠️ **ВАЖНО**: Это URL для редиректа, а не Client ID!
7. Нажмите **Create**
8. **Скопируйте Client ID** - это строка вида:
   ```
   123456789-abcdefghijklmnop.apps.googleusercontent.com
   ```
   ⚠️ **НЕ копируйте URL!** Client ID - это строка идентификатора, а не веб-адрес
9. **Скопируйте Client Secret** - это строка из поля "Client secret"
10. Вставьте их в настройки Google провайдера в Supabase:
    - **Client IDs**: вставьте только Client ID (строка вида `123456789-...apps.googleusercontent.com`)
    - **Client Secret**: вставьте Client Secret

### 3. Обновление базы данных

Необходимо добавить поле `auth_user_id` в таблицу `bot_users`:

```sql
-- Добавить поле auth_user_id в таблицу bot_users
ALTER TABLE bot_users 
ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Создать индекс для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_bot_users_auth_user_id ON bot_users(auth_user_id);

-- Установить уникальность (один профиль бота на одного пользователя auth)
CREATE UNIQUE INDEX IF NOT EXISTS idx_bot_users_auth_user_id_unique ON bot_users(auth_user_id) WHERE auth_user_id IS NOT NULL;
```

### 4. Настройка RLS (Row Level Security)

Убедитесь, что политики RLS настроены правильно:

```sql
-- Политика для чтения своего профиля
CREATE POLICY "Users can read their own bot profile"
ON bot_users FOR SELECT
USING (auth_user_id = auth.uid());

-- Политика для создания своего профиля
CREATE POLICY "Users can create their own bot profile"
ON bot_users FOR INSERT
WITH CHECK (auth_user_id = auth.uid());

-- Политика для обновления своего профиля
CREATE POLICY "Users can update their own bot profile"
ON bot_users FOR UPDATE
USING (auth_user_id = auth.uid());
```

### 5. Проверка переменных окружения

Убедитесь, что в `.env.local` (для локальной разработки) и в Vercel (для продакшена) установлены:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 6. Тестирование

1. Запустите приложение локально: `npm run dev`
2. Перейдите на страницу бота: `/bot`
3. Нажмите "Войти через Google"
4. Выберите аккаунт Google
5. После успешного входа вы должны быть перенаправлены обратно на страницу бота

## Миграция существующих пользователей

Если у вас уже есть пользователи в таблице `bot_users`, их нужно связать с `auth.users`:

```sql
-- Пример миграции (адаптируйте под ваши нужды)
-- Это только пример, реальная миграция зависит от вашей структуры данных

-- Если у пользователей есть email, можно попробовать связать:
UPDATE bot_users bu
SET auth_user_id = au.id
FROM auth.users au
WHERE bu.email = au.email
AND bu.auth_user_id IS NULL;
```

## Устранение проблем

### Ошибка: "redirect_uri_mismatch"
- Убедитесь, что redirect URI в Google Cloud Console точно совпадает с URL в Supabase
- Формат: `https://[PROJECT-ID].supabase.co/auth/v1/callback`

### Ошибка: "invalid_client" или "Invalid characters"
- ⚠️ **Client ID - это НЕ URL!** Это строка вида `123456789-abcdefghijklmnop.apps.googleusercontent.com`
- НЕ вставляйте URL типа `https://pkwrduyxqsqnbtgplzzj.supabase.co` в поле Client IDs
- Проверьте, что Client ID скопирован из Google Cloud Console (поле "Client ID", а не "Authorized redirect URIs")
- Убедитесь, что пробелов нет в начале/конце
- Client ID должен выглядеть примерно так: `123456789-abcdefghijklmnop.apps.googleusercontent.com`

### Пользователь не создается в bot_users
- Проверьте, что функция `getOrCreateBotProfile` вызывается после успешной аутентификации
- Проверьте логи браузера на наличие ошибок
- Убедитесь, что RLS политики разрешают создание записей

## Безопасность

- Никогда не храните Client Secret в клиентском коде
- Используйте переменные окружения для всех секретов
- Регулярно обновляйте зависимости
- Мониторьте логи аутентификации в Supabase Dashboard
