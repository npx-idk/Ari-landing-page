import {
  ChatbotDemo,
  PlacementType,
  ThemeDropdown,
  ThemeType,
} from "@/components/chatbot-demo";
import { Variants } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { HeroHeader } from "./header";
import { AnimatedGroup } from "./motion/animated-group";
import { TextEffect } from "./motion/text-effect";
import { GRADIENT_PRESETS, MovingBorderWrapper } from "./moving-border-wrapper";
import { Button } from "./ui/button";

import { Monitor, PanelRight } from "lucide-react";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  } as Variants,
};

export default function HeroSection() {
  const [placement, setPlacement] = useState<PlacementType>("center");
  const [theme, setTheme] = useState<ThemeType>("default");

  const nextPlacement = () => {
    const currentIndex = placements.findIndex(
      (p: { type: PlacementType }) => p.type === placement
    );
    const nextIndex = (currentIndex + 1) % placements.length;
    setPlacement(placements[nextIndex].type);
  };

  const placements = [
    { type: "center" as PlacementType, label: "Center Modal", icon: Monitor },
    {
      type: "side-drawer" as PlacementType,
      label: "Side Drawer",
      icon: PanelRight,
    },
  ];

  const currentPlacementInfo = placements.find(
    (p: { type: PlacementType }) => p.type === placement
  )!;
  const CurrentIcon = currentPlacementInfo.icon;
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section>
          <div className="relative pt-24 md:pt-36">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <MovingBorderWrapper
                    duration={4000}
                    borderRadius="9999px"
                    gradientColors={GRADIENT_PRESETS.green}
                    glowIntensity="high"
                    className="inline-flex z-10 relative"
                  >
                    <div className="flex items-center gap-2 bg-white dark:bg-[#011e2b] rounded-full px-5 py-2">
                      <Image
                        src="assets/images/ai-sparkle.svg"
                        alt="AI Sparkle"
                        width={24}
                        height={24}
                      />
                      <p className="text-sm dark:text-white/90">
                        Powerful AI Kit for Shopify Stores
                      </p>
                    </div>
                  </MovingBorderWrapper>
                </AnimatedGroup>

                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="text-gray-700 mx-auto font-bold mb-4 text-4xl sm:text-[50px] dark:text-white/90 sm:leading-[64px] max-w-[700px] mt-10"
                >
                  AI UI Kit and Templates for Tailwind CSS and Figma
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="max-w-[537px] text-center mx-auto dark:text-gray-400 text-gray-500 text-base mt-8"
                >
                  Transform Your Vision into Reality: Unleash Your Creativity
                  and Build Cutting-Edge AI Startups, Tools, and Products with
                  Our Powerful AI Agent UI Kit, Designed to Streamline
                  Development and AI Innovation.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div className="flex items-center justify-center gap-6 mb-6 flex-wrap relative z-40">
                    <div className="flex items-center gap-2">
                      <span className="text-md text-gray-600 dark:text-gray-400">
                        Placement:
                      </span>
                      <Button
                        onClick={nextPlacement}
                        variant="outline"
                        className="justify-center gap-3 border-gray-400 dark:border-gray-500 rounded-full py-5 border-2"
                      >
                        <CurrentIcon className="w-4 h-4" />
                        {currentPlacementInfo.label}
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-md text-gray-600 dark:text-gray-400">
                        Theme:
                      </span>
                      <ThemeDropdown
                        currentTheme={theme}
                        onThemeChange={setTheme}
                      />
                    </div>
                  </div>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 ">
                {/* <div
                  aria-hidden
                  className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                /> */}
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background/30 relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <ChatbotDemo
                    placement={placement}
                    theme={theme}
                    onPlacementChange={setPlacement}
                    onThemeChange={setTheme}
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </>
  );
}
