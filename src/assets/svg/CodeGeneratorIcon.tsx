import React from "react";
import type { IconProps } from "./TextGeneratorIcon";

const CodeGeneratorIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_d_9289_13238)">
      <g filter="url(#filter1_i_9289_13238)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.4375 10C8.4375 8.03249 10.0325 6.4375 12 6.4375H22C23.9675 6.4375 25.5625 8.03249 25.5625 10V20C25.5625 21.9675 23.9675 23.5625 22 23.5625H12C10.0325 23.5625 8.4375 21.9675 8.4375 20V10ZM18.4373 11.123C18.5047 10.8197 18.3134 10.5193 18.0102 10.4519C17.7069 10.3845 17.4064 10.5757 17.3391 10.879L15.5618 18.8766C15.4944 19.1798 15.6856 19.4803 15.9889 19.5477C16.2922 19.6151 16.5926 19.4239 16.66 19.1206L18.4373 11.123ZM20.2665 12.8471C20.0469 12.6275 19.6907 12.6274 19.471 12.8471C19.2513 13.0668 19.2513 13.4229 19.471 13.6426L20.8282 14.9999L19.471 16.357C19.2513 16.5767 19.2513 16.9329 19.471 17.1525C19.6907 17.3722 20.0468 17.3722 20.2665 17.1525L22.0214 15.3977C22.241 15.178 22.241 14.8219 22.0214 14.6022L20.2665 12.8471ZM14.5224 13.6494C14.742 13.4297 14.742 13.0736 14.5223 12.8539C14.3027 12.6343 13.9465 12.6343 13.7268 12.854L11.9788 14.6022C11.7591 14.8218 11.7591 15.178 11.9788 15.3977L13.7269 17.1457C13.9465 17.3654 14.3027 17.3654 14.5224 17.1457C14.742 16.926 14.742 16.5699 14.5224 16.3502L13.172 14.9999L14.5224 13.6494Z"
          fill="url(#paint0_radial_9289_13238)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_9289_13238"
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
          values="0 0 0 0 0.0901961 0 0 0 0 0.654902 0 0 0 0 1 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_9289_13238"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_9289_13238"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i_9289_13238"
        x="8.4375"
        y="6.4375"
        width="18.125"
        height="18.125"
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
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_9289_13238"
        />
      </filter>
      <radialGradient
        id="paint0_radial_9289_13238"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(17.7385 20.5335) rotate(-60.1541) scale(16.9079 16.9079)"
      >
        <stop stopColor="#17A7FF" />
        <stop offset="1" stopColor="#84D0FF" />
      </radialGradient>
    </defs>
  </svg>
);

export default CodeGeneratorIcon;
