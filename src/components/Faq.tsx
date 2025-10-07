import Script from "next/script";
import styles from "./Faq.module.css";

const FAQ_ITEMS = [
  {
    question: "OTA’lardan farkınız ne?",
    answer:
      "OTA komisyonlarına bağımlılığı azaltmak için sitenizde doğrudan rezervasyon akışını kuruyor, promosyon kodları ve sadakat bloklarıyla tekrar satışa odaklanıyoruz.",
  },
  {
    question: "Ödeme güvenliği nasıl?",
    answer:
      "iyzico veya Stripe altyapısıyla 3D Secure/sanal POS seçeneklerini kullanıyoruz. SSL sertifikası, KVKK uyumlu form onayları ve loglama standarttır.",
  },
  {
    question: "7 günde nasıl yayına alıyorsunuz?",
    answer:
      "Hazır tasarım modelleri + modüler CMS ile ilerliyoruz. İçerikleri teslim alır almaz çok dilli yapıyı kuruyor, 4. günde fiyat/yorum modüllerini bağlıyoruz.",
  },
  {
    question: "Mevcut sitem taşınır mı, SEO kaybı olur mu?",
    answer:
      "URL haritası, yönlendirmeler ve schema işaretlemeleriyle sıfır SEO kaybı hedefliyoruz. CDN, CWV optimizasyonu ve hreflang kontrolleri proje planında yer alır.",
  },
  {
    question: "AI concierge (HotelAIassistant) nasıl devreye girer?",
    answer:
      "HotelAIassistant entegrasyonu Atlas Direct paketinde opsiyoneldir. WhatsApp, web chat ve e-posta kanallarında çok dilli botu eğitiyor, önceden onaylı yanıt ağaçlarıyla yayına alıyoruz.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function Faq() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.kicker}>SSS</span>
          <h2 id="faq-heading">En çok sorulan sorular.</h2>
        </header>
        <div className={styles.items}>
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary className={styles.summary}>{item.question}</summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <Script id="atlas-faq-schema" type="application/ld+json">
        {JSON.stringify(FAQ_SCHEMA)}
      </Script>
    </section>
  );
}
