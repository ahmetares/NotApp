import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../locales/en.json';
import tr from '../locales/tr.json';


import {NativeModules, Platform} from 'react-native';

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

export const languageResources = {
  en: {translation: en},
  tr: {translation: tr},

};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: deviceLanguage,
  fallbackLng: 'en',
  resources: languageResources,
});

export default i18next;
