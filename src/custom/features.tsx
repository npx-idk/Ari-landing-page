import {
  Code2,
  GaugeCircle,
  MonitorSmartphone,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";
import { ReactNode } from "react";
import { AnimatedGroup } from "./motion/animated-group";
import { MagicCard } from "./motion/magic-card";
import { TextEffect } from "./motion/text-effect";
import { CardContent, CardHeader } from "./ui/card";

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
    icon: Zap,
    title: "Customizable",
    description:
      "Extensive customization options, allowing you to tailor every aspect to meet your specific needs.",
  },
  {
    id: "control",
    icon: Settings2,
    title: "You have full control",
    description:
      "From design elements to functionality, you have complete control to create a unique and personalized experience.",
  },
  {
    id: "ai-powered",
    icon: Sparkles,
    title: "Powered By AI",
    description:
      "Advanced AI capabilities that adapt to your workflow and enhance productivity across all features.",
  },
  {
    id: "responsive",
    icon: MonitorSmartphone,
    title: "Fully Responsive",
    description:
      "Optimized for all devices, ensuring seamless experiences across desktops, tablets, and mobile screens.",
  },
  {
    id: "performance",
    icon: GaugeCircle,
    title: "Optimized Performance",
    description:
      "Lightweight and fast by design, ensuring quick load times and smooth user interactions without compromise.",
  },
  {
    id: "developer-friendly",
    icon: Code2,
    title: "Developer Friendly",
    description:
      "Built with clean, modular code and modern standards to accelerate development and scale effortlessly.",
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
  <MagicCard className="shadow-zinc-950/5 rounded-lg border transition-all duration-300 hover:shadow-lg min-h-[300px] sm:min-h-[320px] lg:min-h-[280px] flex flex-col justify-center p-4 sm:p-6">
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
     Meet your AI sales assistant. It helps shoppers find the right products, follows up on abandoned carts, and answers support questions, so more people check out, even when you're off. Learn from customer behavior and gently lift order values.
    </TextEffect>
  </AnimatedGroup>
);

const FeaturesGrid = () => (
  <AnimatedGroup
    preset="scale"
    className="mx-auto mt-8 md:mt-16 grid gap-4 sm:gap-6 
               grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
               max-w-sm sm:max-w-2xl lg:max-w-6xl"
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
    <section className="bg-[#F8FAFC] py-12 sm:py-16 md:py-20 dark:bg-[#111A24]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeaturesHeader />
        <FeaturesGrid />
      </div>
    </section>
  );
}
