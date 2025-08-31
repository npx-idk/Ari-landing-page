import React, { useState } from "react";
import { AnimatedGroup } from "./motion/animated-group";
import {
  GRADIENT_PRESETS,
  MovingBorderWrapper,
} from "./motion/moving-border-wrapper";
import { TextEffect } from "./motion/text-effect";
import { Button } from "./ui/button";
import {
  ChartArea,
  Code,
  Computer,
  FileText,
  Image as ImageIcon,
  Mail,
  MessageCircleMore,
  PhoneCall,
  SprayCan,
  Video,
  type LucideIcon,
} from "lucide-react";

// ===== CONSTANTS =====
type TabId = "text" | "image" | "code" | "video" | "email";

const TAB_CONFIG = {
  text: {
    title: "Track Your AI Shopkeeper's Performance in Real-Time",
    description:
      "Monitor conversations, analyze sales impact, and optimize your AI assistant's performance with detailed analytics. See exactly how your AI shopkeeper is boosting conversions and growing your revenue",
    icon: "text-generator.svg",
    label: "Analytics Dashboard",
  },
  image: {
    title: "Monitor Live Conversations and Customer Interests",
    description:
      "See what customers are asking about, track product interests, and discover trending queries in real-time. Gain valuable insights into customer behavior and optimize your inventory based on actual demand.",
    icon: "image-generator.svg",
    label: "Conversation Monitoring",
  },
  code: {
    title: "Customize Every Detail with Our Visual Canvas Editor",
    description:
      "Design your AI shopkeeper's appearance, behavior, and responses with complete creative control. From colors and fonts to conversation flows - make it perfectly match your brand identity.",
    icon: "code-generator.svg",
    label: "Customizable Canvas",
  },
  video: {
    title: "Replace Expensive Support with Multilingual AI Voice Calls",
    description:
      "Handle customer inquiries in any language through natural voice conversations that feel completely human. Cut support costs while providing instant, 24/7 assistance that never puts customers on hold.",
    icon: "video-generator.svg",
    label: "AI voice call",
  },
  email: {
    title: "Test and Integrate Your AI Chatbot APIs Anywhere",
    description:
      "Experiment with chatbot responses in our interactive API playground before going live. Seamlessly integrate your AI assistant into any platform, website, or app with our flexible APIs.",
    icon: "email-generator.svg",
    label: "API Playground",
  },
} as const;

const IMAGE_MAP: Record<TabId, number> = {
  text: 1,
  image: 2,
  code: 3,
  video: 4,
  email: 5,
};

const ICON_MAP: Record<TabId, LucideIcon> = {
  text: ChartArea,
  image: MessageCircleMore,
  code: SprayCan,
  video: PhoneCall,
  email: Computer,
};

// ===== COMPONENTS =====
const TabButton = ({
  id,
  isActive,
  onClick,
  config,
}: {
  id: TabId;
  isActive: boolean;
  onClick: (id: TabId) => void;
  config: (typeof TAB_CONFIG)[TabId];
}) => (
  <Button
    onClick={() => onClick(id)}
    className={`flex items-center h-10 sm:h-12 gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 
                text-xs sm:text-sm font-medium rounded-full cursor-pointer 
                transition-colors duration-300 ease-in-out will-change-auto min-w-0
               ${
                 isActive
                   ? "bg-white/80 text-gray-800 hover:bg-white dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/20"
                   : "text-gray-500 dark:text-gray-400 bg-transparent hover:bg-neutral-200/60 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white/80"
               }`}
    aria-selected={isActive}
    role="tab"
    type="button"
  >
    {(() => {
      const Icon = ICON_MAP[id];
      return (
        <Icon
          className={`w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 text-primary`}
          strokeWidth={isActive ? 3 : 2}
          aria-hidden="true"
        />
      );
    })()}
    <span className="hidden sm:inline whitespace-nowrap">{config.label}</span>
    <span className="sm:hidden text-xs whitespace-nowrap truncate">
      {config.label}
    </span>
  </Button>
);

const TabContent = ({ activeTab }: { activeTab: TabId }) => {
  const imageIndex = IMAGE_MAP[activeTab];
  const config = TAB_CONFIG[activeTab];

  return (
    <div className="overflow-hidden tab-img-bg rounded-4xl bg-gradient-to-b from-primary to-background dark:from-dark-primary to-dark-secondary">
      <div className="p-0.5">
        <div className="p-3 tab-img-overlay">
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcSet={`assets/images/tab-image/tab-image-${imageIndex}-dark.png`}
            />
            <img
              src={`assets/images/tab-image/tab-image-${imageIndex}.png`}
              alt={`${config.title} interface preview`}
              className="w-full rounded-2xl"
              loading="lazy"
              width={960}
              height={600}
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

const TabHeader = () => (
  <AnimatedGroup
    preset="blur-slide"
    className="max-w-2xl mx-auto mb-12 text-center"
    viewportBehavior="once"
  >
    <TextEffect
      preset="fade-in-blur"
      per="word"
      as="h2"
      className="text-balance text-4xl font-semibold lg:text-5xl text-gray-700 dark:text-white/90"
      viewportBehavior="once"
    >
      AI power at your fingertips
    </TextEffect>
    {/* <TextEffect
      preset="slide"
      per="line"
      delay={0.3}
      as="p"
      className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
      viewportBehavior="once"
    >
      Packed with advanced analytics, conversation monitoring, customizable
      canvas, and automation tools for complete control over customer
      interactions. Transform your store into a data-driven sales machine with
      insights and AI power all in one dashboard.
    </TextEffect> */}
  </AnimatedGroup>
);

const TabNavigation = ({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}) => (
  <AnimatedGroup preset="scale" viewportBehavior="once">
    <nav
      className="flex flex-wrap justify-center mx-auto gap-1 sm:gap-2 p-1 w-full mb-6 sm:mb-8
                 dark:bg-white/[0.05] bg-gray-100 rounded-xl sm:rounded-2xl lg:rounded-full 
                 max-w-full sm:max-w-fit overflow-x-auto"
      role="tablist"
      aria-label="AI Tools Navigation"
    >
      {(
        Object.entries(TAB_CONFIG) as [TabId, (typeof TAB_CONFIG)[TabId]][]
      ).map(([id, config]) => (
        <TabButton
          key={id}
          id={id}
          isActive={activeTab === id}
          onClick={onTabChange}
          config={config}
        />
      ))}
    </nav>
  </AnimatedGroup>
);

const TabContentSection = ({ activeTab }: { activeTab: TabId }) => {
  const activeConfig = TAB_CONFIG[activeTab];

  return (
    <AnimatedGroup
      preset="blur-slide"
      className="text-center mb-6 sm:mb-8 px-4"
      viewportBehavior="immediate"
      key={`content-${activeTab}`} // Force re-mount and re-animate on tab change
    >
      <TextEffect
        preset="fade-in-blur"
        per="word"
        as="h3"
        className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white/90"
        viewportBehavior="immediate"
      >
        {activeConfig.title}
      </TextEffect>
      <TextEffect
        preset="slide"
        per="line"
        delay={0.2}
        as="p"
        className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
        viewportBehavior="immediate"
      >
        {activeConfig.description}
      </TextEffect>

      <AnimatedGroup
        preset="blur-slide-in-out"
        className="mt-4 sm:mt-6"
        viewportBehavior="immediate"
        key={`image-${activeTab}`} // Force re-animate on tab change
      >
        <TabContent activeTab={activeTab} />
      </AnimatedGroup>
    </AnimatedGroup>
  );
};

const TabFooter = () => (
  <AnimatedGroup
    preset="blur-slide"
    className="mt-6 text-center"
    viewportBehavior="once"
  >
    <TextEffect
      preset="fade-in-blur"
      per="word"
      as="h3"
      className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90"
      viewportBehavior="once"
    >
      Ready to transform your store with AI?
    </TextEffect>

    <TextEffect
      preset="slide"
      per="line"
      delay={0.3}
      as="p"
      className="max-w-xl mx-auto mb-6 text-sm text-gray-500 dark:text-gray-400"
      viewportBehavior="once"
    >
      Start exploring powerful AI tools for ai chatbot, ai voice call, analytics
      dashboard, and more — all in one seamless platform. No setup, no hassle.
    </TextEffect>

    <MovingBorderWrapper
      duration={4000}
      borderRadius="9999px"
      gradientColors={GRADIENT_PRESETS.green}
      glowIntensity="high"
      className="inline-flex drop-shadow dark:drop-shadow-primary/20 cursor-pointer"
    >
      <div className="flex items-center gap-2 bg-white dark:bg-[#011e2b] rounded-full px-5 py-2">
        <p className="text-sm dark:text-white/90 whitespace-nowrap">
          Try it now for free
        </p>
      </div>
    </MovingBorderWrapper>
  </AnimatedGroup>
);

// ===== MAIN COMPONENT =====
const TabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("text");

  return (
    <section
      className="py-12 sm:py-14 md:py-20 dark:bg-dark-primary"
      role="tabpanel"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TabHeader />

        <div className="max-w-[1008px] mx-auto">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <TabContentSection activeTab={activeTab} />
          <TabFooter />
        </div>
      </div>
    </section>
  );
};

export default TabView;
