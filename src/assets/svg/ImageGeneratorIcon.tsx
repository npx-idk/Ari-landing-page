import React from "react";
import type { IconProps } from "./TextGeneratorIcon";

const ImageGeneratorIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_d_9289_13232)">
      <g filter="url(#filter1_i_9289_13232)">
        <path
          d="M13.6522 10.124C12.8594 10.124 12.2166 10.7667 12.2166 11.5596C12.2166 12.3524 12.8594 12.9951 13.6522 12.9951C14.445 12.9951 15.0877 12.3524 15.0877 11.5596C15.0877 10.7667 14.445 10.124 13.6522 10.124Z"
          fill="url(#paint0_radial_9289_13232)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 6.4375C10.0325 6.4375 8.4375 8.03249 8.4375 10V20C8.4375 21.9675 10.0325 23.5625 12 23.5625H22C23.9675 23.5625 25.5625 21.9675 25.5625 20V10C25.5625 8.03249 23.9675 6.4375 22 6.4375H12ZM9.5625 10C9.5625 8.65381 10.6538 7.5625 12 7.5625H22C23.3462 7.5625 24.4375 8.65381 24.4375 10V12.5688C23.8719 12.4375 23.2829 12.3681 22.6783 12.3681C19.4925 12.3681 16.7568 14.29 15.5652 17.0367C14.629 16.121 13.3471 15.5556 11.933 15.5556C11.0795 15.5556 10.2733 15.7619 9.5625 16.127V10Z"
          fill="url(#paint1_radial_9289_13232)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_9289_13232"
        x="-3"
        y="-3"
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
          values="0 0 0 0 1 0 0 0 0 0.435294 0 0 0 0 0.345098 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_9289_13232"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_9289_13232"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i_9289_13232"
        x="8.4375"
        y="6.4375"
        width="18.6488"
        height="18.6488"
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
          result="effect1_innerShadow_9289_13232"
        />
      </filter>
      <radialGradient
        id="paint0_radial_9289_13232"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(13.9454 22.1904) rotate(-58.7716) scale(25.6788 25.6788)"
      >
        <stop stopColor="#FF6F58" />
        <stop offset="1" stopColor="#FFA293" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_9289_13232"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(13.9454 22.1904) rotate(-58.7716) scale(25.6788 25.6788)"
      >
        <stop stopColor="#FF6F58" />
        <stop offset="1" stopColor="#FFA293" />
      </radialGradient>
    </defs>
  </svg>
);

export default ImageGeneratorIcon;
