"use client";

// import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import HeroSection from "@/custom/hero";
import NewBenefits from "./new-components/benefits";
import NewCoreFeature from "./new-components/core-features";
import NewFaq from "./new-components/faq";
import NewFooter from "./new-components/footer";
import NewHeroSection from "./new-components/hero-section";
import NewPricing from "./new-components/pricing";
import NewTabView from "./new-components/tab-view";
import Testimonials from "./new-components/testimonial";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <NewHeader /> */}
      <HeroSection />
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
