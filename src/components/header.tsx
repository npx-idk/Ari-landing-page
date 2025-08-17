"use client";

import { Button } from "@ari/ui/components/button";
import { Badge } from "@ari/ui/components/badge";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Icons } from "@ari/ui/components/icons";
import { scrollToSection } from "@/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationItems = [
    { name: "Demo", id: "demo" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Features", id: "features" },
  ];

  // Get waitlist URL from environment variable with fallback
  const waitlistUrl = process.env.NEXT_PUBLIC_WAITLIST_URL || 
    "https://dynamic-katydid-67.accounts.dev/waitlist#/?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F&sign_in_fallback_redirect_url=http%3A%2F%2Flocalhost%3A3000%2F&sign_up_fallback_redirect_url=http%3A%2F%2Flocalhost%3A3000%2F";

  return (
    <>
      {/* Floating Navigation */}
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="relative">
          {/* Glass morphism container */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-md border-0.5 border-primary-foreground shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20">
            <div className="flex h-14 items-center justify-between px-6">
              {/* Logo and Desktop Navigation Container */}
              <div className="flex items-center space-x-8">
                {/* Logo */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Icons.logo className="w-8 h-8" />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsMenuOpen(false);
                      }}
                      className="text-sm font-medium text-primary-foreground hover:text-primary-foreground/80 transition-colors font-body"
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center flex-shrink-0 gap-2">
                <Button
                  variant={"default"}
                  cta={true}
                  onClick={() => {
                    window.open(waitlistUrl, "_blank");
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant={"outline"}
                  cta={true}
                  onClick={() => {
                    window.open("https://calendly.com/hari-getari/30min", "_blank");
                  }}
                >
                  Book Demo
                </Button>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden rounded-full h-8 w-8 p-0"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 md:hidden">
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 p-4">
                <div className="space-y-3">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors font-body"
                    >
                      {item.name}
                    </button>
                  ))}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-row gap-2 justify-center items-center">
                    <Button
                      variant={"default"}
                      cta={true}
                      onClick={() => {
                        window.open(waitlistUrl, "_blank");
                        setIsMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant={"outline"}
                      cta={true}
                      onClick={() => {
                        window.open(process.env.NEXT_PUBLIC_CALENDLY_URL, "_blank");
                        setIsMenuOpen(false);
                      }}
                    >
                      Book Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
