"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@ari/ui/components/button";
import {
  MessageSquare,
  ShoppingCart,
  Search,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  Heart,
  Headphones,
} from "lucide-react";
import { cn } from "@ari/ui/lib/utils";
import { BottomCTA } from "./bottom-cta";

export function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      icon: MessageSquare,
      title: "Intelligent Conversations",
      description:
        "Natural language understanding that feels human-like and provides contextual responses.",
      details: [
        "Multi-language support",
        "Context-aware responses",
        "Learning from interactions",
        "Emotional intelligence",
      ],
      color: "green",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: ShoppingCart,
      title: "Smart Product Recommendations",
      description:
        "AI-powered suggestions based on customer preferences, browsing history, and purchase patterns.",
      details: [
        "Personalized suggestions",
        "Cross-sell & upsell",
        "Inventory-aware recommendations",
        "Seasonal & trending products",
      ],
      color: "blue",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Search,
      title: "Advanced Product Search",
      description:
        "Help customers find exactly what they're looking for with intelligent search and filtering.",
      details: [
        "Semantic search understanding",
        "Voice search capabilities",
        "Image-based product search",
        "Filter by specifications",
      ],
      color: "teal",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Round-the-clock customer support that never sleeps, ensuring customers get help anytime.",
      details: [
        "Instant response times",
        "Global timezone support",
        "No waiting queues",
        "Always up-to-date information",
      ],
      color: "indigo",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: BarChart3, value: "300%", label: "Avg. Sales Increase" },
    { icon: Clock, value: "<2s", label: "Response Time" },
    { icon: Globe, value: "25+", label: "Languages Supported" },
  ];

  // Scroll-based highlighting effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollY + windowHeight / 2;

      let newActiveFeature = 0;
      let minDistance = Infinity;

      // Find the active feature (closest to viewport center)
      featureRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const featureCenter = elementTop + rect.height / 2;
          const distance = Math.abs(featureCenter - viewportCenter);

          // Check if feature is in viewport
          const isInViewport = rect.top < windowHeight && rect.bottom > 0;

          if (isInViewport && distance < minDistance) {
            minDistance = distance;
            newActiveFeature = index;
          }
        }
      });

      setActiveFeature(newActiveFeature);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  const scrollToFeature = (index: number) => {
    if (featureRefs.current[index]) {
      const element = featureRefs.current[index]!;
      const elementTop = element.offsetTop;
      const offset = 120; // Offset from top

      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="features" className="py-24 mt-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Modern E-commerce
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ari combines cutting-edge AI technology with practical e-commerce
            solutions to deliver exceptional customer experiences and drive
            sales growth.
          </p>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <StatIcon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div> */}

        {/* Features Two-Panel Layout */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Left Panel - Desktop Only Feature Navigation */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Key Features
              </h3>
              <nav className="space-y-2">
                {features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  const isActive = activeFeature === index;

                  return (
                    <button
                      key={index}
                      onClick={() => scrollToFeature(index)}
                      className={cn(
                        "w-full flex items-center p-4 rounded-xl transition-all duration-300 text-left group relative overflow-hidden",
                        isActive
                          ? `border border-current shadow-sm`
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent"
                      )}
                      style={
                        isActive
                          ? {
                              borderColor: feature.color === "green"
                                ? "rgb(34 197 94)"
                                : feature.color === "blue"
                                  ? "rgb(59 130 246)"
                                  : feature.color === "teal"
                                    ? "rgb(20 184 166)"
                                    : "rgb(34 197 94)",
                            }
                          : undefined
                      }
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-lg mr-4 transition-all duration-300",
                          isActive
                            ? "text-white shadow-md"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                        )}
                        style={isActive ? {
                          backgroundColor: feature.color === "green"
                            ? "rgb(34 197 94)"
                            : feature.color === "blue"
                              ? "rgb(59 130 246)"
                              : feature.color === "teal"
                                ? "rgb(20 184 166)"
                                : feature.color === "indigo"
                                  ? "rgb(99 102 241)"
                                  : "rgb(34 197 94)"
                        } : undefined}
                      >
                        <FeatureIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4
                          className={cn(
                            "font-semibold transition-colors duration-300",
                            isActive
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          )}
                        >
                          {feature.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Panel - Scrollable Feature Details */}
          <div className="lg:col-span-8">
            <div className="space-y-12 lg:space-y-24">
              {features.map((feature, index) => {
                const FeatureIcon = feature.icon;
                const isActive = activeFeature === index;

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      featureRefs.current[index] = el;
                    }}
                    className={cn(
                      "p-6 lg:p-12 rounded-2xl border transition-all duration-500",
                      isActive
                        ? "shadow-lg bg-white dark:bg-gray-800"
                        : "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50",
                      feature.bgColor
                    )}
                    style={
                      isActive
                        ? {
                            borderColor: feature.color === "green"
                              ? "rgb(34 197 94)"
                              : feature.color === "blue"
                                ? "rgb(59 130 246)"
                                : feature.color === "teal"
                                  ? "rgb(20 184 166)"
                                  : "rgb(34 197 94)",
                          }
                        : undefined
                    }
                  >
                    {/* Feature Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6 lg:mb-6">
                      <div
                        className={cn(
                          "flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl mb-4 sm:mb-0 sm:mr-6 self-center transition-all duration-500",
                          isActive
                            ? "text-white shadow-lg"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                        )}
                        style={isActive ? {
                          backgroundColor: feature.color === "green"
                            ? "rgb(34 197 94)"
                            : feature.color === "blue"
                              ? "rgb(59 130 246)"
                              : feature.color === "teal"
                                ? "rgb(20 184 166)"
                                : feature.color === "indigo"
                                  ? "rgb(99 102 241)"
                                  : "rgb(34 197 94)"
                        } : undefined}
                      >
                        <FeatureIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Feature Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                      {feature.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className={cn(
                            "flex items-center p-3 lg:p-4 rounded-lg transition-all duration-300",
                            isActive
                              ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                              : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full mr-3 flex-shrink-0 transition-all duration-300"
                            )}
                            style={{
                              backgroundColor: isActive
                                ? feature.color === "green"
                                  ? "rgb(34 197 94)"
                                  : feature.color === "blue"
                                    ? "rgb(59 130 246)"
                                    : feature.color === "teal"
                                      ? "rgb(20 184 166)"
                                      : "rgb(34 197 94)"
                                : "rgb(156 163 175)",
                            }}
                          />
                          <span className="text-gray-700 dark:text-gray-300 font-medium text-sm lg:text-base">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Call to Action */}
                    {/* <div className="flex items-center justify-center sm:justify-start">
                      <Button
                        variant={isActive ? "default" : "outline"}
                        className={cn(
                          "transition-all duration-300 w-full sm:w-auto"
                        )}
                        style={
                          isActive
                            ? {
                                backgroundColor: feature.color === "green"
                                  ? "rgb(34 197 94)"
                                  : feature.color === "blue"
                                    ? "rgb(59 130 246)"
                                    : feature.color === "teal"
                                      ? "rgb(20 184 166)"
                                      : feature.color === "indigo"
                                        ? "rgb(99 102 241)"
                                        : "rgb(34 197 94)",
                                borderColor: "transparent"
                              }
                            : undefined
                        }
                      >
                        Learn More
                      </Button>
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
