"use client";

import { cn } from "@/lib/utils";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AnimatedGroup } from "./motion/animated-group";
import { TextEffect } from "./motion/text-effect";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

// Types
interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
}

interface ScrollingColumnProps {
  testimonials: Testimonial[];
  direction: "up" | "down";
  speed: number;
  columnIndex: number;
  className?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "default" | "glass" | "minimal";
}

interface WallOfLoveSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  columns?: number;
  className?: string;
  showHoverHint?: boolean;
}

// Constants
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Marcus Chen",
    role: "Fashion Store Owner",
    image: "/assets/images/users/user-1.png",
    quote:
      "Our AI shopkeeper transformed my boutique completely 🚀 Sales increased 40% in the first month - customers love getting instant product recommendations! 💰",
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Dropshipping Entrepreneur",
    image: "/assets/images/users/user-2.png",
    quote:
      "With zero tech experience, I deployed my AI assistant in minutes ⚡ It handles customer queries 24/7 and my conversion rate doubled compared to before! 📈",
  },
  {
    id: "3",
    name: "David Rodriguez",
    role: "Shopify Plus Developer",
    image: "/assets/images/users/user-3.png",
    quote:
      "Outstanding AI shopkeeper 👏 It's easily the most intelligent customer service solution I've implemented for clients 🎯",
  },
  {
    id: "4",
    name: "Jennifer Park",
    role: "Home Decor Store Owner",
    image: "/assets/images/users/user-4.png",
    quote:
      "I'm fairly new to Shopify and wanted something to help customers find products ✨ This AI assistant is perfect - it answers questions, suggests items, and customers love the voice chat feature! 🛒❤️",
  },
  {
    id: "5",
    name: "Ahmed Hassan",
    role: "Electronics Store Manager",
    image: "/assets/images/users/user-5.png",
    quote:
      "This AI shopkeeper is redefining customer service. Our mobile conversions doubled, and customers constantly praise how quickly they get help finding products.",
  },
  {
    id: "6",
    name: "Lisa Thompson",
    role: "Jewelry Store Owner",
    image: "/assets/images/users/user-6.png",
    quote:
      "I absolutely love this AI assistant! It recommends jewelry perfectly based on photos customers share, and abandoned carts dropped 30% with its follow-up messages.",
  },
  {
    id: "7",
    name: "Roberto Silva",
    role: "Fitness Brand Founder",
    image: "/assets/images/users/user-1.png",
    quote:
      "Using this AI shopkeeper was like discovering a secret weapon for e-commerce. Perfect blend of smart recommendations and 24/7 support - our AOV increased significantly.",
  },
  {
    id: "8",
    name: "Emma Johnson",
    role: "Beauty Store Developer",
    image: "/assets/images/users/user-2.png",
    quote:
      "This AI has revolutionized how I build customer experiences for clients. The multilingual voice support and product matching features save customers time and boost sales.",
  },
  {
    id: "9",
    name: "Omar Al-Rashid",
    role: "Multi-Store Owner",
    image: "/assets/images/users/user-3.png",
    quote:
      "Intelligent, responsive, and works 24/7 - exactly what modern Shopify stores need. I've deployed it across 5 different stores with amazing results.",
  },
  {
    id: "10",
    name: "Maria Gonzalez",
    role: "Handmade Crafts Store Owner",
    image: "/assets/images/users/user-4.png",
    quote:
      "I love this AI shopkeeper ❤️. It perfectly explains my handmade products to customers and helps them find exactly what they're looking for through voice and photo search.",
  },
  {
    id: "11",
    name: "Kevin Mitchell",
    role: "Shopify Expert • Partner",
    image: "/assets/images/users/user-5.png",
    quote:
      "This AI shopkeeper is the perfect solution for store owners who want professional customer service without hiring staff. I recommend it to all my clients.",
  },
  {
    id: "12",
    name: "Priya Patel",
    role: "Sustainable Fashion Store Owner",
    image: "/assets/images/users/user-6.png",
    quote:
      "The AI is so well-designed that even with minimal tech knowledge, I have a smart assistant that reflects my brand values and helps customers perfectly. Simply amazing!",
  },
];

const CARD_VARIANTS = {
  default: {
    card: "group relative overflow-hidden border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/10",
    overlay:
      "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
  },
  glass: {
    card: "group relative overflow-hidden border border-white/10 bg-white/5 dark:bg-gray-900/20 backdrop-blur-md transition-all duration-500 ease-out hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/20",
    overlay:
      "absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
  },
  minimal: {
    card: "group relative overflow-hidden border-0 bg-transparent hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300",
    overlay: "",
  },
} as const;

const COLUMN_HEIGHTS = {
  mobile: "h-[350px]",
  tablet: "sm:h-[450px] md:h-[600px]",
  desktop: "lg:h-[700px]",
} as const;

// Utility functions
const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const generateInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

// Custom hook for responsive behavior
const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

// Custom hook for smooth scrolling animation
const useSmoothScroll = (
  direction: "up" | "down",
  speed: number,
  isPaused: boolean
) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);

  const animate = useCallback(
    (currentTime: number) => {
      if (!scrollRef.current) return;

      const deltaTime = Math.min(currentTime - lastTimeRef.current, 160); // Cap delta time
      lastTimeRef.current = currentTime;

      if (!isPaused && deltaTime > 0) {
        const element = scrollRef.current;
        const maxScroll = element.scrollHeight / 2;

        // Smooth movement calculation
        const movement =
          (direction === "up" ? -speed : speed) * (deltaTime / 16);
        positionRef.current += movement;

        // Seamless loop logic
        if (direction === "up" && positionRef.current <= -maxScroll) {
          positionRef.current = 0;
        } else if (direction === "down" && positionRef.current >= 0) {
          positionRef.current = -maxScroll;
        }

        element.style.transform = `translateY(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [direction, speed, isPaused]
  );

  useEffect(() => {
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return scrollRef;
};

// Testimonial card component
const TestimonialCard = memo<TestimonialCardProps>(
  ({ testimonial, variant = "default" }) => {
    const variantClasses = CARD_VARIANTS[variant];

    return (
      <div className="overflow-hidden rounded-2xl">
        <Card className={variantClasses.card}>
          {variantClasses.overlay && <div className={variantClasses.overlay} />}
          <CardContent className="relative p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="relative flex-shrink-0">
                <Avatar className="w-10 h-10 md:w-12 md:h-12 ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300 group-hover:scale-110">
                  <AvatarImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover"
                    loading="lazy"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary font-semibold text-xs md:text-sm">
                    {generateInitials(testimonial.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm lg:text-base group-hover:text-primary transition-colors duration-300 truncate">
                  {testimonial.name}
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground truncate">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <blockquote className="text-foreground/70 text-xs md:text-sm lg:text-base leading-relaxed line-clamp-6 group-hover:text-foreground/90 transition-colors duration-300">
              "{testimonial.quote}"
            </blockquote>
          </CardContent>
        </Card>
      </div>
    );
  }
);

TestimonialCard.displayName = "TestimonialCard";

// Scrolling column component
const ScrollingColumn = memo<ScrollingColumnProps>(
  ({
    testimonials: columnTestimonials,
    direction,
    speed,
    columnIndex,
    className,
  }) => {
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useSmoothScroll(direction, speed, isPaused);

    const handleMouseEnter = useCallback(() => setIsPaused(true), []);
    const handleMouseLeave = useCallback(() => setIsPaused(false), []);

    return (
      <div
        className={cn(
          "overflow-hidden relative rounded-xl transition-all duration-300 hover:shadow-lg",
          COLUMN_HEIGHTS.mobile,
          COLUMN_HEIGHTS.tablet,
          COLUMN_HEIGHTS.desktop,
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient overlays */}
        <div className="absolute inset-x-0 top-0 h-12 md:h-16 lg:h-20 bg-gradient-to-b from-background via-background/95 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 md:h-16 lg:h-20 bg-gradient-to-t from-background via-background/95 to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex flex-col gap-3 md:gap-4 will-change-transform"
          style={{
            transform: `translateY(${direction === "down" ? "-50%" : "0%"})`,
          }}
        >
          {/* Render testimonials twice for seamless loop */}
          {[...columnTestimonials, ...columnTestimonials].map(
            (testimonial, index) => (
              <TestimonialCard
                key={`${columnIndex}-${testimonial.id}-${index}`}
                testimonial={testimonial}
              />
            )
          )}
        </div>
      </div>
    );
  }
);

ScrollingColumn.displayName = "ScrollingColumn";

// Status indicator component
const StatusIndicator = memo(({ className }: { className?: string }) => (
  <Badge
    variant="secondary"
    className={cn(
      "inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/15 transition-colors duration-200",
      className
    )}
  >
    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
    <span className="text-xs md:text-sm text-muted-foreground">
      Hover over any testimonial to pause and read
    </span>
  </Badge>
));

StatusIndicator.displayName = "StatusIndicator";

// Main component
export const WallOfLoveSection = memo<WallOfLoveSectionProps>(
  ({
    title = "Loved by Shopify Store Owners Worldwide",
    subtitle = "See how ARI AI is transforming businesses and boosting sales. Real stories from real store owners who chose to grow with intelligent automation.",
    testimonials = DEFAULT_TESTIMONIALS,
    columns = 3,
    className,
    showHoverHint = true,
  }) => {
    // Responsive column distribution based on screen size
    const screenSize = useResponsive();

    // Determine number of columns based on screen size
    const getColumnCount = () => {
      switch (screenSize) {
        case "mobile":
          return 1;
        case "tablet":
          return 2;
        case "desktop":
          return columns;
        default:
          return columns;
      }
    };

    const currentColumns = getColumnCount();
    const testimonialsPerColumn = Math.ceil(
      testimonials.length / currentColumns
    );
    const testimonialChunks = chunkArray(testimonials, testimonialsPerColumn);

    // Grid classes based on responsive column count
    const getGridClasses = () => {
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    };

    return (
      <section
        className={cn(
          "relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden",
          className
        )}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header section with TextEffect */}
          <AnimatedGroup
            preset="blur-slide"
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
            viewportBehavior="once"
          >
            <div className="relative inline-block">
              <TextEffect
                as="h2"
                className="text-balance text-4xl font-semibold lg:text-5xl text-gray-700 dark:text-white/90"
                preset="fade-in-blur"
                per="word"
                delay={0.3}
                viewportBehavior="once"
              >
                {title}
              </TextEffect>
              <TextEffect
                as="p"
                className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
                preset="slide"
                per="word"
                viewportBehavior="once"
              >
                {subtitle}
              </TextEffect>
            </div>
          </AnimatedGroup>

          {/* Testimonials grid */}
          <AnimatedGroup
            preset="scale"
            className={cn(
              "grid gap-3 sm:gap-4 md:gap-6 lg:gap-8",
              getGridClasses()
            )}
            viewportBehavior="once"
          >
            {testimonialChunks.map((chunk, index) => (
              <ScrollingColumn
                key={`column-${index}`}
                testimonials={chunk}
                direction={index % 2 === 0 ? "up" : "down"}
                speed={0.5 + index * 0.2}
                columnIndex={index}
                className="w-full"
              />
            ))}
          </AnimatedGroup>

          {/* Status indicator
          {showHoverHint && (
            <AnimatedGroup
              preset="fade"
              className="mt-12 md:mt-16 lg:mt-20 text-center"
              viewportBehavior="once"
            >
              <StatusIndicator />
            </AnimatedGroup>
          )} */}
        </div>
      </section>
    );
  }
);

WallOfLoveSection.displayName = "WallOfLoveSection";

// Variants for different use cases
export const WallOfLoveVariants = {
  Default: WallOfLoveSection,

  // Column variants
  TwoColumns: memo<Omit<WallOfLoveSectionProps, "columns">>((props) => (
    <WallOfLoveSection {...props} columns={2} />
  )),

  FourColumns: memo<Omit<WallOfLoveSectionProps, "columns">>((props) => (
    <WallOfLoveSection {...props} columns={4} />
  )),

  // Style variants
  Minimal: memo<WallOfLoveSectionProps>((props) => (
    <WallOfLoveSection {...props} showHoverHint={false} />
  )),

  // Custom testimonials
  Custom: memo<{
    testimonials: Testimonial[];
    title?: string;
    subtitle?: string;
  }>(({ testimonials, title, subtitle }) => (
    <WallOfLoveSection
      testimonials={testimonials}
      title={title}
      subtitle={subtitle}
    />
  )),
};

// Export types and default testimonials for external use
export { DEFAULT_TESTIMONIALS };
export type { Testimonial, WallOfLoveSectionProps };
export default WallOfLoveSection;
