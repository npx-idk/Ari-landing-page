"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { AnimatedGroup } from "../motion/animated-group";
import { Button } from "../ui/button";

// Types
type Theme = "light" | "dark" | "system";
type Size = "sm" | "md" | "lg";

// Constants
const THEME_KEY = "theme" as const;
const MEDIA_QUERY = "(prefers-color-scheme: dark)" as const;
const TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.8,
} as const;

// Theme configuration
const THEME_CONFIG = [
  { key: "light" as const, icon: Sun, label: "Light theme" },
  { key: "dark" as const, icon: Moon, label: "Dark theme" },
] as const;

// Size variants
const SIZE_VARIANTS = {
  sm: { container: "h-6 gap-x-0.5", button: "h-4 w-4", icon: "h-3 w-3" },
  md: { container: "h-8 gap-x-0.5", button: "h-6 w-6", icon: "h-4 w-4" },
  lg: { container: "h-10 gap-x-1", button: "h-8 w-8", icon: "h-5 w-5" },
} as const;

// Utility functions (moved outside component for better performance)
const getSystemTheme = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(MEDIA_QUERY).matches;

const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem(THEME_KEY) as Theme;
    return stored || "dark";
  } catch {
    return "dark";
  }
};

const applyThemeToDOM = (theme: Theme): void => {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  const isDark = theme === "dark" || (theme === "system" && getSystemTheme());

  // Batch DOM updates
  requestAnimationFrame(() => {
    root.classList.add("theme-transitioning");
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";

    // Clean up transition class
    requestAnimationFrame(() => {
      root.classList.remove("theme-transitioning");
    });
  });
};

// Custom hook for theme management
const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Initialize theme (prevents flash)
  useLayoutEffect(() => {
    const storedTheme = getStoredTheme();
    setThemeState(storedTheme);
    applyThemeToDOM(storedTheme);
    setMounted(true);
  }, []);

  // System theme listener with cleanup
  useEffect(() => {
    if (typeof window === "undefined" || theme !== "system") return;

    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    const handleChange = () => applyThemeToDOM("system");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);

    // Persist theme preference
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch {
      // Silently handle storage errors
    }

    applyThemeToDOM(newTheme);
  }, []);

  return { theme, setTheme, mounted };
};

// Skeleton component for hydration
const ThemeSwitcherSkeleton = memo(
  ({ className, size }: { className?: string; size: Size }) => {
    const { container, button } = SIZE_VARIANTS[size];

    return (
      <div
        className={cn(
          "relative flex rounded-full bg-background p-1 ring-1 ring-border w-fit",
          container,
          className
        )}
      >
        {THEME_CONFIG.map((config, index) => (
          <div
            key={index}
            className={cn(
              "rounded-full animate-pulse",
              button,
              // Show dark theme as active by default during skeleton state
              config.key === "dark" ? "bg-secondary" : "bg-muted/20"
            )}
          />
        ))}
      </div>
    );
  }
);

ThemeSwitcherSkeleton.displayName = "ThemeSwitcherSkeleton";

// Theme button component
const ThemeButton = memo(
  ({
    themeKey,
    icon: Icon,
    label,
    isActive,
    onClick,
    buttonClass,
    iconClass,
  }: {
    themeKey: Theme;
    icon: typeof Sun;
    label: string;
    isActive: boolean;
    onClick: (theme: Theme) => void;
    buttonClass: string;
    iconClass: string;
  }) => (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      role="radio"
      aria-checked={isActive}
      aria-label={label}
      className={cn(
        "relative rounded-full p-0 transition-colors duration-200 cursor-pointer",
        "hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring",
        buttonClass
      )}
      onClick={() => onClick(themeKey)}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full bg-secondary"
          layoutId="theme-active-indicator"
          initial={false}
          transition={TRANSITION_CONFIG}
        />
      )}
      <Icon
        className={cn(
          "relative z-10 transition-colors duration-200",
          iconClass,
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      />
    </Button>
  )
);

ThemeButton.displayName = "ThemeButton";

// Props interface
export interface ThemeSwitcherProps {
  className?: string;
  size?: Size;
}

// Main component
export const ThemeSwitcher = memo(
  ({ className, size = "md" }: ThemeSwitcherProps) => {
    const { theme, setTheme, mounted } = useTheme();

    // Memoize size classes
    const sizeClasses = useMemo(() => SIZE_VARIANTS[size], [size]);

    return (
      <div
        className={cn(
          "relative isolate flex rounded-full bg-background p-1 ring-1 ring-border w-fit",
          sizeClasses.container,
          className
        )}
        role="radiogroup"
        aria-label="Theme selection"
      >
        {THEME_CONFIG.map(({ key, icon, label }) => (
          <ThemeButton
            key={key}
            themeKey={key}
            icon={icon}
            label={label}
            isActive={mounted ? theme === key : key === "dark"}
            onClick={setTheme}
            buttonClass={sizeClasses.button}
            iconClass={sizeClasses.icon}
          />
        ))}
      </div>
    );
  }
);

ThemeSwitcher.displayName = "ThemeSwitcher";

// Alternative version with TextEffect and AnimatedGroup
export const AnimatedThemeSwitcher = memo(
  ({ className, size = "md" }: ThemeSwitcherProps) => {
    const { theme, setTheme, mounted } = useTheme();
    const sizeClasses = useMemo(() => SIZE_VARIANTS[size], [size]);

    return (
      <AnimatedGroup
        preset="scale"
        className={cn(
          "relative isolate flex rounded-full bg-background p-1 ring-1 ring-border w-fit",
          sizeClasses.container,
          className
        )}
        aria-label="Theme selection"
        viewportBehavior="once"
      >
        {THEME_CONFIG.map(({ key, icon, label }) => (
          <ThemeButton
            key={key}
            themeKey={key}
            icon={icon}
            label={label}
            isActive={mounted ? theme === key : key === "dark"}
            onClick={setTheme}
            buttonClass={sizeClasses.button}
            iconClass={sizeClasses.icon}
          />
        ))}
      </AnimatedGroup>
    );
  }
);

AnimatedThemeSwitcher.displayName = "AnimatedThemeSwitcher";

export default ThemeSwitcher;
