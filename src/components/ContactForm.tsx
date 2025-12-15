"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(t.contactForm.packages[0].value);

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
        throw new Error(result?.message ?? t.contactForm.errorMessage);
      }

      setStatus("success");
      setMessage(result?.message ?? t.contactForm.successMessage);
      window.setTimeout(() => {
        event.currentTarget.reset();
        setSelectedPackage(t.contactForm.packages[0].value);
      }, 0);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error && error.message ? error.message : t.contactForm.errorMessage;
      setMessage(errorMessage);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>{t.contactForm.kicker}</span>
          <h2 id="contact-heading">{t.contactForm.title}</h2>
          <p>{t.contactForm.subtitle}</p>
        </header>
        <form id="demo-form" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label htmlFor="cta-fullName">{t.contactForm.fields.fullName} *</label>
              <input id="cta-fullName" name="fullName" type="text" required autoComplete="name" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="cta-hotelName">{t.contactForm.fields.hotelName} *</label>
              <input id="cta-hotelName" name="hotelName" type="text" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="cta-email">{t.contactForm.fields.email} *</label>
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
              <label htmlFor="cta-phone">{t.contactForm.fields.phone} *</label>
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
              <label htmlFor="cta-website">{t.contactForm.fields.website}</label>
              <input
                id="cta-website"
                name="website"
                type="url"
                placeholder={t.contactForm.fields.websitePlaceholder}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="cta-package">{t.contactForm.fields.package} *</label>
              <select
                id="cta-package"
                name="package"
                required
                value={selectedPackage}
                onChange={(event) => setSelectedPackage(event.target.value)}
              >
                {t.contactForm.packages.map((pkg) => (
                  <option key={pkg.value} value={pkg.value}>{pkg.label}</option>
                ))}
              </select>
            </div>
            <div className={`${styles.inputGroup} ${styles.messageField}`}>
              <label htmlFor="cta-message">{t.contactForm.fields.message}</label>
              <textarea id="cta-message" name="message" rows={4} placeholder={t.contactForm.fields.messagePlaceholder} />
            </div>
          </div>
          <label className={styles.checkbox}>
            <input type="checkbox" name="kvkk" required />
            <span>
              {t.contactForm.kvkkLabel}{" "}
              <a href="/kvkk" target="_blank" rel="noreferrer">
                {t.contactForm.kvkkLink}
              </a>
            </span>
          </label>
          <div className={styles.actions}>
            <button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? t.contactForm.submittingButton : t.contactForm.submitButton}
            </button>
            <a href="https://wa.me/00905549001093" target="_blank" rel="noreferrer">
              {t.contactForm.whatsappCta}
            </a>
          </div>
          {message && (
            <p className={styles.feedback} role="status">
              {message}{" "}
              {status === "success" && (
                <a
                  href="https://cal.com/weliakcay/15min?user=weliakcay&overlayCalendar=true"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.contactForm.successLinkText} →
                </a>
              )}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
