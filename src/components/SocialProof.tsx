import Image from "next/image";
import styles from "./SocialProof.module.css";

const RATINGS = [
  {
    platform: "Google",
    score: "4.8 / 5",
    detail: "186 yorum",
    logo: "/google-logo.png",
    logoWidth: 140,
    logoHeight: 47,
  },
  {
    platform: "Booking.com",
    score: "9.2 / 10",
    detail: "Top 3 şehir oteli",
    logo: "/booking-logo.png",
    logoWidth: 140,
    logoHeight: 24,
  },
  {
    platform: "Tripadvisor",
    score: "#1",
    detail: "Yılın butik oteli",
    logo: "/tripadvisor-logo.png",
    logoWidth: 140,
    logoHeight: 30,
  },
];

const TESTIMONIALS = [
  {
    name: "Didem Kaya",
    role: "Genel Müdür · Lumen Boutique",
    quote:
      "7 günde yayına aldık. WhatsApp teyit akışı ve promosyon şeritleri doluluk oranımızı %18 artırdı.",
  },
  {
    name: "Mert Özkan",
    role: "Satış Müdürü · Maris Resort",
    quote:
      "AI concierge sayesinde gece vardiyası yükü azaldı. Atlas ekibi entegrasyonları rötuşladı.",
  },
  {
    name: "Selin Aksoy",
    role: "İş Geliştirme · UrbanStay",
    quote:
      "Dinamik fiyatları Sheet üzerinden güncelliyoruz, kanal yöneticisine bağlı kalmadan satış yapıyoruz.",
  },
];

const LOGOS = ["Lumen", "Maris", "UrbanStay", "Helios", "NordPeak", "Calipso"];

export function SocialProof() {
  return (
    <section className={styles.section} aria-labelledby="social-proof-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>Sosyal Kanıt</span>
          <h2 id="social-proof-heading">
            Rezervasyon artışı ve memnuniyet puanlarında kanıtlı sonuçlar.
          </h2>
        </header>
        <div className={styles.layout}>
          <div className={styles.ratings}>
            {RATINGS.map((rating) => (
              <div key={rating.platform} className={styles.ratingBadge}>
                <div className={styles.ratingLogo}>
                  <Image
                    src={rating.logo}
                    alt={`${rating.platform} logo`}
                    width={rating.logoWidth}
                    height={rating.logoHeight}
                    loading="lazy"
                  />
                </div>
                <span className={styles.ratingScore}>{rating.score}</span>
                <span className={styles.ratingDetail}>{rating.detail}</span>
              </div>
            ))}
          </div>
          <div className={styles.testimonials}>
            {TESTIMONIALS.map((testimonial) => (
              <blockquote key={testimonial.name}>
                <p>{testimonial.quote}</p>
                <cite>
                  {testimonial.name} · <span>{testimonial.role}</span>
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
        <div className={styles.logoWall} role="list" aria-label="Atlas Otel Tech müşterileri">
          {LOGOS.map((logo) => (
            <span key={logo} role="listitem">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
