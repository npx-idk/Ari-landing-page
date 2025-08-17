"use client";

import { useState, useEffect } from "react";
import { Button } from "@ari/ui/components/button";
import { Upload, Brain, Code, CheckCircle, Zap } from "lucide-react";
import { ShineBorder } from "@ari/ui/components/ui/shine-border";
import { AuroraText } from "@ari/ui/components/ui/aurora-text";
import { cn } from "@ari/ui/lib/utils";

export function HowItWorks() {
  const [activeShineIndex, setActiveShineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShineIndex((prev) => (prev + 1) % 3);
    }, 3000); // Increased to 3 seconds for smoother experience

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: Upload,
      title: "Connect & Upload",
      description:
        "Connect your Shopify store and upload your store policies, product data, and brand guidelines. Ari securely imports all your store information.",
      details: [
        "Store policies & FAQs",
        "Product catalogs",
        "Brand guidelines",
        "Customer service scripts",
      ],
    },
    {
      icon: Brain,
      title: "AI Learning",
      description:
        "Ari's advanced AI learns from all your store data, understanding your products, policies, and brand voice to provide accurate customer assistance.",
      details: [
        "Natural language processing",
        "Product knowledge mapping",
        "Policy comprehension",
        "Brand voice adaptation",
      ],
    },
    {
      icon: Code,
      title: "One-Click Deploy",
      description:
        "Add a simple script to your store and you're done! Ari is ready to help your customers with instant, accurate responses 24/7.",
      details: [
        "Single script installation",
        "Instant activation",
        "Real-time assistance",
        "24/7 availability",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get Ari up and running in your store in just 3 simple steps. No
            technical expertise required.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = activeShineIndex === index;

              return (
                <div key={index} className="relative group">
                  {/* Step Card with Shine Border */}
                  <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 h-full border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-[1.02]">
                    {/* Always render ShineBorder but control opacity for smooth transitions */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        transform: isActive ? "scale(1)" : "scale(0.99)",
                        transition:
                          "opacity 1000ms ease-in-out, transform 1000ms ease-in-out",
                      }}
                    >
                      <ShineBorder
                        shineColor={["#4ade80", "#22d3ee", "#059669"]}
                        duration={14}
                        borderWidth={1}
                        className="rounded-2xl"
                      />
                    </div>

                    {/* Content with relative positioning to stay above shine border */}
                    <div className="relative z-10">
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center transition-all duration-500 ${
                            isActive ? "scale-110 shadow-lg" : "scale-100"
                          }`}
                        >
                          <StepIcon className="w-6 h-6 text-white" />
                        </div>
                        <div
                          className={`w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center transition-all duration-500 ${
                            isActive ? "scale-110 shadow-md" : "scale-100"
                          }`}
                        >
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">
                            {index + 1}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <h3
                        className={cn(
                          "text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-500",
                          isActive && "text-primary"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Feature List */}
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                            style={{
                              animationDelay: isActive
                                ? `${detailIndex * 100}ms`
                                : "0ms",
                            }}
                          >
                            <CheckCircle
                              className={`w-4 h-4  mr-2 flex-shrink-0 transition-all duration-300 ${
                                isActive
                                  ? "scale-110 text-primary"
                                  : "scale-100 text-primary-foreground"
                              }`}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}

        </div>
      </div>
    </section>
  );
}
