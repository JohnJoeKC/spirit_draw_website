import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// const resources = { ... }; // This will be removed

i18n
  .use(HttpApi) // Use http backend to load translations
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    // resources, // Remove inline resources
    fallbackLng: 'en', // Use English if detected language is not available
    debug: import.meta.env.DEV, // Use Vite's env variable for development mode
    ns: ['translation'], // Define the default namespace
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false // React already safes from xss
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie', 'localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    }
  });

export default i18n; 