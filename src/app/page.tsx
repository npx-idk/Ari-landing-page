"use client";

import Faq from "@/custom/faq";
import Features from "@/custom/features";
import Footer from "@/custom/footer";
import { Header } from "@/custom/header";
import HeroSection from "@/custom/hero";
import { LogoCloud } from "@/custom/logo-cloud";
import Pricing from "@/custom/pricing";
import TabView from "@/custom/tab-view";
import Testimonials from "@/custom/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <Features />
        <TabView />
        <LogoCloud />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}
