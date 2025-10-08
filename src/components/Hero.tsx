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
    id: "resort",
    src: "/hero-1.jpg",
    alt: "Deniz kenarında resort otel",
  },
  {
    id: "pool",
    src: "/hero-2.jpg",
    alt: "Şehir otel lobisi",
  },
  {
    id: "marina",
    src: "/hero-3.jpg",
    alt: "Marina manzaralı otel odası",
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
    }, 10000);

    return () => window.clearInterval(interval);
  }, [motionEnabled]);

  const frameTranslate = motionEnabled ? Math.min(scrollOffset * 0.06, 26) : 0;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.imageBackdrop} aria-hidden="true">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.id}
            className={`${styles.heroImage} ${index === activeImage ? styles.imageActive : ""}`}
            style={{ transform: `translateY(${frameTranslate / 2}px)` }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
        <div className={styles.imageOverlay} />
      </div>
      <div className={styles.inner}>
        <div className={styles.heroShell}>
          <div className={styles.heroHeader}>
            <p className={styles.tagline}>Atlas Otel Tech</p>
            <h1>Komisyon değil, rezervasyon kazanın.</h1>
            <p className={styles.subtitle}>
              Atlas Otel Tech ile otel siteniz 7 günde yayında; AI-hazır, hızlı ve dönüşüm odaklı.
            </p>
          </div>
          <div className={styles.bookingBar}>
            <div>
              <span>Lokasyon</span>
              <strong>Tüm Oteller</strong>
            </div>
            <div>
              <span>Yayın Süresi</span>
              <strong>7 Gün</strong>
            </div>
            <div>
              <span>Konuk Deneyimi</span>
              <strong>AI Concierge</strong>
            </div>
            <a className={styles.bookingButton} href="#demo-form">
              Demo İsteyin
            </a>
          </div>
          <div className={styles.heroActions}>
            <a className={styles.secondaryCta} href="#ai-check">
              Siteniz AI-hazır mı? 2 dakikada öğrenin
            </a>
            <p className={styles.microcopy}>Daha az komisyon, daha çok tekrar konuk.</p>
          </div>
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
      </div>
    </section>
  );
}
