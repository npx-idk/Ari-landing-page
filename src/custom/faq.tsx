"use client";

import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import Link from "next/link";
import { memo } from "react";
import { AnimatedGroup } from "./motion/animated-group";
import { TextEffect } from "./motion/text-effect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

// Types
interface FAQItem {
  readonly id: string;
  readonly icon: IconName;
  readonly question: string;
  readonly answer: string;
}

// Constants
const FAQ_ITEMS: readonly FAQItem[] = [
  {
    id: "item-1",
    icon: "clock",
    question:
      "How quickly can I set up the Ari AI shopkeeper on my Shopify store?",
    answer:
      "Setup takes just 5 minutes! Simply install our app from the Shopify App Store, connect your store data, and your AI assistant will be live and ready to help customers immediately.",
  },
  {
    id: "item-2",
    icon: "languages",
    question: "Does the AI shopkeeper work in languages other than English?",
    answer:
      "Yes, Ari can work in any language you want. It automatically adapts according to your customers' language.",
  },
  {
    id: "item-3",
    icon: "store",
    question:
      "Will the AI shopkeeper understand my specific products and store policies?",
    answer:
      "Absolutely! Ari learns about your entire product catalog, store policies, shipping information, and brand voice. It provides accurate recommendations and answers based on your specific inventory and business rules.",
  },
  {
    id: "item-4",
    icon: "bot-message-square",
    question: "What happens if the AI can't answer a customer's question?",
    answer:
      "When the AI encounters complex issues beyond its scope, it seamlessly transfers the conversation to your team with full context. You can also set custom escalation rules and the AI will notify you of urgent matters in real-time.",
  },
  {
    id: "item-5",
    icon: "headset",
    question: "Is customer support available if I need help?",
    answer:
      "Yes! Our customer support team is available 24/7 to assist you with setup, customization, or any questions. We're here to ensure your AI shopkeeper works perfectly for your business.",
  },
] as const;

// Consolidated styles
const STYLES = {
  section: "py-12 sm:py-16 md:py-20 bg-[#F8FAFC] dark:bg-[#111A24]",
  container: "mx-auto max-w-7xl px-4 sm:px-6",
  layout: "flex flex-col gap-8 sm:gap-10 md:flex-row md:gap-16",
  sidebar: "md:w-1/3",
  stickyContent: "md:sticky md:top-20",
  title: "mt-4 text-2xl sm:text-3xl font-bold",
  description: "text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base",
  link: "text-[#008A5B] dark:text-primary font-medium hover:underline",
  content: "md:w-2/3",
  accordion: "w-full space-y-2 sm:space-y-3",
  item: "bg-background shadow-xs rounded-lg border px-3 sm:px-4 last:border-b",
  trigger: "cursor-pointer items-center py-4 sm:py-5 hover:no-underline",
  triggerContent: "flex items-center gap-2 sm:gap-3",
  iconContainer: "flex size-5 sm:size-6",
  icon: "m-auto size-3 sm:size-4",
  question: "text-sm sm:text-base",
  answerContainer: "pb-4 sm:pb-5",
  answerContent: "px-7 sm:px-9",
  answer: "text-sm sm:text-base",
} as const;

// Memoized components
const FAQItemComponent = memo<{ item: FAQItem }>(({ item }) => (
  <AccordionItem key={item.id} value={item.id} className={STYLES.item}>
    <AccordionTrigger className={STYLES.trigger}>
      <div className={STYLES.triggerContent}>
        <div className={STYLES.iconContainer}>
          <DynamicIcon name={item.icon} className={STYLES.icon} />
        </div>
        <span className={STYLES.question}>{item.question}</span>
      </div>
    </AccordionTrigger>
    <AccordionContent className={STYLES.answerContainer}>
      <div className={STYLES.answerContent}>
        <p className={STYLES.answer}>{item.answer}</p>
      </div>
    </AccordionContent>
  </AccordionItem>
));
FAQItemComponent.displayName = "FAQItemComponent";

const FAQSidebar = memo(() => (
  <div className={STYLES.sidebar}>
    <div className={STYLES.stickyContent}>
      <AnimatedGroup
        preset="blur-slide"
        className="space-y-4"
        viewportBehavior="once"
      >
        <TextEffect
          as="h2"
          className={STYLES.title}
          preset="fade-in-blur"
          per="word"
          viewportBehavior="once"
        >
          Frequently Asked Questions
        </TextEffect>

        <p className={STYLES.description}>
          <TextEffect
            as="span"
            preset="slide"
            per="word"
            viewportBehavior="once"
          >
            Can't find what you're looking for? Contact our
          </TextEffect>{" "}
          <Link href="mailTo:support@getari.co" className={STYLES.link}>
            <TextEffect
              per="line"
              as="span"
              preset="slide"
              viewportBehavior="once"
              delay={1}
              className="inline-block hover:underline whitespace-nowrap"
            >
              customer support team
            </TextEffect>
          </Link>
        </p>
      </AnimatedGroup>
    </div>
  </div>
));
FAQSidebar.displayName = "FAQSidebar";

const FAQContent = memo(() => (
  <div className={STYLES.content}>
    <AnimatedGroup preset="scale" viewportBehavior="once">
      <Accordion type="single" collapsible className={STYLES.accordion}>
        {FAQ_ITEMS.map((item) => (
          <FAQItemComponent key={item.id} item={item} />
        ))}
      </Accordion>
    </AnimatedGroup>
  </div>
));
FAQContent.displayName = "FAQContent";

// Main component
const OptimizedFAQs = () => {
  return (
    <section id="about" className={STYLES.section}>
      <div className={STYLES.container}>
        <div className={STYLES.layout}>
          <FAQSidebar />
          <FAQContent />
        </div>
      </div>
    </section>
  );
};

// Add display name for better debugging
OptimizedFAQs.displayName = "OptimizedFAQs";

export default memo(OptimizedFAQs);
