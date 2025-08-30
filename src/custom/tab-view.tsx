import Image from "next/image";
import React, { useState } from "react";
import { AnimatedGroup } from "./motion/animated-group";
import {
  GRADIENT_PRESETS,
  MovingBorderWrapper,
} from "./motion/moving-border-wrapper";
import { TextEffect } from "./motion/text-effect";
import { Button } from "./ui/button";

// ===== CONSTANTS =====
type TabId = "text" | "image" | "code" | "video" | "email";

const TAB_CONFIG = {
  text: {
    title: "Easiest way to generate text",
    description:
      "Unlock the Potential of Innovation. Discover the Advanced AI Tools Transforming Your Ideas into Reality with Unmatched Precision and Intelligence.",
    icon: "text-generator.svg",
    label: "Text Generator",
  },
  image: {
    title: "Instantly generate stunning visuals",
    description:
      "Bring your creative concepts to life. Our AI can generate high-quality images from simple text descriptions in seconds.",
    icon: "image-generator.svg",
    label: "Image Generator",
  },
  code: {
    title: "Accelerate your development workflow",
    description:
      "Generate clean, efficient code in any language. Let our AI handle the boilerplate so you can focus on solving complex problems.",
    icon: "code-generator.svg",
    label: "Code Generator",
  },
  video: {
    title: "Create engaging videos effortlessly",
    description:
      "Produce professional-quality videos from text scripts or existing content. Perfect for marketing, tutorials, and social media.",
    icon: "video-generator.svg",
    label: "Video Generator",
  },
  email: {
    title: "Craft perfect emails in moments",
    description:
      "Generate compelling email copy for marketing campaigns, newsletters, and professional correspondence that gets results.",
    icon: "email-generator.svg",
    label: "Email Generator",
  },
} as const;

const IMAGE_MAP: Record<TabId, number> = {
  text: 1,
  image: 2,
  code: 3,
  video: 4,
  email: 5,
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
    <Image
      src={`/assets/images/tabs/${config.icon}`}
      width={24}
      height={24}
      className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
      alt={`${config.label} Icon`}
      loading="lazy"
    />
    <span className="hidden sm:inline whitespace-nowrap">{config.label}</span>
    <span className="sm:hidden text-xs whitespace-nowrap truncate">{config.label}</span>
  </Button>
);

const TabContent = ({ activeTab }: { activeTab: TabId }) => {
  const imageIndex = IMAGE_MAP[activeTab];
  const config = TAB_CONFIG[activeTab];

  return (
    <div className="overflow-hidden tab-img-bg rounded-4xl">
      <div className="p-6">
        <div className="p-3 tab-img-overlay">
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcSet={`assets/images/tab-image/tab-image-${imageIndex}-dark.jpg`}
            />
            <img
              src={`assets/images/tab-image/tab-image-${imageIndex}.jpg`}
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
    <TextEffect
      preset="slide"
      per="line"
      delay={0.3}
      as="p"
      className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
      viewportBehavior="once"
    >
      Unlock the Potential of Innovation. Discover the Advanced AI Tools
      Transforming Your Ideas into Reality with Unmatched Precision and
      Intelligence.
    </TextEffect>
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
        preset="scale"
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
      Ready to transform your workflow with AI?
    </TextEffect>

    <TextEffect
      preset="slide"
      per="line"
      delay={0.3}
      as="p"
      className="max-w-xl mx-auto mb-6 text-sm text-gray-500 dark:text-gray-400"
      viewportBehavior="once"
    >
      Start exploring powerful AI tools for content, visuals, code, and more —
      all in one seamless platform. No setup, no hassle.
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
    <section className="py-12 sm:py-14 md:py-20 dark:bg-dark-primary" role="tabpanel">
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
