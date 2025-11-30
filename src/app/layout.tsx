import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlusPOS Antalya | Otel & Restoran Operasyon Sistemleri + AI Web Çözümleri",
  description:
    "Antalya'da PlusPOS resmi iş ortağı Atlas Otel Tech ile otel ve restoran operasyonlarınızı tek ekosistemde yönetin. POS, stok, raporlama, web sitesi, AI concierge ve daha fazlası.",
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: "/favicon.ico",
  },
  keywords: "pluspos antalya, otel pos sistemleri, restoran pos, qr menü, otel web sitesi, ai concierge, hotelaiassistant, antalya otel teknolojileri",
  openGraph: {
    title: "PlusPOS Antalya | Otel & Restoran Operasyon Sistemleri",
    description:
      "PlusPOS + Atlas Otel Tech işbirliğiyle: Operasyon, web ve AI çözümleri tek elden. Antalya'da yerinde kurulum ve destek.",
    url: "https://example.com",
    siteName: "Atlas Otel Tech - PlusPOS Antalya",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlusPOS Antalya | Operasyon + AI Çözümleri",
    description:
      "Otel ve restoran operasyonlarınızı PlusPOS ile yönetin, Atlas Otel Tech ile dijitalleşin. Tek ekosistem, tam entegrasyon.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
      </body>
      <Script id="atlas-org-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Atlas Otel Tech",
          url: "https://example.com",
          logo: "https://example.com/logo.png",
          sameAs: ["https://www.linkedin.com/company/atlas"],
        })}
      </Script>
    </html>
  );
}
