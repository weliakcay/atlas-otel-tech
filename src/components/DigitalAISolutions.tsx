"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/client";
import styles from "./DigitalAISolutions.module.css";

export function DigitalAISolutions() {
  const { t } = useI18n();

  return (
    <section id="digital-solutions" className={styles.section} aria-labelledby="digital-heading">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.kicker}>{t.digitalSolutions.kicker}</span>
          <h2 id="digital-heading">{t.digitalSolutions.title}</h2>
          <p>{t.digitalSolutions.description}</p>
          <ul className={styles.benefits}>
            {t.digitalSolutions.benefits.map((benefit) => (
              <li key={benefit}>✅ {benefit}</li>
            ))}
          </ul>
          <div className={styles.ctas}>
            <a className={styles.primaryCta} href="#demo-form">
              {t.digitalSolutions.ctaPrimary}
            </a>
            <a href="https://hotelaiassistant.io" target="_blank" rel="noreferrer" className={styles.secondaryCta}>
              {t.digitalSolutions.ctaSecondary} →
            </a>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.qrWrapper}>
            <Image
              src="/hotelaiassistant-qr.png"
              alt="HotelAI Assistant QR kodu"
              width={220}
              height={220}
              priority
            />
            <span className={styles.qrLabel}>{t.digitalSolutions.qrLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
