Вот где находятся части этого решения:

### 1. **Клиентский сервис**
`src/services/telegramService.ts` — отправляет данные из формы на API:

- Методы: `notifyWebsiteRegistration`, `notifyNewUser`, `notifyLessonBooking`, `notifySupportMessage`
- Использует `VITE_TELEGRAM_ADMIN_CHAT_ID` для chat ID получателя

### 2. **Vercel serverless function**
`api/telegram-notify.ts` — обработчик API, который шлёт сообщение в Telegram:

- Типы: `new_user`, `website_registration`, `lesson_booking`, `support_message`
- Токен бота задаётся прямо в файле (для других проектов лучше вынести в переменные окружения)

### 3. **Пример использования**
`src/pages/RegistrationPage.tsx` — вызов отправки при успешной отправке формы:

```typescript
await TelegramService.notifyWebsiteRegistration({
  name: `...`,
  email: '...',
  phone: '...',
});
```

### Что нужно для нового проекта
1. Скопировать `src/services/telegramService.ts` и `api/telegram-notify.ts`
2. Добавить `VITE_TELEGRAM_ADMIN_CHAT_ID` в переменные окружения
3. Вызывать нужный метод (например, `notifyWebsiteRegistration`) после отправки формы