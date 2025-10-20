import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DutchLang } from './utils/dutch-lang';
import { EnglishLang } from './utils/english-lang';

const resources = {
  nl: DutchLang,
  gb: EnglishLang,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'nl',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

