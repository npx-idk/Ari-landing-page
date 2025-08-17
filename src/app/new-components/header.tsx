import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button";

// Import SVG components
import ChevronDownMd from "@/assets/svg/ChevronDownMd";
import ChevronDownSm from "@/assets/svg/ChevronDownSm";
import CloseIcon from "@/assets/svg/CloseIcon";
import CodeGeneratorIcon from "@/assets/svg/CodeGeneratorIcon";
import EmailGeneratorIcon from "@/assets/svg/EmailGeneratorIcon";
import HamburgerIcon from "@/assets/svg/HamburgerIcon";
import ImageGeneratorIcon from "@/assets/svg/ImageGeneratorIcon";
import MoonIcon from "@/assets/svg/MoonIcon";
import SunIcon from "@/assets/svg/SunIcon";
import TextGeneratorIcon from "@/assets/svg/TextGeneratorIcon";
import VideoGeneratorIcon from "@/assets/svg/VideoGeneratorIcon";

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    // Check localStorage first
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
      return;
    }
    // If no saved preference, check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  // Update document class when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if there's no saved preference
      if (localStorage.getItem("darkMode") === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const toggleMobileDropdown = (e: React.MouseEvent, dropdownName: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <header
      className="
        sticky top-6 z-50 py-3 lg:py-0
        w-[90%] lg:w-[70%] mx-auto rounded-full
        bg-white/30 dark:bg-white/10 
        backdrop-blur-lg
        border border-gray-200/60 dark:border-white/20
        shadow-lg
      "
    >
      <div className="px-4 sm:px-6 lg:px-7">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="index.html">
              <img
                src="assets/images/logo-black.svg"
                className="block dark:hidden"
                alt="Logo"
              />
              <img
                src="assets/images/logo-white.svg"
                className="hidden dark:block"
                alt="Logo"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center">
            <a
              href="index.html"
              className="text-gray-800 dark:text-white/90 text-sm px-4 py-5 hover:text-primary-500 font-medium"
            >
              Home
            </a>

            {/* Products Dropdown (Desktop Hover) */}
            <div
              className="relative nav-item"
              onMouseEnter={() => setActiveDropdown("products")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-gray-500 dark:text-gray-400 hover:text-primary-500 group text-sm inline-flex items-center px-4 py-5 font-medium rounded-full relative">
                Products
                <ChevronDownMd
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === "products" ? "rotate-180" : ""
                  }`}
                />
                <div className="absolute bottom-0 left-0 right-0 h-2" />
              </button>

              <div
                className={`absolute dark:bg-gray-900 left-0 w-[266px] bg-white rounded-2xl shadow-theme-lg border border-gray-100 dark:border-gray-800 p-3 z-50 mt-2 ${
                  activeDropdown === "products" ? "block" : "hidden"
                }`}
                style={{ marginTop: "8px" }}
              >
                <div className="h-2 bg-transparent absolute -top-2 left-0 right-0" />
                <div className="space-y-1">
                  <a
                    href="text-generator.html"
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/20"
                  >
                    <TextGeneratorIcon />
                    <span>Text Generator</span>
                  </a>
                  <a
                    href="image-generator.html"
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/20"
                  >
                    <ImageGeneratorIcon />
                    Image Generator
                  </a>
                  <a
                    href="code-generator.html"
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/20"
                  >
                    <CodeGeneratorIcon />
                    Code Generator
                  </a>
                  <a
                    href="video-generator.html"
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/20"
                  >
                    <VideoGeneratorIcon />
                    Video Generator
                  </a>
                  <a
                    href="email-generator.html"
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/20"
                  >
                    <EmailGeneratorIcon />
                    Email Generator
                  </a>
                </div>
              </div>
            </div>

            <a
              href="contact.html"
              className="text-gray-500 dark:text-gray-400 text-sm px-4 py-5 hover:text-primary-500 font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={toggleDarkMode}
              className="size-10 p-0"
            >
              {!darkMode ? <MoonIcon /> : <SunIcon className="h-5 w-5" />}
            </Button>
            <Button
              variant="secondary"
              onClick={toggleMobileMenu}
              className="lg:hidden size-10 p-0"
            >
              {!mobileMenuOpen ? (
                <HamburgerIcon className="h-6 w-6" />
              ) : (
                <CloseIcon className="h-6 w-6" />
              )}
            </Button>
            <Button
              variant="secondary"
              href="signin.html"
              className="hidden lg:inline-flex"
            >
              Dashboard
            </Button>
            <Button
              variant="primary"
              href="signup.html"
              className="hidden lg:inline-flex"
              colorClass="bg-indigo-500 hover:bg-indigo-600"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute bg-white dark:bg-gray-900 w-[90%] mx-auto left-0 right-0 mt-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="p-4 space-y-2">
            <a
              href="index.html"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span>Home</span>
            </a>

            {/* Products Dropdown (Mobile Click) */}
            <div className="space-y-1">
              <button
                onClick={(e) => toggleMobileDropdown(e, "products")}
                className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span>Products</span>
                <ChevronDownSm
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === "products" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {/* Replace your mobile dropdown section with this final version: */}
              {activeDropdown === "products" && (
                <div className="mt-2 space-y-1 pl-4">
                  <a
                    href="text-generator.html"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    <TextGeneratorIcon className="w-5 h-5 flex-shrink-0" />
                    <span>Text Generator</span>
                  </a>
                  <a
                    href="image-generator.html"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    <ImageGeneratorIcon className="w-5 h-5 flex-shrink-0" />
                    <span>Image Generator</span>
                  </a>
                  <a
                    href="code-generator.html"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    <CodeGeneratorIcon className="w-5 h-5 flex-shrink-0" />
                    <span>Code Generator</span>
                  </a>
                  <a
                    href="video-generator.html"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    <VideoGeneratorIcon className="w-5 h-5 flex-shrink-0" />
                    <span>Video Generator</span>
                  </a>
                  <a
                    href="email-generator.html"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    <EmailGeneratorIcon className="w-5 h-5 flex-shrink-0" />
                    <span>Email Generator</span>
                  </a>
                </div>
              )}
            </div>

            <a
              href="contact.html"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span>Contact</span>
            </a>

            {/* Mobile-only buttons */}
            <div className="pt-2 mt-2 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="secondary"
                href="signin.html"
                className="w-full justify-center"
              >
                Dashboard
              </Button>
              <Button
                variant="primary"
                href="signup.html"
                className="w-full justify-center"
                colorClass="bg-indigo-500 hover:bg-indigo-600"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
