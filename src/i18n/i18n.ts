import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ruTranslation from './locales/ru.json';
import etTranslation from './locales/et.json';
import enTranslation from './locales/en.json';

import ruBotTranslation from '../../locales/ru/bot.json';
import etBotTranslation from '../../locales/et/bot.json';
import enBotTranslation from '../../locales/en/bot.json';

// Не импортируем react-i18next здесь — иначе он грузится до init и даёт "Cannot access $t before initialization".
// Плагин передаётся снаружи (main.tsx) после динамического импорта.
export type ReactI18nextPlugin = (instance: typeof i18n) => typeof i18n;

export function initI18n(initReactI18next: ReactI18nextPlugin): Promise<typeof i18n> {
  const promise = i18n
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
      initImmediate: false,
    });

  promise.catch((err) => {
    console.error('i18n initialization error:', err);
  });

  return promise;
}

export default i18n; 