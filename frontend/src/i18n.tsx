import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

export const AVAILABLE_LANGUAGES = [
  { value: 'en', name: 'English' },
  { value: 'fr', name: 'Français' },
  { value: 'de', name: 'Deutsch' },
  { value: 'nl', name: 'Nederlands' },
];

await i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  // for all options read: https://www.i18next.com/overview/configuration-options
  .use(initReactI18next)
  .use(Backend)
  .init({
    // Enable debug mode unless in production
    // debug: process.env.NODE_ENV !== 'production',
    debug: false,
    fallbackLng: 'en',
    ns: 'external',
    defaultNS: 'external',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
