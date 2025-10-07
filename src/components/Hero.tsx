"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const TRUST_ITEMS = [
  { label: "SSL" },
  { label: "Hız (CWV)" },
  { label: "Çok dilli" },
  { label: "KVKK" },
];

const HERO_VIDEOS = [
  {
    id: "pool-sunrise",
    src: "https://cdn.coverr.co/videos/coverr-sunrise-at-the-hotel-pool-5170/1080p.mp4",
    poster:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "beach-deck",
    src: "https://cdn.coverr.co/videos/coverr-tropical-hotel-pool-9722/1080p.mp4",
    poster:
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "city-night",
    src: "https://cdn.coverr.co/videos/coverr-city-hotel-room-with-night-view-7201/1080p.mp4",
    poster:
      "https://images.pexels.com/photos/261112/pexels-photo-261112.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export function Hero() {
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setMotionEnabled(!event.matches);
    };

    handleMediaChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!motionEnabled || typeof window === "undefined") {
      setScrollOffset(0);
      return;
    }

    let ticking = false;

    const updateOffset = () => {
      setScrollOffset(Math.min(Math.max(window.scrollY, 0), 600));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOffset);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateOffset();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [motionEnabled]);

  useEffect(() => {
    if (!motionEnabled || HERO_VIDEOS.length <= 1) {
      setActiveVideo(0);
      return;
    }

    const interval = window.setInterval(() => {
      setActiveVideo((current) => (current + 1) % HERO_VIDEOS.length);
    }, 14000);

    return () => window.clearInterval(interval);
  }, [motionEnabled]);

  const frameTranslate = motionEnabled ? Math.min(scrollOffset * 0.06, 26) : 0;
  const viewportTranslate = motionEnabled ? Math.min(scrollOffset * 0.22, 140) : 0;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.videoBackground} aria-hidden="true">
        {HERO_VIDEOS.map((video, index) => (
          <video
            key={video.id}
            className={`${styles.backgroundVideo} ${index === activeVideo ? styles.activeVideo : ""}`}
            src={video.src}
            poster={video.poster}
            muted
            playsInline
            loop
            preload={motionEnabled ? "auto" : "metadata"}
            autoPlay={motionEnabled}
          />
        ))}
        <div className={styles.videoOverlay} />
      </div>
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
          <div
            className={styles.previewWindow}
            style={
              motionEnabled
                ? {
                    transform: `translateY(${frameTranslate}px) rotateX(${Math.min(
                      scrollOffset * 0.01,
                      5,
                    )}deg)`,
                  }
                : undefined
            }
          >
            <div className={styles.previewToolbar}>
              <span>Atlas</span>
              <span>07:24</span>
            </div>
            <div className={styles.previewScreen}>
              <div
                className={styles.previewViewport}
                style={motionEnabled ? { transform: `translateY(-${viewportTranslate}px)` } : undefined}
              >
                <div className={styles.previewHero}>
                  <div>
                    <p>Akdeniz Suites</p>
                    <h3>Deniz manzaralı konfor</h3>
                  </div>
                  <div className={styles.previewBadge}>Rezervasyon Açık</div>
                </div>
                <div className={styles.previewGallery}>
                  <div className={styles.previewImageLarge}>
                    <span>Infinity Pool &amp; Beach</span>
                  </div>
                  <div className={styles.previewImageSmall}>
                    <span>Akşam Yemekleri</span>
                  </div>
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
                <div className={styles.previewRooms}>
                  <div className={styles.roomCard}>
                    <div className={styles.roomTitle}>Deniz Manzaralı Deluxe</div>
                    <p className={styles.roomMeta}>30 m² · Balkon · Kahvaltı dahil</p>
                    <span className={styles.roomPrice}>3.450 TL</span>
                  </div>
                  <div className={styles.roomCard}>
                    <div className={styles.roomTitle}>Aile Süit</div>
                    <p className={styles.roomMeta}>45 m² · 2+1 · Ücretsiz iptal</p>
                    <span className={styles.roomPrice}>4.250 TL</span>
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
                <div className={styles.previewTestimonial}>
                  “Atlas concierge 7/24 çok dilli yanıtla rezervasyon teyidi veriyor.”
                </div>
                <div className={styles.previewFooter}>
                  <button type="button">Oda Seç</button>
                  <button type="button">WhatsApp</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
