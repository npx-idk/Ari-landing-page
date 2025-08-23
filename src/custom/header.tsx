"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import { AnimatedGroup } from "../custom/motion/animated-group";
import { TextEffect } from "../custom/motion/text-effect";
import Logo from "./logo";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Button } from "./ui/button";

// Constants moved outside component to prevent recreation
const MENU_ITEMS = [
  { name: "Features", href: "#features" },
  { name: "Solution", href: "#solution" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
] as const;

const SCROLL_THRESHOLD = 50;

// Memoized navigation items component
const NavigationItems = memo(
  ({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) => (
    <ul
      className={cn(
        variant === "desktop"
          ? "flex gap-8 text-sm"
          : "space-y-6 text-base w-fit"
      )}
    >
      {MENU_ITEMS.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={cn(
              "block duration-150 transition-colors",
              variant === "desktop"
                ? "text-accent-foreground/70 hover:text-accent-foreground"
                : "text-muted-foreground hover:text-accent-foreground"
            )}
          >
            <TextEffect preset="fade" per="char">
              {item.name}
            </TextEffect>
          </Link>
        </li>
      ))}
    </ul>
  )
);

NavigationItems.displayName = "NavigationItems";

// Memoized mobile menu toggle button
const MenuToggle = memo(
  ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
      className="relative z-20 -m-2.5 -mr-4 p-2.5 lg:hidden cursor-pointer"
    >
      <Menu
        className={cn(
          "size-6 transition-all duration-200",
          isOpen && "rotate-180 scale-0 opacity-0"
        )}
      />
      <X
        className={cn(
          "absolute inset-0 m-auto size-6 transition-all duration-200",
          isOpen
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-180 scale-0 opacity-0"
        )}
      />
    </Button>
  )
);

MenuToggle.displayName = "MenuToggle";

// Memoized action buttons component
const ActionButtons = memo(({ isScrolled }: { isScrolled: boolean }) => (
  <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
    <AnimatedGroup preset="slide" className="contents">
      <ThemeSwitcher />

      <Button
        asChild
        variant="outline"
        size="sm"
        className={cn(isScrolled && "lg:hidden")}
      >
        <Link href="#login">
          <TextEffect preset="fade">Login</TextEffect>
        </Link>
      </Button>

      <Button asChild size="sm" className={cn(isScrolled && "lg:hidden")}>
        <Link href="#signup">
          <TextEffect preset="fade">Sign Up</TextEffect>
        </Link>
      </Button>

      <Button
        asChild
        size="sm"
        className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
      >
        <Link href="#get-started">
          <TextEffect preset="fade">Get Started</TextEffect>
        </Link>
      </Button>
    </AnimatedGroup>
  </div>
));

ActionButtons.displayName = "ActionButtons";

// Custom hook for scroll detection
const useScrolled = (threshold: number = SCROLL_THRESHOLD) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Throttle scroll events for better performance
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > threshold);
      }, 10);
    };

    handleScroll(); // Check initial state
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [threshold]);

  return isScrolled;
};

// Main component
export const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrolled();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close mobile menu when clicking outside or on links
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("nav") === null) {
        closeMenu();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <AnimatedGroup as="header" preset="fade" className="relative z-50">
      <nav
        data-state={isMenuOpen ? "active" : "inactive"}
        className="fixed z-50 w-full px-2"
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 ease-in-out lg:px-12 rounded-2xl",
            isScrolled &&
              "max-w-4xl  border bg-background/80 backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo and Mobile Menu Toggle */}
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="Go to homepage"
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
              >
                <Logo />
              </Link>
              <MenuToggle isOpen={isMenuOpen} onToggle={toggleMenu} />
            </div>

            {/* Desktop Navigation */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <NavigationItems variant="desktop" />
            </div>

            {/* Mobile Menu and Action Buttons */}
            <div
              className={cn(
                "mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border bg-background p-6 shadow-2xl shadow-zinc-300/20 transition-all duration-300 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent",
                isMenuOpen && "block lg:flex"
              )}
              data-state={isMenuOpen ? "active" : "inactive"}
            >
              {/* Mobile Navigation */}
              <AnimatedGroup preset="slide" className="lg:hidden">
                <NavigationItems variant="mobile" />
              </AnimatedGroup>

              {/* Action Buttons */}
              <ActionButtons isScrolled={isScrolled} />
            </div>
          </div>
        </div>
      </nav>
    </AnimatedGroup>
  );
});

Header.displayName = "Header";
