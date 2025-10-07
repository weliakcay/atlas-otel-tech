import Script from "next/script";
import type { CSSProperties } from "react";
import styles from "./Pricing.module.css";

const PACKAGES = [
  {
    id: "core",
    name: "Atlas Core",
    price: "10.000 TL",
    description:
      "Temel vitrin, iki dil desteği ve WhatsApp entegrasyonuyla hızlı başlangıç.",
    cta: "Core ile başla",
    accentStart: "#0a3d62",
    accentEnd: "#17a2b8",
    features: [
      "Kurumsal otel sayfaları (TR/EN), odalar, galeri, hizmetler, konum",
      "Temel SEO, SSL, WhatsApp tıkla-yaz",
      "KVKK & çerez barı",
    ],
  },
  {
    id: "proof",
    name: "Atlas Proof",
    price: "15.000 TL",
    description:
      "Dinamik fiyat tabloları ve yorum rozetleriyle satış kanıtınızı ön plana çıkarın.",
    cta: "Proof’a geç",
    accentStart: "#17a2b8",
    accentEnd: "#74d4e3",
    features: [
      "Core + dinamik oda/fiyat listesi (CMS/Sheet beslemeli)",
      "Misafir yorumları / puan rozetleri",
      "Promosyon şeridi (erken rezervasyon/kupon)",
    ],
    highlighted: true,
  },
  {
    id: "direct",
    name: "Atlas Direct",
    price: "25.000 TL",
    description:
      "Online rezervasyon ve ödeme akışıyla doğrudan satışları güvenle yönetin.",
    cta: "Direct ile rezervasyon alın",
    accentStart: "#f39c12",
    accentEnd: "#ffd166",
    features: [
      "Proof + online rezervasyon akışı (iyzico/Stripe)",
      "İletişim/teklif formları, kupon/upsell alanları",
      "+ HotelAIassistant denemesi (opsiyon)",
    ],
  },
];

const MATRIX = [
  { label: "Çok dilli", values: ["✅", "✅", "✅"] },
  { label: "Dinamik fiyat", values: ["❌", "✅", "✅"] },
  { label: "Yorum entegrasyonu", values: ["❌", "✅", "✅"] },
  { label: "Rezervasyon/ödeme", values: ["❌", "❌", "✅"] },
  { label: "AI Concierge", values: ["Opsiyon", "Opsiyon", "Opsiyon"] },
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
          <span className={styles.kicker}>Paketler</span>
          <h2 id="pricing-heading">İhtiyacınıza göre başlayın, büyüdükçe ekleyin.</h2>
          <p>
            Modüler yapımızla 7 günde yayına girin, rezervasyon arttıkça Atlas Direct’e geçin.
          </p>
        </header>
        <div className={styles.grid}>
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              id={pkg.id}
              className={`${styles.card} ${pkg.highlighted ? styles.highlighted : ""}`}
              style={
                {
                  "--card-accent-start": pkg.accentStart,
                  "--card-accent-end": pkg.accentEnd,
                } as CSSProperties
              }
            >
              <div className={styles.cardContent}>
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
                <a className={styles.cta} href="#demo-form" data-package={pkg.name}>
                  {pkg.cta}
                </a>
              </div>
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
          Bakım Opsiyonu: Core <strong>1.250 TL/ay</strong> · Proof <strong>1.750 TL/ay</strong> ·
          Direct <strong>2.750 TL/ay</strong>
        </p>
      </div>
      <Script id="atlas-services" type="application/ld+json">
        {JSON.stringify(SCHEMA_DATA)}
      </Script>
    </section>
  );
}
