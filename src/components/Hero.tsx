"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const TRUST_ITEMS = [
  { label: "SSL" },
  { label: "Hız (CWV)" },
  { label: "Çok dilli" },
  { label: "KVKK" },
];

const HERO_IMAGES = [
  {
    id: "mediterranean-shore",
    src: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2100d?auto=format&fit=crop&w=1920&q=90",
    alt: "Deniz kıyısında palmiyeli sahil manzarası",
  },
  {
    id: "sunset-pier",
    src: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1920&q=90",
    alt: "Gün batımında marina ve yatlar",
  },
  {
    id: "mountain-retreat",
    src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1920&q=90",
    alt: "Dağ otelinde sıcak ışıklı bungalovlar",
  },
  {
    id: "city-rooftop",
    src: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1920&q=90",
    alt: "Şehir otelinin çatı havuzu",
  },
];

export function Hero() {
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

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
    if (!motionEnabled || HERO_IMAGES.length <= 1) {
      setActiveImage(0);
      return;
    }

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 12000);

    return () => window.clearInterval(interval);
  }, [motionEnabled]);

  const frameTranslate = motionEnabled ? Math.min(scrollOffset * 0.06, 26) : 0;
  const viewportTranslate = motionEnabled ? Math.min(scrollOffset * 0.22, 140) : 0;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.imageBackground} aria-hidden="true">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.id}
            className={`${styles.backgroundImage} ${index === activeImage ? styles.activeImage : ""}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        <div className={styles.backgroundOverlay} />
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
