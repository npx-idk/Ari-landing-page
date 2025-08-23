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
    question: "What are your business hours?",
    answer:
      "Our customer service team is available Monday through Friday from 9:00 AM to 8:00 PM EST, and weekends from 10:00 AM to 6:00 PM EST. During holidays, hours may vary and will be posted on our website.",
  },
  {
    id: "item-2",
    icon: "credit-card",
    question: "How do subscription payments work?",
    answer:
      "Subscription payments are automatically charged to your default payment method on the same day each month or year, depending on your billing cycle. You can update your payment information and view billing history in your account dashboard.",
  },
  {
    id: "item-3",
    icon: "truck",
    question: "Can I expedite my shipping?",
    answer:
      "Yes, we offer several expedited shipping options at checkout. Next-day and 2-day shipping are available for most U.S. addresses if orders are placed before 2:00 PM EST. International expedited shipping options vary by destination.",
  },
  {
    id: "item-4",
    icon: "globe",
    question: "Do you offer localized support?",
    answer:
      "We offer multilingual support in English, Spanish, French, German, and Japanese. Our support team can assist customers in these languages via email, chat, and phone during standard business hours for each respective region.",
  },
  {
    id: "item-5",
    icon: "package",
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number on our website or the carrier's website to track your package. You can also view order status and tracking information in your account dashboard under \"Order History\".",
  },
] as const;

// Consolidated styles
const STYLES = {
  section: "py-20",
  container: "mx-auto max-w-5xl px-4 md:px-6",
  layout: "flex flex-col gap-10 md:flex-row md:gap-16",
  sidebar: "md:w-1/3",
  stickyContent: "sticky top-20",
  title: "mt-4 text-3xl font-bold",
  description: "text-muted-foreground mt-4",
  link: "text-[#008A5B] dark:text-primary font-medium hover:underline",
  content: "md:w-2/3",
  accordion: "w-full space-y-2",
  item: "bg-background shadow-xs rounded-lg border px-4 last:border-b",
  trigger: "cursor-pointer items-center py-5 hover:no-underline",
  triggerContent: "flex items-center gap-3",
  iconContainer: "flex size-6",
  icon: "m-auto size-4",
  question: "text-base",
  answerContainer: "pb-5",
  answerContent: "px-9",
  answer: "text-base",
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
          <Link href="#" className={STYLES.link}>
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
    <section className={STYLES.section}>
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
