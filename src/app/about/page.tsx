"use client";

import { useState, useEffect } from "react";
import { Button } from "@ari/ui/components/button";
import { Icons } from "@ari/ui/components/icons";
import {
  Brain,
  Heart,
  Zap,
  Users,
  Target,
  Lightbulb,
  Rocket,
  Star,
  ShoppingCart,
  MessageSquare,
  TrendingUp,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@ari/ui/lib/utils";
import Link from "next/link";
import { TweetCard } from "@ari/ui/components/tweet-card";
import { BottomCTA } from "@/components/bottom-cta";

const stats = [
  { label: "Stores Powered", value: "10K+", icon: ShoppingCart },
  { label: "Conversations", value: "2M+", icon: MessageSquare },
  { label: "Sales Increased", value: "300%", icon: TrendingUp },
  { label: "Countries", value: "50+", icon: Globe },
];

const values = [
  {
    icon: Heart,
    title: "Customer-Centric",
    description:
      "Every feature we build starts with asking: 'How does this help the customer?'",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We push the boundaries of AI to create experiences that feel magical yet practical.",
  },
  {
    icon: Users,
    title: "Partnership",
    description:
      "We see ourselves as partners in your success, not just another tool.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "Beautiful AI means nothing without measurable business impact.",
  },
];

export default function AboutPage() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [daysSinceStart, setDaysSinceStart] = useState(0);

  useEffect(() => {
    // Set your project start date here (when you actually started)
    // Adjust this date to match when you actually began the project
    const startDate = new Date("2025-05-24"); // Replace with your actual start date
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysSinceStart(diffDays);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* <Link
              href="/"
              className="flex items-center space-x-2 justify-center"
            >
              <Icons.logo className="w-8 h-8 text-current" />
            </Link> */}
            <Link href="/">
              <Button variant="default" cta size={"sm"}>
                <ArrowLeft className="w-4 h-4" />
                <Icons.logo className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary border border-gray-200 dark:border-gray-700 rounded-2xl mb-8 mx-auto border-primary-foreground p-6">
            <Icons.logo className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-gray-900 dark:text-white mb-6">
            Meet Ari
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're not just building another chatbot. We're creating the future
            of
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {" "}
              personalized shopping experiences
            </span>
            .
          </p>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                className={cn(
                  "text-center p-6 rounded-2xl transition-all duration-500 cursor-pointer transform",
                  hoveredStat === index 
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 scale-105 shadow-lg" 
                    : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                )}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className={cn(
                  "w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-500",
                  hoveredStat === index 
                    ? "bg-gradient-to-r from-green-400 to-emerald-600 text-white scale-110" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                )}>
                  <StatIcon className="w-6 h-6" />
                </div>
                <div className={cn(
                  "text-2xl md:text-3xl  mb-2 transition-colors duration-300",
                  hoveredStat === index ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"
                )}>
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div> */}

        {/* Mission Statement */}
        {/* <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 md:p-16 mb-20 text-white">
          <h2 className="text-3xl md:text-4xl font-heading  mb-6">
            Our Mission
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl">
            To make every online shopping experience feel like having a
            knowledgeable, caring friend by your side - one who knows exactly
            what you need and is available 24/7 to help you find it.
          </p>
        </div> */}

        {/* Our Story */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-heading  text-gray-900 dark:text-white mb-12">
            Our Story
          </h2>
          <div className="max-w-4xl">
            <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-8">
              <p className="text-xl leading-relaxed">
                <span className="text-2xl">👋</span> It all started just{" "}
                <span className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded text-green-800 dark:text-green-200 ">
                  {daysSinceStart} days ago
                </span>{" "}
                {"with the most innocent conversation you could imagine. We ("}
                <Link
                  href="https://x.com/npx_idk"
                  target="_blank"
                  className="text-primary"
                >
                  {" @npx_idk"}
                </Link>
                {" and "}
                <Link
                  href="https://x.com/hi_adty"
                  target="_blank"
                  className="text-primary"
                >
                  {" @hi_adty "}
                </Link>
                {`) were casually discussing "Hello World" - you know, that classic
                first program every developer writes. We had no idea this simple
                chat would spark something that would consume our nights and
                fuel our dreams.`}
              </p>

              <p className="text-xl leading-relaxed">
                <span className="text-2xl">💡</span> Then came the conversation
                that changed everything. I was talking with{" "}
                <strong className="text-gray-800 dark:text-gray-200">
                  @its_aurelius
                </strong>{" "}
                about something that frustrated us both:{" "}
                <em>
                  "Why are we still clicking around apps like it's 1995? Why
                  can't we just... talk to them?"
                </em>
              </p>

              <p className="text-xl leading-relaxed">
                Picture this: instead of hunting through endless menus, you
                could just say
                <span className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded text-green-800 dark:text-green-200 font-medium">
                  "Show me something red"
                </span>{" "}
                or
                <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-800 dark:text-blue-200 font-medium">
                  "Where's my order?"
                </span>{" "}
                or
                <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-purple-800 dark:text-purple-200 font-medium">
                  "Can I get an exchange for this?"
                </span>
                <br />
                <em>
                  AI wasn't just the future of technology - it was becoming the
                  new UI.
                </em>
              </p>

              {/* <div className="flex flex-row gap-4">
                <TweetCard
                  id="1924917509813371094"
                  className="shadow-lg"
                />
                <TweetCard
                  id="1924918208198578488"
                  className="shadow-lg"
                />
              </div> */}

              <p className="text-xl leading-relaxed">
                <span className="text-2xl">☕</span> That realization hit us
                harder than our Monday morning coffee. What if we built an AI
                shopkeeper? Not just another chatbot that gives robotic
                responses, but something that actually <em>understands</em> what
                people want and helps them every step of the way. No more
                filling out forms in triplicate just to ask "Where's my order?"
                📝
              </p>

              <p className="text-xl leading-relaxed">
                <span className="text-2xl">🚀</span> We decided to start with
                Shopify - partly because it made sense, but mostly because we
                were too excited to wait. We began tweeting our progress daily,
                sharing our wins, our fails, our 2 AM debugging sessions, and
                every small breakthrough that made us do a little victory dance.
              </p>

              <p className="text-xl leading-relaxed">
                <span className="text-2xl">❤️</span> Here's the thing that makes
                us different: we're not chasing crazy money or trying to build
                the next unicorn. We're just two developers who fell in love
                with the idea of making shopping feel like talking to your
                smartest, most helpful friend. The kind of friend who remembers
                you like blue things, knows you're picky about fabric, and can
                find exactly what you're looking for even when you're not sure
                what that is. <span className="text-2xl">🤝</span>
              </p>

              <p className="text-xl leading-relaxed font-medium text-gray-800 dark:text-gray-200">
                <span className="text-2xl">🌟</span> Ari isn't just our product
                - it's our love letter to everyone who's ever felt frustrated
                with online shopping, everyone who's ever wished they could just{" "}
                <em>talk</em> to a store instead of clicking through it.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        {/* <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-heading  text-gray-900 dark:text-white mb-12">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            {values.map((value, index) => {
              const ValueIcon = value.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ValueIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div> */}

        {/* CTA Section */}
        {/* <div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-16 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-heading  text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Store?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              Join thousands of merchants who are already seeing incredible
              results with Ari.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#demo">
                <Button size="lg" className="text-lg">
                  Try Ari Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div> */}
        <BottomCTA />
      </div>
    </div>
  );
}
