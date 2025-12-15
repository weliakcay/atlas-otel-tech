"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./Navigation.module.css";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const { t } = useI18n();

  const NAV_LINKS = [
    { href: "/#hero", label: t.navigation.home },
    { href: "/#templates-gallery", label: t.navigation.templates },
    { href: "/#digital-solutions", label: t.navigation.digital },
    { href: "/paketler", label: t.navigation.pricing },
    { href: "/iletisim", label: t.navigation.contact },
  ];

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
        <Link
          href="/#hero"
          className={styles.logo}
          onClick={closeMenu}
          aria-label="Atlas Otel Tech ana sayfa"
        >
          <span className={styles.logoImageWrapper} aria-hidden="true">
            <Image
              src="/atlas-logo.png"
              alt=""
              width={48}
              height={48}
              priority
              className={styles.logoImage}
            />
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
            <LanguageSwitcher />
            <Link
              className={styles.secondaryCta}
              href="/#digital-solutions"
              onClick={closeMenu}
            >
              {t.navigation.aiSolutions}
            </Link>
            <Link
              className={styles.primaryCta}
              href="/#demo-form"
              onClick={closeMenu}
            >
              {t.navigation.plusposDemo}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
