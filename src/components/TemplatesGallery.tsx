"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
    previewImage:
      "https://images.unsplash.com/photo-1512914890250-353c97c9e134?auto=format&fit=crop&w=1600&q=90",
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
  const [activeTemplate, setActiveTemplate] =
    useState<(typeof TEMPLATES)[number] | null>(null);

  const filteredTemplates = useMemo(() => {
    if (activeFilter === "Tümü") {
      return TEMPLATES;
    }
    return TEMPLATES.filter((template) =>
      template.categories.some((category) => category === activeFilter),
    );
  }, [activeFilter]);

  useEffect(() => {
    if (!activeTemplate) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveTemplate(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeTemplate]);

  const handleTemplateOpen = (template: (typeof TEMPLATES)[number]) => {
    setActiveTemplate(template);
  };

  const handleTemplateKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    template: (typeof TEMPLATES)[number],
  ) => {
    if (template.previewImage && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      handleTemplateOpen(template);
    }
  };

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
            <article
              key={template.id}
              className={`${styles.card} ${
                template.previewImage ? styles.clickableCard : ""
              }`}
              onClick={
                template.previewImage
                  ? () => handleTemplateOpen(template)
                  : undefined
              }
              onKeyDown={(event) => handleTemplateKeyDown(event, template)}
              tabIndex={template.previewImage ? 0 : undefined}
              role={template.previewImage ? "button" : "article"}
              aria-label={
                template.previewImage
                  ? `${template.name} önizlemesini aç`
                  : undefined
              }
            >
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
                {template.previewImage ? (
                  <button
                    type="button"
                    className={styles.secondaryCta}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleTemplateOpen(template);
                    }}
                  >
                    Önizle
                  </button>
                ) : (
                  <Link
                    href={`/tasarim-modelleri#${template.id}`}
                    className={styles.secondaryCta}
                  >
                    Önizle
                  </Link>
                )}
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
      {activeTemplate?.previewImage && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="template-preview-heading"
        >
          <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
              <h3 id="template-preview-heading">{activeTemplate.name}</h3>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setActiveTemplate(null)}
                aria-label="Önizlemeyi kapat"
              >
                ×
              </button>
            </header>
            <div className={styles.modalBody}>
              <Image
                src={activeTemplate.previewImage}
                alt={`${activeTemplate.name} tema önizlemesi`}
                width={1440}
                height={960}
                priority
              />
            </div>
          </div>
          <button
            type="button"
            className={styles.modalBackdrop}
            onClick={() => setActiveTemplate(null)}
            aria-hidden="true"
          />
        </div>
      )}
    </section>
  );
}
