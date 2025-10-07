import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import styles from "@/styles/SimplePage.module.css";

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>Atlas ile iletişime geçin</h1>
          <p className={styles.lead}>
            Projenizi 7 günde yayına almak, rezervasyon motorunu özelleştirmek veya HotelAIassistant
            entegrasyonunu konuşmak için formu doldurun.
          </p>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
