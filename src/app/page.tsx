"use client";

import { Header } from "@/components/header";
// import { HeroSection } from "@/components/hero-section";
import { ChatbotDemo } from "@/components/chatbot-demo";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { BottomCTA } from "@/components/bottom-cta";
import NewHeader from "./new-components/header";
import NewHeroSection from "./new-components/hero-section";
import NewCoreFeature from "./new-components/core-features";
import NewTabView from "./new-components/tab-view";
import NewBenefits from "./new-components/benefits";
import Testimonials from "./new-components/testimonial";
import NewPricing from "./new-components/pricing";
import NewFaq from "./new-components/faq";
import NewFooter from "./new-components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <NewHeader />
      <main>
        <NewHeroSection />
        <NewCoreFeature />
        <NewTabView />
        <NewBenefits />
        <Testimonials />
        <NewPricing />
        <NewFaq />
        <NewFooter />
      </main>
      <Footer />
    </div>
  );
}
