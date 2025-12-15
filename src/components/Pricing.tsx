"use client";

import Image from "next/image";
import Script from "next/script";
import { type CSSProperties } from "react";
import { useI18n } from "@/i18n/client";
import styles from "./Pricing.module.css";

function hexToRgbChannels(color: string): string | null {
  if (!color) {
    return null;
  }
  let normalized = color.trim();
  if (normalized.startsWith("#")) {
    normalized = normalized.slice(1);
  }
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (normalized.length !== 6) {
    return null;
  }
  const value = Number.parseInt(normalized, 16);
  if (Number.isNaN(value)) {
    return null;
  }
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r} ${g} ${b}`;
}

function createAccentStyle(accent: string, soft: string): CSSProperties {
  const accentRgb = hexToRgbChannels(accent);
  const style: Record<string, string> = {
    "--card-accent": accent,
    "--card-accent-soft": soft,
  };
  if (accentRgb) {
    style["--card-accent-rgb"] = accentRgb;
  }
  return style as CSSProperties;
}

export function Pricing() {
  const { t } = useI18n();

  const SERVICES = [
    {
      id: "pluspos",
      name: t.pricing.services.pluspos.name,
      formValue: t.pricing.services.pluspos.name,
      description: t.pricing.services.pluspos.description,
      cta: t.pricing.services.pluspos.cta,
      ctaLink: "/iletisim",
      features: t.pricing.services.pluspos.features,
      accentColor: "#F39C12",
      accentSoft: "#ffe0b3",
      modules: [
        { icon: "🧾", title: "POS & Kasa Sistemleri", description: "Hızlı satış, bölünmüş ödeme, raporlama" },
        { icon: "📱", title: "El Terminalleri & Mobil Sipariş", description: "Garsonlar masa başında sipariş alır" },
        { icon: "📲", title: "QR Menü & Kanal Entegrasyonları", description: "Yemeksepeti, Getir, Trendyol entegrasyonu" },
        { icon: "📊", title: "Detaylı Satış & Stok Raporlama", description: "Günlük/aylık satış, ciro analizi" },
        { icon: "☁️", title: "Bulut Yedekleme", description: "Tüm veriler bulutta, güvenli" },
        { icon: "🍽️", title: "Stok & Maliyet Yönetimi", description: "Reçete tabanlı stok takibi" },
        { icon: "🔗", title: "Kanal Yöneticisi", description: "Booking.com, Airbnb, Expedia entegrasyonu" },
        { icon: "🛎️", title: "Rezervasyon Modülü", description: "Otel check-in/check-out, oda durumu" },
      ],
    },
    {
      id: "web",
      name: t.pricing.services.web.name,
      formValue: t.pricing.services.web.name,
      description: t.pricing.services.web.description,
      cta: t.pricing.services.web.cta,
      ctaLink: "/iletisim",
      features: t.pricing.services.web.features,
      accentColor: "#17A2B8",
      accentSoft: "#90ecf6",
    },
    {
      id: "ai",
      name: t.pricing.services.ai.name,
      formValue: t.pricing.services.ai.name,
      description: t.pricing.services.ai.description,
      features: t.pricing.services.ai.features,
      primaryCta: t.pricing.services.ai.ctaPrimary,
      primaryCtaLink: "https://hotelaiassistant.pro",
      secondaryCta: t.pricing.services.ai.ctaSecondary,
      secondaryCtaLink: "/iletisim",
      accentColor: "#0A3D62",
      accentSoft: "#9ed7ff",
      hasMultipleCtas: true,
    },
  ];

  const SCHEMA_DATA = SERVICES.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Atlas Otel Tech",
    },
  }));

  return (
    <section id="pricing" className={styles.section} aria-labelledby="pricing-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>{t.pricing.kicker}</span>
          <h2 id="pricing-heading">{t.pricing.title}</h2>
          <p>{t.pricing.subtitle}</p>
        </header>

        {SERVICES.map((service, index) => (
          <article
            key={service.id}
            id={service.id}
            className={styles.packageSection}
            style={createAccentStyle(service.accentColor, service.accentSoft)}
          >
            <div className={styles.packageHeader}>
              <h3>{service.name}</h3>
              <p className={styles.packageDescription}>{service.description}</p>
            </div>

            {service.modules ? (
              <div className={styles.modulesGrid}>
                {service.modules.map((module) => (
                  <div key={module.title} className={styles.moduleCard}>
                    <div className={styles.moduleIcon} aria-hidden="true">
                      {module.icon}
                    </div>
                    <h4>{module.title}</h4>
                    <p>{module.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <ul className={styles.featureList}>
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            )}

            <div className={styles.packageCta}>
              {service.hasMultipleCtas ? (
                <>
                  <a
                    className={styles.ctaPrimary}
                    href={service.primaryCtaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-package={service.formValue}
                  >
                    {service.primaryCta}
                  </a>
                  <a
                    className={styles.ctaSecondary}
                    href={service.secondaryCtaLink}
                    data-package={service.formValue}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(
                          new CustomEvent("atlas-package-select", {
                            detail: { packageName: service.formValue },
                          }),
                        );
                      }
                    }}
                  >
                    {service.secondaryCta}
                  </a>
                </>
              ) : (
                <a
                  className={styles.cta}
                  href={service.ctaLink}
                  data-package={service.formValue}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(
                        new CustomEvent("atlas-package-select", {
                          detail: { packageName: service.formValue },
                        }),
                      );
                    }
                  }}
                >
                  {service.cta}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <Script id="atlas-services" type="application/ld+json">
        {JSON.stringify(SCHEMA_DATA)}
      </Script>
    </section>
  );
}
