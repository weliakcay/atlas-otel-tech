import styles from "./ResourcesPreview.module.css";

const RESOURCES = [
  {
    title: "Otel Web Sitesi Kontrol Listesi",
    description: "7 günde yayına hazır olmak için içerik ve teknik gereksinimler.",
    href: "/kaynaklar#kontrol-listesi",
  },
  {
    title: "Direkt Rezervasyon Rehberi",
    description: "OTA’dan bağımsız fiyatlandırma ve promosyon stratejileri.",
    href: "/kaynaklar#direkt-rezervasyon",
  },
  {
    title: "HotelAIassistant Entegrasyon Notları",
    description: "AI concierge veri gereksinimleri ve önerilen otomasyon akışları.",
    href: "/kaynaklar#hotelaiassistant",
  },
];

export function ResourcesPreview() {
  return (
    <section id="resources" className={styles.section} aria-labelledby="resources-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>Kaynaklar</span>
          <h2 id="resources-heading">Atlas rehberleriyle stratejik hazırlık yapın.</h2>
          <p>Checklist’ler, otomasyon akışları ve rezervasyon optimizasyonu tek yerde.</p>
        </header>
        <div className={styles.grid}>
          {RESOURCES.map((resource) => (
            <article key={resource.title} className={styles.card}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.href}>Detayı incele →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
