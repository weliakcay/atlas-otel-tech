"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Locale } from "./config";
import { defaultLocale } from "./config";
import tr from "./locales/tr.json";
import en from "./locales/en.json";
import de from "./locales/de.json";

type Dictionary = typeof tr;

const translations: Record<Locale, Dictionary> = {
  tr,
  en,
  de,
};

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("locale") as Locale;
      return stored && (stored === "tr" || stored === "en" || stored === "de") ? stored : defaultLocale;
    }
    return defaultLocale;
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }
  };

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
