"use client";

import Script from "next/script";
import { useI18n } from "@/i18n/client";
import styles from "./Faq.module.css";

export function Faq() {
  const { t } = useI18n();

  const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>{t.faq.kicker}</span>
          <h2 id="faq-heading">{t.faq.title}</h2>
        </header>
        <div className={styles.items}>
          {t.faq.items.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary className={styles.summary}>{item.question}</summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <Script id="atlas-faq-schema" type="application/ld+json">
        {JSON.stringify(FAQ_SCHEMA)}
      </Script>
    </section>
  );
}
