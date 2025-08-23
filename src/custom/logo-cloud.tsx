import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, useCallback, useState } from "react";
import { AnimatedGroup } from "./motion/animated-group";
import { TextEffect } from "./motion/text-effect";

// Types
interface Company {
  readonly id: string;
  readonly name: string;
  readonly iconPath: string;
}

interface LogoCloudProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly companies?: readonly Company[];
  readonly className?: string;
}

// Default companies data
const DEFAULT_COMPANIES: readonly Company[] = [
  {
    id: "1",
    name: "OpenAI",
    iconPath: "/assets/images/brands/br-1.svg",
  },
  {
    id: "2",
    name: "Vercel",
    iconPath: "/assets/images/brands/br-2.svg",
  },
  {
    id: "3",
    name: "Stripe",
    iconPath: "/assets/images/brands/br-3.svg",
  },
  {
    id: "4",
    name: "Netflix",
    iconPath: "/assets/images/brands/br-4.svg",
  },
  {
    id: "5",
    name: "Google",
    iconPath: "/assets/images/brands/br-5.svg",
  },
  {
    id: "6",
    name: "Anthropic",
    iconPath: "/assets/images/brands/br-6.svg",
  },
  {
    id: "7",
    name: "AWS",
    iconPath: "/assets/images/brands/br-7.svg",
  },
  {
    id: "8",
    name: "PayPal",
    iconPath: "/assets/images/brands/br-1.svg",
  },
  {
    id: "9",
    name: "Spotify",
    iconPath: "/assets/images/brands/br-2.svg",
  },
  {
    id: "10",
    name: "Microsoft",
    iconPath: "/assets/images/brands/br-3.svg",
  },
  {
    id: "11",
    name: "Adobe",
    iconPath: "/assets/images/brands/br-4.svg",
  },
  {
    id: "12",
    name: "Intel",
    iconPath: "/assets/images/brands/br-5.svg",
  },
  {
    id: "13",
    name: "Uber",
    iconPath: "/assets/images/brands/br-6.svg",
  },
  {
    id: "14",
    name: "Airbnb",
    iconPath: "/assets/images/brands/br-7.svg",
  },
  {
    id: "15",
    name: "Slack",
    iconPath: "/assets/images/brands/br-1.svg",
  },
] as const;

// Styles
const styles = {
  section: "bg-[#F8FAFC] h-full py-16 dark:bg-[#111A24]",
  container: "mx-auto max-w-6xl px-6",
  header: "mx-auto mb-12 max-w-2xl text-center md:mb-16",
  title: "text-4xl font-semibold text-balance tracking-tight",
  subtitle: "mt-4 text-lg text-muted-foreground leading-relaxed",
  grid: "grid grid-cols-5 gap-8 items-center justify-items-center",
  logoContainer:
    "group relative h-16 w-16 overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300",
  logoImage: "object-contain transition-all duration-300 invert dark:invert-0",
  errorFallback:
    "h-full w-full bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-xs font-semibold",
} as const;

// Logo image component
const LogoImage = memo<{
  company: Company;
  priority?: boolean;
}>(({ company, priority = false }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (hasError) {
    return (
      <div className={styles.errorFallback} title={company.name}>
        {company.name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className={styles.logoContainer} title={company.name}>
      <Image
        src={company.iconPath}
        alt={`${company.name} logo`}
        fill
        className={cn(
          styles.logoImage,
          isLoaded ? "opacity-70 hover:opacity-100" : "opacity-0"
        )}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        sizes="64px"
        quality={90}
      />
    </div>
  );
});

LogoImage.displayName = "LogoImage";

// Header component
const Header = memo<{
  title: string;
  subtitle: string;
}>(({ title, subtitle }) => (
  <AnimatedGroup
    preset="blur-slide"
    className={styles.header}
    viewportBehavior="once"
  >
    <TextEffect
      preset="fade-in-blur"
      per="word"
      as="h2"
      className="text-balance text-4xl font-semibold lg:text-5xl text-gray-700 dark:text-white/90"
      viewportBehavior="once"
    >
      {title}
    </TextEffect>
    <TextEffect
      preset="slide"
      per="line"
      delay={0.3}
      as="p"
      className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
      viewportBehavior="once"
    >
      {subtitle}
    </TextEffect>
  </AnimatedGroup>
));

Header.displayName = "Header";

// Main LogoCloud component
export const LogoCloud = memo<LogoCloudProps>(
  ({
    title = "Trusted by industry leaders",
    subtitle = "Join thousands of companies that rely on our platform to power their growth and innovation.",
    companies = DEFAULT_COMPANIES,
    className,
  }) => {
    return (
      <section
        className={cn(styles.section, className)}
        aria-labelledby="logo-cloud-title"
      >
        <div className={styles.container}>
          <Header title={title} subtitle={subtitle} />

          <AnimatedGroup
            preset="blur-slide-in-out"
            as="div"
            className={styles.grid}
            viewportBehavior="pulse-loop"
            staggerDelay={0.2}
            aria-label="Company logos"
            duration={3}
          >
            {companies.map((company, index) => (
              <div key={company.id}>
                <LogoImage company={company} />
              </div>
            ))}
          </AnimatedGroup>
        </div>
      </section>
    );
  }
);

LogoCloud.displayName = "LogoCloud";

// Export types
