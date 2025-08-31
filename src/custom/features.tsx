import {
  Code2,
  GaugeCircle,
  MonitorSmartphone,
  Settings2,
  Sparkles,
  Paintbrush,
  Earth,
  Languages,
  ImagePlay,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import React, { ReactNode, memo, useCallback, useState } from "react";
import { AnimatedGroup } from "./motion/animated-group";
import { MagicCard } from "./motion/magic-card";
import { TextEffect } from "./motion/text-effect";
import { CardContent, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";

// ===== CONSTANTS =====
const ICON_CONFIG = {
  sm: { container: "size-8", icon: "size-4" },
  md: { container: "size-12", icon: "size-6" },
  lg: { container: "size-16", icon: "size-8" },
  xl: { container: "size-20", icon: "size-10" },
} as const;

const ICON_VARIANTS = {
  default:
    "bg-white/90 dark:bg-[#011e2b] border-gray-200/30 dark:border-gray-800/30 shadow-sm",
  minimal:
    "bg-white/60 dark:bg-[#011e2b]/60 border-gray-100/20 dark:border-gray-900/20",
  elevated:
    "bg-white dark:bg-[#011e2b] border-gray-200 dark:border-gray-800 shadow-lg drop-shadow-lg dark:drop-shadow-primary/20",
} as const;

const FEATURES = [
  {
    id: "customizable",
    icon: Paintbrush,
    title: "Customizable",
    description:
      "Extensive customization options, allowing you to tailor every aspect of bot to meet your specific needs",
  },
  {
    id: "ai-powered",
    icon: Sparkles,
    title: "Powerful AI underneath",
    description:
      "Our AI is trained to understand your products and customers, and it's always getting smarter",
  },
  {
    id: "multi-lingual",
    icon: Languages,
    title: "Multi-lingual",
    description:
      "Ari can understand and respond in any languages over text and voice",
  },
  {
    id: "multi-media",
    icon: ImagePlay,
    title: "Multi-media",
    description:
      "Designed to understand images, docs and beyond whatever you throw at it",
  },

  {
    id: "responsive",
    icon: MonitorSmartphone,
    title: "Fully Responsive",
    description:
      "Optimized for all devices, ensuring seamless experiences across desktops, tablets, and mobile screens",
  },

  {
    id: "developer-friendly",
    icon: Code2,
    title: "Developer Friendly",
    description:
      "One-click installation, no coding required. Its very easy to get started with AI",
  },
] as const;

// ===== COMPONENTS =====
const IconDecorator = ({
  children,
  size = "md",
  variant = "default",
}: {
  children: ReactNode;
  size?: keyof typeof ICON_CONFIG;
  variant?: keyof typeof ICON_VARIANTS;
}) => {
  const { container, icon } = ICON_CONFIG[size];
  const variantStyles = ICON_VARIANTS[variant];

  return (
    <div
      className={`relative mx-auto ${container} transition-transform duration-200 ease-out
                  hover:scale-110 active:scale-95`}
      role="img"
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 m-auto flex ${icon} items-center justify-center
                    ${variantStyles} backdrop-blur-sm rounded-lg p-5 border
                    transition-all duration-200 ease-out`}
      >
        <div
          className={`${icon} flex items-center justify-center text-gray-700 dark:text-gray-300`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) => (
  <MagicCard className="shadow-zinc-950/5 rounded-lg border transition-all duration-300 hover:shadow-lg min-h-[300px] sm:min-h-[320px] lg:min-h-[280px] flex flex-col justify-center p-4 sm:p-6 h-88">
    <CardHeader className="pb-3 text-center px-0">
      <IconDecorator size="md" variant="elevated">
        <Icon className="size-5 sm:size-6" aria-hidden="true" />
      </IconDecorator>
      <h3 className="mt-4 sm:mt-6 font-medium text-base sm:text-lg text-gray-700 dark:text-white/90 leading-tight">
        {title}
      </h3>
    </CardHeader>
    <CardContent className="flex-1 flex items-center px-0">
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center">
        {description}
      </p>
    </CardContent>
  </MagicCard>
);

const FeaturesHeader = () => (
  <AnimatedGroup
    preset="blur-slide"
    className="text-center"
    viewportBehavior="once"
  >
    <TextEffect
      preset="fade-in-blur"
      per="word"
      as="h2"
      className="text-balance text-4xl font-semibold lg:text-5xl text-gray-700 dark:text-white/90"
      viewportBehavior="once"
    >
      Built to cover your needs
    </TextEffect>
    <TextEffect
      preset="slide"
      per="line"
      delay={0.3}
      as="p"
      className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
      viewportBehavior="once"
    >
      Meet your AI sales assistant. It helps shoppers find the right products,
      follows up on abandoned carts, and answers support questions, so more
      people check out, even when you're off. Learn from customer behavior and
      gently lift order values.
    </TextEffect>
  </AnimatedGroup>
);

// Simple Carousel Component for mobile/tablet
const SimpleCarousel = memo<{
  features: typeof FEATURES;
}>(({ features }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);

  React.useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      setSlidesPerView(width >= 640 && width <= 1024 ? 2 : 1);
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const totalPages = Math.ceil(features.length / slidesPerView);

  React.useEffect(() => {
    const lastPage = Math.max(0, totalPages - 1);
    if (currentIndex > lastPage) setCurrentIndex(lastPage);
  }, [totalPages]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      const lastPage = Math.max(0, totalPages - 1);
      return prev === 0 ? lastPage : prev - 1;
    });
  }, [totalPages]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const lastPage = Math.max(0, totalPages - 1);
      return prev === lastPage ? 0 : prev + 1;
    });
  }, [totalPages]);

  // Auto-scroll functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [goToNext, isAutoPlaying]);

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false); // Pause auto-play on touch
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    // Resume auto-play after 3 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className="relative w-[90vw] mx-auto">
      {/* Card Container */}
      <div
        className="overflow-hidden pt-2 pb-4 px-1"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => {
          goToPrevious();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 3000);
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
        aria-label="Previous feature"
      >
        <ArrowLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      </button>

      <button
        onClick={() => {
          goToNext();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 3000);
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
        aria-label="Next feature"
      >
        <ArrowRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 3000);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex
                ? "bg-primary"
                : "bg-gray-300 dark:bg-gray-600"
            )}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
});
SimpleCarousel.displayName = "SimpleCarousel";

const FeaturesGrid = () => (
  <AnimatedGroup
    preset="scale"
    className="mx-auto mt-8 md:mt-16 grid gap-4 sm:gap-6 
               grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
               max-w-2xs sm:max-w-xl lg:max-w-4xl"
    viewportBehavior="once"
  >
    {FEATURES.map((feature) => (
      <FeatureCard
        key={feature.id}
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
      />
    ))}
  </AnimatedGroup>
);

// ===== MAIN COMPONENT =====
export default function Features() {
  return (
    <section
      id="features"
      className="bg-[#F8FAFC] py-12 sm:py-16 md:py-20 dark:bg-[#111A24]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeaturesHeader />

        {/* Desktop Grid Layout - Hidden on screens smaller than lg */}
        <div className="hidden lg:block">
          <FeaturesGrid />
        </div>

        {/* Mobile/Tablet Carousel Layout - Hidden on lg and larger screens */}
        <div className="lg:hidden w-full px-4 sm:px-6 mt-8 md:mt-16">
          <SimpleCarousel features={FEATURES} />
        </div>
      </div>
    </section>
  );
}
