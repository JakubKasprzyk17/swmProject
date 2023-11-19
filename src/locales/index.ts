import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import eng from './eng.json';
import pl from './pl.json';

const resources = {
  eng: {
    translation: eng,
  },
  pl: {
    translation: pl,
  },
};

const { languageCode } = Localization.getLocales()[0];

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: languageCode,
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: {
    default: ['pl'],
  },
  fallbackNS: ['translation'],
  debug: false,
});

export default i18n;
