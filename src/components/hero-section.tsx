"use client";

import { Button } from "@ari/ui/components/button";
import { DotPattern } from "@ari/ui/components/ui/dot-pattern";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@ari/ui/lib/utils";
import { Icons } from "@ari/ui/components/icons";
import { AuroraText } from "@ari/ui/components/ui/aurora-text";
import { scrollToSection } from "@/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

      {/* Dot Pattern Background */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn("text-primary-foreground/20")}
      />

      <div className="relative container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          {/* <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 mb-8 font-body">
            🚀 New features available
          </div> */}
          <div className="flex justify-center items-center mb-8">
            <Icons.logo className="w-16 h-16" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-normal tracking-tight text-gray-900 dark:text-white mb-6">
            Meet{" "}
            <AuroraText
              className="inline-block"
              colors={["#4ade80", "#06b6d4", "#00ED64"]}
              speed={1.5}
            >
              Ari
            </AuroraText>{" "}
            ! AI Shopkeeper for your Shopify store
          </h1>

          {/* Description */}
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-body">
            Ari is an AI-powered Shopify assistant that helps you manage your
            store, automate tasks, and grow your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              cta={true}
              onClick={() => {
                window.open(process.env.NEXT_PUBLIC_WAITLIST_URL, "_blank");
              }}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              cta={true}
              onClick={() => {
                scrollToSection("demo");
              }}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

         
        </div>
      </div>
    </section>
  );
}
