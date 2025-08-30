"use client";

import { Icons } from "@ari/ui/components/icons";
import { cn } from "@ari/ui/lib/utils";
import {
  ChevronDown,
  Eye,
  Heart,
  Monitor,
  Palette,
  PanelRight,
  RotateCcw,
  Search,
  Send,
  ShoppingCart,
  Upload,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../custom/ui/button";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  hasProducts?: boolean;
  isHtml?: boolean; // Flag to indicate if content contains HTML
}

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
}

export type PlacementType = "center" | "side-drawer";
export type ThemeType =
  | "default"
  | "blue"
  | "purple"
  | "orange"
  | "minimal"
  | "retro"
  | "poster"
  | "space"
  | "cyberpunk2077";

export const placements = [
  { type: "center" as PlacementType, label: "Center Modal", icon: Monitor },
  {
    type: "side-drawer" as PlacementType,
    label: "Side Drawer",
    icon: PanelRight,
  },
];

const themes = [
  {
    type: "default" as ThemeType,
    label: "Default Green",
    colors: {
      primary: "#4ade80",
      secondary: "#C0FAE6",
      accent: "#16a34a",
      logo: "#16a34a",
    },
    borderRadius: {
      container: "1rem",
      message: "0.5rem",
      input: "0.5rem",
      badge: "9999px",
    },
  },
  {
    type: "blue" as ThemeType,
    label: "Ocean Blue",
    colors: {
      primary: "#3b82f6",
      secondary: "#dbeafe",
      accent: "#1d4ed8",
      logo: "#1e40af",
    },
    borderRadius: {
      container: "0.75rem",
      message: "0.375rem",
      input: "0.375rem",
      badge: "0.375rem",
    },
  },
  {
    type: "purple" as ThemeType,
    label: "Royal Purple",
    colors: {
      primary: "#8b5cf6",
      secondary: "#e9d5ff",
      accent: "#7c3aed",
      logo: "#6d28d9",
    },
    borderRadius: {
      container: "1.5rem",
      message: "1rem",
      input: "1rem",
      badge: "9999px",
    },
  },
  {
    type: "orange" as ThemeType,
    label: "Sunset Orange",
    colors: {
      primary: "#f97316",
      secondary: "#fed7aa",
      accent: "#ea580c",
      logo: "#c2410c",
    },
    borderRadius: {
      container: "2rem",
      message: "1.5rem",
      input: "1.5rem",
      badge: "9999px",
    },
  },
  {
    type: "minimal" as ThemeType,
    label: "Minimal Gray",
    colors: {
      primary: "#6b7280",
      secondary: "#f3f4f6",
      accent: "#374151",
      logo: "#374151",
    },
    borderRadius: {
      container: "0",
      message: "0",
      input: "0",
      badge: "0",
    },
  },
  {
    type: "retro" as ThemeType,
    label: "Retro Terminal",
    colors: {
      primary: "#00ffff",
      secondary: "#001a1a",
      accent: "#ff6b00",
      logo: "#00ffff",
    },
    borderRadius: {
      container: "0.25rem",
      message: "0.125rem",
      input: "0.125rem",
      badge: "0.125rem",
    },
  },
  {
    type: "poster" as ThemeType,
    label: "Vintage Poster",
    colors: {
      primary: "#dc2626",
      secondary: "#fef2f2",
      accent: "#b91c1c",
      logo: "#991b1b",
    },
    borderRadius: {
      container: "0.5rem",
      message: "0.25rem",
      input: "0.25rem",
      badge: "0.25rem",
    },
  },
  {
    type: "space" as ThemeType,
    label: "Cosmic Space",
    colors: {
      primary: "#8b5cf6",
      secondary: "#1e1b4b",
      accent: "#06b6d4",
      logo: "#a855f7",
    },
    borderRadius: {
      container: "1rem",
      message: "0.75rem",
      input: "0.75rem",
      badge: "9999px",
    },
  },
  {
    type: "cyberpunk2077" as ThemeType,
    label: "Cyberpunk 2077",
    colors: {
      primary: "#fcee09",
      secondary: "#0d1117",
      accent: "#00d4ff",
      logo: "#fcee09",
    },
    borderRadius: {
      container: "0",
      message: "0",
      input: "0",
      badge: "0",
    },
  },
];

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: "$99.99",
    originalPrice: "$129.99",
    image:
      "https://plus.unsplash.com/premium_photo-1679513691641-9aedddc94f96?w=900",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: "$199.99",
    image:
      "https://images.unsplash.com/photo-1693621947585-7b7d94149af4",
    badge: "Top Rated",
  },
  {
    id: "3",
    name: "Premium Phone Case Set",
    price: "$29.99",
    originalPrice: "$39.99",
    image:
      "https://images.unsplash.com/photo-1610196600828-517131fddddd",
  },
  {
    id: "4",
    name: "Portable Power Bank",
    price: "$49.99",
    image:
      "https://images.unsplash.com/photo-1636099652696-f5bec08a7503",
  },
];

// Function to convert markdown to HTML
const parseMarkdownToHtml = (text: string): string => {
  return text
    // Convert bold text **text** to <strong>text</strong>
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Split into paragraphs and process each one
    .split('\n\n')
    .map(paragraph => {
      // If paragraph starts with an emoji, treat it as a list item
      if (paragraph.match(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u)) {
        return `<div class="flex items-start gap-2 mb-2"><span class="text-lg leading-none">${paragraph.charAt(0)}</span><div class="flex-1">${paragraph.substring(1).trim()}</div></div>`;
      }
      // Regular paragraph
      return `<p class="mb-2 last:mb-0">${paragraph.replace(/\n/g, '<br>')}</p>`;
    })
    .join('')
    // Clean up any empty paragraphs
    .replace(/<p class="mb-2 last:mb-0"><\/p>/g, '');
};

// Store the original markdown text for the return policy message
const returnPolicyMarkdown = "No worries! We offer a hassle-free return policy:\n\n📦 **30-day return window** from delivery date\n🔄 **Free returns** - we'll send you a prepaid label\n💰 **Full refund** to your original payment method\n📞 **Easy process** - just contact us or initiate online\n\n✨ **Pro tip:** The Wireless Bluetooth Headphones have adjustable ear hooks and come with multiple ear tip sizes for the perfect fit!";

const demoMessages: Omit<Message, "id" | "timestamp">[] = [
  {
    content:
      "Hi! I'm Ari, your shopping assistant. I can help you find the perfect products, answer questions about our policies, and guide you through your shopping experience. How can I help you today?",
    isUser: false,
  },
  {
    content:
      "I'm looking for bluetooth headphones with good sound quality and noise cancellation",
    isUser: true,
  },
  {
    content:
      "Great choice! Based on your need for bluetooth headphones with good sound quality and noise cancellation, here are our top recommendations that are best for you",
    isUser: false,
    hasProducts: true,
  },
  {
    content:
      "These look perfect! What's your return policy if they don't fit well?",
    isUser: true,
  },
  {
    content: returnPolicyMarkdown, // Use plain text for typing animation
    isUser: false,
    isHtml: false, // Will be converted to HTML after typing is complete
  },
];

export function ThemeDropdown({
  currentTheme,
  onThemeChange,
}: {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentThemeInfo = themes.find((t) => t.type === currentTheme)!;

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="w-full justify-center gap-3 border-gray-400 dark:border-gray-500 cursor-pointer rounded-full py-5 border-2  hover:bg-primary-foreground/5 dark:hover:bg-accent-foreground/5 transition-colors"
      >
        <Palette className="w-4 h-4" />
        {currentThemeInfo.label}
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]">
          {themes.map((theme) => (
            <button
              key={theme.type}
              onClick={() => {
                onThemeChange(theme.type);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg cursor-pointer"
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <span className="text-sm">{theme.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ShopifyStoreBackground({ theme = "default" }: { theme?: ThemeType }) {
  const currentTheme = themes.find((t) => t.type === theme)!;
  const isRetro = theme === "retro";
  const isPoster = theme === "poster";
  const isMinimal = theme === "minimal";
  const isSpace = theme === "space";
  const isCyber2077 = theme === "cyberpunk2077";

  // Theme-specific configurations
  const getThemeConfig = () => {
    switch (theme) {
      case "retro":
        return {
          bgColor: "bg-black",
          headerBg: "bg-gray-900 border-cyan-500",
          textColor: "text-cyan-400",
          accentColor: "text-green-400",
          buttonColor: "bg-cyan-500 text-black hover:bg-cyan-400",
          storeName: ">TECH_STORE.EXE",
          navLinks: [">PRODUCTS", ">CATEGORIES", ">ABOUT", ">CONTACT"],
          heroTitle: "[SUMMER SALE] - UP TO 50% OFF",
          heroSubtitle: "> Discover latest tech gadgets and accessories",
          heroButton: "SHOP_NOW.EXE",
        };
      case "poster":
        return {
          bgColor: "bg-gradient-to-b from-amber-50 to-orange-100",
          headerBg:
            "bg-gradient-to-r from-red-600 to-orange-600 border-red-700",
          textColor: "text-white",
          accentColor: "text-yellow-200",
          buttonColor:
            "bg-white text-red-600 hover:bg-yellow-100 font-bold tracking-wider",
          storeName: "TECH STORE",
          navLinks: ["PRODUCTS", "CATEGORIES", "ABOUT", "CONTACT"],
          heroTitle: "SUMMER SALE - UP TO 50% OFF!",
          heroSubtitle: "★ DISCOVER OUR LATEST TECH GADGETS AND ACCESSORIES ★",
          heroButton: "SHOP NOW!",
        };
      case "minimal":
        return {
          bgColor: "bg-gray-50",
          headerBg: "bg-white border-gray-300",
          textColor: "text-gray-900",
          accentColor: "text-gray-600",
          buttonColor: "bg-gray-900 text-white hover:bg-gray-800",
          storeName: "TechStore",
          navLinks: ["Products", "Categories", "About", "Contact"],
          heroTitle: "Summer Sale - Up to 50% Off",
          heroSubtitle: "Discover our latest tech gadgets and accessories",
          heroButton: "Shop Now",
        };
      case "blue":
        return {
          bgColor: "bg-blue-50",
          headerBg: "bg-white border-blue-200",
          textColor: "text-blue-900",
          accentColor: "text-blue-600",
          buttonColor: "bg-blue-600 text-white hover:bg-blue-700",
          storeName: "TechStore",
          navLinks: ["Products", "Categories", "About", "Contact"],
          heroTitle: "Summer Sale - Up to 50% Off",
          heroSubtitle: "Discover our latest tech gadgets and accessories",
          heroButton: "Shop Now",
        };
      case "purple":
        return {
          bgColor: "bg-purple-50",
          headerBg: "bg-white border-purple-200",
          textColor: "text-purple-900",
          accentColor: "text-purple-600",
          buttonColor: "bg-purple-600 text-white hover:bg-purple-700",
          storeName: "TechStore",
          navLinks: ["Products", "Categories", "About", "Contact"],
          heroTitle: "Summer Sale - Up to 50% Off",
          heroSubtitle: "Discover our latest tech gadgets and accessories",
          heroButton: "Shop Now",
        };
      case "orange":
        return {
          bgColor: "bg-orange-50",
          headerBg: "bg-white border-orange-200",
          textColor: "text-orange-900",
          accentColor: "text-orange-600",
          buttonColor: "bg-orange-600 text-white hover:bg-orange-700",
          storeName: "TechStore",
          navLinks: ["Products", "Categories", "About", "Contact"],
          heroTitle: "Summer Sale - Up to 50% Off",
          heroSubtitle: "Discover our latest tech gadgets and accessories",
          heroButton: "Shop Now",
        };
      case "space":
        return {
          bgColor:
            "bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900",
          headerBg:
            "bg-gradient-to-r from-slate-800 to-purple-900 border-purple-500",
          textColor: "text-purple-100",
          accentColor: "text-cyan-300",
          buttonColor:
            "bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 font-medium",
          storeName: "⭐ COSMIC TECH ⭐",
          navLinks: ["🚀 PRODUCTS", "🌌 CATEGORIES", "🛸 ABOUT", "📡 CONTACT"],
          heroTitle: "⚡ GALACTIC SALE - UP TO 50% OFF ⚡",
          heroSubtitle: "🌟 Explore the universe of cutting-edge technology 🌟",
          heroButton: "🚀 LAUNCH SHOPPING",
        };
      case "cyberpunk2077":
        return {
          bgColor: "bg-gradient-to-b from-black via-gray-900 to-black",
          headerBg: "bg-gradient-to-r from-black to-gray-900 border-yellow-400",
          textColor: "text-yellow-400",
          accentColor: "text-cyan-400",
          buttonColor:
            "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-bold",
          storeName: "NIGHT CITY TECH",
          navLinks: ["GEAR", "CYBERWARE", "WEAPONS", "CONTACT"],
          heroTitle: "CORPO CLEARANCE - 50% OFF ALL TECH",
          heroSubtitle: "Wake the f*ck up, samurai. We've got gear to sell.",
          heroButton: "JACK IN",
        };
      default: // green/default
        return {
          bgColor: "bg-white",
          headerBg: "bg-white border-gray-200",
          textColor: "text-gray-900",
          accentColor: "text-gray-600",
          buttonColor: "bg-green-600 text-white hover:bg-green-700",
          storeName: "TechStore",
          navLinks: ["Products", "Categories", "About", "Contact"],
          heroTitle: "Summer Sale - Up to 50% Off",
          heroSubtitle: "Discover our latest tech gadgets and accessories",
          heroButton: "Shop Now",
        };
    }
  };

  const config = getThemeConfig();

  return (
    <div className={cn("absolute inset-0 overflow-hidden", config.bgColor)}>
      {/* Store Header */}
      <div className={cn("p-4 border-b", config.headerBg)}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <h1
              className={cn(
                "text-2xl font-bold",
                config.textColor,
                isRetro ? "font-mono" : "",
                isPoster ? "font-black tracking-wider" : ""
              )}
            >
              {config.storeName}
            </h1>
            <nav className="hidden md:flex space-x-6">
              {config.navLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className={cn(
                    "hover:opacity-80 transition-opacity",
                    config.accentColor,
                    isRetro ? "font-mono text-sm" : "",
                    isPoster ? "font-bold tracking-wide" : ""
                  )}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search
                className={cn(
                  "w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2",
                  config.accentColor
                )}
              />
              <input
                id="search"
                type="text"
                placeholder={
                  isRetro ? "> Search products..." : "Search products..."
                }
                className={cn(
                  "pl-10 pr-4 py-2 border rounded-lg w-64",
                  isRetro
                    ? "bg-black border-cyan-500 text-cyan-300 font-mono placeholder-cyan-600"
                    : isPoster
                    ? "bg-white border-red-300 text-red-800 placeholder-red-400 border-2"
                    : "border-gray-300 bg-white text-gray-900"
                )}
                style={{ borderRadius: currentTheme.borderRadius.input }}
              />
            </div>
            <Heart className={cn("w-6 h-6", config.accentColor)} />
            <User className={cn("w-6 h-6", config.accentColor)} />
            <div className="relative">
              <ShoppingCart className={cn("w-6 h-6", config.accentColor)} />
              <span
                className={cn(
                  "absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
                  isRetro
                    ? "bg-cyan-500 text-black font-mono"
                    : isPoster
                    ? "bg-red-600 border-2 border-yellow-400"
                    : "bg-red-500"
                )}
              >
                3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Hero Banner */}
        <div
          className={cn(
            "rounded-lg p-8 mb-8 text-white",
            isRetro
              ? "bg-gradient-to-r from-cyan-600 to-green-600 border border-cyan-400"
              : isPoster
              ? "bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 border-4 border-yellow-400 shadow-xl"
              : isMinimal
              ? "bg-gradient-to-r from-gray-600 to-gray-800"
              : theme === "blue"
              ? "bg-gradient-to-r from-blue-500 to-cyan-600"
              : theme === "purple"
              ? "bg-gradient-to-r from-purple-500 to-violet-600"
              : theme === "orange"
              ? "bg-gradient-to-r from-orange-500 to-red-600"
              : "bg-gradient-to-r from-green-500 to-emerald-600"
          )}
          style={{ borderRadius: currentTheme.borderRadius.container }}
        >
          <h2
            className={cn(
              "text-3xl font-bold mb-2",
              isRetro ? "font-mono" : "",
              isPoster ? "font-black text-4xl tracking-wider text-center" : ""
            )}
          >
            {config.heroTitle}
          </h2>
          <p
            className={cn(
              "mb-4 opacity-90",
              isRetro ? "font-mono text-cyan-100" : "",
              isPoster
                ? "font-bold tracking-wide text-center text-lg text-yellow-100"
                : "text-blue-100"
            )}
          >
            {config.heroSubtitle}
          </p>
          <div className={isPoster ? "flex justify-center" : ""}>
            <Button
              className={cn(
                config.buttonColor,
                isRetro ? "font-mono border border-cyan-300" : "",
                isPoster
                  ? "font-black tracking-widest text-lg px-8 py-3 border-4 border-white shadow-xl"
                  : ""
              )}
              style={{ borderRadius: currentTheme.borderRadius.input }}
            >
              {config.heroButton}
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "border rounded-lg overflow-hidden shadow-sm",
                isRetro
                  ? "bg-gray-900 border-cyan-500"
                  : isPoster
                  ? "bg-gradient-to-b from-amber-50 to-orange-50 border-red-300 border-2 shadow-lg"
                  : isMinimal
                  ? "bg-white border-gray-300"
                  : "bg-white border-gray-200"
              )}
              style={{ borderRadius: currentTheme.borderRadius.container }}
            >
              <div
                className={cn(
                  "h-48",
                  isRetro
                    ? "bg-gray-800"
                    : isPoster
                    ? "bg-gradient-to-b from-yellow-100 to-orange-100"
                    : "bg-gray-200"
                )}
              ></div>
              <div className="p-4">
                <h3
                  className={cn(
                    "font-medium mb-2",
                    isRetro
                      ? "text-cyan-300 font-mono"
                      : isPoster
                      ? "text-red-800 font-bold text-center"
                      : config.textColor
                  )}
                >
                  {isRetro
                    ? `> Product_${i + 1}.exe`
                    : isPoster
                    ? `PRODUCT ${i + 1}`
                    : `Product Name ${i + 1}`}
                </h3>
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-lg font-bold",
                      isRetro
                        ? "text-green-400 font-mono"
                        : isPoster
                        ? "text-red-700 font-black"
                        : ""
                    )}
                    style={{ color: currentTheme.colors.primary }}
                  >
                    {isRetro ? "$99.99" : isPoster ? "$99.99" : "$99.99"}
                  </span>
                  <span
                    className={cn(
                      "text-sm line-through",
                      isRetro
                        ? "text-red-400 font-mono"
                        : isPoster
                        ? "text-red-500 font-semibold"
                        : "text-gray-500"
                    )}
                  >
                    {isRetro ? "$129.99" : "$129.99"}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <div
                    className={cn(
                      "flex",
                      isRetro
                        ? "text-yellow-300 font-mono"
                        : isPoster
                        ? "text-yellow-600"
                        : "text-yellow-400"
                    )}
                  >
                    {isRetro ? "[*****]" : isPoster ? "★★★★★" : "★".repeat(5)}
                  </div>
                  <span
                    className={cn(
                      "text-sm ml-2",
                      isRetro
                        ? "text-cyan-600 font-mono"
                        : isPoster
                        ? "text-red-600 font-semibold"
                        : "text-gray-500"
                    )}
                  >
                    {isPoster ? "(24)" : "(24)"}
                  </span>
                </div>
                <Button
                  className={cn(
                    "w-full mt-3",
                    config.buttonColor,
                    isRetro ? "font-mono border border-cyan-300" : "",
                    isPoster
                      ? "font-bold tracking-wide border-2 border-red-300"
                      : ""
                  )}
                  style={{ borderRadius: currentTheme.borderRadius.input }}
                >
                  {isRetro
                    ? "ADD_TO_CART"
                    : isPoster
                    ? "ADD TO CART"
                    : "Add to Cart"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  theme = "default",
}: {
  product: Product;
  theme?: ThemeType;
}) {
  const currentTheme = themes.find((t) => t.type === theme)!;
  const isRetro = theme === "retro";
  const isPoster = theme === "poster";
  const isSpace = theme === "space";
  const isCyber2077 = theme === "cyberpunk2077";

  return (
    <div
      className={cn(
        "flex-shrink-0 w-48 border shadow-sm hover:shadow-md transition-shadow flex flex-col h-80",
        isRetro
          ? "bg-black border-cyan-500 text-cyan-300"
          : isPoster
          ? "bg-gradient-to-b from-amber-50 to-orange-50 border-red-300 border-2 shadow-lg"
          : isSpace
          ? "bg-gradient-to-b from-slate-800 to-purple-900 border-purple-400 border-2 shadow-xl text-purple-100"
          : isCyber2077
          ? "bg-gradient-to-b from-black to-gray-900 border-yellow-400 shadow-yellow-400/30 shadow-lg text-yellow-300"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
      )}
      style={{ borderRadius: currentTheme.borderRadius.container }}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-32 object-cover",
            isRetro ? "filter sepia contrast-150 hue-rotate-180" : "",
            isPoster ? "filter sepia-[0.2] contrast-105 saturate-105" : "",
            isSpace ? "filter hue-rotate-180 saturate-150 brightness-110" : "",
            isCyber2077 ? "filter contrast-125 saturate-150 sepia-[0.1]" : ""
          )}
          style={{
            borderTopLeftRadius: currentTheme.borderRadius.container,
            borderTopRightRadius: currentTheme.borderRadius.container,
          }}
        />
        {product.badge && (
          <span
            className={cn(
              "absolute top-2 left-2 text-xs px-2 py-1 font-medium",
              isRetro
                ? "bg-cyan-500 text-black font-mono border border-cyan-300"
                : isPoster
                ? "bg-red-600 text-white font-bold tracking-wider border-2 border-yellow-400 shadow-md"
                : isSpace
                ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium tracking-wide border border-cyan-400 shadow-lg"
                : isCyber2077
                ? "bg-yellow-400 text-black font-bold tracking-wide border border-cyan-400 shadow-yellow-400/50 shadow-lg"
                : "bg-green-500 text-white"
            )}
            style={{ borderRadius: currentTheme.borderRadius.badge }}
          >
            {isRetro
              ? `[${product.badge.toUpperCase()}]`
              : isPoster
              ? `★ ${product.badge.toUpperCase()} ★`
              : isSpace
              ? `⭐ ${product.badge.toUpperCase()}`
              : isCyber2077
              ? `${product.badge.toUpperCase()}`
              : product.badge}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h4
          className={cn(
            "font-medium text-sm mb-2 line-clamp-2 flex-shrink-0",
            isRetro
              ? "text-cyan-300 font-mono"
              : isPoster
              ? "text-red-900 font-bold text-center tracking-wide text-xs leading-tight"
              : isSpace
              ? "text-purple-100 font-medium text-center tracking-wide"
              : isCyber2077
              ? "text-yellow-300 font-bold tracking-wide"
              : "text-gray-900 dark:text-white"
          )}
        >
          {isRetro
            ? `> ${product.name}`
            : isPoster
            ? product.name.toUpperCase()
            : isSpace
            ? `⭐ ${product.name} ⭐`
            : isCyber2077
            ? product.name.toUpperCase()
            : product.name}
        </h4>
        <div className="flex items-center gap-2 mb-3 flex-shrink-0">
          <span
            className={cn(
              "text-lg font-bold",
              isRetro ? "text-green-400 font-mono" : "",
              isPoster ? "text-red-800 font-black text-lg" : "",
              isSpace ? "text-purple-200 font-semibold" : "",
              isCyber2077 ? "text-yellow-400 font-black" : ""
            )}
            style={{
              color: isRetro
                ? "#00ff00"
                : isPoster
                ? "#991b1b"
                : isSpace
                ? "#c084fc"
                : isCyber2077
                ? "#fcee09"
                : currentTheme.colors.primary,
            }}
          >
            {product.price}
          </span>
          {product.originalPrice && (
            <span
              className={cn(
                "text-xs line-through",
                isRetro ? "text-red-400 font-mono" : "text-gray-500",
                isPoster ? "text-red-600 font-semibold" : "",
                isSpace ? "text-purple-300 font-medium" : "",
                isCyber2077 ? "text-cyan-400 font-semibold" : ""
              )}
            >
              {product.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center mt-2 mb-3">
          <div
            className={cn(
              "flex text-sm",
              isRetro ? "text-yellow-300 font-mono" : "text-yellow-400",
              isPoster ? "text-yellow-600" : "",
              isSpace ? "text-cyan-300" : ""
            )}
          >
            {isRetro
              ? "[*****]"
              : isPoster
              ? "★★★★★"
              : isSpace
              ? "⭐⭐⭐⭐⭐"
              : "★".repeat(5)}
          </div>
          <span
            className={cn(
              "text-xs ml-2",
              isRetro ? "text-cyan-600 font-mono" : "text-gray-500",
              isPoster ? "text-red-700 font-semibold" : "",
              isSpace ? "text-purple-300 font-medium" : ""
            )}
          >
            {isPoster ? "(24 REVIEWS)" : isSpace ? "(24 REVIEWS)" : "(24)"}
          </span>
        </div>
        <div className="flex gap-1 mt-auto">
          <Button
            variant="secondary"
            className={cn(
              "flex-1 text-xs h-8",
              isRetro
                ? "border-cyan-500 text-cyan-100 hover:bg-cyan-900/20 font-mono bg-gray-900"
                : isPoster
                ? "border-red-600 text-red-800 hover:bg-red-50 font-bold tracking-wide bg-amber-50 border-2"
                : isSpace
                ? "border-purple-400 text-purple-200 hover:bg-purple-900/30 font-medium bg-slate-800 border-2"
                : isCyber2077
                ? "border-yellow-400 text-yellow-300 hover:bg-yellow-900/20 font-bold bg-black"
                : ""
            )}
            style={{ borderRadius: currentTheme.borderRadius.input }}
          >
            <Eye className="w-3 h-3 mr-1" />
            {isRetro
              ? "VIEW"
              : isSpace
              ? "SCAN"
              : isCyber2077
              ? "ANALYZE"
              : "View"}
          </Button>
          <Button
            className={cn(
              "flex-1 text-xs h-8",
              isRetro
                ? "text-black border border-cyan-500 font-mono"
                : isPoster
                ? "text-white font-bold tracking-wide border-2 border-yellow-500 shadow-md bg-red-700 hover:bg-red-800"
                : isSpace
                ? "text-white font-medium tracking-wide bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 border border-cyan-400"
                : isCyber2077
                ? "text-black font-bold tracking-wide bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 border border-cyan-400"
                : "text-white"
            )}
            style={{
              backgroundColor: isPoster
                ? "#b91c1c"
                : isRetro
                ? currentTheme.colors.primary
                : isSpace
                ? undefined
                : isCyber2077
                ? undefined
                : currentTheme.colors.primary,
              borderRadius: currentTheme.borderRadius.input,
            }}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            {isRetro ? "ADD" : isSpace ? "BEAM" : isCyber2077 ? "BUY" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChatContent({
  messages,
  isTyping,
  resetDemo,
  variant = "default",
  theme = "default",
  typingText = "",
  isUserTyping = false,
}: {
  messages: Message[];
  isTyping: boolean;
  resetDemo: () => void;
  variant?: "default" | "side-drawer" | "center" | "bottom-right";
  theme?: ThemeType;
  typingText?: string;
  isUserTyping?: boolean;
}) {
  const currentTheme = themes.find((t) => t.type === theme)!;
  const isRetro = theme === "retro";
  const isPoster = theme === "poster";
  const isSpace = theme === "space";
  const isCyber2077 = theme === "cyberpunk2077";
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div
      className={cn(
        "flex flex-col",
        variant === "side-drawer" ? "h-full" : "",
        isRetro ? "bg-black" : "",
        isPoster ? "bg-amber-50" : "",
        isSpace ? "bg-gradient-to-b from-slate-900 to-purple-900" : "",
        isCyber2077 ? "bg-black" : ""
      )}
    >
      {/* Chat Header */}
      <div
        className={cn(
          "text-gray-900 dark:text-white p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700",
          isRetro ? "bg-black border-cyan-500" : "bg-white dark:bg-gray-800",
          isPoster
            ? "bg-gradient-to-r from-red-600 to-orange-600 text-white border-red-700"
            : "",
          isSpace
            ? "bg-gradient-to-r from-slate-800 to-purple-900 text-purple-100 border-purple-500"
            : "",
          isCyber2077 ? "bg-black text-yellow-400 border-yellow-400" : ""
        )}
      >
        <div className="flex items-center space-x-3">
          <Icons.logo
            className="w-8 h-8"
            style={{ color: currentTheme.colors.logo }}
          />
          <div>
            <h3
              className={cn(
                "font-semibold",
                isRetro ? "text-cyan-400 font-mono" : "",
                isPoster ? "text-white font-bold text-lg tracking-wide" : "",
                isSpace
                  ? "text-purple-200 font-bold text-lg tracking-wider"
                  : "",
                isCyber2077
                  ? "text-yellow-400 font-bold text-lg tracking-wide"
                  : ""
              )}
            >
              {isRetro
                ? ">ARI_v2.1.exe"
                : isPoster
                ? "ARI SHOPKEEPER"
                : isSpace
                ? "🛸 ARI COSMIC ASSISTANT 🛸"
                : isCyber2077
                ? "ARI NEURAL INTERFACE"
                : "Ari - AI Shopkeeper"}
            </h3>
            <span
              className={cn(
                "text-sm",
                isRetro
                  ? "text-green-400 font-mono"
                  : "text-gray-600 dark:text-gray-400",
                isPoster ? "text-red-100 font-semibold tracking-wider" : "",
                isSpace ? "text-cyan-300 font-medium tracking-wide" : "",
                isCyber2077 ? "text-cyan-400 font-medium tracking-wide" : ""
              )}
            >
              {isRetro
                ? "[ONLINE] Ready to assist..."
                : isPoster
                ? "ALWAYS AT YOUR SERVICE!"
                : isSpace
                ? "🌌 ONLINE • Transmitting from the cosmos"
                : isCyber2077
                ? "NEURAL LINK ESTABLISHED • Night City Commerce"
                : "Online • Ready to help"}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={cn(
              "px-2 py-1 text-xs font-medium",
              isRetro ? "text-black font-mono font-bold" : "text-white",
              isPoster
                ? "text-white font-bold tracking-wider border-2 border-white"
                : "",
              isSpace
                ? "text-white font-bold tracking-wider border border-purple-400"
                : "",
              isCyber2077
                ? "text-black font-bold tracking-wider border border-cyan-400"
                : ""
            )}
            style={{
              backgroundColor: isPoster
                ? "transparent"
                : isSpace
                ? "transparent"
                : isCyber2077
                ? "#fcee09"
                : currentTheme.colors.primary,
              borderRadius: currentTheme.borderRadius.badge,
            }}
          >
            {isRetro
              ? "DEMO.EXE"
              : isPoster
              ? "LIVE DEMO"
              : isSpace
              ? "🚀 COSMIC DEMO"
              : isCyber2077
              ? "NEURAL DEMO"
              : "DEMO"}
          </span>
          <Button
            name="reset-demo"
            variant="secondary"
            onClick={resetDemo}
            className={cn(
              isRetro
                ? "text-cyan-400 hover:bg-cyan-900/20 border border-cyan-600"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
              isPoster
                ? "text-white hover:bg-white/20 border border-white"
                : "",
              isSpace
                ? "text-purple-200 hover:bg-purple-800/30 border border-purple-400"
                : "",
              isCyber2077
                ? "text-yellow-400 hover:bg-yellow-900/20 border border-yellow-400"
                : ""
            )}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={messagesContainerRef}
        className={cn(
          "overflow-y-auto p-4 space-y-4",
          variant === "side-drawer" ? "flex-1" : "h-[500px]",
          isRetro ? "bg-black" : "",
          isPoster ? "bg-gradient-to-b from-amber-50 to-orange-50" : "",
          isSpace ? "bg-gradient-to-b from-slate-900 to-purple-900" : "",
          isCyber2077 ? "bg-black" : ""
        )}
      >
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={cn(
                "flex",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "flex max-w-[80%] space-x-2",
                  message.isUser ? "flex-row-reverse space-x-reverse" : ""
                )}
              >
                {!message.isUser && (
                  <Icons.logo
                    className="w-6 h-6 mt-1 flex-shrink-0"
                    style={{ color: currentTheme.colors.logo }}
                  />
                )}
                <div
                  className={cn(
                    "px-4 py-2",
                    message.isUser
                      ? isRetro
                        ? "text-cyan-300 font-mono"
                        : isPoster
                        ? "text-red-800 font-semibold"
                        : isSpace
                        ? "text-purple-200 font-medium"
                        : isCyber2077
                        ? "text-yellow-300 font-medium"
                        : "text-gray-900"
                      : isRetro
                      ? "text-green-400 font-mono border border-green-600"
                      : isPoster
                      ? "text-red-700 font-medium border-2 border-red-300 bg-white shadow-md"
                      : isSpace
                      ? "text-cyan-200 font-medium border border-purple-400 bg-slate-800/50 shadow-lg"
                      : isCyber2077
                      ? "text-cyan-300 font-medium border border-yellow-400 bg-gray-900"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  )}
                  style={{
                    backgroundColor: message.isUser
                      ? isRetro
                        ? currentTheme.colors.secondary
                        : isPoster
                        ? currentTheme.colors.secondary
                        : isSpace
                        ? "#1e1b4b"
                        : isCyber2077
                        ? "#1a1a1a"
                        : currentTheme.colors.secondary
                      : isRetro
                      ? "#001a0d"
                      : isPoster
                      ? "#ffffff"
                      : isSpace
                      ? "#0f172a"
                      : isCyber2077
                      ? "#0a0a0a"
                      : undefined,
                    borderRadius: currentTheme.borderRadius.message,
                  }}
                >
                  {isRetro && !message.isUser && <span>&gt; </span>}
                  {isSpace && !message.isUser && <span>🛸 </span>}
                  {isCyber2077 && !message.isUser && <span>&gt;&gt; </span>}
                  {message.isHtml ? (
                    <div
                      className="space-y-2"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  )}
                </div>
                {message.isUser && (
                  <div
                    className={cn(
                      "w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0",
                      isRetro ? "border border-cyan-500" : "",
                      isPoster ? "border-2 border-red-500 bg-red-500" : "",
                      isSpace ? "border border-purple-400 bg-purple-600" : "",
                      isCyber2077
                        ? "border border-yellow-400 bg-yellow-400"
                        : ""
                    )}
                    style={{
                      backgroundColor: isRetro
                        ? "#001a1a"
                        : isPoster
                        ? currentTheme.colors.primary
                        : isSpace
                        ? "#8b5cf6"
                        : isCyber2077
                        ? "#fcee09"
                        : currentTheme.colors.secondary,
                      borderRadius: currentTheme.borderRadius.badge,
                    }}
                  >
                    <span
                      className={cn(
                        "text-xs font-medium",
                        isRetro ? "font-mono" : "",
                        isPoster ? "font-bold text-white" : "",
                        isSpace ? "font-bold text-white" : "",
                        isCyber2077 ? "font-bold text-black" : ""
                      )}
                      style={{
                        color: isPoster
                          ? "white"
                          : isSpace
                          ? "white"
                          : isCyber2077
                          ? "black"
                          : currentTheme.colors.logo,
                      }}
                    >
                      {isRetro
                        ? "$"
                        : isPoster
                        ? "C"
                        : isSpace
                        ? "👤"
                        : isCyber2077
                        ? "U"
                        : "U"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Cards */}
            {message.hasProducts && (
              <div className="mt-3 ml-8">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {dummyProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      theme={theme}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-2 max-w-[80%]">
              <Icons.logo
                className="w-6 h-6 mt-1 flex-shrink-0"
                style={{ color: currentTheme.colors.logo }}
              />
              <div
                className={cn(
                  "px-4 py-2",
                  isRetro
                    ? "bg-green-900/20 border border-green-600"
                    : "bg-gray-100 dark:bg-gray-700",
                  isPoster ? "bg-white border-2 border-red-300 shadow-md" : "",
                  isSpace
                    ? "bg-slate-800/50 border border-purple-400 shadow-lg"
                    : "",
                  isCyber2077 ? "bg-gray-900 border border-yellow-400" : ""
                )}
                style={{ borderRadius: currentTheme.borderRadius.message }}
              >
                <div className="flex space-x-1">
                  {isRetro ? (
                    <span className="text-green-400 font-mono animate-pulse">
                      &gt; Processing...
                    </span>
                  ) : isPoster ? (
                    <span className="text-red-700 font-semibold animate-pulse">
                      Preparing recommendations...
                    </span>
                  ) : isSpace ? (
                    <span className="text-cyan-300 font-medium animate-pulse">
                      🛸 Scanning the cosmos for products...
                    </span>
                  ) : isCyber2077 ? (
                    <span className="text-cyan-300 font-medium animate-pulse">
                      &gt;&gt; Processing neural data...
                    </span>
                  ) : (
                    <>
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: currentTheme.colors.primary,
                          animationDelay: "0ms",
                        }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: currentTheme.colors.primary,
                          animationDelay: "150ms",
                        }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: currentTheme.colors.primary,
                          animationDelay: "300ms",
                        }}
                      ></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div
        className={cn(
          "flex-shrink-0",
          isRetro ? "bg-black border-cyan-500" : "",
          isPoster
            ? "bg-gradient-to-r from-red-600 to-orange-600 border-red-700"
            : "",
          isSpace
            ? "bg-gradient-to-r from-slate-800 to-purple-900 border-purple-500"
            : "",
          isCyber2077 ? "bg-black border-yellow-400" : "",
          // Dark mode fallback for default theme
          !isRetro &&
            !isPoster &&
            !isSpace &&
            !isCyber2077 &&
            "bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800/50"
        )}
        style={{
          backgroundColor: isRetro
            ? "#000000"
            : isPoster
            ? undefined
            : isSpace
            ? undefined
            : isCyber2077
            ? "#000000"
            : undefined, // Let CSS classes handle default/dark mode
          borderTop: isRetro
            ? "1px solid #06b6d4"
            : isPoster
            ? "1px solid #b91c1c"
            : isSpace
            ? "1px solid #8b5cf6"
            : isCyber2077
            ? "1px solid #fcee09"
            : "", // Will be overridden by dark mode CSS if needed
          padding: "16px",
          borderRadius: "0px",
        }}
      >
        <div
          className={cn(
            "flex flex-col border",
            // Dark mode background and border fallbacks
            !isRetro &&
              !isPoster &&
              !isSpace &&
              !isCyber2077 &&
              "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700/50"
          )}
          style={{
            backgroundColor: isRetro
              ? "#001a1a"
              : isPoster
              ? "#ffffff"
              : isSpace
              ? "#1e293b"
              : isCyber2077
              ? "#111111"
              : undefined, // Let CSS classes handle default/dark mode
            borderColor: isRetro
              ? "#06b6d4"
              : isPoster
              ? "#dc2626"
              : isSpace
              ? "#8b5cf6"
              : isCyber2077
              ? "#fcee09"
              : "#d1d5db", // This will be overridden by CSS for dark mode
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: currentTheme.borderRadius.input,
          }}
        >
          {/* Text input area */}
          <div className="relative flex-1">
            <textarea
              name="message"
              placeholder={
                isUserTyping
                  ? ""
                  : isRetro
                  ? "> Enter command..."
                  : isPoster
                  ? "What can I help you find today?"
                  : isSpace
                  ? "🛸 Transmit your cosmic shopping request..."
                  : isCyber2077
                  ? ">> Enter neural query..."
                  : "Ask Ari about your Shopify store..."
              }
              value={isUserTyping ? typingText : ""}
              readOnly
              disabled={!isUserTyping}
              rows={1}
              className={cn(
                "w-full resize-none border-0 outline-none bg-transparent",
                "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
                isUserTyping ? "cursor-text" : "opacity-50 cursor-not-allowed",
                // Dark mode text color fallback
                !isRetro &&
                  !isPoster &&
                  !isSpace &&
                  !isCyber2077 &&
                  "text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              )}
              style={{
                color: isRetro
                  ? "#67e8f9"
                  : isPoster
                  ? "#991b1b"
                  : isSpace
                  ? "#c084fc"
                  : isCyber2077
                  ? "#fcee09"
                  : undefined, // Let CSS classes handle default/dark mode
                fontSize: "14px",
                lineHeight: "1.5",
                fontFamily: isRetro ? "monospace" : "inherit",
                fontWeight: "400",
                padding: "12px 16px",
                minHeight: "44px",
                maxHeight: "120px",
                opacity: isUserTyping ? 1 : 0.5,
              }}
            />
          </div>

          {/* Button bar at bottom */}
          <div className="flex items-center justify-between px-4 pb-3">
            {/* Left side icons */}
            <div className="flex items-center gap-2">
              {/* Image selector button */}
              <button
                id="image-upload-button"
                name="image-upload"
                disabled={!isUserTyping}
                className={cn(
                  "h-10 w-10 rounded-md p-1 border-none",
                  isUserTyping
                    ? "cursor-pointer opacity-70 hover:opacity-100"
                    : "opacity-50 cursor-not-allowed",
                  // Dark mode color fallback
                  !isRetro &&
                    !isPoster &&
                    !isSpace &&
                    !isCyber2077 &&
                    "text-gray-400 dark:text-gray-500"
                )}
                style={{
                  color: isRetro
                    ? "#6b7280"
                    : isPoster
                    ? "#9ca3af"
                    : isSpace
                    ? "#9ca3af"
                    : isCyber2077
                    ? "#6b7280"
                    : undefined, // Let CSS classes handle default/dark mode
                  backgroundColor: "transparent",
                }}
              >
                <Upload className="w-5 h-5" />
              </button>

              {/* Camera button */}
              <button
                id="camera-upload-button"
                name="camera-upload"
                disabled={!isUserTyping}
                className={cn(
                  "h-10 w-10 rounded-md p-1 border-none",
                  isUserTyping
                    ? "cursor-pointer opacity-70 hover:opacity-100"
                    : "opacity-50 cursor-not-allowed",
                  // Dark mode color fallback
                  !isRetro &&
                    !isPoster &&
                    !isSpace &&
                    !isCyber2077 &&
                    "text-gray-400 dark:text-gray-500"
                )}
                style={{
                  color: isRetro
                    ? "#6b7280"
                    : isPoster
                    ? "#9ca3af"
                    : isSpace
                    ? "#9ca3af"
                    : isCyber2077
                    ? "#6b7280"
                    : undefined, // Let CSS classes handle default/dark mode
                  backgroundColor: "transparent",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </button>
            </div>

            {/* Send button on the right */}
            <button
              id="send-message"
              name="send-message"
              disabled={!isUserTyping}
              className={cn(
                "flex items-center justify-center",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                isUserTyping
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              )}
              style={{
                width: "44px",
                height: "44px",
                minWidth: "44px",
                minHeight: "44px",
                padding: "8px",
                borderRadius: currentTheme.borderRadius.input,
                backgroundColor: currentTheme.colors.primary,
                border: "none",
                color: "#ffffff",
                opacity: isUserTyping ? 1 : 0.5,
                transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ChatbotDemoProps {
  placement?: PlacementType;
  theme?: ThemeType;
  onPlacementChange?: (placement: PlacementType) => void;
  onThemeChange?: (theme: ThemeType) => void;
}

export function ChatbotDemo({
  placement = "center",
  theme = "default",
  onPlacementChange,
  onThemeChange,
}: ChatbotDemoProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);

  // Helper function to simulate typing effect
  const simulateTyping = (text: string, callback: () => void) => {
    setIsUserTyping(true);
    setTypingText("");
    let currentIndex = 0;

    const typeChar = () => {
      if (currentIndex < text.length) {
        setTypingText(text.substring(0, currentIndex + 1));
        currentIndex++;
        // Much faster and smoother typing: 15-25ms per character
        setTimeout(typeChar, 15 + Math.random() * 10);
      } else {
        // Shorter pause at the end before sending
        setTimeout(() => {
          setIsUserTyping(false);
          setTypingText("");
          callback();
        }, 300);
      }
    };

    // Shorter initial delay before typing
    setTimeout(typeChar, 200);
  };

  useEffect(() => {
    if (currentMessageIndex < demoMessages.length) {
      const timer = setTimeout(
        () => {
          if (demoMessages[currentMessageIndex].isUser) {
            // User message gets typed first
            simulateTyping(demoMessages[currentMessageIndex].content, () => {
              setMessages((prev) => [
                ...prev,
                {
                  ...demoMessages[currentMessageIndex],
                  id: Date.now().toString(),
                  timestamp: new Date(),
                },
              ]);
              setCurrentMessageIndex((prev) => prev + 1);
            });
          } else {
            // Bot message has typing indicator
            setIsTyping(true);
            setTimeout(() => {
              const message = demoMessages[currentMessageIndex];
              const newMessage = {
                ...message,
                id: Date.now().toString(),
                timestamp: new Date(),
                // Convert markdown to HTML for the return policy message
                content: message.content === returnPolicyMarkdown 
                  ? parseMarkdownToHtml(message.content)
                  : message.content,
                isHtml: message.content === returnPolicyMarkdown ? true : message.isHtml,
              };
              
              setMessages((prev) => [...prev, newMessage]);
              setIsTyping(false);
              setCurrentMessageIndex((prev) => prev + 1);
            }, 800); // Reduced from 1500ms to 800ms
          }
        },
        currentMessageIndex === 0 ? 500 : 1000 // Reduced delays: first message 500ms, subsequent 1000ms
      );

      return () => clearTimeout(timer);
    } else if (currentMessageIndex >= demoMessages.length) {
      // Demo is complete, restart after a delay
      const restartTimer = setTimeout(() => {
        resetDemo();
      }, 2000); // Wait 2 seconds before restarting

      return () => clearTimeout(restartTimer);
    }
  }, [currentMessageIndex]);

  const resetDemo = () => {
    setMessages([]);
    setCurrentMessageIndex(0);
    setIsTyping(false);
    setTypingText("");
    setIsUserTyping(false);
  };

  return (
    <div className="relative">
      {/* Center Modal */}
      {placement === "center" && (
        <div className="relative h-[800px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Blurred Store Background */}
          <div className="absolute inset-0 filter blur-sm">
            <ShopifyStoreBackground theme={theme} />
          </div>

          {/* Modal Overlay */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center">
            <div
              className="w-full max-w-4xl mx-4 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
              style={{
                borderRadius: themes.find((t) => t.type === theme)!.borderRadius
                  .container,
              }}
            >
              <ChatContent
                messages={messages}
                isTyping={isTyping}
                resetDemo={resetDemo}
                variant="center"
                theme={theme}
                typingText={typingText}
                isUserTyping={isUserTyping}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Right Mode - Temporarily Disabled
      {false && placement === "bottom-right" && (
        <div className="relative h-[800px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="absolute inset-0 filter blur-sm">
            <ShopifyStoreBackground theme={theme} />
          </div>

          <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

          <div
            className="absolute bottom-6 right-6 w-80 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 z-10"
            style={{
              borderRadius: themes.find((t) => t.type === theme)!.borderRadius
                .container,
            }}
          >
            <ChatContent
              messages={messages}
              isTyping={isTyping}
              resetDemo={resetDemo}
              variant="bottom-right"
              theme={theme}
              typingText={typingText}
              isUserTyping={isUserTyping}
            />
          </div>
        </div>
      )} */}

      {/* Side Drawer */}
      {placement === "side-drawer" && (
        <div className="relative h-[800px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Blurred Store Background */}
          <div className="absolute inset-0 filter blur-sm">
            <ShopifyStoreBackground theme={theme} />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

          {/* Side Drawer */}
          <div
            className="absolute top-0 right-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-10"
            style={{
              borderTopLeftRadius: themes.find((t) => t.type === theme)!
                .borderRadius.container,
              borderBottomLeftRadius: themes.find((t) => t.type === theme)!
                .borderRadius.container,
            }}
          >
            <ChatContent
              messages={messages}
              isTyping={isTyping}
              resetDemo={resetDemo}
              variant="side-drawer"
              theme={theme}
              typingText={typingText}
              isUserTyping={isUserTyping}
            />
          </div>
        </div>
      )}
    </div>
  );
}
