import React from "react";
import type { IconProps } from "./TextGeneratorIcon";

const ChevronDownSm: React.FC<IconProps> = (props) => (
  <svg
    className="dropdown-arrow ml-1 h-4 w-4 transition-transform duration-200"
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    {...props}
  >
    <path
      d="M4.33301 5.91666L8.49967 10.0833L12.6663 5.91666"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronDownSm;
