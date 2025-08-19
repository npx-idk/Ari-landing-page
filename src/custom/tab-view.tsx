import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";
import { GRADIENT_PRESETS, MovingBorderWrapper } from "./moving-border-wrapper";

// Types
type TabId = "text" | "image" | "code" | "video" | "email";

// Static data - extracted to reduce component size
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

// Optimized tab button - removed React.memo as it's often unnecessary overhead for simple components
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
  <button
    onClick={() => onClick(id)}
    className={`flex items-center h-12 gap-2 px-4 py-3 text-sm font-medium rounded-full cursor-pointer transition-colors duration-300 ease-in-out will-change-auto
        ${
          isActive
            ? "bg-white dark:text-white/90 dark:bg-white/10 text-gray-800"
            : "text-gray-500 dark:text-gray-400 bg-transparent hover:bg-neutral-200/60 dark:hover:bg-white/5"
        }`}
    aria-pressed={isActive}
    role="tab"
    type="button"
  >
    <Image
      src={`/assets/images/tabs/${config.icon}`}
      width={34}
      height={34}
      alt={config.label}
    />
    {config.label}
  </button>
);

// Simplified tab content component
const TabContent = ({ activeTab }: { activeTab: TabId }) => {
  // Direct mapping instead of indexOf for better performance
  const imageMap: Record<TabId, number> = {
    text: 1,
    image: 2,
    code: 3,
    video: 4,
    email: 5,
  };

  const imageIndex = imageMap[activeTab];
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

// Main component - simplified and optimized
const TabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("text");
  const activeConfig = TAB_CONFIG[activeTab];

  return (
    <section className="py-14 md:py-20 dark:bg-dark-primary" role="tabpanel">
      <div className="wrapper">
        {/* Header */}
        <header className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl  text-gray-700  dark:text-white/90">
            AI power at your fingertips
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Unlock the Potential of Innovation. Discover the Advanced AI Tools
            Transforming Your Ideas into Reality with Unmatched Precision and
            Intelligence.
          </p>
        </header>

        <div className="max-w-[1008px] mx-auto">
          {/* Tab Navigation */}
          <nav
            className="flex flex-wrap sm:justify-center mx-auto gap-2 p-1 w-full mb-8 dark:bg-white/[0.05] bg-gray-100 rounded-2xl lg:rounded-full max-w-fit"
            role="tablist"
            aria-label="AI Tools Navigation"
          >
            {(
              Object.entries(TAB_CONFIG) as [
                TabId,
                (typeof TAB_CONFIG)[TabId]
              ][]
            ).map(([id, config]) => (
              <TabButton
                key={id}
                id={id}
                isActive={activeTab === id}
                onClick={setActiveTab}
                config={config}
              />
            ))}
          </nav>
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab} // triggers animation on tab change
              className="text-center mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 25 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white/90">
                {activeConfig.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                {activeConfig.description}
              </p>

              {/* Image block */}
              <motion.div
                key={activeTab + "-image"}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <TabContent activeTab={activeTab} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {/* Footer */}
          <footer className="mt-6 text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
              Ready to transform your workflow with AI?
            </h3>

            <p className="max-w-xl mx-auto mb-6 text-sm text-gray-500 dark:text-gray-400">
              Start exploring powerful AI tools for content, visuals, code, and
              more — all in one seamless platform. No setup, no hassle.
            </p>
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
          </footer>
        </div>
      </div>
    </section>
  );
};

export default TabView;
