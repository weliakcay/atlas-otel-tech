import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Pricing } from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Paketler - Atlas Otel Tech",
  description: "PlusPOS hizmetleri, web tasarımı ve AI çözümleri paketlerimizi inceleyin.",
};

export default function PaketlerPage() {
  return (
    <>
      <Navigation />
      <main>
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
