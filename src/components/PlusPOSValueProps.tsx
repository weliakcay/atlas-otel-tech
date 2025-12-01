"use client";

import { useState } from "react";
import styles from "./PlusPOSValueProps.module.css";

const VALUES = [
  {
    title: "PlusPOS Operasyon Sistemleri",
    description:
      "Otel ve restoran işletmeniz için eksiksiz POS çözümü. Kasa, stok yönetimi, sipariş takibi, detaylı raporlama ve kanal entegrasyonları tek platformda.",
    image: "/pluspos-mac-screen.png",
    features: [
      "Hızlı ve kolay kasa işlemleri",
      "Gelişmiş stok ve reçete yönetimi",
      "Detaylı satış ve maliyet raporları",
      "Kanal yöneticisi entegrasyonu",
    ],
  },
  {
    title: "Web Sitesi Tasarımı",
    description:
      "Çok dilli, SEO uyumlu ve AI-hazır profesyonel web siteleri. Online rezervasyon, dinamik fiyatlandırma ve ödeme entegrasyonu ile direkt satışlarınızı artırın.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    features: [
      "Çok dilli destek (TR/EN/DE/RU)",
      "Dinamik fiyat ve yorum modülleri",
      "Online rezervasyon ve ödeme",
      "SEO optimize ve mobil uyumlu",
    ],
  },
  {
    title: "Yapay Zeka Çözümleri",
    description:
      "7/24 çalışan AI concierge ile misafir deneyimini üst seviyeye taşıyın. Çok dilli WhatsApp desteği, otomatik yanıtlar ve akıllı öneriler.",
    image: "/hotelaiassistant-qr.png",
    features: [
      "7/24 çok dilli AI concierge",
      "WhatsApp ve QR ile kolay erişim",
      "Otomatik yanıt ve öneriler",
      "Misafir memnuniyeti artışı",
    ],
  },
];

export function PlusPOSValueProps() {
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <section id="pluspos-overview" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>Hizmetlerimiz</span>
          <h2>Otel ve Restoranınız İçin Eksiksiz Çözümler</h2>
          <p>Operasyondan dijitale, yapay zeka destekli tüm hizmetler tek elden.</p>
        </header>
        <div className={styles.cardGrid}>
          {VALUES.map((value, index) => (
            <div key={value.title} className={styles.card} onClick={() => toggleFlip(index)}>
              <div className={`${styles.cardInner} ${flippedCards[index] ? styles.flipped : ""}`}>
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                  <div
                    className={styles.cardBackground}
                    style={{ backgroundImage: `url(${value.image})` }}
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardContent}>
                    <div>
                      <h2>{value.title}</h2>
                      <p>{value.description}</p>
                    </div>
                    <div className={styles.flipHint} aria-label="Kartı çevirmek için tıklayın">↻</div>
                  </div>
                </div>
                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                  <div>
                    <h3>Özellikler</h3>
                    <ul className={styles.features}>
                      {value.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.ctaButtons}>
                    <a href="#demo-form" className={styles.primaryBtn}>
                      Demo Talep Et
                    </a>
                    <a href="#pricing" className={styles.secondaryBtn}>
                      Detaylı Bilgi
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
