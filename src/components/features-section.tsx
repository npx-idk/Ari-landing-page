"use client";

import { Button } from "@ari/ui/components/button";
import { Badge } from "@ari/ui/components/badge";
import { 
  Zap, 
  Shield, 
  Users, 
  Palette, 
  Code, 
  Globe,
  ArrowRight 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed with optimized performance and instant loading times that keep your users engaged.",
    badge: "Performance"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption, SOC 2 compliance, and advanced threat protection.",
    badge: "Security"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Real-time collaboration tools that keep your team in sync, no matter where they are in the world.",
    badge: "Collaboration"
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Stunning, customizable interfaces built with modern design principles and accessibility in mind.",
    badge: "Design"
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Powerful APIs, comprehensive documentation, and developer tools that make integration seamless.",
    badge: "Developer"
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Built to scale globally with CDN distribution, multi-region support, and 99.9% uptime guarantee.",
    badge: "Scale"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="outline" className="mb-4 font-body">
            Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-heading font-normal text-gray-900 dark:text-white mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-body">
            Powerful features designed to help you build, launch, and scale your products with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800/50"
              >
                <div className="mb-6">
                  <Badge variant="secondary" className="mb-4 font-body">
                    {feature.badge}
                  </Badge>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-heading font-normal text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="group px-8 py-6 text-lg font-semibold font-body transition-all duration-200 hover:translate-y-0 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]"
          >
            Explore All Features
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
} 