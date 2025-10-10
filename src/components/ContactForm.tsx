"use client";

import { useEffect, useState } from "react";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("Core");

  useEffect(() => {
    const handlePackageSelect = (event: Event) => {
      const customEvent = event as CustomEvent<{ packageName?: string }>;
      const packageName = customEvent.detail?.packageName;
      if (!packageName) {
        return;
      }
      setSelectedPackage(packageName);
    };

    window.addEventListener("atlas-package-select", handlePackageSelect);
    return () => {
      window.removeEventListener("atlas-package-select", handlePackageSelect);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "final-cta",
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { status?: string; message?: string }
        | null;

      if (!response.ok || (result?.status && result.status !== "ok")) {
        throw new Error(result?.message ?? "Gönderim hatası");
      }

      setStatus("success");
      setMessage(result?.message ?? "Talebiniz alındı. 24 saat içinde dönüş yapıyoruz.");
      window.setTimeout(() => {
        event.currentTarget.reset();
        setSelectedPackage("Core");
      }, 0);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error && error.message ? error.message : "Beklenmeyen bir sorun oluştu.";
      setMessage(errorMessage);
      setStatus("error");
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
              <select
                id="cta-package"
                name="package"
                required
                value={selectedPackage}
                onChange={(event) => setSelectedPackage(event.target.value)}
              >
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
            <a href="https://wa.me/00905549001093" target="_blank" rel="noreferrer">
              WhatsApp ile konuş
            </a>
          </div>
          {message && (
            <p className={styles.feedback} role="status">
              {message}{" "}
              {status === "success" && (
                <a href="https://cal.com/weliakcay/demoslot" target="_blank" rel="noreferrer">
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
