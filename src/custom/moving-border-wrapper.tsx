"use client";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import React, { useMemo, useRef } from "react";

interface MovingBorderWrapperProps {
  children: React.ReactNode;
  duration?: number;
  borderRadius?: string;
  borderWidth?: string;
  gradientColors?: readonly string[];
  glowIntensity?: "low" | "medium" | "high";
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}

const GRADIENT_PRESETS = {
  green: ["#059669", "#00b64b", "#059669", "#16a34a"],
  blue: ["#0ea5e9", "#3b82f6", "#1d4ed8", "#2563eb"],
  purple: ["#8b5cf6", "#a855f7", "#9333ea", "#7c3aed"],
  gold: ["#f59e0b", "#eab308", "#d97706", "#f97316"],
} as const;

const GLOW_INTENSITIES = {
  low: "drop-shadow-sm",
  medium: "drop-shadow-md filter blur-[0.5px]",
  high: "drop-shadow-lg filter blur-[1px]",
} as const;

export const MovingBorderWrapper = React.memo<MovingBorderWrapperProps>(
  ({
    children,
    duration = 3000,
    borderRadius = "9999px",
    borderWidth = "1px",
    gradientColors = GRADIENT_PRESETS.green,
    glowIntensity = "medium",
    className = "",
    disabled = false,
    ...otherProps
  }) => {
    // Memoize gradient string to prevent unnecessary re-renders
    const gradientString = useMemo(() => {
      const colorStops = gradientColors
        .map((color, index) => {
          const percentage = (index / (gradientColors.length - 1)) * 100;
          return `${color} ${percentage}%`;
        })
        .join(", ");
      return `conic-gradient(from 0deg, ${colorStops})`;
    }, [gradientColors]);

    // Memoize border element with proper gradient and glow
    const borderElement = useMemo(
      () => (
        <div
          className={`h-20 w-24 rounded-full ${GLOW_INTENSITIES[glowIntensity]} opacity-90`}
          style={{
            background: gradientString,
            filter: disabled ? "grayscale(1) opacity(0.3)" : undefined,
          }}
        />
      ),
      [gradientString, glowIntensity, disabled]
    );

    if (disabled) {
      return (
        <div
          className={`relative bg-transparent ${className}`}
          style={{
            borderRadius,
            padding: borderWidth,
          }}
          {...otherProps}
        >
          <div className="relative z-10 opacity-50">{children}</div>
        </div>
      );
    }

    return (
      <div
        className={`relative overflow-hidden bg-transparent ${className}`}
        style={{
          borderRadius,
          padding: borderWidth,
        }}
        {...otherProps}
      >
        {/* Moving border layer with improved performance */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
        >
          <MovingBorder
            duration={duration}
            rx="30%"
            ry="30%"
            borderElement={borderElement}
          />
        </div>

        {/* Content layer with proper stacking */}
        <div className="relative z-10 will-change-auto">{children}</div>
      </div>
    );
  }
);

MovingBorderWrapper.displayName = "MovingBorderWrapper";

interface MovingBorderProps {
  borderElement: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}

const MovingBorder = React.memo<MovingBorderProps>(
  ({ borderElement, duration = 3000, rx, ry, ...otherProps }) => {
    const pathRef = useRef<SVGRectElement>(null);
    const progress = useMotionValue<number>(0);

    // Optimize animation frame with proper cleanup
    useAnimationFrame((time) => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      if (length > 0) {
        const pxPerMillisecond = length / duration;
        progress.set((time * pxPerMillisecond) % length);
      }
    });

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
      <>
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
      </>
    );
  }
);

MovingBorder.displayName = "MovingBorder";

// Export gradient presets for easy use
export { GRADIENT_PRESETS };
