"use client";

import {
  ChatbotDemo,
  ThemeDropdown,
  placements,
  type PlacementType,
  type ThemeType,
} from "../../components/chatbot-demo";
import Button from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ProductHunt from "../../assets/png/ProductHunt.png";
import ShopifyPartner from "../../assets/png/ShopifyPartner.png";

const HeroSection: React.FC = () => {
  const [placement, setPlacement] = useState<PlacementType>("center");
  const [theme, setTheme] = useState<ThemeType>("default");
  const [bobStyles, setBobStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const generateBobStyle = (): React.CSSProperties => ({
      ["--bob-delay" as any]: `${(Math.random() * 2).toFixed(2)}s`,
      ["--bob-duration" as any]: `${(5 + Math.random() * 4).toFixed(2)}s`,
      ["--bob-x-distance" as any]: `${(Math.random() > 0.5 ? -1 : 1) * Math.round(6 + Math.random() * 14)}px`,
      ["--bob-y-distance" as any]: `${(Math.random() > 0.5 ? -1 : 1) * Math.round(8 + Math.random() * 18)}px`,
    });

    setBobStyles([
      generateBobStyle(),
      generateBobStyle(),
      generateBobStyle(),
      generateBobStyle(),
    ]);
  }, []);

  const nextPlacement = () => {
    const currentIndex = placements.findIndex(
      (p: { type: PlacementType }) => p.type === placement
    );
    const nextIndex = (currentIndex + 1) % placements.length;
    setPlacement(placements[nextIndex].type);
  };

  const currentPlacementInfo = placements.find(
    (p: { type: PlacementType }) => p.type === placement
  )!;
  const CurrentIcon = currentPlacementInfo.icon;

  return (
    <section className="pt-16 relative overflow-hidden">
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float-glow-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          25% {
            transform: translate(15px, -10px) scale(1.05);
            opacity: 0.8;
          }
          50% {
            transform: translate(-10px, 15px) scale(0.98);
            opacity: 0.6;
          }
          75% {
            transform: translate(12px, 8px) scale(1.02);
            opacity: 0.75;
          }
        }

        @keyframes float-glow-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(-12px, 10px) scale(0.96);
            opacity: 0.4;
          }
          50% {
            transform: translate(18px, -12px) scale(1.08);
            opacity: 0.2;
          }
          75% {
            transform: translate(-8px, -5px) scale(1.03);
            opacity: 0.35;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            filter: blur(120px) brightness(1);
          }
          50% {
            filter: blur(140px) brightness(1.1);
          }
        }

        .animated-glow-1 {
          animation:
            float-glow-1 12s ease-in-out infinite,
            pulse-glow 8s ease-in-out infinite;
        }

        .animated-glow-2 {
          animation:
            float-glow-2 15s ease-in-out infinite,
            pulse-glow 10s ease-in-out infinite;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            #7a5af8 0%,
            #7a5af888 20%,
            rgba(122, 90, 248, 0) 60%,
            rgba(122, 90, 248, 0) 100%
          );
          pointer-events: none;
          z-index: 20;
        }

        /* Pointer-like bobbing for hero decorative shapes (randomizable XY) */
        @keyframes pointer-bob-xy {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(
              calc(0.5 * var(--bob-x-distance, 10px)),
              calc(-0.5 * var(--bob-y-distance, 12px))
            );
          }
          50% {
            transform: translate(0, var(--bob-y-distance, 12px));
          }
          75% {
            transform: translate(
              calc(-0.5 * var(--bob-x-distance, 10px)),
              calc(-0.5 * var(--bob-y-distance, 12px))
            );
          }
          100% {
            transform: translate(0, 0);
          }
        }
        :global(.pointer-bob) {
          animation-name: pointer-bob-xy;
          animation-duration: var(--bob-duration, 10.5s);
          animation-delay: var(--bob-delay, 0s);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }
      `}</style>

      <div className="hero-gradient"></div>
      <div className="wrapper">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center pb-16 mt-2">
            <div className="p-[1px] inline-flex rounded-full z-10 relative bg-gradient-to-r from-[#FF58D5] to-[#7A5AF8]">
              <div className="flex items-center gap-2 bg-white dark:bg-[#011e2b] rounded-full px-5 py-2">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.1699 0.58575C14.9429 -0.19525 13.7499 -0.19525 13.5229 0.58575L13.2029 1.69275C12.5109 4.07875 11.5669 5.94175 8.99994 6.58375L7.80794 6.88175C7.63097 6.91697 7.47168 7.01246 7.35721 7.15195C7.24274 7.29144 7.18018 7.4663 7.18018 7.64675C7.18018 7.8272 7.24274 8.00206 7.35721 8.14155C7.47168 8.28104 7.63097 8.37653 7.80794 8.41175L8.99994 8.70975C11.5669 9.35275 12.5109 11.2157 13.2029 13.6007L13.5229 14.7078C13.7499 15.4897 14.9429 15.4897 15.1699 14.7078L15.4899 13.6007C16.1819 11.2157 17.1269 9.35275 19.6939 8.71075L20.8839 8.41175C21.0609 8.37653 21.2202 8.28104 21.3347 8.14155C21.4491 8.00206 21.5117 7.8272 21.5117 7.64675C21.5117 7.4663 21.4491 7.29144 21.3347 7.15195C21.2202 7.01246 21.0609 6.91697 20.8839 6.88175L19.6939 6.58375C17.1269 5.94175 16.1819 4.07875 15.4899 1.69375L15.1699 0.58575Z"
                    fill="url(#paint0_linear_9274_1469)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.28304 11.8368C5.14704 11.3488 4.43104 11.3488 4.29604 11.8368L4.10304 12.5288C3.68805 14.0188 3.12205 15.1838 1.58104 15.5858L0.867045 15.7718C0.759268 15.7971 0.663206 15.8581 0.594451 15.9448C0.525695 16.0316 0.488281 16.1391 0.488281 16.2498C0.488281 16.3605 0.525695 16.4679 0.594451 16.5547C0.663206 16.6415 0.759268 16.7025 0.867045 16.7278L1.58104 16.9148C3.12104 17.3158 3.68805 18.4808 4.10304 19.9708L4.29604 20.6628C4.43104 21.1518 5.14704 21.1518 5.28304 20.6628L5.47605 19.9708C5.89005 18.4808 6.45805 17.3158 7.99804 16.9148L8.71204 16.7278C8.81982 16.7025 8.91588 16.6415 8.98464 16.5547C9.05339 16.4679 9.09081 16.3605 9.09081 16.2498C9.09081 16.1391 9.05339 16.0316 8.98464 15.9448C8.91588 15.8581 8.81982 15.7971 8.71204 15.7718L7.99804 15.5858C6.45805 15.1848 5.89005 14.0198 5.47605 12.5288L5.28304 11.8368Z"
                    fill="url(#paint1_linear_9274_1469)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_9274_1469"
                      x1="7.18018"
                      y1="0"
                      x2="21.5117"
                      y2="15.2943"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF58D5" />
                      <stop offset="1" stopColor="#FFA0E7" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_9274_1469"
                      x1="9.09081"
                      y1="11.4708"
                      x2="0.488281"
                      y2="21.0295"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#7A5AF8" />
                      <stop offset="1" stopColor="#B5A2FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-sm dark:text-white/90">
                  Powerful AI Kit for Shopify Stores
                </p>
              </div>
            </div>
            <h1 className="text-gray-700 mx-auto font-bold mb-4 text-4xl sm:text-[50px] dark:text-white/90 sm:leading-[64px] max-w-[700px] mt-10">
              AI UI Kit and Templates for Tailwind CSS and Figma
            </h1>
            <p className="max-w-[537px] text-center mx-auto dark:text-gray-400 text-gray-500 text-base">
              Transform Your Vision into Reality: Unleash Your Creativity and
              Build Cutting-Edge AI Startups, Tools, and Products with Our
              Powerful AI Agent UI Kit, Designed to Streamline Development and
              AI Innovation.
            </p>
          </div>
        </div>
        <div className="max-w-[1000px] mx-auto relative">
          <div className="flex items-center justify-center gap-6 mb-6 flex-wrap relative z-40">
            <div className="flex items-center gap-2">
              <span className="text-md text-gray-600 dark:text-gray-400">
                Placement:
              </span>
              <Button
                onClick={nextPlacement}
                variant="secondary"
                className="w-full justify-center gap-3 border-gray-400 dark:border-gray-500"
              >
                <CurrentIcon className="w-4 h-4" />
                {currentPlacementInfo.label}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-md text-gray-600 dark:text-gray-400">
                Theme:
              </span>
              <ThemeDropdown currentTheme={theme} onThemeChange={setTheme} />
            </div>
          </div>
          <div className="p-3 sm:p-[18px] relative z-30 rounded-[32px] border border-white/30 dark:border-white/10 bg-white/20">
            <ChatbotDemo
              placement={placement}
              theme={theme}
              onPlacementChange={setPlacement}
              onThemeChange={setTheme}
            />
          </div>
        </div>
      </div>

      {/* Full Width Animated Gradient Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
        <div className="absolute hidden lg:block w-screen h-full left-1/2 top-0 -translate-x-1/2">
          <svg
            className="w-full h-full min-w-[2000px] min-h-[1200px]"
            viewBox="0 0 2000 1200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <g className="animated-glow-1" filter="url(#filter0_f_9279_7148)">
              <circle cx="1000" cy="600" r="300" fill="#4E6EFF" />
            </g>
            <g className="animated-glow-2" filter="url(#filter1_f_9279_7148)">
              <circle cx="600" cy="600" r="300" fill="#FF58D5" />
            </g>
            <defs>
              <filter
                id="filter0_f_9279_7148"
                x="0"
                y="0"
                width="2000"
                height="1200"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="120"
                  result="effect1_foregroundBlur_9279_7148"
                />
              </filter>
              <filter
                id="filter1_f_9279_7148"
                x="0"
                y="0"
                width="2000"
                height="1200"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="120"
                  result="effect1_foregroundBlur_9279_7148"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="hero-glow-bg w-full h-[670px] absolute z-10 bottom-0"></div>
      <div className="wrapper">
        <div className="max-w-[1016px] relative z-30 mx-auto pt-[100px]">
          <p className="text-center text-white/50 text-2xl font-medium">
            As seen on
          </p>
          <div className="flex flex-wrap justify-center items-center gap-7 md:gap-[100px] mt-10 mb-15">
            <img
              src={ProductHunt.src}
              className="w-80 invert cursor-pointer"
              alt=""
            />
            <img
              src={ShopifyPartner.src}
              className="w-80 cursor-pointer"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <img
          src="assets/images/hero/shape-left-1.svg"
          className="absolute top-14 left-16 pointer-bob"
          style={bobStyles[0]}
          alt=""
        />
        <img
          src="assets/images/hero/shape-left-2.svg"
          className="absolute left-[145px] top-[298px] pointer-bob"
          style={bobStyles[1]}
          alt=""
        />
        <img
          src="assets/images/hero/shape-right-1.svg"
          className="absolute right-16 top-[108px] pointer-bob"
          style={bobStyles[2]}
          alt=""
        />
        <img
          src="assets/images/hero/shape-right-2.svg"
          className="absolute top-[316px] right-[298px] pointer-bob"
          style={bobStyles[3]}
          alt=""
        />
      </div>
    </section>
  );
};

export default HeroSection;
