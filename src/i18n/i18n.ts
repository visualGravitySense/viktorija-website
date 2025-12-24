import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ruTranslation from './locales/ru.json';
import etTranslation from './locales/et.json';
import enTranslation from './locales/en.json';

// Initialize i18n synchronously
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: ruTranslation,
      },
      et: {
        translation: etTranslation,
      },
      en: {
        translation: enTranslation,
      }
    },
    fallbackLng: 'ru',
    debug: true, // Enable debug mode
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true, // Enable suspense mode
    },
    initImmediate: false, // Disable immediate initialization
  });

export default i18n; 