import styles from "./OperationsGrid.module.css";

const MODULES = [
  {
    icon: "🧾",
    title: "POS & Kasa Sistemleri",
    description: "Hızlı satış, bölünmüş ödeme, raporlama. Tüm ödeme yöntemleri entegre.",
  },
  {
    icon: "📱",
    title: "El Terminalleri & Mobil Sipariş",
    description: "Garsonlar masa başında sipariş alır, mutfağa anında iletir.",
  },
  {
    icon: "📲",
    title: "QR Menü & Kanal Entegrasyonları",
    description: "Yemeksepeti, Getir, Trendyol Yemek entegrasyonu. QR ile self-servis menü.",
  },
  {
    icon: "📊",
    title: "Detaylı Satış & Stok Raporlama",
    description: "Günlük/aylık satış, ürün bazlı performans, Z raporu, ciro analizi.",
  },
  {
    icon: "☁️",
    title: "Bulut Yedekleme & Güvenli Veri",
    description: "Tüm veriler bulutta, güvenli, her yerden erişilebilir.",
  },
  {
    icon: "🍽️",
    title: "Stok, Reçete & Maliyet Yönetimi",
    description: "Restoran için reçete tabanlı stok takibi, maliyet analizi.",
  },
  {
    icon: "🔗",
    title: "Kanal Yöneticisi Entegrasyonu",
    description: "Booking.com, Airbnb, Expedia gibi OTA'larla senkronizasyon.",
  },
  {
    icon: "🛎️",
    title: "Rezervasyon & Ön Büro Modülü",
    description: "Otel check-in/check-out, oda durumu, konuk kayıtları.",
  },
];

export function OperationsGrid() {
  return (
    <section id="operations-grid" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>PlusPOS Operasyon Modülleri</span>
          <h2>Otel ve restoran işletmenizi nasıl güçlendiriyoruz?</h2>
          <p>Tek bir ekosistemde tüm operasyonel ihtiyaçlarınız.</p>
        </header>
        <div className={styles.grid}>
          {MODULES.map((module) => (
            <article key={module.title} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">
                {module.icon}
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
