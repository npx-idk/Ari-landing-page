"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatedGroup } from "./animated-group";

// Types
interface MovingBorderWrapperProps {
  children: React.ReactNode;
  duration?: number;
  borderRadius?: string;
  borderWidth?: string;
  gradientColors?: readonly string[];
  glowIntensity?: GlowIntensity;
  className?: string;
  disabled?: boolean;
  variant?: BorderVariant;
  speed?: "slow" | "normal" | "fast";
  size?: BorderSize;
  pauseOnHover?: boolean;
  direction?: "clockwise" | "counterclockwise";
  [key: string]: any;
}

interface AnimatedMovingBorderProps extends MovingBorderWrapperProps {
  animationPreset?: "scale" | "fade" | "blur-slide";
}

interface MovingBorderProps {
  borderElement: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  disabled?: boolean;
  pauseOnHover?: boolean;
  direction?: "clockwise" | "counterclockwise";
  [key: string]: any;
}

// Constants and Types
type GlowIntensity = "none" | "low" | "medium" | "high" | "ultra";
type BorderVariant = "default" | "neon" | "soft" | "intense";
type BorderSize = "sm" | "md" | "lg" | "xl";

const GRADIENT_PRESETS = {
  green: ["#059669", "#00b64b", "#059669", "#16a34a"] as const,
  blue: ["#0ea5e9", "#3b82f6", "#1d4ed8", "#2563eb"] as const,
  purple: ["#8b5cf6", "#a855f7", "#9333ea", "#7c3aed"] as const,
  gold: ["#f59e0b", "#eab308", "#d97706", "#f97316"] as const,
  red: ["#ef4444", "#dc2626", "#b91c1c", "#991b1b"] as const,
  cyan: ["#06b6d4", "#0891b2", "#0e7490", "#155e75"] as const,
  pink: ["#ec4899", "#db2777", "#be185d", "#9d174d"] as const,
  emerald: ["#10b981", "#059669", "#047857", "#065f46"] as const,
} as const;

const GLOW_INTENSITIES = {
  none: "",
  low: "drop-shadow-sm",
  medium: "drop-shadow-md filter blur-[0.5px]",
  high: "drop-shadow-lg filter blur-[1px]",
  ultra: "drop-shadow-xl filter blur-[2px]",
} as const;

const VARIANT_CONFIG = {
  default: {
    opacity: "opacity-90",
    filter: "",
    borderOpacity: 0.9,
  },
  neon: {
    opacity: "opacity-100",
    filter: "brightness(1.2) saturate(1.3)",
    borderOpacity: 1.0,
  },
  soft: {
    opacity: "opacity-60",
    filter: "brightness(0.8)",
    borderOpacity: 0.6,
  },
  intense: {
    opacity: "opacity-100",
    filter: "brightness(1.4) saturate(1.5)",
    borderOpacity: 1.0,
  },
} as const;

const SIZE_CONFIG = {
  sm: { height: "h-12", width: "w-16", borderWidth: "1px" },
  md: { height: "h-16", width: "w-20", borderWidth: "1.5px" },
  lg: { height: "h-20", width: "w-24", borderWidth: "2px" },
  xl: { height: "h-24", width: "w-28", borderWidth: "2.5px" },
} as const;

const SPEED_CONFIG = {
  slow: 5000,
  normal: 3000,
  fast: 1500,
} as const;

// Utility functions
const createGradientString = (colors: readonly string[]): string => {
  const colorStops = colors
    .map((color, index) => {
      const percentage = (index / (colors.length - 1)) * 100;
      return `${color} ${percentage}%`;
    })
    .join(", ");
  return `conic-gradient(from 0deg, ${colorStops})`;
};

// Custom hooks
const useMovingBorderAnimation = (
  duration: number,
  disabled: boolean,
  pauseOnHover: boolean,
  direction: "clockwise" | "counterclockwise"
) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const lastTimeRef = useRef<number>(0);
  const accumulatedProgressRef = useRef<number>(0);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = time;
      return;
    }

    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    if (length <= 0) return;

    // Calculate delta time to handle pause/resume smoothly
    const deltaTime = lastTimeRef.current ? time - lastTimeRef.current : 0;
    lastTimeRef.current = time;

    // Update accumulated progress
    const pxPerMillisecond = length / duration;
    const deltaProgress = deltaTime * pxPerMillisecond;

    accumulatedProgressRef.current +=
      direction === "clockwise" ? deltaProgress : -deltaProgress;

    // Wrap around the path length
    let normalizedProgress = accumulatedProgressRef.current % length;
    if (normalizedProgress < 0) normalizedProgress += length;

    progress.set(normalizedProgress);
  });

  // Reset on duration change
  useEffect(() => {
    accumulatedProgressRef.current = 0;
    progress.set(0);
  }, [duration, progress]);

  return {
    pathRef,
    progress,
    handleMouseEnter,
    handleMouseLeave,
  };
};

// Border element component
const BorderElement = memo<{
  gradientString: string;
  glowIntensity: GlowIntensity;
  variant: BorderVariant;
  size: BorderSize;
  disabled: boolean;
}>(({ gradientString, glowIntensity, variant, size, disabled }) => {
  const variantConfig = VARIANT_CONFIG[variant];
  const sizeConfig = SIZE_CONFIG[size];

  return (
    <div
      className={cn(
        "rounded-full transition-all duration-300",
        sizeConfig.height,
        sizeConfig.width,
        GLOW_INTENSITIES[glowIntensity],
        variantConfig.opacity
      )}
      style={{
        background: gradientString,
        filter: disabled
          ? "grayscale(1) opacity(0.3)"
          : variantConfig.filter || undefined,
        opacity: disabled ? 0.3 : variantConfig.borderOpacity,
      }}
    />
  );
});

BorderElement.displayName = "BorderElement";

// Moving border component
const MovingBorder = memo<MovingBorderProps>(
  ({
    borderElement,
    duration = 3000,
    rx = "30%",
    ry = "30%",
    disabled = false,
    pauseOnHover = false,
    direction = "clockwise",
    ...otherProps
  }) => {
    const { pathRef, progress, handleMouseEnter, handleMouseLeave } =
      useMovingBorderAnimation(duration, disabled, pauseOnHover, direction);

    // Memoize transforms for better performance
    const x = useTransform(progress, (val) => {
      const path = pathRef.current;
      return path ? path.getPointAtLength(val).x : 0;
    });

    const y = useTransform(progress, (val) => {
      const path = pathRef.current;
      return path ? path.getPointAtLength(val).y : 0;
    });

    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute h-full w-full pointer-events-none"
          width="100%"
          height="100%"
          {...otherProps}
        >
          <rect
            fill="none"
            width="90%"
            height="100%"
            rx={rx}
            ry={ry}
            ref={pathRef}
          />
        </svg>
        <motion.div
          className="absolute top-0 left-0 pointer-events-none will-change-transform"
          style={{
            display: "inline-block",
            transform,
          }}
        >
          {borderElement}
        </motion.div>
      </div>
    );
  }
);

MovingBorder.displayName = "MovingBorder";

// Main component
export const MovingBorderWrapper = memo<MovingBorderWrapperProps>(
  ({
    children,
    duration,
    borderRadius = "9999px",
    borderWidth,
    gradientColors = GRADIENT_PRESETS.green,
    glowIntensity = "medium",
    className,
    disabled = false,
    variant = "default",
    speed = "normal",
    size = "md",
    pauseOnHover = false,
    direction = "clockwise",
    ...otherProps
  }) => {
    // Resolve duration from speed if not provided
    const effectiveDuration = duration ?? SPEED_CONFIG[speed];

    // Resolve border width from size if not provided
    const effectiveBorderWidth = borderWidth ?? SIZE_CONFIG[size].borderWidth;

    // Memoize gradient string to prevent unnecessary re-renders
    const gradientString = useMemo(
      () => createGradientString(gradientColors),
      [gradientColors]
    );

    // Memoize border element
    const borderElement = useMemo(
      () => (
        <BorderElement
          gradientString={gradientString}
          glowIntensity={glowIntensity}
          variant={variant}
          size={size}
          disabled={disabled}
        />
      ),
      [gradientString, glowIntensity, variant, size, disabled]
    );

    if (disabled) {
      return (
        <div
          className={cn(
            "relative bg-transparent transition-opacity duration-300",
            className
          )}
          style={{
            borderRadius,
            padding: effectiveBorderWidth,
          }}
          {...otherProps}
        >
          <div className="relative z-10 opacity-50 transition-opacity duration-300">
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "relative overflow-hidden bg-transparent transition-all duration-300",
          className
        )}
        style={{
          borderRadius,
          padding: effectiveBorderWidth,
        }}
        {...otherProps}
      >
        {/* Moving border layer */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            borderRadius: `calc(${borderRadius} * 0.96)`,
          }}
        >
          <MovingBorder
            duration={effectiveDuration}
            rx="30%"
            ry="30%"
            borderElement={borderElement}
            disabled={disabled}
            pauseOnHover={pauseOnHover}
            direction={direction}
          />
        </div>

        {/* Content layer */}
        <div className="relative z-10 will-change-auto transition-transform duration-200">
          {children}
        </div>
      </div>
    );
  }
);

MovingBorderWrapper.displayName = "MovingBorderWrapper";

// Animated version with AnimatedGroup support
export const AnimatedMovingBorderWrapper = memo<AnimatedMovingBorderProps>(
  ({ animationPreset = "scale", ...props }) => (
    <AnimatedGroup
      preset={animationPreset}
      viewportBehavior="once"
      className="h-fit"
    >
      <MovingBorderWrapper {...props} />
    </AnimatedGroup>
  )
);

AnimatedMovingBorderWrapper.displayName = "AnimatedMovingBorderWrapper";

// Pre-configured variants
export const MovingBorderVariants = {
  Default: MovingBorderWrapper,
  Animated: AnimatedMovingBorderWrapper,

  // Intensity variants
  Subtle: memo<Omit<MovingBorderWrapperProps, "variant" | "glowIntensity">>(
    (props) => (
      <MovingBorderWrapper
        children
        {...props}
        variant="soft"
        glowIntensity="low"
      />
    )
  ),

  Neon: memo<Omit<MovingBorderWrapperProps, "variant" | "glowIntensity">>(
    (props) => (
      <MovingBorderWrapper
        children
        {...props}
        variant="neon"
        glowIntensity="high"
      />
    )
  ),

  Intense: memo<Omit<MovingBorderWrapperProps, "variant" | "glowIntensity">>(
    (props) => (
      <MovingBorderWrapper
        children
        {...props}
        variant="intense"
        glowIntensity="ultra"
      />
    )
  ),

  // Size variants
  Small: memo<Omit<MovingBorderWrapperProps, "size">>((props) => (
    <MovingBorderWrapper children {...props} size="sm" />
  )),

  Large: memo<Omit<MovingBorderWrapperProps, "size">>((props) => (
    <MovingBorderWrapper children {...props} size="lg" />
  )),

  // Themed variants
  Purple: memo<Omit<MovingBorderWrapperProps, "gradientColors">>((props) => (
    <MovingBorderWrapper
      children
      {...props}
      gradientColors={GRADIENT_PRESETS.purple}
    />
  )),

  Blue: memo<Omit<MovingBorderWrapperProps, "gradientColors">>((props) => (
    <MovingBorderWrapper
      children
      {...props}
      gradientColors={GRADIENT_PRESETS.blue}
    />
  )),

  Gold: memo<Omit<MovingBorderWrapperProps, "gradientColors">>((props) => (
    <MovingBorderWrapper
      children
      {...props}
      gradientColors={GRADIENT_PRESETS.gold}
    />
  )),

  Red: memo<Omit<MovingBorderWrapperProps, "gradientColors">>((props) => (
    <MovingBorderWrapper
      children
      {...props}
      gradientColors={GRADIENT_PRESETS.red}
    />
  )),
};

// Export gradient presets and configurations
export {
  GLOW_INTENSITIES,
  GRADIENT_PRESETS,
  SIZE_CONFIG,
  SPEED_CONFIG,
  VARIANT_CONFIG,
};
export default MovingBorderWrapper;
