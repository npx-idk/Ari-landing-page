"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { cn } from "@ari/ui/lib/utils";
import { Header } from "@/custom/header";
import Footer from "@/custom/footer";
import { MagicCard } from "@/custom/motion/magic-card";
import { CardContent, CardHeader } from "@/custom/ui/card";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "idkbyhari@gmail.com",
    description: "Send us an email anytime",
    action: "mailto:idkbyhari@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7337772308",
    description: "Call us for immediate support",
    action: "tel:+917337772308",
  },
  {
    icon: MessageSquare,
    label: "Demo",
    value: "Try Ari Live",
    description: "Experience Ari in action",
    action: "/#demo",
  },
];

const IconDecorator = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="relative mx-auto size-12 transition-transform duration-200 ease-out
                  hover:scale-110 active:scale-95"
      role="img"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 m-auto flex size-6 items-center justify-center
                    bg-white dark:bg-[#011e2b] border-gray-200 dark:border-gray-800 shadow-lg 
                    drop-shadow-lg dark:drop-shadow-primary/20 backdrop-blur-sm rounded-lg p-5 border
                    transition-all duration-200 ease-out"
      >
        <div
          className="size-6 flex items-center justify-center text-gray-700 dark:text-gray-300"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default function ContactPage() {

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-32">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-gray-900 dark:text-white mb-6">
            Let's Talk!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your e-commerce experience? We'd love to hear
            from you.
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {" "}
              Let's build something amazing together!
            </span>
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => {
            const MethodIcon = method.icon;

            return (
              <a
                key={index}
                href={method.action}
                className="block group"
              >
                <MagicCard className="shadow-zinc-950/5 rounded-lg border transition-all duration-300 hover:shadow-lg min-h-[280px] flex flex-col justify-center p-6">
                  <CardHeader className="pb-3 text-center px-0">
                    <IconDecorator>
                      <MethodIcon className="size-5 sm:size-6" aria-hidden="true" />
                    </IconDecorator>
                    <h3 className="mt-6 font-medium text-lg text-gray-700 dark:text-white/90 leading-tight">
                      {method.label}
                    </h3>
                    <p className="text-base font-mono mt-2 text-gray-700 dark:text-gray-300">
                      {method.value}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-center justify-center px-0">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      {method.description}
                    </p>
                  </CardContent>
                </MagicCard>
              </a>
            );
          })}
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
