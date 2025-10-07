import styles from "./ValueProps.module.css";

const VALUES = [
  {
    title: "Hızlı Yayın",
    description: "7 günde canlı. İçerik tesliminden yayına kadar hızlandırılmış süreç.",
  },
  {
    title: "Kanıtlı Satış",
    description:
      "Fiyat ve yorum modülleriyle doğrudan rezervasyon; promosyon ve kupon desteği.",
  },
  {
    title: "AI Concierge",
    description:
      "HotelAIassistant altyapısıyla 7/24 çok dilli konuk iletişimi ve upsell fırsatları.",
  },
];

export function ValueProps() {
  return (
    <section id="solutions" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>Atlas yaklaşımı</span>
          <h2>Hızlı, kanıtlı ve AI-uyumlu.</h2>
          <p>Daha az komisyon, daha çok tekrar konuk.</p>
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
