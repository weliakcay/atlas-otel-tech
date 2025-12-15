"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/client";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image src="/atlas-logo.png" alt="" width={56} height={56} priority />
            <span className={styles.srOnly}>Atlas Otel Tech</span>
          </div>
          <p>{t.footer.tagline}</p>
          <p className={styles.muted}>{t.footer.address}</p>
          <p>
            Tel: <a href={`tel:${t.footer.phone}`}>{t.footer.phone}</a>
            <br />
            E-posta: <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
          </p>
          <p className={styles.aiLine}>{t.footer.aiLine}</p>
        </div>
        <div className={styles.links}>
          {Object.values(t.footer.sections).map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
        <a href="https://wa.me/00905549001093" target="_blank" rel="noreferrer">
          {t.footer.whatsappCta}
        </a>
      </div>
    </footer>
  );
}
