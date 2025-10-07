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
  title: "Atlas Otel Tech — 7 Günde AI-Hazır Otel Web Sitesi & Rezervasyon",
  description:
    "Oteliniz için hızlı, çok dilli ve AI-uyumlu web. Fiyat/yorum modülleri, online rezervasyon ve HotelAIassistant tabanlı concierge. 7 günde yayına alıyoruz.",
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: "/atlas-logo.png",
    shortcut: "/atlas-logo.png",
    apple: "/atlas-logo.png",
  },
  openGraph: {
    title: "Atlas Otel Tech",
    description:
      "Komisyon değil, rezervasyon kazanın. Atlas Otel Tech ile 7 günde AI-hazır, hızlı ve dönüşüm odaklı otel siteleri.",
    url: "https://example.com",
    siteName: "Atlas Otel Tech",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/jPd3nWN/atlas-otel-tech-logo.png",
        width: 1200,
        height: 630,
        alt: "Atlas Otel Tech Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Otel Tech",
    description:
      "7 günde AI-hazır otel web sitesi ve rezervasyon çözümü. HotelAIassistant entegrasyonu ile concierge deneyimi.",
    images: ["https://i.ibb.co/jPd3nWN/atlas-otel-tech-logo.png"],
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
          logo: "https://i.ibb.co/jPd3nWN/atlas-otel-tech-logo.png",
          sameAs: ["https://www.linkedin.com/company/atlas"],
        })}
      </Script>
    </html>
  );
}
