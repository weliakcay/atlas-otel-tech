import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import styles from "@/styles/SimplePage.module.css";

export default function CookiePolicyPage() {
  return (
    <>
      <Navigation />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>Çerez Politikası</h1>
          <p className={styles.lead}>
            Atlas Otel Tech, web deneyiminizi özelleştirmek ve performansı izlemek için zorunlu ve
            analitik çerezler kullanır.
          </p>
          <section className={styles.section}>
            <h2>Kullanılan çerez türleri</h2>
            <ul className={styles.list}>
              <li>Zorunlu çerezler: Oturum yönetimi ve güvenlik.</li>
              <li>Analitik çerezler: Google Analytics ile performans takibi.</li>
              <li>Fonksiyonel çerezler: Dil tercihi, rezervasyon adımları.</li>
            </ul>
          </section>
          <section className={styles.section}>
            <h2>Çerez tercihleri</h2>
            <p>
              Çerez barı üzerinden tercihlerinizi güncelleyebilir veya tarayıcı ayarlarınızdan
              silebilirsiniz. Reddettiğinizde sitenin bazı bölümleri sınırlı çalışabilir.
            </p>
          </section>
          <Link className={styles.backLink} href="/">
            ← Ana sayfaya dön
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
