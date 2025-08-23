"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { AnimatedGroup } from "./animated-group";

// Types
interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  disabled?: boolean;
  variant?: "default" | "subtle" | "intense";
}

interface AnimatedMagicCardProps extends MagicCardProps {
  animationPreset?: "scale" | "fade" | "blur-slide";
}

// Constants
const DEFAULT_GRADIENT_SIZE = 200;
const DEFAULT_GRADIENT_COLOR = "oklch(0.96 0.02 176.5 / 0.1)";
const DEFAULT_GRADIENT_OPACITY = 0.8;
const DEFAULT_GRADIENT_FROM = "oklch(0.74 0.23 176.5)";
const DEFAULT_GRADIENT_TO = "oklch(0.88 0.14 176.5)";

const VARIANT_CONFIG = {
  default: {
    gradientOpacity: 0.8,
    gradientSize: 200,
    borderOpacity: "group-hover:opacity-100",
    overlayOpacity: "group-hover:opacity-100",
  },
  subtle: {
    gradientOpacity: 0.4,
    gradientSize: 150,
    borderOpacity: "group-hover:opacity-60",
    overlayOpacity: "group-hover:opacity-60",
  },
  intense: {
    gradientOpacity: 1.0,
    gradientSize: 250,
    borderOpacity: "group-hover:opacity-100",
    overlayOpacity: "group-hover:opacity-100",
  },
} as const;

// Custom hook for mouse tracking
const useMouseTracking = (gradientSize: number, disabled: boolean = false) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const isTrackingRef = useRef(false);

  const updateMousePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!cardRef.current || disabled) return;

      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(clientX - rect.left);
      mouseY.set(clientY - rect.top);
    },
    [mouseX, mouseY, disabled]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isTrackingRef.current && !disabled) {
        updateMousePosition(e.clientX, e.clientY);
      }
    },
    [updateMousePosition, disabled]
  );

  const startTracking = useCallback(() => {
    if (disabled) return;

    isTrackingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
  }, [handleMouseMove, disabled]);

  const stopTracking = useCallback(() => {
    isTrackingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);

    // Animate out smoothly
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [handleMouseMove, mouseX, mouseY, gradientSize]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      startTracking();
      updateMousePosition(e.clientX, e.clientY);
    },
    [startTracking, updateMousePosition, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    stopTracking();
  }, [stopTracking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isTrackingRef.current) {
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  // Reset position when gradient size changes
  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  return {
    cardRef,
    mouseX,
    mouseY,
    handleMouseEnter,
    handleMouseLeave,
  };
};

// Gradient background component
const GradientBackground = memo(
  ({
    mouseX,
    mouseY,
    gradientSize,
    gradientFrom,
    gradientTo,
    variant,
  }: {
    mouseX: any;
    mouseY: any;
    gradientSize: number;
    gradientFrom: string;
    gradientTo: string;
    variant: keyof typeof VARIANT_CONFIG;
  }) => {
    const config = VARIANT_CONFIG[variant];

    const backgroundTemplate = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      var(--border) 100%
    )
  `;

    return (
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] bg-border duration-300 opacity-0",
          config.borderOpacity
        )}
        style={{ background: backgroundTemplate }}
      />
    );
  }
);

GradientBackground.displayName = "GradientBackground";

// Gradient overlay component
const GradientOverlay = memo(
  ({
    mouseX,
    mouseY,
    gradientSize,
    gradientColor,
    gradientOpacity,
    variant,
  }: {
    mouseX: any;
    mouseY: any;
    gradientSize: number;
    gradientColor: string;
    gradientOpacity: number;
    variant: keyof typeof VARIANT_CONFIG;
  }) => {
    const config = VARIANT_CONFIG[variant];

    const overlayTemplate = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 100%
    )
  `;

    return (
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300",
          config.overlayOpacity
        )}
        style={{
          background: overlayTemplate,
          opacity: gradientOpacity,
        }}
      />
    );
  }
);

GradientOverlay.displayName = "GradientOverlay";

// Main MagicCard component
export const MagicCard = memo<MagicCardProps>(
  ({
    children,
    className,
    gradientSize = DEFAULT_GRADIENT_SIZE,
    gradientColor = DEFAULT_GRADIENT_COLOR,
    gradientOpacity = DEFAULT_GRADIENT_OPACITY,
    gradientFrom = DEFAULT_GRADIENT_FROM,
    gradientTo = DEFAULT_GRADIENT_TO,
    disabled = false,
    variant = "default",
  }) => {
    const config = useMemo(() => VARIANT_CONFIG[variant], [variant]);
    const effectiveGradientSize = config.gradientSize;
    const effectiveGradientOpacity = config.gradientOpacity * gradientOpacity;

    const { cardRef, mouseX, mouseY, handleMouseEnter, handleMouseLeave } =
      useMouseTracking(effectiveGradientSize, disabled);

    return (
      <div
        ref={cardRef}
        className={cn(
          "group relative rounded-[inherit] transition-transform duration-200",
          !disabled && "hover:scale-[1.01]",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role={disabled ? undefined : "button"}
        tabIndex={disabled ? -1 : 0}
      >
        {/* Border gradient */}
        <GradientBackground
          mouseX={mouseX}
          mouseY={mouseY}
          gradientSize={effectiveGradientSize}
          gradientFrom={gradientFrom}
          gradientTo={gradientTo}
          variant={variant}
        />

        {/* Card background */}
        <div className="absolute inset-px rounded-[inherit] bg-background" />

        {/* Hover overlay */}
        <GradientOverlay
          mouseX={mouseX}
          mouseY={mouseY}
          gradientSize={effectiveGradientSize}
          gradientColor={gradientColor}
          gradientOpacity={effectiveGradientOpacity}
          variant={variant}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

MagicCard.displayName = "MagicCard";

// Animated version with AnimatedGroup support
export const AnimatedMagicCard = memo<AnimatedMagicCardProps>(
  ({ animationPreset = "scale", ...props }) => (
    <AnimatedGroup
      preset={animationPreset}
      viewportBehavior="once"
      className="h-fit"
    >
      <MagicCard {...props} />
    </AnimatedGroup>
  )
);

AnimatedMagicCard.displayName = "AnimatedMagicCard";

// Card variants for common use cases
export const MagicCardVariants = {
  Default: MagicCard,
  Animated: AnimatedMagicCard,

  // Pre-configured variants
  Subtle: memo<Omit<MagicCardProps, "variant">>((props) => (
    <MagicCard {...props} variant="subtle" />
  )),

  Intense: memo<Omit<MagicCardProps, "variant">>((props) => (
    <MagicCard {...props} variant="intense" />
  )),

  // Themed variants
  Purple: memo<Omit<MagicCardProps, "gradientFrom" | "gradientTo">>((props) => (
    <MagicCard {...props} gradientFrom="#8B5CF6" gradientTo="#A78BFA" />
  )),

  Blue: memo<Omit<MagicCardProps, "gradientFrom" | "gradientTo">>((props) => (
    <MagicCard {...props} gradientFrom="#3B82F6" gradientTo="#60A5FA" />
  )),

  Green: memo<Omit<MagicCardProps, "gradientFrom" | "gradientTo">>((props) => (
    <MagicCard {...props} gradientFrom="#10B981" gradientTo="#34D399" />
  )),
};

// Export default
export default MagicCard;
