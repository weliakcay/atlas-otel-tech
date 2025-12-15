"use client";

import { useI18n } from "@/i18n/client";
import styles from "./PlusPOSValueProps.module.css";

export function PlusPOSValueProps() {
  const { t } = useI18n();

  const VALUES = [
    {
      title: t.plusposValueProps.cards.pluspos.title,
      description: t.plusposValueProps.cards.pluspos.description,
      image: "/pluspos-mac-screen.png",
      features: t.plusposValueProps.cards.pluspos.features,
      cta: t.plusposValueProps.cards.pluspos.cta,
      hue: 30,
    },
    {
      title: t.plusposValueProps.cards.web.title,
      description: t.plusposValueProps.cards.web.description,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      features: t.plusposValueProps.cards.web.features,
      cta: t.plusposValueProps.cards.web.cta,
      hue: 200,
    },
    {
      title: t.plusposValueProps.cards.ai.title,
      description: t.plusposValueProps.cards.ai.description,
      image: "/hotelaiassistant-qr.png",
      features: t.plusposValueProps.cards.ai.features,
      hue: 180,
    },
  ];

  return (
    <section id="pluspos-overview" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>{t.plusposValueProps.kicker}</span>
          <h2>{t.plusposValueProps.title}</h2>
          <p>{t.plusposValueProps.subtitle}</p>
        </header>
        <div className={styles.cardGrid}>
          {VALUES.map((value, index) => (
            <div
              key={value.title}
              className={styles.flipCardContainer}
              style={{ "--hue": value.hue } as React.CSSProperties}
            >
              <div className={styles.flipCard}>
                {/* Card Front - Solid color with title and features */}
                <div className={styles.cardFront}>
                  <h2 className={styles.cardTitle}>{value.title}</h2>
                  <ul>
                    {value.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Card Back - Image with button/QR */}
                <div className={styles.cardBack}>
                  {index === 2 ? (
                    /* Card 3 Back - QR Code */
                    <div className={styles.qrBackContent}>
                      <img src={value.image} alt={value.title} className={styles.qrCodeImage} />
                    </div>
                  ) : (
                    <>
                      {/* Cards 1 & 2 Back - Image + Button */}
                      <figure className={styles.figure}>
                        <div className={styles.imgBg}></div>
                        <img src={value.image} alt={value.title} />
                      </figure>
                      <div className={styles.backContent}>
                        <h3>{value.title}</h3>
                        <p>{value.description}</p>
                        <a
                          href={index === 0 ? "/paketler" : "#demo-form"}
                          className={styles.primaryBtn}
                        >
                          {value.cta}
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
