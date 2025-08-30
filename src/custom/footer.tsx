"use client";

import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { memo, useCallback } from "react";
import Logo from "./logo";
import { AnimatedGroup } from "./motion/animated-group";
import { TextEffect } from "./motion/text-effect";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// Types
interface LinkItem {
  readonly title: string;
  readonly href: string;
}

interface LinkGroup {
  readonly group: string;
  readonly items: readonly LinkItem[];
}

interface SocialLink {
  readonly href: string;
  readonly label: string;
  readonly icon: string;
}

interface LanguageOption {
  readonly value: string;
  readonly label: string;
}

// Constants
const NAVIGATION_LINKS: readonly LinkGroup[] = [
  {
    group: "Product",
    items: [
      { title: "Features", href: "#" },
      { title: "Solution", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Pricing", href: "#" },
      { title: "Help", href: "#" },
      { title: "About", href: "#" },
    ],
  },
  {
    group: "Solution",
    items: [
      { title: "Startup", href: "#" },
      { title: "Freelancers", href: "#" },
      { title: "Organizations", href: "#" },
      { title: "Students", href: "#" },
      { title: "Collaboration", href: "#" },
      { title: "Design", href: "#" },
      { title: "Management", href: "#" },
    ],
  },
  {
    group: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Press", href: "#" },
      { title: "Contact", href: "#" },
      { title: "Help", href: "#" },
    ],
  },
  {
    group: "Legal",
    items: [
      { title: "Licence", href: "#" },
      { title: "Privacy", href: "#" },
      { title: "Cookies", href: "#" },
      { title: "Security", href: "#" },
    ],
  },
] as const;

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: "#",
    label: "X/Twitter",
    icon: "M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z",
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z",
  },
  {
    href: "#",
    label: "Facebook",
    icon: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95",
  },
  {
    href: "#",
    label: "Threads",
    icon: "M19.25 8.505c-1.577-5.867-7-5.5-7-5.5s-7.5-.5-7.5 8.995s7.5 8.996 7.5 8.996s4.458.296 6.5-3.918c.667-1.858.5-5.573-6-5.573c0 0-3 0-3 2.5c0 .976 1 2 2.5 2s3.171-1.027 3.5-3c1-6-4.5-6.5-6-4",
  },
  {
    href: "#",
    label: "Instagram",
    icon: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3",
  },
  {
    href: "#",
    label: "TikTok",
    icon: "M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48",
  },
] as const;

const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { value: "1", label: "English" },
  { value: "2", label: "Español" },
  { value: "3", label: "Français" },
  { value: "4", label: "Swahili" },
  { value: "5", label: "Lingala" },
] as const;

// Consolidated styles
const STYLES = {
  footer: "bg-[#F8FAFC] py-8 sm:py-12 dark:bg-[#111A24]",
  topSection: "mb-6 sm:mb-8 md:mb-12 border-b",
  topContent:
    "mx-auto flex max-w-5xl flex-col sm:flex-row items-center sm:items-end justify-between gap-4 sm:gap-6 px-4 sm:px-6 pb-6",
  logoLink: "block size-fit",
  socialContainer: "flex flex-wrap justify-center gap-4 sm:gap-6 text-sm",
  socialLink:
    "text-muted-foreground dark:hover:text-primary hover:text-[#008A5B] block transition-colors duration-150",
  socialIcon: "size-5 sm:size-6",
  mainContent: "mx-auto max-w-5xl px-4 sm:px-6",
  contentGrid: "grid gap-8 sm:gap-12 md:grid-cols-5 md:gap-0 lg:grid-cols-4",
  linksGrid:
    "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:col-span-5 md:row-start-1 lg:col-span-3",
  linkGroup: "space-y-3 sm:space-y-4 text-sm",
  groupTitle: "block font-medium text-sm sm:text-base",
  linkItem:
    "text-muted-foreground dark:hover:text-primary hover:text-[#008A5B] block duration-150 transition-colors text-sm",
  newsletterForm:
    "row-start-1 border-b pb-6 sm:pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1",
  newsletterContent: "space-y-3 sm:space-y-4",
  newsletterLabel: "block font-medium",
  newsletterInputGroup: "flex gap-2",
  newsletterInput:
    "h-8 sm:h-9 text-sm bg-white hover:bg-gray-50 dark:bg-gray-800/70 dark:hover:bg-gray-800/80 transition-colors duration-150",
  newsletterDescription: "text-muted-foreground block text-xs sm:text-sm",
  bottomSection:
    "mt-8 sm:mt-12 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 sm:gap-6 border-t py-6",
  copyright:
    "text-muted-foreground order-last sm:order-first block text-center sm:text-left text-xs sm:text-sm",
  languageSelector: "relative",
  languageSelectorIcon:
    "pointer-events-none absolute inset-y-0 right-2 my-auto opacity-75",
  languageSelectorSelect: cn(
    "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground shadow-xs flex h-9 w-full min-w-32 appearance-none rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm cursor-pointer",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
  ),
} as const;

// Memoized components
const SocialIcon = memo<{ link: SocialLink }>(({ link }) => (
  <Link
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={link.label}
    className={STYLES.socialLink}
  >
    <svg
      className={STYLES.socialIcon}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d={link.icon} />
    </svg>
  </Link>
));
SocialIcon.displayName = "SocialIcon";

const LinkGroupComponent = memo<{ linkGroup: LinkGroup }>(({ linkGroup }) => (
  <div className={STYLES.linkGroup}>
    <span className={STYLES.groupTitle}>{linkGroup.group}</span>
    {linkGroup.items.map((item) => (
      <Link key={item.title} href={item.href} className={STYLES.linkItem}>
        <span>{item.title}</span>
      </Link>
    ))}
  </div>
));
LinkGroupComponent.displayName = "LinkGroupComponent";

const NewsletterForm = memo(() => {
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
  }, []);

  return (
    <form onSubmit={handleSubmit} className={STYLES.newsletterForm}>
      <div className={STYLES.newsletterContent}>
        <Label htmlFor="mail" className={STYLES.newsletterLabel}>
          Newsletter
        </Label>
        <div className={STYLES.newsletterInputGroup}>
          <Input
            type="email"
            id="mail"
            name="mail"
            placeholder="Your email"
            className={STYLES.newsletterInput}
            required
          />
          <Button type="submit" size="sm">
            Submit
          </Button>
        </div>
        <span className={STYLES.newsletterDescription}>
          Don't miss any update!
        </span>
      </div>
    </form>
  );
});
NewsletterForm.displayName = "NewsletterForm";

const LanguageSelector = memo(() => {
  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // Handle language change
      console.log("Language changed to:", e.target.value);
    },
    []
  );

  return (
    <form>
      <div className={STYLES.languageSelector}>
        <ChevronsUpDown
          className={STYLES.languageSelectorIcon}
          size="0.75rem"
        />
        <select
          className={STYLES.languageSelectorSelect}
          name="language"
          onChange={handleLanguageChange}
          defaultValue="1"
          aria-label="Select language"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
});
LanguageSelector.displayName = "LanguageSelector";

const FooterHeader = memo(() => (
  <div className={STYLES.topSection}>
    <div className={STYLES.topContent}>
      <AnimatedGroup preset="blur-slide" viewportBehavior="once">
        <Link href="/" aria-label="go home" className={STYLES.logoLink}>
          <Logo />
        </Link>
      </AnimatedGroup>

      <AnimatedGroup
        preset="scale"
        className={STYLES.socialContainer}
        viewportBehavior="once"
      >
        {SOCIAL_LINKS.map((link, index) => (
          <SocialIcon key={index} link={link} />
        ))}
      </AnimatedGroup>
    </div>
  </div>
));
FooterHeader.displayName = "FooterHeader";

const FooterContent = memo(() => (
  <div className={STYLES.mainContent}>
    <div className={STYLES.contentGrid}>
      <AnimatedGroup
        preset="slide"
        className={STYLES.linksGrid}
        viewportBehavior="once"
      >
        {NAVIGATION_LINKS.map((linkGroup, index) => (
          <LinkGroupComponent key={index} linkGroup={linkGroup} />
        ))}
      </AnimatedGroup>

      <AnimatedGroup preset="blur-slide" viewportBehavior="once">
        <NewsletterForm />
      </AnimatedGroup>
    </div>
  </div>
));
FooterContent.displayName = "FooterContent";

const FooterBottom = memo(() => (
  <div className={STYLES.mainContent}>
    <div className={STYLES.bottomSection}>
      <AnimatedGroup preset="blur-slide" viewportBehavior="once">
        <TextEffect
          as="small"
          per="word"
          className={STYLES.copyright}
          preset="fade"
          viewportBehavior="once"
        >
          © 2025 Tailark, All rights reserved
        </TextEffect>
      </AnimatedGroup>

      <AnimatedGroup preset="scale" viewportBehavior="once">
        <LanguageSelector />
      </AnimatedGroup>
    </div>
  </div>
));
FooterBottom.displayName = "FooterBottom";

// Main component
const OptimizedFooter = () => {
  return (
    <footer className={STYLES.footer}>
      <FooterHeader />
      <FooterContent />
      <FooterBottom />
    </footer>
  );
};

// Add display name for better debugging
OptimizedFooter.displayName = "OptimizedFooter";

export default memo(OptimizedFooter);
