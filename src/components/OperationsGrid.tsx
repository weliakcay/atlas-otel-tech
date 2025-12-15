"use client";

import { useI18n } from "@/i18n/client";
import styles from "./OperationsGrid.module.css";

const ICONS = ["🧾", "📱", "📲", "📊", "☁️", "🍽️", "🔗", "🛎️"];

export function OperationsGrid() {
  const { t } = useI18n();

  return (
    <section id="operations-grid" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>{t.operationsGrid.kicker}</span>
          <h2>{t.operationsGrid.title}</h2>
          <p>{t.operationsGrid.subtitle}</p>
        </header>
        <div className={styles.grid}>
          {t.operationsGrid.modules.map((module, index) => (
            <article key={module.title} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">
                {ICONS[index]}
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
