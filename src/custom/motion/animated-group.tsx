"use client";

import { motion, Variants } from "motion/react";
import React, { JSX, ReactNode, useMemo } from "react";

export type PresetType =
  | "fade"
  | "slide"
  | "scale"
  | "blur"
  | "blur-slide"
  | "blur-slide-in-out"
  | "zoom"
  | "flip"
  | "bounce"
  | "rotate"
  | "swing";

export type ViewportBehavior =
  | "immediate"
  | "once"
  | "loop"
  | "continuous-loop"
  | "pulse-loop";

export interface AnimatedGroupProps {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: React.ElementType;
  asChild?: React.ElementType;
  viewportBehavior?: ViewportBehavior;
  staggerDelay?: number;
  pulseLoop?: boolean; // Whether continuous-loop should return to hidden state
  duration?: number; // Custom duration in seconds - overrides preset durations
  pauseDuration?: number; // Pause duration between pulse loops in seconds
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | "some" | "all";
  };
}

// Optimized constants - computed once at module level
const BASE_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  loop: { opacity: 1 }, // New loop state
} as const;

const BASE_CONTAINER_VARIANTS: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  loop: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  pulseLoop: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

// Enhanced preset variants with built-in loop animations
const PRESET_VARIANTS: Record<PresetType, Variants> = {
  fade: {
    loop: {
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
    pulseLoop: {
      opacity: [0, 1, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 0.8,
      },
    },
  },
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
    loop: {
      y: [0, -5, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
    pulseLoop: {
      y: [20, 0, 20],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1,
      },
    },
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
    loop: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
    pulseLoop: {
      scale: [0.8, 1, 0.8],
      opacity: [0, 1, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 0.8,
      },
    },
  },
  blur: {
    hidden: { filter: "blur(4px)" },
    visible: { filter: "blur(0px)" },
    loop: {
      filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
    pulseLoop: {
      filter: ["blur(4px)", "blur(0px)", "blur(4px)"],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1,
      },
    },
  },
  "blur-slide": {
    hidden: { filter: "blur(4px)", y: 20, opacity: 0 },
    visible: { filter: "blur(0px)", y: 0, opacity: 1 },
    loop: {
      filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
      y: [0, -3, 0],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
    pulseLoop: {
      filter: ["blur(4px)", "blur(0px)", "blur(4px)"],
      y: [20, 0, 20],
      opacity: [0, 1, 0],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1, // Pause between cycles
      },
    },
  },
  "blur-slide-in-out": {
    hidden: { filter: "blur(4px)", y: 20, opacity: 0 },
    visible: { filter: "blur(0px)", y: 0, opacity: 1 },
    loop: {
      filter: ["blur(0px)", "blur(4px)", "blur(0px)"],
      y: [0, -20, 0], // Exit up, enter from bottom
      opacity: [1, 0, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
    pulseLoop: {
      filter: ["blur(4px)", "blur(0px)", "blur(4px)"],
      y: [20, 0, 0, -20, 20], // Enter from bottom, exit to top, return from bottom
      opacity: [0, 1, 1, 0, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1.5,
      },
    },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    loop: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
    pulseLoop: {
      scale: [0.5, 1, 0.5],
      opacity: [0, 1, 0],
      transition: {
        duration: 2.8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1,
      },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    loop: {
      rotateY: [0, 10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
    pulseLoop: {
      rotateX: [-90, 0, -90],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1.2,
      },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    loop: {
      y: [0, -10, 0],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
    pulseLoop: {
      y: [-50, 0, -50],
      opacity: [0, 1, 0],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1,
      },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    loop: {
      rotate: [0, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      },
    },
    pulseLoop: {
      rotate: [-180, 0, -180],
      opacity: [0, 1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1.5,
      },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 8 },
    },
    loop: {
      rotate: [-2, 2, -2],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
    pulseLoop: {
      rotate: [-10, 0, -10],
      opacity: [0, 1, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1,
      },
    },
  },
} as const;

// Utility function to apply custom duration to transitions

const applyCustomDuration = (
  variants: Variants,
  duration?: number,
  pauseDuration?: number
): Variants => {
  if (!duration && !pauseDuration) return variants;

  const updatedVariants: Variants = { ...variants };

  ["loop", "pulseLoop"].forEach((state) => {
    const variant = variants[state];

    // Type guard to check if variant is an object with transition property
    if (
      variant &&
      typeof variant === "object" &&
      !Array.isArray(variant) &&
      "transition" in variant
    ) {
      updatedVariants[state] = {
        ...variant,
        transition: {
          ...variant.transition,
          ...(duration && { duration }),
          ...(pauseDuration &&
            state === "pulseLoop" && { repeatDelay: pauseDuration }),
        },
      };
    }
  });

  return updatedVariants;
};

// Utility function to merge variants efficiently
const mergeVariants = (base: Variants, override: Variants): Variants => ({
  hidden: { ...base.hidden, ...override.hidden },
  visible: { ...base.visible, ...override.visible },
  loop: { ...base.loop, ...override.loop },
  pulseLoop: { ...base.pulseLoop, ...override.pulseLoop },
});

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = "div",
  asChild = "div",
  viewportBehavior = "immediate",
  staggerDelay = 0.1,
  pulseLoop = false,
  duration,
  pauseDuration,
  viewport,
}: AnimatedGroupProps) {
  // Memoize motion components to prevent recreation
  const MotionComponent = useMemo(
    () => motion.create(as as keyof JSX.IntrinsicElements),
    [as]
  );

  const MotionChild = useMemo(
    () => motion.create(asChild as keyof JSX.IntrinsicElements),
    [asChild]
  );

  // Memoize variants to prevent unnecessary recalculations
  const containerVariants = useMemo(() => {
    const baseContainer = {
      ...BASE_CONTAINER_VARIANTS,
      visible: {
        ...BASE_CONTAINER_VARIANTS.visible,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
      loop: {
        ...BASE_CONTAINER_VARIANTS.loop,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
      pulseLoop: {
        ...BASE_CONTAINER_VARIANTS.pulseLoop,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    };
    return variants?.container || baseContainer;
  }, [variants?.container, staggerDelay]);

  const itemVariants = useMemo(() => {
    const presetVariant = preset ? PRESET_VARIANTS[preset] : {};
    const mergedVariants = mergeVariants(BASE_ITEM_VARIANTS, presetVariant);
    // Apply custom duration and pause if provided
    const finalVariants = applyCustomDuration(
      mergedVariants,
      duration,
      pauseDuration
    );
    return variants?.item || finalVariants;
  }, [variants?.item, preset, duration, pauseDuration]);

  // Memoize children processing for performance
  const animatedChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      )),
    [children, MotionChild, itemVariants]
  );

  // Memoize viewport configuration
  const viewportConfig = useMemo(
    () => ({
      once: viewportBehavior === "once" || viewport?.once || false,
      margin: viewport?.margin || "0px",
      amount: viewport?.amount || 0.1,
    }),
    [viewportBehavior, viewport]
  );

  // Animation props based on behavior
  const baseProps = {
    variants: containerVariants,
    className,
    children: animatedChildren,
  };

  // Render based on viewport behavior
  switch (viewportBehavior) {
    case "immediate":
      return (
        <MotionComponent {...baseProps} initial="hidden" animate="visible" />
      );

    case "once":
      return (
        <MotionComponent
          {...baseProps}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        />
      );

    case "loop":
      return (
        <MotionComponent
          {...baseProps}
          initial="hidden"
          whileInView="visible"
          viewport={{ ...viewportConfig, once: false }}
        />
      );

    case "continuous-loop":
      return (
        <MotionComponent
          {...baseProps}
          initial="hidden"
          animate="visible"
          whileInView="loop"
          viewport={{ ...viewportConfig, once: false }}
        />
      );

    case "pulse-loop":
      return (
        <MotionComponent
          {...baseProps}
          initial="hidden"
          whileInView="pulseLoop"
          viewport={{ ...viewportConfig, once: false }}
        />
      );

    default:
      return (
        <MotionComponent {...baseProps} initial="hidden" animate="visible" />
      );
  }
}

export { AnimatedGroup };
