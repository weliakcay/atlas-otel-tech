import type { Locale } from './config';
import { defaultLocale } from './config';

const dictionaries = {
  tr: () => import('./locales/tr.json').then((module) => module.default),
  en: () => import('./locales/tr.json').then((module) => module.default), // TODO: Replace with en.json
  de: () => import('./locales/tr.json').then((module) => module.default), // TODO: Replace with de.json
};

export const getDictionary = async (locale: Locale) => {
  const dict = dictionaries[locale] || dictionaries[defaultLocale];
  return dict();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
