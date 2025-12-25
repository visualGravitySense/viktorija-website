# 📊 Настройка отслеживания конверсий Google Ads

## ✅ Что было установлено:

### 1. Google Tag (gtag.js) - в `index.html`
```html
<!-- Google Ads Conversion Tracking (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17804500858"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-17804500858');
</script>
```

**Расположение:** `index.html` в секции `<head>`

---

### 2. Event Snippet для конверсий - в `Review.tsx`
```typescript
// Google Ads Conversion Tracking
React.useEffect(() => {
  if (paymentSuccess && typeof window !== 'undefined' && window.gtag) {
    // Extract numeric value from orderTotal (remove € and parse)
    const numericValue = parseFloat(orderTotal.replace(/[^\d.,]/g, '').replace(',', '.')) || 1.0;
    
    // Generate or use transaction ID from payment data
    const transactionId = paymentData?.id || paymentData?.paymentIntentId || `TXN-${Date.now()}`;
    
    // Send conversion event to Google Ads
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17804500858/xC1QCPztwdQbEPq-7KlC',
      'value': numericValue,
      'currency': 'EUR',
      'transaction_id': transactionId
    });
  }
}, [paymentSuccess, orderTotal, paymentData]);
```

**Расположение:** `src/components/checkout/components/Review.tsx`

**Когда срабатывает:** Когда `paymentSuccess === true` (успешная оплата)

---

## 🎯 Как это работает:

1. **Google Tag загружается** на всех страницах сайта (из `index.html`)
2. **Event snippet срабатывает** автоматически, когда:
   - Пользователь успешно завершает оплату
   - Компонент `Review` отображается с `paymentSuccess = true`
3. **Данные отправляются** в Google Ads:
   - `value`: Сумма заказа (извлекается из `orderTotal`, например "700€" → 700)
   - `currency`: "EUR"
   - `transaction_id`: ID транзакции из paymentData или генерируется автоматически

---

## 📊 Отслеживаемые данные:

- ✅ **Сумма заказа** (value) - автоматически извлекается из `orderTotal`
- ✅ **Валюта** (EUR)
- ✅ **Transaction ID** - из данных платежа или генерируется
- ✅ **Тип конверсии**: Purchase

---

## 🔍 Проверка работы:

### В Google Ads:
1. Перейдите в **Инструменты и настройки** → **Измерение** → **Конверсии**
2. Найдите событие "Purchase"
3. Проверьте, что конверсии регистрируются

### В браузере (Developer Tools):
1. Откройте **Console** (F12)
2. После успешной оплаты проверьте Network tab
3. Должны быть запросы к `googletagmanager.com`

### Тестирование:
1. Завершите тестовую покупку
2. Проверьте в Google Ads через 24-48 часов (данные могут задерживаться)

---

## 🛠️ Дополнительные настройки:

### Если нужно отслеживать другие события:

Добавьте аналогичный код в другие места:

**Пример для регистрации:**
```typescript
window.gtag('event', 'conversion', {
  'send_to': 'AW-17804500858/[EVENT_ID]',
  'value': 1.0,
  'currency': 'EUR'
});
```

**Пример для звонка:**
```typescript
window.gtag('event', 'conversion', {
  'send_to': 'AW-17804500858/[CALL_EVENT_ID]',
  'value': 1.0,
  'currency': 'EUR'
});
```

---

## 📝 Файлы, которые были изменены:

1. ✅ `index.html` - добавлен Google Tag
2. ✅ `src/components/checkout/components/Review.tsx` - добавлен event snippet
3. ✅ `src/vite-env.d.ts` - добавлены типы для TypeScript

---

## ⚠️ Важные замечания:

1. **Конверсии могут задерживаться** - данные в Google Ads появляются через 24-48 часов
2. **Тестовые конверсии** - Google Ads может не показывать тестовые конверсии в реальном времени
3. **Transaction ID** - должен быть уникальным для каждой транзакции (предотвращает дублирование)
4. **Value** - автоматически извлекается из `orderTotal`, поддерживает форматы: "700€", "700,00€", "700.00€"

---

*Настройка завершена: 2025-01-27*  
*Google Ads ID: AW-17804500858*  
*Conversion Label: xC1QCPztwdQbEPq-7KlC*

