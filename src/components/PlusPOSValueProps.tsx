import styles from "./PlusPOSValueProps.module.css";

const VALUES = [
  {
    title: "PlusPOS Operasyon Sistemleri",
    description: "Otel ve restoran işletmeniz için eksiksiz POS çözümü. Kasa, stok yönetimi, sipariş takibi, detaylı raporlama ve kanal entegrasyonları tek platformda.",
  },
  {
    title: "Web Sitesi Tasarımı",
    description:
      "Çok dilli, SEO uyumlu ve AI-hazır profesyonel web siteleri. Online rezervasyon, dinamik fiyatlandırma ve ödeme entegrasyonu ile direkt satışlarınızı artırın.",
  },
  {
    title: "Yapay Zeka Çözümleri",
    description:
      "7/24 çalışan AI concierge ile misafir deneyimini üst seviyeye taşıyın. Çok dilli WhatsApp desteği, otomatik yanıtlar ve akıllı öneriler.",
  },
];

export function PlusPOSValueProps() {
  return (
    <section id="pluspos-overview" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>Hizmetlerimiz</span>
          <h2>Otel ve Restoranınız İçin Eksiksiz Çözümler</h2>
          <p>Operasyondan dijitale, yapay zeka destekli tüm hizmetler tek elden.</p>
        </header>
        <div className={styles.grid}>
          {VALUES.map((value) => (
            <article key={value.title} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">
                <span />
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
