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
    name: "Jonathan Yombo",
    role: "Software Engineer",
    image: "/assets/images/users/user-1.png",
    quote:
      "Tailus is really extraordinary and very practical, no need to break your head. A real gold mine.",
  },
  {
    id: "2",
    name: "Yves Kalume",
    role: "GDE - Android",
    image: "/assets/images/users/user-2.png",
    quote:
      "With no experience in webdesign I just redesigned my entire website in a few minutes with tailwindcss thanks to Tailus.",
  },
  {
    id: "3",
    name: "Yucel Faruksahan",
    role: "Tailkits Creator",
    image: "/assets/images/users/user-3.png",
    quote:
      "Great work on tailfolio template. This is one of the best personal website that I have seen so far :)",
  },
  {
    id: "4",
    name: "Anonymous author",
    role: "Doing something",
    image: "/assets/images/users/user-4.png",
    quote:
      "I am really new to Tailwind and I want to give a go to make some page on my own. I searched a lot of hero pages and blocks online. However, most of them are not giving me a clear view or needed some HTML/CSS coding background to make some changes from the original or too expensive to have.",
  },
  {
    id: "5",
    name: "Shekinah Tshiokufila",
    role: "Senior Software Engineer",
    image: "/assets/images/users/user-5.png",
    quote:
      "Tailus is redefining the standard of web design, with these blocks it provides an easy and efficient way for those who love beauty but may lack the time to implement it.",
  },
  {
    id: "6",
    name: "Oketa Fred",
    role: "Fullstack Developer",
    image: "/assets/images/users/user-6.png",
    quote:
      "I absolutely love Tailus! The component blocks are beautifully designed and easy to use, which makes creating a great-looking website a breeze.",
  },
  {
    id: "7",
    name: "Zeki",
    role: "Founder of ChatExtend",
    image: "/assets/images/users/user-1.png",
    quote:
      "Using TailsUI has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility.",
  },
  {
    id: "8",
    name: "Joseph Kitheka",
    role: "Fullstack Developer",
    image: "/assets/images/users/user-2.png",
    quote:
      "Tailus has transformed the way I develop web applications. Their extensive collection of UI components has significantly accelerated my workflow.",
  },
  {
    id: "9",
    name: "Khatab Wedaa",
    role: "MerakiUI Creator",
    image: "/assets/images/users/user-3.png",
    quote:
      "Tailus is an elegant, clean, and responsive tailwind css components it's very helpful to start fast with your project.",
  },
  {
    id: "10",
    name: "Rodrigo Aguilar",
    role: "TailwindAwesome Creator",
    image: "/assets/images/users/user-4.png",
    quote:
      "I love Tailus ❤️. The component blocks are well-structured, simple to use, and beautifully designed.",
  },
  {
    id: "11",
    name: "Eric Ampire",
    role: "Mobile Engineer • Google Dev Expert",
    image: "/assets/images/users/user-5.png",
    quote:
      "Tailus templates are the perfect solution for anyone who wants to create a beautiful and functional website without any web design experience.",
  },
  {
    id: "12",
    name: "Roland Tubonge",
    role: "Software Engineer",
    image: "/assets/images/users/user-6.png",
    quote:
      "Tailus is so well designed that even with a very poor knowledge of web design you can do miracles. Let yourself be seduced!",
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
  mobile: "h-[400px]",
  tablet: "md:h-[600px]",
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
    title = "Loved by the Community",
    subtitle = "Unlock the Potential of Innovation. Discover the Advanced AI Tools Transforming Your Ideas into Reality with Unmatched Precision and Intelligence.",
    testimonials = DEFAULT_TESTIMONIALS,
    columns = 3,
    className,
    showHoverHint = true,
  }) => {
    // Responsive column distribution
    const testimonialsPerColumn = Math.ceil(testimonials.length / columns);
    const testimonialChunks = chunkArray(testimonials, testimonialsPerColumn);

    // Grid classes based on column count
    const getGridClasses = () => {
      switch (columns) {
        case 2:
          return "grid-cols-1 md:grid-cols-2";
        case 4:
          return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
        default:
          return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      }
    };

    return (
      <section
        className={cn(
          "relative py-12 md:py-20 lg:py-32 overflow-hidden",
          className
        )}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header section with TextEffect */}
          <AnimatedGroup
            preset="blur-slide"
            className="text-center mb-12 md:mb-16 lg:mb-20"
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
            className={cn("grid gap-4 md:gap-6 lg:gap-8", getGridClasses())}
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

          {/* Status indicator */}
          {showHoverHint && (
            <AnimatedGroup
              preset="fade"
              className="mt-12 md:mt-16 lg:mt-20 text-center"
              viewportBehavior="once"
            >
              <StatusIndicator />
            </AnimatedGroup>
          )}
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
