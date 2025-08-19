import {
  Code2,
  GaugeCircle,
  MonitorSmartphone,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { CardContent, CardHeader } from "./ui/card";
import { MagicCard } from "./ui/magic-card";

// Optimized and reusable IconDecorator component
interface IconDecoratorProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "minimal" | "elevated";
  className?: string;
}

const sizeConfig = {
  sm: { container: "size-8", icon: "size-4" },
  md: { container: "size-12", icon: "size-6" },
  lg: { container: "size-16", icon: "size-8" },
  xl: { container: "size-20", icon: "size-10" },
} as const;

const variantConfig = {
  default:
    "bg-white/90 dark:bg-[#011e2b] border-gray-200/30 dark:border-gray-800/30 shadow-sm",
  minimal:
    "bg-white/60 dark:bg-[#011e2b]/60 border-gray-100/20 dark:border-gray-900/20",
  elevated:
    "bg-white dark:bg-[#011e2b] border-gray-200 dark:border-gray-800 shadow-lg drop-shadow-lg dark:drop-shadow-primary/20",
} as const;

const IconDecorator = ({
  children,
  size = "md",
  variant = "default",
  className = "",
}: IconDecoratorProps) => {
  const { container, icon } = sizeConfig[size];
  const variantStyles = variantConfig[variant];

  return (
    <div
      className={`
        relative mx-auto ${container}
        transition-transform duration-200 ease-out
        hover:scale-110 active:scale-95
        ${className}
      `}
      role="img"
      aria-hidden="true"
    >
      <div
        className={`
        absolute inset-0 m-auto flex ${icon} items-center justify-center
        ${variantStyles}
        backdrop-blur-sm rounded-lg p-5 border
        transition-all duration-200 ease-out
      `}
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

// Feature data for better maintainability
const features = [
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

// Optimized FeatureCard component
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  iconSize?: "sm" | "md" | "lg" | "xl";
  iconVariant?: "default" | "minimal" | "elevated";
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  iconSize = "md",
  iconVariant = "default",
}: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <MagicCard
      className="shadow-zinc-950/5 rounded-lg border transition-all duration-300 hover:shadow-lg h-88 flex flex-col justify-center"
      gradientColor="oklch(0.96 0.02 176.5 / 0.1)"
      gradientFrom="oklch(0.74 0.23 176.5)"
      gradientTo="oklch(0.88 0.14 176.5)"
    >
      <CardHeader className="pb-3 text-center">
        <IconDecorator size={iconSize} variant={iconVariant}>
          <Icon className="size-6" aria-hidden="true" />
        </IconDecorator>
        <h3 className="mt-6 font-medium text-lg text-gray-700 dark:text-white/90">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="flex-1 flex items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center">
          {description}
        </p>
      </CardContent>
    </MagicCard>
  </motion.div>
);

// Main Features component
export default function Features() {
  return (
    <section className="bg-[#F8FAFC] h-full py-16 md:py-20 dark:bg-[#111A24]">
      <div className="@container mx-auto max-w-5xl px-6">
        <header className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl  text-gray-700  dark:text-white/90">
            Built to cover your needs
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Unlock the Potential of Innovation. Discover the Advanced AI Tools
            Transforming Your Ideas into Reality with Unmatched Precision and
            Intelligence.
          </p>
        </header>

        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 md:mt-16 h-full">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconVariant="elevated"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
