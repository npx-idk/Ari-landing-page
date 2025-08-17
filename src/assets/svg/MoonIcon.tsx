import React from "react";
import type { IconProps } from "./TextGeneratorIcon";

const MoonIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M6.24683 7.08492C6.24683 10.7677 9.23232 13.7532 12.9151 13.7532C14.6687 13.7532 16.2641 13.0764 17.4545 11.9697C16.584 15.2727 13.5765 17.7083 10.0001 17.7083C5.74289 17.7083 2.29175 14.2572 2.29175 9.99996C2.29175 6.42356 4.72736 3.41602 8.03036 2.54558C6.92367 3.73594 6.24683 5.33139 6.24683 7.08492Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MoonIcon;
