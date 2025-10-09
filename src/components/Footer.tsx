import styles from "./Footer.module.css";

const FOOTER_LINKS = [
  {
    title: "Menü",
    items: [
      { label: "Ana Sayfa", href: "#hero" },
      { label: "Çözümler", href: "#solutions" },
      { label: "Tasarım Modelleri", href: "#templates" },
      { label: "Fiyatlar", href: "#pricing" },
      { label: "İletişim", href: "#contact" },
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
          <span className={styles.logo} aria-label="Atlas Otel Tech">Atlas Otel Tech</span>
          <p>Komisyon değil, rezervasyon kazanın.</p>
          <p className={styles.muted}>Altındağ Mah. Muratpaşa / Antalya</p>
          <p>
            Tel: <a href="tel:+905549001093">+90 554 900 1093</a> ·{" "}
            E-posta: <a href="mailto:info@hotelaiassistant.io">info@hotelaiassistant.io</a>
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
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} Atlas Otel Tech. Tüm hakları saklıdır.</span>
        <a href="https://wa.me/00905549001093" target="_blank" rel="noreferrer">
          WhatsApp tıkla-yaz
        </a>
      </div>
    </footer>
  );
}
