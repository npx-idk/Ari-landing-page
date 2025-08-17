import React from "react";
import type { IconProps } from "./TextGeneratorIcon";

const VideoGeneratorIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="32"
    viewBox="0 0 38 32"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_d_9289_13236)">
      <g filter="url(#filter1_i_9289_13236)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.875 10.1306C8.875 8.1004 10.5208 6.45462 12.551 6.45462H25.449C27.4792 6.45462 29.125 8.1004 29.125 10.1306V17.8694C29.125 19.8996 27.4792 21.5454 25.449 21.5454H12.551C10.5208 21.5454 8.875 19.8996 8.875 17.8694V10.1306ZM21.8102 13.429C22.227 13.6955 22.227 14.3043 21.8102 14.5708L18.0934 16.9471C17.6424 17.2355 17.0509 16.9116 17.0509 16.3763V11.6236C17.0509 11.0883 17.6424 10.7643 18.0934 11.0527L21.8102 13.429Z"
          fill="url(#paint0_radial_9289_13236)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_9289_13236"
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
          values="0 0 0 0 1 0 0 0 0 0.67451 0 0 0 0 0.0980392 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_9289_13236"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_9289_13236"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i_9289_13236"
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
          result="effect1_innerShadow_9289_13236"
        />
      </filter>
      <radialGradient
        id="paint0_radial_9289_13236"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(19.8733 18.8762) rotate(-52.4062) scale(16.3099 18.2642)"
      >
        <stop stopColor="#FFAC19" />
        <stop offset="1" stopColor="#FFCE78" />
      </radialGradient>
    </defs>
  </svg>
);

export default VideoGeneratorIcon;
