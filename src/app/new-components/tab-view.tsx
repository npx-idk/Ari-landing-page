import React, { useState } from "react";

// Data for the dynamic content at the bottom of the tabs
const tabContentDetails = {
  text: {
    title: "Easiest way to generate text",
    description:
      "Unlock the Potential of Innovation. Discover the Advanced AI Tools Transforming Your Ideas into Reality with Unmatched Precision and Intelligence.",
  },
  image: {
    title: "Instantly generate stunning visuals",
    description:
      "Bring your creative concepts to life. Our AI can generate high-quality images from simple text descriptions in seconds.",
  },
  code: {
    title: "Accelerate your development workflow",
    description:
      "Generate clean, efficient code in any language. Let our AI handle the boilerplate so you can focus on solving complex problems.",
  },
  video: {
    title: "Create engaging videos effortlessly",
    description:
      "Produce professional-quality videos from text scripts or existing content. Perfect for marketing, tutorials, and social media.",
  },
  email: {
    title: "Craft perfect emails in moments",
    description:
      "Generate compelling email copy for marketing campaigns, newsletters, and professional correspondence that gets results.",
  },
};

type TabId = keyof typeof tabContentDetails;

const TabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("text");

  const activeContent = tabContentDetails[activeTab];

  return (
    <section className="py-14 md:py-28 dark:bg-dark-primary">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
            All the AI tools you need, at your Fingertips.
          </h2>
          <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Unlock the Potential of Innovation, Discover the Advanced AI Tools
            Transforming Your Ideas into Reality with Unmatched Precision and
            Intelligence.
          </p>
        </div>
        <div className="max-w-[1008px] mx-auto">
          <div>
            {/* Tab Navigation */}
            <div className="flex flex-wrap sm:justify-center mx-auto gap-2 p-1 w-full mb-8 dark:bg-white/[0.05] bg-gray-100 rounded-2xl lg:rounded-full max-w-fit">
              <button
                onClick={() => setActiveTab("text")}
                className={`flex items-center h-12 gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-full ${
                  activeTab === "text"
                    ? "bg-white dark:text-white/90 dark:bg-white/10 text-gray-800"
                    : "text-gray-500 dark:text-gray-400 bg-transparent"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <g filter="url(#filter0_d_9279_144)">
                    <g filter="url(#filter1_i_9279_144)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.73756 24.3018L8.73873 24.3004L8.74774 24.2896C8.75625 24.2794 8.76968 24.2632 8.78739 24.2413C8.82285 24.1974 8.87538 24.1311 8.94012 24.0452C9.06988 23.8731 9.24715 23.6245 9.43387 23.3229C9.76956 22.7807 10.1139 22.1021 10.2867 21.4087C9.20833 19.876 8.57495 18.0067 8.57495 15.9912C8.57495 10.7859 12.7947 6.56616 18 6.56616C23.2052 6.56616 27.4249 10.7859 27.4249 15.9912C27.4249 21.1964 23.2052 25.4162 18 25.4162C16.8208 25.4162 15.6908 25.1993 14.6487 24.8028C13.5925 25.1989 12.2804 25.3471 11.2517 25.4026C10.681 25.4334 10.1743 25.4366 9.81007 25.4322C9.62767 25.43 9.48031 25.4258 9.37769 25.4222C9.32636 25.4203 9.28618 25.4186 9.25835 25.4174L9.22601 25.4158L9.21706 25.4154L9.21361 25.4152L9.24995 24.7412C9.21308 25.4152 9.21361 25.4152 9.21361 25.4152C8.95701 25.4012 8.73013 25.2426 8.6292 25.0063C8.52835 24.7702 8.57065 24.4968 8.73756 24.3018ZM13.6249 14.8663C13.0035 14.8663 12.4999 15.37 12.4999 15.9913C12.4999 16.6127 13.0035 17.1163 13.6249 17.1163H13.6349C14.2562 17.1163 14.7599 16.6127 14.7599 15.9913C14.7599 15.37 14.2562 14.8663 13.6349 14.8663H13.6249ZM17.9999 14.8663C17.3785 14.8663 16.8749 15.37 16.8749 15.9913C16.8749 16.6127 17.3785 17.1163 17.9999 17.1163H18.0099C18.6312 17.1163 19.1349 16.6127 19.1349 15.9913C19.1349 15.37 18.6312 14.8663 18.0099 14.8663H17.9999ZM22.3749 14.8663C21.7535 14.8663 21.2499 15.37 21.2499 15.9913C21.2499 16.6127 21.7535 17.1163 22.3749 17.1163H22.3849C23.0062 17.1163 23.5099 16.6127 23.5099 15.9913C23.5099 15.37 23.0062 14.8663 22.3849 14.8663H22.3749Z"
                        fill="url(#paint0_radial_9279_144)"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_9279_144"
                      x="-2"
                      y="-2"
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
                        values="0 0 0 0 0.498039 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_9279_144"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9279_144"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_i_9279_144"
                      x="8.57495"
                      y="6.56616"
                      width="20.3739"
                      height="20.3915"
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
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_9279_144"
                      />
                    </filter>
                    <radialGradient
                      id="paint0_radial_9279_144"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(18.8129 22.0965) rotate(-60.1772) scale(18.6241 18.6153)"
                    >
                      <stop stopColor="#7F68FF" />
                      <stop offset="1" stopColor="#BEB2FF" />
                    </radialGradient>
                  </defs>
                </svg>
                Text Generator
              </button>

              <button
                onClick={() => setActiveTab("image")}
                className={`flex items-center h-12 gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-full ${
                  activeTab === "image"
                    ? "bg-white dark:text-white/90 dark:bg-white/10 text-gray-800"
                    : "text-gray-500 dark:text-gray-400 bg-transparent"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <g filter="url(#filter0_d_9279_147)">
                    <g filter="url(#filter1_i_9279_147)">
                      <path
                        d="M13.6522 10.124C12.8594 10.124 12.2166 10.7667 12.2166 11.5596C12.2166 12.3524 12.8594 12.9951 13.6522 12.9951C14.445 12.9951 15.0877 12.3524 15.0877 11.5596C15.0877 10.7667 14.445 10.124 13.6522 10.124Z"
                        fill="url(#paint0_radial_9279_147)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 6.4375C10.0325 6.4375 8.4375 8.03249 8.4375 10V20C8.4375 21.9675 10.0325 23.5625 12 23.5625H22C23.9675 23.5625 25.5625 21.9675 25.5625 20V10C25.5625 8.03249 23.9675 6.4375 22 6.4375H12ZM9.5625 10C9.5625 8.65381 10.6538 7.5625 12 7.5625H22C23.3462 7.5625 24.4375 8.65381 24.4375 10V12.5688C23.8719 12.4375 23.2829 12.3681 22.6783 12.3681C19.4925 12.3681 16.7568 14.29 15.5652 17.0367C14.629 16.121 13.3471 15.5556 11.933 15.5556C11.0795 15.5556 10.2734 15.7619 9.5625 16.127V10Z"
                        fill="url(#paint1_radial_9279_147)"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_9279_147"
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
                        result="effect1_dropShadow_9279_147"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9279_147"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_i_9279_147"
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
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_9279_147"
                      />
                    </filter>
                    <radialGradient
                      id="paint0_radial_9279_147"
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
                      id="paint1_radial_9279_147"
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
                Image Generator
              </button>

              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center h-12 gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-full ${
                  activeTab === "code"
                    ? "bg-white dark:text-white/90 dark:bg-white/10 text-gray-800"
                    : "text-gray-500 dark:text-gray-400 bg-transparent"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <g filter="url(#filter0_d_9279_150)">
                    <g filter="url(#filter1_i_9279_150)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.4375 10C8.4375 8.03249 10.0325 6.4375 12 6.4375H22C23.9675 6.4375 25.5625 8.03249 25.5625 10V20C25.5625 21.9675 23.9675 23.5625 22 23.5625H12C10.0325 23.5625 8.4375 21.9675 8.4375 20V10ZM18.4373 11.123C18.5047 10.8197 18.3134 10.5193 18.0102 10.4519C17.7069 10.3845 17.4065 10.5757 17.3391 10.879L15.5618 18.8766C15.4944 19.1798 15.6856 19.4803 15.9889 19.5477C16.2922 19.6151 16.5926 19.4239 16.66 19.1206L18.4373 11.123ZM20.2665 12.8471C20.0469 12.6275 19.6907 12.6274 19.471 12.8471C19.2513 13.0668 19.2513 13.4229 19.471 13.6426L20.8282 14.9999L19.471 16.357C19.2513 16.5767 19.2513 16.9329 19.471 17.1525C19.6907 17.3722 20.0468 17.3722 20.2665 17.1525L22.0214 15.3977C22.241 15.178 22.241 14.8219 22.0214 14.6022L20.2665 12.8471ZM14.5224 13.6494C14.742 13.4297 14.742 13.0736 14.5223 12.8539C14.3027 12.6343 13.9465 12.6343 13.7268 12.854L11.9788 14.6022C11.7591 14.8219 11.7591 15.178 11.9788 15.3977L13.7269 17.1457C13.9465 17.3654 14.3027 17.3654 14.5224 17.1457C14.742 16.926 14.742 16.5699 14.5224 16.3502L13.172 14.9999L14.5224 13.6494Z"
                        fill="url(#paint0_radial_9279_150)"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_9279_150"
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
                        result="effect1_dropShadow_9279_150"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9279_150"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_i_9279_150"
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
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_9279_150"
                      />
                    </filter>
                    <radialGradient
                      id="paint0_radial_9279_150"
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
                Code Generator
              </button>

              <button
                onClick={() => setActiveTab("video")}
                className={`flex items-center h-12 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-full ${
                  activeTab === "video"
                    ? "bg-white dark:text-white/90 dark:bg-white/10 text-gray-800"
                    : "text-gray-500 dark:text-gray-400 bg-transparent"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="32"
                  viewBox="0 0 38 32"
                  fill="none"
                >
                  <g filter="url(#filter0_d_9279_153)">
                    <g filter="url(#filter1_i_9279_153)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.875 10.1305C8.875 8.10037 10.5208 6.45459 12.551 6.45459H25.449C27.4792 6.45459 29.125 8.10037 29.125 10.1305V17.8694C29.125 19.8996 27.4792 21.5454 25.449 21.5454H12.551C10.5208 21.5454 8.875 19.8996 8.875 17.8694V10.1305ZM21.8102 13.429C22.227 13.6955 22.227 14.3043 21.8102 14.5708L18.0934 16.9471C17.6424 17.2355 17.0509 16.9116 17.0509 16.3762V11.6236C17.0509 11.0882 17.6424 10.7643 18.0934 11.0527L21.8102 13.429Z"
                        fill="url(#paint0_radial_9279_153)"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_9279_153"
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
                        result="effect1_dropShadow_9279_153"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9279_153"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_i_9279_153"
                      x="8.875"
                      y="6.45459"
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
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_9279_153"
                      />
                    </filter>
                    <radialGradient
                      id="paint0_radial_9279_153"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(19.8733 18.8761) rotate(-52.4062) scale(16.3099 18.2642)"
                    >
                      <stop stopColor="#FFAC19" />
                      <stop offset="1" stopColor="#FFCE78" />
                    </radialGradient>
                  </defs>
                </svg>
                Video Generator
              </button>

              <button
                onClick={() => setActiveTab("email")}
                className={`flex items-center h-12 gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-full ${
                  activeTab === "email"
                    ? "bg-white dark:text-white/90 dark:bg-white/10 text-gray-800"
                    : "text-gray-500 dark:text-gray-400 bg-transparent"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="32"
                  viewBox="0 0 36 32"
                  fill="none"
                >
                  <g filter="url(#filter0_d_9279_160)">
                    <g filter="url(#filter1_i_9279_160)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 10.1784C8 8.17331 9.62546 6.54785 11.6306 6.54785H24.3694C26.3745 6.54785 28 8.17332 28 10.1784V17.8217C28 19.8268 26.3745 21.4523 24.3694 21.4523H11.6306C9.62546 21.4523 8 19.8268 8 17.8217V10.1784ZM12.3775 10.6036C12.1178 10.4225 11.7605 10.4862 11.5794 10.7459C11.3983 11.0056 11.462 11.3629 11.7217 11.544L16.7981 15.0839C17.5204 15.5877 18.4803 15.5877 19.2026 15.0839L24.279 11.544C24.5387 11.3629 24.6024 11.0056 24.4213 10.7459C24.2402 10.4862 23.8829 10.4225 23.6232 10.6036L18.5468 14.1435C18.2185 14.3725 17.7822 14.3725 17.4539 14.1435L12.3775 10.6036Z"
                        fill="url(#paint0_radial_9279_160)"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_9279_160"
                      x="-2"
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
                        result="effect1_dropShadow_9279_160"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9279_160"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_i_9279_160"
                      x="8"
                      y="6.54785"
                      width="21.5238"
                      height="16.4284"
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
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_9279_160"
                      />
                    </filter>
                    <radialGradient
                      id="paint0_radial_9279_160"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(18.8625 18.816) rotate(-52.4062) scale(16.1086 18.0387)"
                    >
                      <stop stopColor="#2BCFFF" />
                      <stop offset="1" stopColor="#8EE5FF" />
                    </radialGradient>
                  </defs>
                </svg>
                Email Generator
              </button>
            </div>

            {/* Tab Content */}
            <div className="overflow-hidden tab-img-bg rounded-4xl">
              {activeTab === "text" && (
                <div className="p-6">
                  <div className="p-3 tab-img-overlay">
                    <img
                      src="assets/images/tab-image/tab-image-1.jpg"
                      alt=""
                      className="w-full rounded-2xl block dark:hidden"
                    />
                    <img
                      src="assets/images/tab-image/tab-image-1-dark.jpg"
                      alt=""
                      className="w-full rounded-2xl hidden dark:block"
                    />
                  </div>
                </div>
              )}
              {activeTab === "image" && (
                <div className="p-6">
                  <div className="p-3 tab-img-overlay">
                    <img
                      src="assets/images/tab-image/tab-image-2.jpg"
                      alt=""
                      className="w-full rounded-2xl block dark:hidden"
                    />
                    <img
                      src="assets/images/tab-image/tab-image-2-dark.jpg"
                      alt=""
                      className="w-full rounded-2xl hidden dark:block"
                    />
                  </div>
                </div>
              )}
              {activeTab === "code" && (
                <div className="p-6">
                  <div className="p-3 tab-img-overlay">
                    <img
                      src="assets/images/tab-image/tab-image-3.jpg"
                      alt=""
                      className="w-full rounded-2xl block dark:hidden"
                    />
                    <img
                      src="assets/images/tab-image/tab-image-3-dark.jpg"
                      alt=""
                      className="w-full rounded-2xl hidden dark:block"
                    />
                  </div>
                </div>
              )}
              {activeTab === "video" && (
                <div className="p-6">
                  <div className="p-3 tab-img-overlay">
                    <img
                      src="assets/images/tab-image/tab-image-4.jpg"
                      alt=""
                      className="w-full rounded-2xl block dark:hidden"
                    />
                    <img
                      src="assets/images/tab-image/tab-image-4-dark.jpg"
                      alt=""
                      className="w-full rounded-2xl hidden dark:block"
                    />
                  </div>
                </div>
              )}
              {activeTab === "email" && (
                <div className="p-6">
                  <div className="p-3 tab-img-overlay">
                    <img
                      src="assets/images/tab-image/tab-image-5.jpg"
                      alt=""
                      className="w-full rounded-2xl block dark:hidden"
                    />
                    <img
                      src="assets/images/tab-image/tab-image-5-dark.jpg"
                      alt=""
                      className="w-full rounded-2xl hidden dark:block"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Section */}
            <div className="mt-6 text-center">
              <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
                {activeContent.title}
              </h2>
              <p className="max-w-xl mx-auto mb-6 text-sm text-gray-500 dark:text-gray-400">
                {activeContent.description}
              </p>
              <button className="px-6 py-3 text-sm font-medium text-white transition-colors rounded-full bg-primary-500 hover:bg-primary-600">
                Try it now for free
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabView;
