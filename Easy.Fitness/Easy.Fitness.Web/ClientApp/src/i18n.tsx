import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import dayjs from 'dayjs';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'pl',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    }
  })
  .then(() => {
    dayjs.locale(i18n.language);
  });

export default i18n;
