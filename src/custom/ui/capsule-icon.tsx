import { MousePointer2 } from "lucide-react";
import React from "react";

type PointerPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type CapsuleIconProps = {
  icon: React.ReactNode;
  text: string;
  pointerPosition?: PointerPosition;
  className?: string;
};

const POINTER_CONFIG = {
  "top-left": { position: "-top-2 -left-2", rotation: "rotate-0" },
  "top-right": { position: "-top-2 -right-2", rotation: "rotate-90" },
  "bottom-left": { position: "-bottom-2 -left-2", rotation: "-rotate-90" },
  "bottom-right": { position: "-bottom-2 -right-2", rotation: "rotate-180" },
} as const;

export const CapsuleIcon = React.memo(
  ({
    icon,
    text,
    pointerPosition = "bottom-left",
    className = "",
  }: CapsuleIconProps) => {
    const { position, rotation } = POINTER_CONFIG[pointerPosition];

    return (
      <div className={className}>
        {/* Main capsule container */}
        <div className="flex items-center px-4 py-2 gap-2 h-11 w-fit rounded-full bg-primary/10 border border-primary/20 dark:bg-primary/15 dark:border-primary/30">
          <div className="flex-shrink-0">{icon}</div>

          <span className="text-sm text-[#16a34a] font-medium whitespace-nowrap dark:text-primary">
            {text}
          </span>
        </div>

        {/* Pointer */}
        <MousePointer2
          size={16}
          className={`absolute z-10 fill-[#16a34a] text-[#16a34a] dark:text-primary dark:fill-primary ${position} ${rotation}`}
        />
      </div>
    );
  }
);

CapsuleIcon.displayName = "CapsuleIcon";
