import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const FOOTER_LINKS = [
  {
    title: "Menü",
    items: [
      { label: "Ana Sayfa", href: "/#hero" },
      { label: "Çözümler", href: "/#solutions" },
      { label: "Tasarım Modelleri", href: "/#templates" },
      { label: "Fiyatlar", href: "/#pricing" },
      { label: "İletişim", href: "/#contact" },
    ],
  },
  {
    title: "Kaynaklar",
    items: [
      { label: "Paket Detayları", href: "/cozumler" },
      { label: "Tema Galerisi", href: "/tasarim-modelleri" },
      { label: "Rehberler", href: "/kaynaklar" },
      { label: "Blog", href: "/kaynaklar#blog" },
    ],
  },
  {
    title: "Yasal",
    items: [
      { label: "KVKK", href: "/kvkk" },
      { label: "Çerez Politikası", href: "/cerez-politikasi" },
      { label: "Gizlilik", href: "/gizlilik" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/#hero" className={styles.logo} aria-label="Atlas Otel Tech">
            <Image
              src="/atlas-logo.png"
              alt="Atlas Otel Tech"
              width={40}
              height={40}
              className={styles.logoImage}
            />
            <span>Atlas Otel Tech</span>
          </Link>
          <p>Komisyon değil, rezervasyon kazanın.</p>
          <p className={styles.muted}>
            Atlas Otel Teknoloji A.Ş. · Vergi No: 1234567890 · Maslak Mah. 42. Cadde No:12 Sarıyer /
            İstanbul
          </p>
          <p>
            Tel: <a href="tel:+902123334455">+90 212 333 44 55</a> ·{" "}
            E-posta: <a href="mailto:hello@atlasoteltech.com">hello@atlasoteltech.com</a>
          </p>
          <p className={styles.aiLine}>Atlas Concierge AI — HotelAIassistant altyapısıyla</p>
        </div>
        <div className={styles.links}>
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} Atlas Otel Tech. Tüm hakları saklıdır.</span>
        <a href="https://wa.me/905312223344" target="_blank" rel="noreferrer">
          WhatsApp tıkla-yaz
        </a>
      </div>
    </footer>
  );
}
