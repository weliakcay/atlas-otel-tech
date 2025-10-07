import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import styles from "@/styles/SimplePage.module.css";

const TEMPLATES = [
  {
    id: "akdeniz-butik",
    title: "Akdeniz Butik",
    description:
      "Açık ve ferah grid yapısı, taş-ahşap dokular. Butik/konuk evleri için sade rezervasyon akışı.",
  },
  {
    id: "sehir-is-oteli",
    title: "Şehir İş Oteli",
    description:
      "Gri tonlu kartlar, toplantı odası CTA’ları ve hızlı teklif formları. Kurumsal konuklara odaklı.",
  },
  {
    id: "resort-spa",
    title: "Resort & SPA",
    description:
      "Tam genişlik hero, spa/aktivite blokları, aile dostu promosyon alanı. Chill-out içerik blokları.",
  },
  {
    id: "hostel-minimal",
    title: "Hostel Minimal",
    description:
      "Yatak planlarını JSON-LD ile yayınlayan, genç gezgin UX’i. Mobilde tek baş parmak navigasyonu.",
  },
  {
    id: "dag-evi",
    title: "Dağ Evi",
    description:
      "Koyu tema, hava durumu banner’ı ve sezonluk kampanya şeritleri. Şömine/aktivite vurgulu.",
  },
  {
    id: "marina-yacht",
    title: "Marina & Yacht",
    description:
      "Premium yat ve oda paketleri, marina haritası entegrasyonu ve rezervasyon gemi logları.",
  },
];

export default function TemplateGalleryPage() {
  return (
    <>
      <Navigation />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>Tasarım modelleri</h1>
          <p className={styles.lead}>
            Modüler bloklarla temaları özelleştiriyoruz; her tema HotelAIassistant concierge ve
            rezervasyon motoru ile uyumludur.
          </p>
          {TEMPLATES.map((template) => (
            <section key={template.id} id={template.id} className={styles.section}>
              <h2>{template.title}</h2>
              <p>{template.description}</p>
            </section>
          ))}
          <Link className={styles.backLink} href="/#templates">
            ← Tema galerisine dön
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
