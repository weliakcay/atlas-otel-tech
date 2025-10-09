import styles from "./ReservationFlowDemo.module.css";

const HIGHLIGHTS = [
  "3 adımda rezervasyon",
  "Güvenli ödeme",
  "İptal politikası netliği",
];

export function ReservationFlowDemo() {
  return (
    <section
      className={styles.section}
      id="reservation-demo"
      aria-labelledby="reservation-demo-heading"
    >
      <div className={styles.inner}>
        <div className={styles.media}>
          <div className={styles.videoFrame}>
            <div className={styles.playButton} aria-hidden="true">
              ▶
            </div>
            <p>Oda seç → Tarih → Ödeme → WhatsApp teyit</p>
          </div>
          <span className={styles.caption}>
            1 dakikalık demo: Rezervasyon akışını yönetici panelinden izleyin.
          </span>
        </div>
        <div className={styles.content}>
          <h2 id="reservation-demo-heading">Rezervasyon akışını uçtan uca deneyimleyin.</h2>
          <p>
            Atlas Direct, iyzico ve Stripe destekli ödeme akışını KVKK uyumlu formlarla birleştirir.
            Onaylanan rezervasyonlar WhatsApp teyidiyle 7/24 kapanır.
          </p>
          <ul>
            {HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className={styles.cta} href="#demo-form">
            Rezervasyon demosu planla
          </a>
        </div>
      </div>
    </section>
  );
}
