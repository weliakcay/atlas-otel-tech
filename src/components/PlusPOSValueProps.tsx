import styles from "./PlusPOSValueProps.module.css";

const VALUES = [
  {
    title: "PlusPOS Operasyon Sistemleri",
    description:
      "Otel ve restoran işletmeniz için eksiksiz POS çözümü. Kasa, stok yönetimi, sipariş takibi, detaylı raporlama ve kanal entegrasyonları tek platformda.",
    image: "/pluspos-mac-screen.png",
    features: [
      "Hızlı ve kolay kasa işlemleri",
      "Gelişmiş stok ve reçete yönetimi",
      "Detaylı satış ve maliyet raporları",
      "Kanal yöneticisi entegrasyonu",
    ],
    hue: 30, // PlusPOS turuncu
  },
  {
    title: "Web Sitesi Tasarımı",
    description:
      "Çok dilli, SEO uyumlu ve AI-hazır profesyonel web siteleri. Online rezervasyon, dinamik fiyatlandırma ve ödeme entegrasyonu ile direkt satışlarınızı artırın.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    features: [
      "Çok dilli destek (TR/EN/DE/RU)",
      "Dinamik fiyat ve yorum modülleri",
      "Online rezervasyon ve ödeme",
      "SEO optimize ve mobil uyumlu",
    ],
    hue: 200, // Atlas mavi
  },
  {
    title: "Yapay Zeka Çözümleri",
    description:
      "7/24 çalışan AI concierge ile misafir deneyimini üst seviyeye taşıyın. Çok dilli WhatsApp desteği, otomatik yanıtlar ve akıllı öneriler.",
    image: "/hotelaiassistant-qr.png",
    features: [
      "7/24 çok dilli AI concierge",
      "WhatsApp ve QR ile kolay erişim",
      "Otomatik yanıt ve öneriler",
      "Misafir memnuniyeti artışı",
    ],
    hue: 180, // Teal/cyan
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
        <div className={styles.cardGrid}>
          {VALUES.map((value, index) => (
            <div
              key={value.title}
              className={styles.flipCardContainer}
              style={{ "--hue": value.hue } as React.CSSProperties}
            >
              <div className={styles.flipCard}>
                {/* Card Front - Solid color with title and features */}
                <div className={styles.cardFront}>
                  <h2 className={styles.cardTitle}>{value.title}</h2>
                  <ul>
                    {value.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Card Back - Image with button/QR */}
                <div className={styles.cardBack}>
                  {index === 2 ? (
                    /* Card 3 Back - QR Code */
                    <div className={styles.qrBackContent}>
                      <img src={value.image} alt={value.title} className={styles.qrCodeImage} />
                    </div>
                  ) : (
                    <>
                      {/* Cards 1 & 2 Back - Image + Button */}
                      <figure className={styles.figure}>
                        <div className={styles.imgBg}></div>
                        <img src={value.image} alt={value.title} />
                      </figure>
                      <div className={styles.backContent}>
                        <h3>{value.title}</h3>
                        <p>{value.description}</p>
                        <a
                          href={index === 0 ? "#pricing" : "#demo-form"}
                          className={styles.primaryBtn}
                        >
                          {index === 0 ? "Teklif Al" : "Demo Talep Et"}
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
