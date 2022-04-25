import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

const defaultLanguage = 'ru';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,

    interpolation: {
      escapeValues: false,
    },
  });

export default i18n;
