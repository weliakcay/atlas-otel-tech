"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
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
      "https://cdn.dribbble.com/userupload/37273173/file/original-3ead478d6bd325d8c5f8bc8d662a15a7.png?resize=1024x768&vertical=center",
    fullPreviewImage:
      "https://cdn.dribbble.com/userupload/37273173/file/original-3ead478d6bd325d8c5f8bc8d662a15a7.png?resize=1600x1200&vertical=center",
    accentColor: "#17A2B8",
  },
  {
    id: "sehir-is-oteli",
    name: "Şehir İş Oteli",
    description: "Gri/kontrast, sade formlar; hızlı erişim ve toplantı odaklı.",
    categories: ["Koyu Tema"],
    previewImage:
      "https://cdn.dribbble.com/userupload/42873780/file/original-7cd57707fdaa18688e4997ff89057540.jpg?resize=1024x7413&vertical=center",
    fullPreviewImage:
      "https://cdn.dribbble.com/userupload/42873780/file/original-7cd57707fdaa18688e4997ff89057540.jpg?resize=1600x1158&vertical=center",
    accentColor: "#0A3D62",
  },
  {
    id: "resort-spa",
    name: "Resort & SPA",
    description: "Geniş görsel hero, spa/aktivite blokları; tatil köyleri.",
    categories: ["Görsel Ağırlıklı", "Aile"],
    previewImage:
      "https://cdn.dribbble.com/userupload/43167338/file/original-87636043bfa822b737607d54d5a42150.jpg?resize=1024x768&vertical=center",
    fullPreviewImage:
      "https://cdn.dribbble.com/userupload/43167338/file/original-87636043bfa822b737607d54d5a42150.jpg?resize=1600x1200&vertical=center",
    accentColor: "#F39C12",
  },
  {
    id: "hostel-minimal",
    name: "Hostel Minimal",
    description: "Run-of-house ve yatakhane planları; genç, hızlı.",
    categories: ["Minimal"],
    previewImage:
      "https://cdn.dribbble.com/userupload/44537386/file/9463f93e0767ffee518d71d8ba6e578d.png?resize=752x566&vertical=center",
    fullPreviewImage:
      "https://cdn.dribbble.com/userupload/44537386/file/9463f93e0767ffee518d71d8ba6e578d.png?resize=1504x1132&vertical=center",
    accentColor: "#6C63FF",
  },
  {
    id: "dag-evi",
    name: "Dağ Evi",
    description: "Koyu tema, doğa görselleri; sezon ve hava durumuna duyarlı banner.",
    categories: ["Koyu Tema", "Adults Only"],
    previewImage:
      "https://cdn.dribbble.com/userupload/34755859/file/original-0f4a00ebd57198673ce7ae660ff723e4.png?resize=1024x754&vertical=center",
    fullPreviewImage:
      "https://cdn.dribbble.com/userupload/34755859/file/original-0f4a00ebd57198673ce7ae660ff723e4.png?resize=1600x1180&vertical=center",
    accentColor: "#2C3E50",
  },
  {
    id: "marina-yacht",
    name: "Marina & Yacht",
    description: "Deniz teması, oda+tekne paketleri; premium algı.",
    categories: ["Görsel Ağırlıklı", "Butik"],
    previewImage:
      "https://cdn.dribbble.com/userupload/15411637/file/original-fd39d81a5396e87e0a02eea22c2df89f.jpg?resize=1024x768&vertical=center",
    fullPreviewImage:
      "https://cdn.dribbble.com/userupload/15411637/file/original-fd39d81a5396e87e0a02eea22c2df89f.jpg?resize=1600x1200&vertical=center",
    accentColor: "#1ABC9C",
  },
];

function hexToRgbChannels(color: string): string | null {
  if (!color) return null;
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

function createAccentStyle(color?: string): CSSProperties | undefined {
  if (!color) {
    return undefined;
  }
  const accentRgb = hexToRgbChannels(color);
  const style: Record<string, string> = {
    "--accent-color": color,
  };
  if (accentRgb) {
    style["--accent-color-rgb"] = accentRgb;
  }
  return style as CSSProperties;
}

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
          {filteredTemplates.map((template) => {
            const accentStyle = createAccentStyle(template.accentColor);
            return (
            <article
              key={template.id}
              className={`${styles.card} ${
                template.previewImage ? styles.clickableCard : ""
              }`}
              style={accentStyle}
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
              {template.previewImage && (
                <div className={styles.previewThumb} aria-hidden="true">
                  <Image
                    src={template.previewImage}
                    alt=""
                    width={520}
                    height={320}
                    className={styles.thumbImage}
                    priority={template.id === "akdeniz-butik"}
                  />
                </div>
              )}
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
            );
          })}
        </div>
      </div>
      {activeTemplate?.previewImage && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="template-preview-heading"
        >
          <div
            className={styles.modalContent}
            style={createAccentStyle(activeTemplate.accentColor)}
          >
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
                src={activeTemplate.fullPreviewImage ?? activeTemplate.previewImage}
                alt={`${activeTemplate.name} tema önizlemesi`}
                width={1600}
                height={1100}
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
