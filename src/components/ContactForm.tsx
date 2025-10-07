"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const webhookUrl =
    "https://weliakcay.app.n8n.cloud/webhook/f7432f35-9e06-4e30-ba57-e8618cf3f9f5";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "final-cta",
        }),
      });

      if (!response.ok) {
        throw new Error("Gönderim hatası");
      }

      setStatus("success");
      setMessage("Talebiniz alındı. 24 saat içinde dönüş yapıyoruz.");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Beklenmeyen bir sorun oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>Son CTA</span>
          <h2 id="contact-heading">7 günde yayına alalım.</h2>
          <p>Atlas ekibi, tasarım ve rezervasyon akışını birlikte detaylandıralım.</p>
        </header>
        <form id="demo-form" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label htmlFor="cta-fullName">Ad Soyad *</label>
              <input id="cta-fullName" name="fullName" type="text" required autoComplete="name" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="cta-hotelName">Otel Adı *</label>
              <input id="cta-hotelName" name="hotelName" type="text" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="cta-email">E-posta *</label>
              <input
                id="cta-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="cta-phone">Telefon *</label>
              <input
                id="cta-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="cta-website">Mevcut Site URL</label>
              <input
                id="cta-website"
                name="website"
                type="url"
                placeholder="https://siteniz.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="cta-package">Paket *</label>
              <select id="cta-package" name="package" required defaultValue="Core">
                <option value="Core">Core</option>
                <option value="Proof">Proof</option>
                <option value="Direct">Direct</option>
              </select>
            </div>
            <div className={`${styles.inputGroup} ${styles.messageField}`}>
              <label htmlFor="cta-message">Mesaj</label>
              <textarea id="cta-message" name="message" rows={4} placeholder="İhtiyaçlarınızı paylaşın" />
            </div>
          </div>
          <label className={styles.checkbox}>
            <input type="checkbox" name="kvkk" required />
            <span>
              KVKK onayını kabul ediyorum.{" "}
              <a href="/kvkk" target="_blank" rel="noreferrer">
                KVKK Aydınlatma Metni
              </a>
            </span>
          </label>
          <div className={styles.actions}>
            <button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Gönderiliyor..." : "Teklif Al"}
            </button>
            <a href="https://wa.me/905312223344" target="_blank" rel="noreferrer">
              WhatsApp ile konuş
            </a>
          </div>
          {message && (
            <p className={styles.feedback} role="status">
              {message}{" "}
              {status === "success" && (
                <a href="https://cal.com/atlasoteltech/demoslot" target="_blank" rel="noreferrer">
                  Takvimden randevu seçin →
                </a>
              )}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
