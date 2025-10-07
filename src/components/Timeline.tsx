import styles from "./Timeline.module.css";

const STEPS = [
  {
    day: "Gün 1",
    title: "Kickoff & İçerik Teslimi",
    details: [
      "Otel isim/marka, logo, renkler, odalar, fiyat yapısı (varsa).",
      "Domain/DNS/hosting/SSL erişimleri. KVKK metinleri.",
    ],
  },
  {
    day: "Gün 2–3",
    title: "Kurulum & Tema",
    details: [
      "Çok dilli yapı, sayfa hiyerarşisi, temel SEO, hız optimizasyonu.",
    ],
  },
  {
    day: "Gün 4",
    title: "Fiyat/Yorum Modülleri",
    details: [
      "Dinamik fiyat tabloları, review rozetleri/pulları.",
    ],
  },
  {
    day: "Gün 5",
    title: "Rezervasyon Akışı (Direct ise)",
    details: [
      "Ödeme sağlayıcı sandbox, kupon/upsell alanları.",
    ],
  },
  {
    day: "Gün 6",
    title: "Test & Düzeltme",
    details: [
      "QA, CWV ölçümü, formlar, WhatsApp linkleri, KVKK onay akışı.",
    ],
  },
  {
    day: "Gün 7",
    title: "Yayın & Handover",
    details: [
      "Canlıya geçiş, kısa kullanım eğitim videosu, mini rehber.",
    ],
  },
];

export function Timeline() {
  return (
    <section id="timeline" className={styles.section} aria-labelledby="timeline-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>7 Günde Yayın</span>
          <h2 id="timeline-heading">Şeffaf proje takvimi.</h2>
          <p>Her adımı sözleşmede netleştiriyoruz. Opsiyonel bakım paketleriyle sürdürüyoruz.</p>
        </header>
        <div className={styles.timeline}>
          {STEPS.map((step) => (
            <article key={step.day} className={styles.item}>
              <div className={styles.day}>{step.day}</div>
              <div>
                <h3>{step.title}</h3>
                <ul>
                  {step.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.note}>
          PMS/Channel Manager entegrasyonları kapsam dışıdır (ilerleyen fazda değerlendirilir).
        </p>
      </div>
    </section>
  );
}
