import React from "react";
import type { IconProps } from "./TextGeneratorIcon";

const EmailGeneratorIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="32"
    viewBox="0 0 38 32"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_d_9289_13234)">
      <g filter="url(#filter1_i_9289_13234)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.875 10.1306C8.875 8.1004 10.5208 6.45462 12.551 6.45462H25.449C27.4792 6.45462 29.125 8.1004 29.125 10.1306V17.8694C29.125 19.8996 27.4792 21.5454 25.449 21.5454H12.551C10.5208 21.5454 8.875 19.8996 8.875 17.8694V10.1306ZM13.3072 10.5611C13.0443 10.3777 12.6825 10.4422 12.4991 10.7052C12.3158 10.9681 12.3803 11.3299 12.6432 11.5132L17.7831 15.0974C18.5145 15.6074 19.4863 15.6074 20.2177 15.0974L25.3575 11.5132C25.6204 11.3299 25.6849 10.9681 25.5016 10.7052C25.3182 10.4422 24.9564 10.3777 24.6935 10.5611L19.5537 14.1452C19.2212 14.377 18.7795 14.377 18.447 14.1452L13.3072 10.5611Z"
          fill="url(#paint0_radial_9289_13234)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_9289_13234"
        x="-1"
        y="-4"
        width="40"
        height="40"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.168627 0 0 0 0 0.811765 0 0 0 0 1 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_9289_13234"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_9289_13234"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i_9289_13234"
        x="8.875"
        y="6.45462"
        width="21.7738"
        height="16.6146"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1.52381" dy="1.52381" />
        <feGaussianBlur stdDeviation="1.14286" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_9289_13234"
        />
      </filter>
      <radialGradient
        id="paint0_radial_9289_13234"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(19.8733 18.8762) rotate(-52.4062) scale(16.3099 18.2642)"
      >
        <stop stopColor="#2BCFFF" />
        <stop offset="1" stopColor="#8EE5FF" />
      </radialGradient>
    </defs>
  </svg>
);

export default EmailGeneratorIcon;
