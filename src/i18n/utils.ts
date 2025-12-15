import type { Locale } from './config';
import { defaultLocale } from './config';

const dictionaries = {
  tr: () => import('./locales/tr.json').then((module) => module.default),
  en: () => import('./locales/en.json').then((module) => module.default),
  de: () => import('./locales/de.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const dict = dictionaries[locale] || dictionaries[defaultLocale];
  return dict();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
