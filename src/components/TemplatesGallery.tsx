"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./TemplatesGallery.module.css";

const FILTERS = [
  "Tümü",
  "Minimal",
  "Görsel Ağırlıklı",
  "Koyu Tema",
  "Açık Tema",
  "Butik",
  "Aile",
  "Adults Only",
];

const TEMPLATES = [
  {
    id: "akdeniz-butik",
    name: "Akdeniz Butik",
    description: "Açık, ferah, taş-ahşap doku; butik/konuk evi için ideal.",
    categories: ["Açık Tema", "Butik"],
  },
  {
    id: "sehir-is-oteli",
    name: "Şehir İş Oteli",
    description: "Gri/kontrast, sade formlar; hızlı erişim ve toplantı odaklı.",
    categories: ["Minimal", "Açık Tema"],
  },
  {
    id: "resort-spa",
    name: "Resort & SPA",
    description: "Geniş görsel hero, spa/aktivite blokları; tatil köyleri.",
    categories: ["Görsel Ağırlıklı", "Aile"],
  },
  {
    id: "hostel-minimal",
    name: "Hostel Minimal",
    description: "Run-of-house ve yatakhane planları; genç, hızlı.",
    categories: ["Minimal"],
  },
  {
    id: "dag-evi",
    name: "Dağ Evi",
    description: "Koyu tema, doğa görselleri; sezon ve hava durumuna duyarlı banner.",
    categories: ["Koyu Tema", "Adults Only"],
  },
  {
    id: "marina-yacht",
    name: "Marina & Yacht",
    description: "Deniz teması, oda+tekne paketleri; premium algı.",
    categories: ["Görsel Ağırlıklı", "Butik"],
  },
];

export function TemplatesGallery() {
  const [activeFilter, setActiveFilter] = useState<string>("Tümü");

  const filteredTemplates = useMemo(() => {
    if (activeFilter === "Tümü") {
      return TEMPLATES;
    }
    return TEMPLATES.filter((template) =>
      template.categories.some((category) => category === activeFilter),
    );
  }, [activeFilter]);

  return (
    <section
      id="templates"
      className={styles.section}
      aria-labelledby="templates-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>Tasarım Modelleri</span>
          <h2 id="templates-heading">Farklı otel tipleri için hazır tema galerisi.</h2>
          <p>Her tema AI concierge ve rezervasyon akışlarıyla uyumlu çalışır.</p>
        </header>
        <div className={styles.filters} role="tablist" aria-label="Tema filtreleri">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={`${styles.filterButton} ${
                activeFilter === filter ? styles.activeFilter : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className={styles.grid}>
          {filteredTemplates.map((template) => (
            <article key={template.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.badges}>
                  {template.categories.map((category) => (
                    <span key={category}>{category}</span>
                  ))}
                </div>
                <h3>{template.name}</h3>
                <p>{template.description}</p>
              </div>
              <div className={styles.actions}>
                <Link href={`/tasarim-modelleri#${template.id}`} className={styles.secondaryCta}>
                  Önizle
                </Link>
                <a
                  className={styles.primaryCta}
                  href={`#demo-form`}
                  data-template={template.name}
                >
                  Bu temayla teklif al
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
