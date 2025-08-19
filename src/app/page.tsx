"use client";

import { Footer } from "@/components/footer";
import Features from "@/custom/features";
import { HeroHeader } from "@/custom/header";
import HeroSection from "@/custom/hero";
import TabView from "@/custom/tab-view";
import NewBenefits from "./new-components/benefits";
import NewFaq from "./new-components/faq";
import NewFooter from "./new-components/footer";
import NewPricing from "./new-components/pricing";
import Testimonials from "./new-components/testimonial";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroHeader />
      <main>
        <HeroSection />
        <Features />
        <TabView />
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
