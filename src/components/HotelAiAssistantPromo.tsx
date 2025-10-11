"use client";

import Image from "next/image";
import styles from "./HotelAiAssistantPromo.module.css";

export function HotelAiAssistantPromo() {
  return (
    <section className={styles.section} aria-labelledby="hotel-ai-heading">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.kicker}>HotelAI Assistant</span>
          <h2 id="hotel-ai-heading">Oteliniz misafirlerinizle konuşmaya başlasın</h2>
          <p>Misafir deneyiminin geleceği artık burada.</p>
          <p>
            HotelAI Assistant, yapay zekâ ile misafirlerinizi anlar, yanıtlar, yönlendirir. Dilersen
            daha fazlasını keşfet:{" "}
            <a href="https://hotelaiassistant.io" target="_blank" rel="noreferrer">
              hotelaiassistant.io
            </a>
          </p>
          <p>
            veya hemen onunla konuş:{" "}
            <a href="https://hotelaiassistant.pro" target="_blank" rel="noreferrer">
              hotelaiassistant.pro
            </a>
          </p>
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
          </div>
          <span className={styles.qrHint}>Telefon kameranızla okutun</span>
        </div>
      </div>
    </section>
  );
}

