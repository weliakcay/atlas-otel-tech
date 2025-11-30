"use client";

import Image from "next/image";
import styles from "./DigitalAISolutions.module.css";

export function DigitalAISolutions() {
  return (
    <section id="digital-solutions" className={styles.section} aria-labelledby="digital-heading">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.kicker}>Dijital & AI Çözümleri</span>
          <h2 id="digital-heading">Operasyondan sonraki adım: Doğrudan satış ve akıllı misafir iletişimi</h2>
          <p>
            Atlas Otel Tech ile 7 günde AI-hazır, hızlı ve dönüşüm odaklı otel web sitesi.
            HotelAIassistant entegrasyonuyla 7/24 çok dilli concierge desteği.
          </p>
          <ul className={styles.benefits}>
            <li>✅ Çok dilli web sitesi (TR/EN/DE/RU)</li>
            <li>✅ Dinamik fiyat & yorum modülleri</li>
            <li>✅ Online rezervasyon & ödeme (iyzico/Stripe)</li>
            <li>✅ AI concierge (WhatsApp/QR ile erişim)</li>
            <li>✅ Daha az komisyon, daha çok direkt rezervasyon</li>
          </ul>
          <div className={styles.ctas}>
            <a className={styles.primaryCta} href="#demo-form">
              Web + AI Demo İsteyin
            </a>
            <a href="https://hotelaiassistant.io" target="_blank" rel="noreferrer" className={styles.secondaryCta}>
              HotelAIassistant&apos;ı Keşfet →
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
            <span className={styles.qrLabel}>HotelAI Assistant&apos;ı deneyin</span>
          </div>
        </div>
      </div>
    </section>
  );
}
