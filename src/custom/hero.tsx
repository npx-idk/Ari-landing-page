import {
  ChatbotDemo,
  PlacementType,
  ThemeDropdown,
  ThemeType,
} from "@/components/chatbot-demo";
import { LucideIcon, Monitor, PanelRight } from "lucide-react";
import { motion, Variant, Variants } from "motion/react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { AnimatedGroup } from "./motion/animated-group";
import { TextEffect } from "./motion/text-effect";
import { GRADIENT_PRESETS, MovingBorderWrapper } from "./moving-border-wrapper";
import { Button } from "./ui/button";

// ===== TYPES =====
interface PlacementOption {
  type: PlacementType;
  label: string;
  icon: LucideIcon;
}

interface HeroSectionProps {
  initialPlacement?: PlacementType;
  initialTheme?: ThemeType;
  className?: string;
  showControls?: boolean;
}

interface HeroBadgeProps {
  iconSrc: string;
  iconAlt: string;
  text: string;
}

interface ControlSectionProps {
  placement: PlacementType;
  theme: ThemeType;
  onPlacementChange: () => void;
  onThemeChange: (theme: ThemeType) => void;
  placementOptions: readonly PlacementOption[];
}

// ===== CONSTANTS =====
const PLACEMENT_OPTIONS: readonly PlacementOption[] = [
  { type: "center", label: "Center Modal", icon: Monitor },
  { type: "side-drawer", label: "Side Drawer", icon: PanelRight },
] as const;

const ANIMATION_CONFIG = {
  springTransition: {
    type: "spring" as const,
    bounce: 0.3,
    duration: 1.5,
  },
  staggerDelay: 0.05,
  childrenDelay: 0.75,
  auraAnimation: {
    duration: 20,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
} as const;

// ===== ANIMATION VARIANTS =====
const createTransitionVariants = (): Variants => ({
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: ANIMATION_CONFIG.springTransition,
    },
  } as Variant,
});

const createContainerVariants = (): Variants => ({
  container: {
    visible: {
      transition: {
        staggerChildren: ANIMATION_CONFIG.staggerDelay,
        delayChildren: ANIMATION_CONFIG.childrenDelay,
      },
    },
  } as Variant,
  ...createTransitionVariants(),
});

// ===== HOOKS =====
const usePlacementControl = (initialPlacement: PlacementType = "center") => {
  const [placement, setPlacement] = useState<PlacementType>(initialPlacement);

  const cyclePlacement = useCallback(() => {
    setPlacement((current) => {
      const currentIndex = PLACEMENT_OPTIONS.findIndex(
        (p) => p.type === current
      );
      const nextIndex = (currentIndex + 1) % PLACEMENT_OPTIONS.length;
      return PLACEMENT_OPTIONS[nextIndex].type;
    });
  }, []);

  const currentPlacementInfo = useMemo(
    () => PLACEMENT_OPTIONS.find((p) => p.type === placement)!,
    [placement]
  );

  return {
    placement,
    setPlacement,
    cyclePlacement,
    currentPlacementInfo,
  };
};

const useThemeControl = (initialTheme: ThemeType = "default") => {
  const [theme, setTheme] = useState<ThemeType>(initialTheme);

  const handleThemeChange = useCallback((newTheme: ThemeType) => {
    setTheme(newTheme);
  }, []);

  return {
    theme,
    setTheme,
    handleThemeChange,
  };
};

// ===== SUB-COMPONENTS =====
const HeroBadge = ({ iconSrc, iconAlt, text }: HeroBadgeProps) => (
  <AnimatedGroup variants={createTransitionVariants()}>
    <MovingBorderWrapper
      duration={4000}
      borderRadius="9999px"
      gradientColors={GRADIENT_PRESETS.green}
      glowIntensity="high"
      className="inline-flex drop-shadow dark:drop-shadow-primary/20"
    >
      <div className="flex items-center gap-2 bg-white dark:bg-[#011e2b] rounded-full px-5 py-2">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={24}
          height={24}
          priority
          className="flex-shrink-0"
        />
        <p className="text-sm dark:text-white/90 whitespace-nowrap">{text}</p>
      </div>
    </MovingBorderWrapper>
  </AnimatedGroup>
);

const BackgroundAura = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-2/5 left-1/2 w-[80vw] h-[80vw]
             -translate-x-1/2 -translate-y-1/2
             rounded-full blur-[160px]
             bg-[oklch(0.35_0.03_250)] /* very light blackish shadow */
             opacity-6 dark:hidden"
      animate={{
        scale: [1, 1.03, 1],
        y: ["0%", "-1%", "0%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    <motion.div
      className="absolute top-1/2 left-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]
             -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]
             bg-gradient-to-tl from-black/3 via-black/1 to-black/3
             dark:hidden"
      animate={{
        scale: [1, 0.95, 1],
        y: ["-50%", "-51%", "-50%"],
        rotate: [0, 6, 0],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      }}
    />

    {/* ✅ Dark Mode Aura - unchanged */}
    <motion.div
      className="absolute top-2/5 left-1/2 w-[80vw] h-[80vw] -translate-x-1/2 -translate-y-1/2
                 rounded-full blur-[160px] bg-[oklch(0.8254_0.2367_148.368)]
                 opacity-[0.06] hidden dark:block"
      animate={{
        scale: [1, 1.05, 1],
        y: ["0%", "-2%", "0%"],
      }}
      transition={ANIMATION_CONFIG.auraAnimation}
    />

    {/* ✅ Dark Mode Secondary Aura - unchanged */}
    <motion.div
      className="absolute top-1/2 left-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]
                 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]
                 bg-gradient-to-tl from-violet-400/8 via-purple-400/6 to-fuchsia-400/8
                 hidden dark:block"
      animate={{
        scale: [1, 0.88, 1],
        y: ["-50%", "-52%", "-50%"],
        rotate: [0, -10, 0],
      }}
      transition={{
        ...ANIMATION_CONFIG.auraAnimation,
        delay: 3,
      }}
    />
  </div>
);

const HeroContent = () => (
  <>
    <TextEffect
      preset="fade-in-blur"
      speedSegment={0.3}
      as="h1"
      className="text-gray-700 mx-auto font-bold mb-4 text-4xl sm:text-[50px]
                 dark:text-white/90 sm:leading-[64px] max-w-[700px] mt-10"
    >
      AI UI Kit and Templates for Tailwind CSS and Figma
    </TextEffect>

    <TextEffect
      per="line"
      preset="fade-in-blur"
      speedSegment={0.3}
      delay={0.5}
      as="p"
      className="max-w-[537px] text-center mx-auto dark:text-gray-400
                 text-gray-500 text-base mt-8"
    >
      Transform Your Vision into Reality: Unleash Your Creativity and Build
      Cutting-Edge AI Startups, Tools, and Products with Our Powerful AI Agent
      UI Kit, Designed to Streamline Development and AI Innovation.
    </TextEffect>
  </>
);

const ControlSection = ({
  placement,
  theme,
  onPlacementChange,
  onThemeChange,
  placementOptions,
}: ControlSectionProps) => {
  const currentPlacementInfo = useMemo(
    () => placementOptions.find((p) => p.type === placement)!,
    [placement, placementOptions]
  );

  const CurrentIcon = currentPlacementInfo.icon;

  return (
    <AnimatedGroup
      variants={createContainerVariants()}
      className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
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
                       rounded-full py-5 border-2 cursor-pointer
                       hover:bg-primary-foreground/5 dark:hover:bg-accent-foreground/5
                       w-36 transition-colors"
            aria-label={`Switch to next placement. Current: ${currentPlacementInfo.label}`}
          >
            <CurrentIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{currentPlacementInfo.label}</span>
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
    className="relative -z-50"
    variants={createContainerVariants()}
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
export default function HeroSection({
  initialPlacement = "center",
  initialTheme = "default",
  className = "",
  showControls = true,
}: HeroSectionProps = {}) {
  const { placement, setPlacement, cyclePlacement } =
    usePlacementControl(initialPlacement);

  const { theme, setTheme, handleThemeChange } = useThemeControl(initialTheme);

  return (
    <section className={`overflow-hidden ${className} pb-12`}>
      <div className="relative pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
            {/* Hero Badge */}
            <HeroBadge
              iconSrc="/assets/images/ai-sparkle.svg"
              iconAlt="AI Sparkle"
              text="Powerful AI Kit for Shopify Stores"
            />

            {/* Background Aura */}
            <BackgroundAura />

            {/* Main Content */}
            <HeroContent />

            {/* Controls */}
            {showControls && (
              <ControlSection
                placement={placement}
                theme={theme}
                onPlacementChange={cyclePlacement}
                onThemeChange={handleThemeChange}
                placementOptions={PLACEMENT_OPTIONS}
              />
            )}
          </div>
        </div>

        {/* Demo Section */}
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
