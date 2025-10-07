import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import styles from "@/styles/SimplePage.module.css";

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>Gizlilik Politikası</h1>
          <p className={styles.lead}>
            Atlas Otel Tech olarak ziyaretçi ve müşteri bilgilerinin gizliliğini korumayı taahhüt
            ediyoruz. Verilerinizi yalnızca hizmet sunumu ve yasal yükümlülükler doğrultusunda
            işliyoruz.
          </p>
          <section className={styles.section}>
            <h2>Toplanan bilgiler</h2>
            <p>
              Formlar aracılığıyla ad, iletişim bilgileri, otel adı, tercih edilen paket ve talep
              mesajlarını toplarız. Sunucu logları ve analitik araçlarıyla IP, tarayıcı bilgisi ve
              kullanım metrikleri tutulabilir.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Paylaşım</h2>
            <p>
              Verileriniz üçüncü kişilerle sadece yasal yükümlülükler veya hizmet sağlayıcılarla (ör.
              ödeme ve haberleşme altyapıları) paylaşılır. Bu paylaşımlar KVKK ve GDPR
              standartlarına uygundur.
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
