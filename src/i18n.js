import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/index';
import zh from './locales/zh/index';

const resources = {
  en: en,
  zh: zh,
};

const nowLng = navigator.language.split('-')[0];

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  lng: nowLng,
  fallbackLng: 'en',
});

export default i18n;