"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";

const NAV_LINKS = [
  { href: "/#hero", label: "Ana Sayfa" },
  { href: "/#solutions", label: "Çözümler" },
  { href: "/#templates", label: "Tasarım Modelleri" },
  { href: "/#resources", label: "Kaynaklar" },
  { href: "/#pricing", label: "Fiyatlar" },
  { href: "/#contact", label: "İletişim" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setElevated(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeOnResize = () => setIsOpen(false);
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`${styles.wrapper} ${elevated ? styles.elevated : ""}`}>
      <nav className={styles.nav} aria-label="Atlas Otel Tech ana navigasyon">
        <Link href="/#hero" className={styles.logo} onClick={closeMenu}>
          <span aria-hidden="true" className={styles.logoMark}>
            A
          </span>
          <span className={styles.logoText}>
            Atlas <span>Otel Tech</span>
          </span>
        </Link>
        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.menuLabel}>{isOpen ? "Kapat" : "Menü"}</span>
        </button>
        <div
          id="primary-navigation"
          className={`${styles.links} ${isOpen ? styles.open : ""}`}
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Link
              className={styles.secondaryCta}
              href="/#ai-check"
              onClick={closeMenu}
            >
              Siteniz AI-hazır mı?
            </Link>
            <Link
              className={styles.primaryCta}
              href="/#demo-form"
              onClick={closeMenu}
            >
              Demo İsteyin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
