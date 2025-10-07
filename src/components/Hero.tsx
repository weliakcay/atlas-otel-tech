import styles from "./Hero.module.css";

const TRUST_ITEMS = [
  { label: "SSL" },
  { label: "Hız (CWV)" },
  { label: "Çok dilli" },
  { label: "KVKK" },
];

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.backgroundGradient} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.tagline}>Atlas Otel Tech</p>
          <h1>Siteniz yapay zeka teknolojisine hazır mı?</h1>
          <p className={styles.subtitle}>
            Atlas Otel Tech ile otel siteniz 7 günde yayında; AI-hazır, hızlı ve
            dönüşüm odaklı.
          </p>
          <div className={styles.ctas}>
            <a className={styles.primaryCta} href="#demo-form">
              Demo İsteyin
            </a>
            <a className={styles.secondaryCta} href="#ai-check">
              Siteniz AI-hazır mı? 2 dakikada öğrenin
            </a>
          </div>
          <p className={styles.microcopy}>
            Daha az komisyon, daha çok tekrar konuk.
          </p>
          <ul className={styles.trustList}>
            {TRUST_ITEMS.map((item) => (
              <li key={item.label}>
                <span className={styles.trustIcon} aria-hidden="true">
                  ✓
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.preview} aria-label="Otel sitesi ön izleme maketi">
          <div className={styles.previewWindow}>
            <div className={styles.previewToolbar}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.previewContent}>
              <div className={styles.previewHero}>
                <div>
                  <p>Akdeniz Suites</p>
                  <h3>Deniz manzaralı konfor</h3>
                </div>
                <div className={styles.previewBadge}>Rezervasyon Açık</div>
              </div>
              <div className={styles.previewStats}>
                <div>
                  <span>★★★★★</span>
                  <p>Booking.com 9.2</p>
                </div>
                <div>
                  <span>24/7</span>
                  <p>AI Concierge</p>
                </div>
                <div>
                  <span>+18%</span>
                  <p>Doğrudan satış</p>
                </div>
              </div>
              <div className={styles.previewTimeline}>
                <div>
                  <p>Check-in</p>
                  <span>14:00</span>
                </div>
                <div>
                  <p>Check-out</p>
                  <span>12:00</span>
                </div>
                <div>
                  <p>Erken Rez.</p>
                  <span>-15%</span>
                </div>
              </div>
              <div className={styles.previewFooter}>
                <button type="button">Oda Seç</button>
                <button type="button">WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
