import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import styles from "@/styles/SimplePage.module.css";

export default function KvkkPage() {
  return (
    <>
      <Navigation />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>KVKK Aydınlatma Metni</h1>
          <p className={styles.lead}>
            Atlas Otel Tech olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri
            sorumlusu yükümlülüklerimizi yerine getiriyoruz. Aşağıda hangi verileri, hangi amaçlarla
            ve hangi hukuki sebeple işlediğimizi bulabilirsiniz.
          </p>
          <section className={styles.section}>
            <h2>İşlenen veriler</h2>
            <ul className={styles.list}>
              <li>Ad-soyad, iletişim bilgileri (telefon, e-posta)</li>
              <li>Otel adı, web sitesi URL’si ve tercih edilen paket bilgisi</li>
              <li>Form mesajları, rezervasyon ve demo talepleri</li>
            </ul>
          </section>
          <section className={styles.section}>
            <h2>İşleme amaçları</h2>
            <ul className={styles.list}>
              <li>Hizmet taleplerini değerlendirmek ve tekliflendirme yapmak</li>
              <li>Rezervasyon ve demo takvimi planlamak</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            </ul>
          </section>
          <section className={styles.section}>
            <h2>Haklarınız</h2>
            <p>
              KVKK’nın 11. maddesi kapsamındaki haklarınızı{" "}
              <a href="mailto:kvkk@atlasoteltech.com">kvkk@atlasoteltech.com</a> üzerinden
              kullanabilirsiniz.
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
