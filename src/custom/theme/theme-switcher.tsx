// components/theme-switcher.tsx
"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";

const THEME_KEY = "theme";
const MEDIA_QUERY = "(prefers-color-scheme: dark)";

const themes = [
  { key: "system" as const, icon: Monitor, label: "System theme" },
  { key: "light" as const, icon: Sun, label: "Light theme" },
  { key: "dark" as const, icon: Moon, label: "Dark theme" },
];

// Optimized theme utilities
const getSystemTheme = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(MEDIA_QUERY).matches;

const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  try {
    return (localStorage.getItem(THEME_KEY) as Theme) || "system";
  } catch {
    return "system";
  }
};

const applyThemeToDOM = (theme: Theme) => {
  const root = document.documentElement;
  const isDark = theme === "dark" || (theme === "system" && getSystemTheme());

  // Add transitioning class to prevent flash
  root.classList.add("theme-transitioning");

  // Apply theme
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";

  // Remove transitioning class after a frame
  requestAnimationFrame(() => {
    root.classList.remove("theme-transitioning");
  });
};

export type ThemeSwitcherProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function ThemeSwitcher({ className, size = "md" }: ThemeSwitcherProps) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const mediaQueryRef = useRef<MediaQueryList | null>(null);
  const listenerRef = useRef<(() => void) | null>(null);

  const sizeClasses = {
    sm: { container: "h-6", button: "h-4 w-4", icon: "h-3 w-3" },
    md: { container: "h-8", button: "h-6 w-6", icon: "h-4 w-4" },
    lg: { container: "h-10", button: "h-8 w-8", icon: "h-5 w-5" },
  };

  const classes = sizeClasses[size];

  // Initialize theme from storage (useLayoutEffect to prevent flash)
  useLayoutEffect(() => {
    const storedTheme = getStoredTheme();
    setThemeState(storedTheme);
    applyThemeToDOM(storedTheme);
    setMounted(true);
  }, []);

  // Optimized system theme listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateSystemListener = () => {
      // Clean up previous listener
      if (mediaQueryRef.current && listenerRef.current) {
        mediaQueryRef.current.removeEventListener(
          "change",
          listenerRef.current
        );
      }

      // Only add listener if theme is system
      if (theme === "system") {
        mediaQueryRef.current = window.matchMedia(MEDIA_QUERY);
        listenerRef.current = () => applyThemeToDOM("system");
        mediaQueryRef.current.addEventListener("change", listenerRef.current);
      }
    };

    updateSystemListener();

    return () => {
      if (mediaQueryRef.current && listenerRef.current) {
        mediaQueryRef.current.removeEventListener(
          "change",
          listenerRef.current
        );
      }
    };
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);

    // Store preference
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch {
      // Silently ignore storage errors
    }

    // Apply theme immediately
    applyThemeToDOM(newTheme);
  }, []);

  // Render skeleton during hydration
  if (!mounted) {
    return (
      <div
        className={cn(
          "relative isolate flex rounded-full bg-background p-1 ring-1 ring-border",
          classes.container,
          className
        )}
      >
        {themes.map((_, index) => (
          <div
            key={index}
            className={cn(
              "rounded-full bg-muted/20 animate-pulse",
              classes.button
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate flex rounded-full bg-background p-1 ring-1 ring-border cursor-pointer",
        classes.container,
        className
      )}
      role="radiogroup"
      aria-label="Theme selection"
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            className={cn(
              "relative rounded-full transition-colors duration-200 cursor-pointer",
              "hover:bg-accent/50 active:bg-accent/70 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
              "disabled:pointer-events-none disabled:opacity-50",
              classes.button
            )}
            onClick={() => setTheme(key)}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary cursor-pointer"
                layoutId="theme-active-indicator"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 0.8,
                }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto transition-colors duration-200 cursor-pointer",
                classes.icon,
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
