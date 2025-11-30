"use client";

import Script from "next/script";
import { type CSSProperties } from "react";
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

const PACKAGES = [
  {
    id: "starter",
    name: "Operasyon Başlangıç",
    formValue: "Operasyon Başlangıç",
    price: "Teklif Alın",
    description:
      "Butik oteller ve küçük restoranlar için temel PlusPOS operasyon çözümü.",
    cta: "Teklif Al",
    features: [
      "PlusPOS temel lisans + 1 POS donanımı",
      "Temel satış ve stok raporlama",
      "Antalya'da yerinde kurulum ve eğitim",
      "İlk ay teknik destek dahil",
    ],
    accentColor: "#F39C12",
    accentSoft: "#ffe0b3",
  },
  {
    id: "digital",
    name: "Operasyon + Web",
    formValue: "Operasyon + Web",
    price: "Teklif Alın",
    description:
      "Orta ölçek oteller için operasyon + dijital varlık paketi.",
    cta: "Teklif Al",
    features: [
      "Başlangıç paketi + 2 POS donanımı",
      "Atlas çok dilli web sitesi (TR/EN/DE/RU)",
      "Dinamik fiyat ve rezervasyon modülü",
      "Temel SEO optimizasyonu",
    ],
    highlighted: true,
    accentColor: "#17A2B8",
    accentSoft: "#90ecf6",
  },
  {
    id: "ecosystem",
    name: "Tüm Ekosistem",
    formValue: "Tüm Ekosistem",
    price: "Teklif Alın",
    description:
      "Büyük oteller için tam entegre operasyon, web ve AI concierge çözümü.",
    cta: "Teklif Al",
    features: [
      "Operasyon + Web paketi + sınırsız donanım",
      "AI concierge (HotelAIassistant entegrasyonu)",
      "Kanal yöneticisi entegrasyonu (OTA senkronizasyonu)",
      "Upsell otomasyonları ve detaylı analitik",
    ],
    accentColor: "#0A3D62",
    accentSoft: "#9ed7ff",
  },
];

const MATRIX = [
  { label: "POS & Kasa", values: ["✅", "✅", "✅"] },
  { label: "El Terminali", values: ["1 adet", "2 adet", "Sınırsız"] },
  { label: "Stok & Raporlama", values: ["Temel", "Gelişmiş", "Tam"] },
  { label: "Çok Dilli Web Sitesi", values: ["❌", "✅", "✅"] },
  { label: "Online Rezervasyon", values: ["❌", "Temel", "Gelişmiş"] },
  { label: "AI Concierge", values: ["❌", "❌", "✅"] },
  { label: "Kanal Entegrasyonu", values: ["❌", "❌", "✅"] },
  { label: "Yerinde Kurulum", values: ["✅", "✅", "✅ + Eğitim"] },
];

const SCHEMA_DATA = PACKAGES.map((pkg) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: pkg.name,
  description: pkg.description,
  provider: {
    "@type": "Organization",
    name: "Atlas Otel Tech",
  },
  offers: {
    "@type": "Offer",
    price: pkg.price.replace(/\D/g, ""),
    priceCurrency: "TRY",
    url: `https://example.com/#${pkg.id}`,
    availability: "https://schema.org/InStock",
  },
}));

export function Pricing() {
  return (
    <section id="pricing" className={styles.section} aria-labelledby="pricing-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>Paketler & Çözüm Seviyeleri</span>
          <h2 id="pricing-heading">İhtiyacınıza göre başlayın, büyüdükçe ekleyin.</h2>
          <p>
            Operasyondan dijitale, tek merkezden yönetin. İşletmeniz büyüdükçe paketinizi genişletin.
          </p>
        </header>
        <div className={styles.grid}>
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              id={pkg.id}
              className={`${styles.card} ${pkg.highlighted ? styles.highlighted : ""}`}
              style={createAccentStyle(pkg.accentColor, pkg.accentSoft)}
            >
              <div className={styles.cardHeader}>
                <h3>{pkg.name}</h3>
                <p className={styles.price}>{pkg.price}</p>
              </div>
              <p className={styles.description}>{pkg.description}</p>
              <ul className={styles.featureList}>
                {pkg.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className={styles.cta}
                href="#demo-form"
                data-package={pkg.formValue}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("atlas-package-select", {
                        detail: { packageName: pkg.formValue },
                      }),
                    );
                  }
                }}
              >
                {pkg.cta}
              </a>
            </article>
          ))}
        </div>
        <div className={styles.matrix} role="table" aria-label="Paket özellik matrisi">
          <div className={styles.matrixHeader} role="row">
            <span role="columnheader">Özellik</span>
            {PACKAGES.map((pkg) => (
              <span key={pkg.id} role="columnheader">
                {pkg.name}
              </span>
            ))}
          </div>
          {MATRIX.map((row) => (
            <div key={row.label} className={styles.matrixRow} role="row">
              <span role="cell">{row.label}</span>
              {row.values.map((value, index) => (
                <span key={`${row.label}-${index}`} role="cell">
                  {value}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className={styles.maintenance}>
          Tüm paketler Antalya ve çevresinde yerinde kurulum, eğitim ve teknik destek içerir.
          İhtiyacınıza göre özelleştirilebilir modüler yapı.
        </p>
      </div>
      <Script id="atlas-services" type="application/ld+json">
        {JSON.stringify(SCHEMA_DATA)}
      </Script>
    </section>
  );
}
