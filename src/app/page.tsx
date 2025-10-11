import { AiReadinessCheck } from "@/components/AiReadinessCheck";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Pricing } from "@/components/Pricing";
import { HotelAiAssistantPromo } from "@/components/HotelAiAssistantPromo";
import { ResourcesPreview } from "@/components/ResourcesPreview";
import { SocialProof } from "@/components/SocialProof";
import { TemplatesGallery } from "@/components/TemplatesGallery";
import { Timeline } from "@/components/Timeline";
import { ValueProps } from "@/components/ValueProps";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ValueProps />
        <Pricing />
        <HotelAiAssistantPromo />
        <AiReadinessCheck />
        <TemplatesGallery />
        <SocialProof />
        <ResourcesPreview />
        <Faq />
        <Timeline />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
