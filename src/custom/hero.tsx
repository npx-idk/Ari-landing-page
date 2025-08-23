import {
  ChatbotDemo,
  PlacementType,
  ThemeDropdown,
  ThemeType,
} from "@/components/chatbot-demo";
import { Monitor, PanelRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { AnimatedGroup } from "./motion/animated-group";
import {
  GRADIENT_PRESETS,
  MovingBorderWrapper,
} from "./motion/moving-border-wrapper";
import { TextEffect } from "./motion/text-effect";
import { Button } from "./ui/button";

// ===== CONSTANTS =====
const PLACEMENT_OPTIONS = [
  { type: "center" as const, label: "Center Modal", icon: Monitor },
  { type: "side-drawer" as const, label: "Side Drawer", icon: PanelRight },
];

// ===== COMPONENTS =====
const HeroBadge = () => (
  <AnimatedGroup preset="blur-slide" viewportBehavior="once">
    <MovingBorderWrapper
      duration={4000}
      borderRadius="9999px"
      gradientColors={GRADIENT_PRESETS.green}
      glowIntensity="high"
      size="xl"
      borderWidth="1px"
      className="inline-flex drop-shadow dark:drop-shadow-primary/20"
    >
      <div className="flex items-center gap-2 bg-white dark:bg-[#011e2b] rounded-full px-5 py-2">
        <Image
          src="/assets/images/ai-sparkle.svg"
          alt="AI Sparkle"
          width={24}
          height={24}
          className="flex-shrink-0"
          loading="lazy"
        />
        <p className="text-sm dark:text-white/90 whitespace-nowrap">
          Powerful AI Kit for Shopify Stores
        </p>
      </div>
    </MovingBorderWrapper>
  </AnimatedGroup>
);

const BackgroundAura = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Light Mode Auras - Static */}
    <div
      className="absolute top-2/5 left-1/2 w-[80vw] h-[80vw]
                 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]
                 bg-[oklch(0.35_0.03_250)] opacity-6 dark:hidden"
    />

    <div
      className="absolute top-1/2 left-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]
                 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]
                 bg-gradient-to-tl from-black/3 via-black/1 to-black/3 dark:hidden"
    />

    {/* Dark Mode Auras - Static */}
    <div
      className="absolute top-2/5 left-1/2 w-[80vw] h-[80vw] -translate-x-1/2 -translate-y-1/2
                 rounded-full blur-[160px] bg-[oklch(0.8254_0.2367_148.368)]
                 opacity-[0.06] hidden dark:block"
    />

    <div
      className="absolute top-1/2 left-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]
                 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]
                 bg-gradient-to-tl from-violet-400/8 via-purple-400/6 to-fuchsia-400/8
                 hidden dark:block"
    />
  </div>
);

const HeroContent = () => (
  <AnimatedGroup preset="blur-slide" viewportBehavior="once">
    <TextEffect
      preset="fade-in-blur"
      per="word"
      as="h1"
      className="text-gray-700 mx-auto font-bold mb-4 text-4xl sm:text-[50px]
                 dark:text-white/90 sm:leading-[64px] max-w-[700px] mt-10"
      viewportBehavior="once"
    >
      AI UI Kit and Templates for Tailwind CSS and Figma
    </TextEffect>

    <TextEffect
      preset="slide"
      per="line"
      delay={0.3}
      as="p"
      className="max-w-[537px] text-center mx-auto dark:text-gray-400
                 text-gray-500 text-base mt-8"
      viewportBehavior="once"
    >
      Transform Your Vision into Reality: Unleash Your Creativity and Build
      Cutting-Edge AI Startups, Tools, and Products with Our Powerful AI Agent
      UI Kit, Designed to Streamline Development and AI Innovation.
    </TextEffect>
  </AnimatedGroup>
);

const ControlSection = ({
  placement,
  theme,
  onPlacementChange,
  onThemeChange,
}: {
  placement: PlacementType;
  theme: ThemeType;
  onPlacementChange: () => void;
  onThemeChange: (theme: ThemeType) => void;
}) => {
  const currentOption = PLACEMENT_OPTIONS.find((p) => p.type === placement)!;
  const CurrentIcon = currentOption.icon;

  return (
    <AnimatedGroup
      preset="scale"
      className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
      viewportBehavior="once"
    >
      <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
        {/* Placement Control */}
        <div className="flex items-center gap-2">
          <span className="text-md text-gray-600 dark:text-gray-400">
            Placement:
          </span>
          <Button
            onClick={onPlacementChange}
            variant="outline"
            className="justify-center gap-3 border-gray-400 dark:border-gray-500
                       rounded-full py-5 border-2 hover:bg-primary-foreground/5
                       dark:hover:bg-accent-foreground/5 w-36 transition-colors cursor-pointer"
            aria-label={`Switch to next placement. Current: ${currentOption.label}`}
          >
            <CurrentIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{currentOption.label}</span>
          </Button>
        </div>

        {/* Theme Control */}
        <div className="flex items-center gap-2">
          <span className="text-md text-gray-600 dark:text-gray-400">
            Theme:
          </span>
          <ThemeDropdown currentTheme={theme} onThemeChange={onThemeChange} />
        </div>
      </div>
    </AnimatedGroup>
  );
};

const DemoSection = ({
  placement,
  theme,
  onPlacementChange,
  onThemeChange,
}: {
  placement: PlacementType;
  theme: ThemeType;
  onPlacementChange: (placement: PlacementType) => void;
  onThemeChange: (theme: ThemeType) => void;
}) => (
  <AnimatedGroup
    preset="blur-slide"
    className="relative -z-50"
    viewportBehavior="once"
  >
    <div className="-mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12">
      <div
        className="inset-shadow-2xs ring-background dark:inset-shadow-white/20
                   bg-background/30 relative mx-auto max-w-6xl overflow-hidden
                   rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1"
      >
        <ChatbotDemo
          placement={placement}
          theme={theme}
          onPlacementChange={onPlacementChange}
          onThemeChange={onThemeChange}
        />
      </div>
    </div>
  </AnimatedGroup>
);

// ===== MAIN COMPONENT =====
export default function HeroSection() {
  const [placement, setPlacement] = useState<PlacementType>("center");
  const [theme, setTheme] = useState<ThemeType>("default");

  const cyclePlacement = useCallback(() => {
    setPlacement((current) => {
      const currentIndex = PLACEMENT_OPTIONS.findIndex(
        (p) => p.type === current
      );
      const nextIndex = (currentIndex + 1) % PLACEMENT_OPTIONS.length;
      return PLACEMENT_OPTIONS[nextIndex].type;
    });
  }, []);

  const handleThemeChange = useCallback((newTheme: ThemeType) => {
    setTheme(newTheme);
  }, []);

  return (
    <section className="overflow-hidden pb-12">
      <div className="relative pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
            <HeroBadge />
            <BackgroundAura />
            <HeroContent />
            <ControlSection
              placement={placement}
              theme={theme}
              onPlacementChange={cyclePlacement}
              onThemeChange={handleThemeChange}
            />
          </div>
        </div>

        <DemoSection
          placement={placement}
          theme={theme}
          onPlacementChange={setPlacement}
          onThemeChange={setTheme}
        />
      </div>
    </section>
  );
}
