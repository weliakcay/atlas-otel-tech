import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import styles from "@/styles/SimplePage.module.css";

const ARTICLES = [
  {
    id: "kontrol-listesi",
    title: "Otel Web Sitesi Kontrol Listesi",
    summary:
      "İçerik, görsel ve teknik gereksinimleri tek PDF’de toplayarak proje başlangıcını hızlandırın.",
  },
  {
    id: "direkt-rezervasyon",
    title: "Direkt Rezervasyon Rehberi",
    summary:
      "OTA komisyonlarını azaltırken fiyat bütünlüğünü korumak için kampanya ve upsell stratejileri.",
  },
  {
    id: "hotelaiassistant",
    title: "HotelAIassistant Entegrasyon Notları",
    summary:
      "AI concierge botu eğitimi, veri kaynakları ve otomatik yanıt ağaçları oluşturma rehberi.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>Atlas kaynakları</h1>
          <p className={styles.lead}>
            Direkt rezervasyon, AI concierge ve SEO işaretlemelerinde güncel önerileri blog ve PDF
            formatında paylaşıyoruz.
          </p>
          <section id="blog" className={styles.section}>
            <h2>Güncel içerikler</h2>
            <ul className={styles.list}>
              {ARTICLES.map((article) => (
                <li key={article.id}>
                  <strong>{article.title}:</strong> {article.summary}
                </li>
              ))}
            </ul>
          </section>
          <Link className={styles.backLink} href="/#resources">
            ← Kaynak özetine dön
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
