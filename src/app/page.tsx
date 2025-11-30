import { ContactForm } from "@/components/ContactForm";
import { DigitalAISolutions } from "@/components/DigitalAISolutions";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { OperationsGrid } from "@/components/OperationsGrid";
import { PlusPOSValueProps } from "@/components/PlusPOSValueProps";
import { Pricing } from "@/components/Pricing";
import { SocialProof } from "@/components/SocialProof";
import { TemplatesGallery } from "@/components/TemplatesGallery";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <PlusPOSValueProps />
        <OperationsGrid />
        <Pricing />
        <DigitalAISolutions />
        <TemplatesGallery />
        <SocialProof />
        <Timeline />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
