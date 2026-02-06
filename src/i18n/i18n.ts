import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ruTranslation from './locales/ru.json';
import etTranslation from './locales/et.json';
import enTranslation from './locales/en.json';

import ruBotTranslation from '../../locales/ru/bot.json';
import etBotTranslation from '../../locales/et/bot.json';
import enBotTranslation from '../../locales/en/bot.json';

// Initialize i18n synchronously
// КРИТИЧНО: Инициализация должна быть синхронной и завершиться до экспорта
const initPromise = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: { ...ruTranslation, bot: ruBotTranslation },
      },
      et: {
        translation: { ...etTranslation, bot: etBotTranslation },
      },
      en: {
        translation: { ...enTranslation, bot: enBotTranslation },
      }
    },
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    initImmediate: true, // Немедленная синхронная инициализация
  });

// Убеждаемся, что инициализация завершена
if (!i18n.isInitialized) {
  // Если по какой-то причине не инициализирован, ждем
  initPromise.then(() => {
    console.log('i18n initialized');
  }).catch((err) => {
    console.error('i18n initialization error:', err);
  });
}

export default i18n; 