"use client";

import { useState } from "react";
import { type Locale, localeFlags, localeNames, locales } from "@/i18n/config";
import { useI18n } from "@/i18n/client";
import styles from "./LanguageSwitcher.module.css";

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale: currentLocale, setLocale } = useI18n();

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className={styles.flag}>{localeFlags[currentLocale]}</span>
        <span className={styles.label}>{localeNames[currentLocale]}</span>
        <span className={styles.arrow}>▼</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              className={`${styles.option} ${locale === currentLocale ? styles.active : ""}`}
              onClick={() => handleLocaleChange(locale)}
            >
              <span className={styles.flag}>{localeFlags[locale]}</span>
              <span>{localeNames[locale]}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
    </div>
  );
}
