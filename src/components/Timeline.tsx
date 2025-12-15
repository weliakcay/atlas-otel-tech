"use client";

import { useI18n } from "@/i18n/client";
import styles from "./Timeline.module.css";

export function Timeline() {
  const { t } = useI18n();

  return (
    <section id="timeline" className={styles.section} aria-labelledby="timeline-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>{t.timeline.kicker}</span>
          <h2 id="timeline-heading">{t.timeline.title}</h2>
          <p>{t.timeline.subtitle}</p>
        </header>
        <div className={styles.timeline}>
          {t.timeline.steps.map((step) => (
            <article key={step.day} className={styles.item}>
              <div className={styles.day}>{step.day}</div>
              <div>
                <h3>{step.title}</h3>
                <ul>
                  {step.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.note}>{t.timeline.note}</p>
      </div>
    </section>
  );
}
