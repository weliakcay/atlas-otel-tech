"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/client";
import styles from "./SocialProof.module.css";

const LOGOS = ["Lumen", "Maris", "UrbanStay", "Helios", "NordPeak", "Calipso"];

export function SocialProof() {
  const { t } = useI18n();

  return (
    <section className={styles.section} aria-labelledby="social-proof-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>{t.socialProof.kicker}</span>
          <h2 id="social-proof-heading">{t.socialProof.title}</h2>
        </header>
        <div className={styles.layout}>
          <div className={styles.ratings}>
            {t.socialProof.ratings.map((rating) => (
              <div key={rating.platform} className={styles.ratingBadge}>
                <div className={styles.ratingLogo}>
                  <Image
                    src={rating.platform === "Google" ? "/google-logo.png" :
                         rating.platform === "Booking.com" ? "/booking-logo.png" : "/tripadvisor-logo.png"}
                    alt={`${rating.platform} logo`}
                    width={140}
                    height={rating.platform === "Booking.com" ? 24 : rating.platform === "Tripadvisor" ? 30 : 47}
                    loading="lazy"
                  />
                </div>
                <span className={styles.ratingScore}>{rating.score}</span>
                <span className={styles.ratingDetail}>{rating.detail}</span>
              </div>
            ))}
          </div>
          <div className={styles.testimonials}>
            {t.socialProof.testimonials.map((testimonial) => (
              <blockquote key={testimonial.name}>
                <p>{testimonial.quote}</p>
                <cite>
                  {testimonial.name} · <span>{testimonial.role}</span>
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
        <div className={styles.logoWall} role="list" aria-label={t.socialProof.clientsLabel}>
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
