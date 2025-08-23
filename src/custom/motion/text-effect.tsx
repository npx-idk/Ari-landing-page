"use client";

import { cn } from "@/lib/utils";
import type {
  TargetAndTransition,
  Transition,
  Variant,
  Variants,
} from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useMemo } from "react";

export type PresetType = "blur" | "fade-in-blur" | "scale" | "fade" | "slide";
export type PerType = "word" | "char" | "line";
export type ViewportBehavior = "immediate" | "once" | "loop";

export interface TextEffectProps {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  segmentWrapperClassName?: string;
  containerTransition?: Transition;
  segmentTransition?: Transition;
  style?: React.CSSProperties;
  viewportBehavior?: ViewportBehavior;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | "some" | "all";
  };
}

// Optimized constants - computed once at module level
const STAGGER_TIMES: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
} as const;

const BASE_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
} as const;

const BASE_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

// Preset variants with optimized structure
const PRESET_VARIANTS: Record<
  PresetType,
  { container: Variants; item: Variants }
> = {
  blur: {
    container: BASE_CONTAINER_VARIANTS,
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(12px)" },
    },
  },
  "fade-in-blur": {
    container: BASE_CONTAINER_VARIANTS,
    item: {
      hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: 20, filter: "blur(12px)" },
    },
  },
  scale: {
    container: BASE_CONTAINER_VARIANTS,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: BASE_CONTAINER_VARIANTS,
    item: BASE_ITEM_VARIANTS,
  },
  slide: {
    container: BASE_CONTAINER_VARIANTS,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
} as const;

// Utility functions
const splitText = (text: string, per: PerType): string[] => {
  return per === "line" ? text.split("\n") : text.split(/(\s+)/);
};

const hasTransition = (
  variant?: Variant
): variant is TargetAndTransition & { transition?: Transition } => {
  return Boolean(
    variant && typeof variant === "object" && "transition" in variant
  );
};

const mergeVariantsWithTransition = (
  baseVariants: Variants,
  transition?: Transition & { exit?: Transition }
): Variants => {
  if (!transition) return baseVariants;

  const { exit: exitTransition, ...mainTransition } = transition;

  return {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(hasTransition(baseVariants.visible)
          ? baseVariants.visible.transition
          : {}),
        ...mainTransition,
      },
    },
    exit: {
      ...baseVariants.exit,
      transition: {
        ...(hasTransition(baseVariants.exit)
          ? baseVariants.exit.transition
          : {}),
        ...mainTransition,
        staggerDirection: -1,
      },
    },
  };
};

// Optimized AnimationSegment component
const AnimationSegment = React.memo<{
  segment: string;
  variants: Variants;
  per: PerType;
  segmentWrapperClassName?: string;
  index: number;
}>(({ segment, variants, per, segmentWrapperClassName, index }) => {
  const content = useMemo(() => {
    switch (per) {
      case "line":
        return (
          <motion.span variants={variants} className="block">
            {segment}
          </motion.span>
        );
      case "word":
        return (
          <motion.span
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {segment}
          </motion.span>
        );
      case "char":
        return (
          <motion.span className="inline-block whitespace-pre">
            {segment.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                aria-hidden="true"
                variants={variants}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        );
      default:
        return null;
    }
  }, [segment, variants, per]);

  if (!segmentWrapperClassName) return content;

  const wrapperClassName = useMemo(
    () =>
      cn(per === "line" ? "block" : "inline-block", segmentWrapperClassName),
    [per, segmentWrapperClassName]
  );

  return <span className={wrapperClassName}>{content}</span>;
});

AnimationSegment.displayName = "AnimationSegment";

export function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset = "fade",
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
  viewportBehavior = "immediate",
  viewport,
}: TextEffectProps) {
  // Memoize segments to prevent re-splitting on every render
  const segments = useMemo(() => splitText(children, per), [children, per]);

  // Memoize motion component
  const MotionTag = useMemo(
    () => motion[as as keyof typeof motion] as typeof motion.div,
    [as]
  );

  // Memoize base variants
  const baseVariants = useMemo(
    () =>
      preset
        ? PRESET_VARIANTS[preset]
        : {
            container: BASE_CONTAINER_VARIANTS,
            item: BASE_ITEM_VARIANTS,
          },
    [preset]
  );

  // Memoize computed timing values
  const computedTiming = useMemo(() => {
    const stagger = STAGGER_TIMES[per] / speedReveal;
    const duration = 0.3 / speedSegment;

    const customStagger = hasTransition(variants?.container?.visible)
      ? (variants!.container!.visible as TargetAndTransition).transition
          ?.staggerChildren
      : undefined;

    const customDelay = hasTransition(variants?.container?.visible)
      ? (variants!.container!.visible as TargetAndTransition).transition
          ?.delayChildren
      : undefined;

    return {
      stagger: customStagger ?? stagger,
      delay: customDelay ?? delay,
      duration,
    };
  }, [per, speedReveal, speedSegment, delay, variants]);

  // Memoize final variants
  const finalVariants = useMemo(
    () => ({
      container: mergeVariantsWithTransition(
        variants?.container || baseVariants.container,
        {
          staggerChildren: computedTiming.stagger,
          delayChildren: computedTiming.delay,
          ...containerTransition,
          exit: {
            staggerChildren: computedTiming.stagger,
            staggerDirection: -1,
          },
        }
      ),
      item: mergeVariantsWithTransition(variants?.item || baseVariants.item, {
        duration: computedTiming.duration,
        ...segmentTransition,
      }),
    }),
    [
      variants,
      baseVariants,
      computedTiming,
      containerTransition,
      segmentTransition,
    ]
  );

  // Memoize segments rendering
  const renderedSegments = useMemo(
    () =>
      segments.map((segment, index) => (
        <AnimationSegment
          key={`${per}-${index}-${segment}`}
          segment={segment}
          variants={finalVariants.item}
          per={per}
          segmentWrapperClassName={segmentWrapperClassName}
          index={index}
        />
      )),
    [segments, finalVariants.item, per, segmentWrapperClassName]
  );

  // Memoize animation callbacks
  const handleAnimationComplete = useCallback(() => {
    onAnimationComplete?.();
  }, [onAnimationComplete]);

  const handleAnimationStart = useCallback(() => {
    onAnimationStart?.();
  }, [onAnimationStart]);

  // Memoize viewport configuration
  const viewportConfig = useMemo(
    () => ({
      once: viewportBehavior === "once" || viewport?.once || false,
      margin: viewport?.margin || "0px",
      amount: viewport?.amount || 0.1,
    }),
    [viewportBehavior, viewport]
  );

  // Determine animation props based on viewport behavior
  const animationProps = useMemo(() => {
    const baseProps = {
      variants: finalVariants.container,
      className,
      onAnimationComplete: handleAnimationComplete,
      onAnimationStart: handleAnimationStart,
      style,
      children: (
        <>
          {per !== "line" && <span className="sr-only">{children}</span>}
          {renderedSegments}
        </>
      ),
    };

    switch (viewportBehavior) {
      case "immediate":
        return {
          ...baseProps,
          initial: "hidden",
          animate: "visible",
          exit: "exit",
        };

      case "once":
        return {
          ...baseProps,
          initial: "hidden",
          whileInView: "visible",
          exit: "exit",
          viewport: viewportConfig,
        };

      case "loop":
        return {
          ...baseProps,
          initial: "hidden",
          whileInView: "visible",
          exit: "hidden", // Reset to hidden when out of view for loop behavior
          viewport: { ...viewportConfig, once: false },
        };

      default:
        return {
          ...baseProps,
          initial: "hidden",
          animate: "visible",
          exit: "exit",
        };
    }
  }, [
    viewportBehavior,
    finalVariants.container,
    className,
    handleAnimationComplete,
    handleAnimationStart,
    style,
    per,
    children,
    renderedSegments,
    viewportConfig,
  ]);

  return (
    <AnimatePresence mode="popLayout">
      {trigger && <MotionTag {...animationProps} />}
    </AnimatePresence>
  );
}
