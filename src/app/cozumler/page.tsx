import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import styles from "@/styles/SimplePage.module.css";

const SOLUTIONS = [
  {
    title: "Atlas Core",
    details: [
      "Kurumsal otel sayfaları (TR/EN), oda ve hizmet modülleri",
      "Temel SEO, SSL, WhatsApp tıkla-yaz entegrasyonu",
      "KVKK & çerez yönetimi, hızlı hosting",
    ],
  },
  {
    title: "Atlas Proof",
    details: [
      "Core’un tüm özellikleri + dinamik fiyat/oda listeleri",
      "Google/Booking/Tripadvisor yorum rozetleri",
      "Promosyon şeritleri ve kampanya sayaçları",
    ],
  },
  {
    title: "Atlas Direct",
    details: [
      "Proof’un tüm özellikleri + online rezervasyon/ödeme akışı",
      "Kupon, upsell ve teklif formları",
      "HotelAIassistant concierge denemesi (opsiyonel)",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Navigation />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>Atlas çözümleri</h1>
          <p className={styles.lead}>
            İhtiyacınıza göre başlayın, rezervasyon oluştukça Atlas Direct’e geçin. Tüm paketler 7
            gün içinde yayına alınır.
          </p>
          {SOLUTIONS.map((solution) => (
            <section key={solution.title} className={styles.section}>
              <h2>{solution.title}</h2>
              <ul className={styles.list}>
                {solution.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </section>
          ))}
          <Link className={styles.backLink} href="/#pricing">
            ← Paket karşılaştırmasına dön
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
