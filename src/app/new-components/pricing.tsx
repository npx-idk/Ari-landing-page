import React, { useState } from "react";

// A small component for the checkmark icon to keep the code DRY
const CheckIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
  >
    <path
      d="M13.4017 5.2793L6.12172 12.5593L2.59839 9.036"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-14 md:py-28 bg-gray-50 overflow-hidden dark:bg-white/[0.03]">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Start Your Content Creation Journey with AI
          </h2>
          <p className="max-w-xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Collaborate with AI to generate content that resonates with your
            audience, drives and delivers meaningful results across all
            platforms.
          </p>
        </div>

        <div>
          {/* Billing Toggle */}
          <div className="flex justify-center relative z-30 mt-12">
            <div className="relative flex p-1 bg-white dark:bg-dark-primary rounded-full shadow-theme-xs">
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative px-6 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                  !isAnnual
                    ? "bg-gray-800 dark:bg-white/[0.05] text-white"
                    : "bg-transparent dark:text-gray-400 text-gray-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative flex items-center pl-6 pr-2 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                  isAnnual
                    ? "bg-gray-800 text-white dark:bg-white/[0.05]"
                    : "bg-transparent text-gray-700 dark:text-gray-400"
                }`}
              >
                Annually
                <span className="ml-2 bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Pricing Cards */}
            <div className="mt-12 z-30 relative space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-6xl lg:mx-auto lg:grid-cols-4">
              {/* Free Tier */}
              <div className="bg-white dark:bg-dark-primary rounded-[20px] shadow-one">
                <div className="p-8">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
                    Free
                  </h2>
                  <p className="flex items-baseline mt-4">
                    <span className="text-4xl font-semibold text-gray-800 dark:text-white/90">
                      $0
                    </span>
                    <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Per month
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    Sed ut perspiciatis unde omnis iste natus ut perspic iatis.
                  </p>
                  <button className="block w-full px-8 py-3.5 dark:bg-dark-primary dark:text-white/90 transition dark:hover:bg-gray-800 dark:border-gray-800 mt-7 text-sm font-medium text-center text-gray-800 cursor-pointer bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                    Try it for free
                  </button>
                </div>
                <div className="px-8 pb-7">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Some limited features only
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        400 messaging limits
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Limited Projects
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        20,000 Words
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Plus Plan */}
              <div className="bg-white dark:bg-dark-primary relative border-2 border-primary-500 rounded-[20px] shadow-one">
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
                      Plus plan
                    </h2>
                    <span className="px-2 py-1 text-xs font-medium dark:text-pir rounded-full dark:bg-primary-500/15 bg-primary-50 text-primary-500">
                      Popular
                    </span>
                  </div>
                  <p className="flex items-baseline mt-4">
                    <span className="text-4xl font-semibold text-gray-800 dark:text-white/90">
                      {isAnnual ? "$16" : "$20"}
                    </span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      {isAnnual ? "Per year" : "Per month"}
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    Billed at periods under limits, see rates of people who use.
                  </p>
                  <button className="block w-full gradient-btn px-8 py-3.5 mt-7 text-sm font-medium text-center text-white rounded-full">
                    Purchase Now
                  </button>
                </div>
                <div className="px-8 pb-7">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Everything in Free
                      </p>
                    </li>
                    <li className="flex items-start dark:text-gray-400 text-gray-500">
                      <div className="flex-shrink-0">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        2000 messaging limits
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Unlimited Projects
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Open AI Key Integration
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        80,000 Words
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Consistent support
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-white rounded-[20px] dark:bg-dark-primary shadow-one">
                <div className="p-8">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
                    Pro plan
                  </h2>
                  <p className="flex items-baseline mt-4">
                    <span className="text-4xl font-semibold text-gray-800 dark:text-white/90">
                      {isAnnual ? "$24" : "$30"}
                    </span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      {isAnnual ? "Per year" : "Per month"}
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    Billed at periods under limits, see rates of people who use.
                  </p>
                  <button className="block w-full dark:hover:bg-primary-500 transition dark:bg-white/[0.05] hover:bg-gray-900 px-8 py-3.5 mt-6 text-sm font-medium text-center rounded-full text-white bg-gray-700">
                    Purchase Now
                  </button>
                </div>
                <div className="px-8 pb-7">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Everything in Free
                      </p>
                    </li>
                    <li className="flex items-start dark:text-gray-400 text-gray-500">
                      <div className="flex-shrink-0">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        5000 messaging limits
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Unlimited Projects
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Open AI Key Integration
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        1,00,000 Words
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Consistent support
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-[20px] dark:bg-dark-primary shadow-one">
                <div className="p-8">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
                    Enterprise
                  </h2>
                  <p className="flex items-baseline mt-4">
                    <span className="text-4xl font-semibold text-gray-800 dark:text-white/90">
                      Let's talk
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    Sed ut perspiciatis unde omnis iste natus ut perspic iatis.
                  </p>
                  <button className="block dark:hover:bg-primary-500 w-full px-8 transition dark:bg-white/[0.03] hover:bg-gray-900 py-3.5 mt-6 text-sm font-medium text-center rounded-full text-white bg-gray-700">
                    Contact Sales
                  </button>
                </div>
                <div className="px-8 pb-7">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Everything in Free
                      </p>
                    </li>
                    <li className="flex items-start dark:text-gray-400 text-gray-500">
                      <div className="flex-shrink-0">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        5000 messaging limits
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Unlimited Projects
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Open AI Key Integration
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Unlimited Words
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 dark:text-gray-400 text-gray-500">
                        <CheckIcon />
                      </div>
                      <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                        Consistent support
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="absolute hidden lg:block top-0 z-10">
              <svg
                width="1099"
                height="960"
                viewBox="0 0 1099 960"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.2" filter="url(#filter0_f_9282_10364)">
                  <circle
                    cx="479.835"
                    cy="480.254"
                    r="179.665"
                    fill="#FF58D5"
                  />
                </g>
                <g opacity="0.1" filter="url(#filter1_f_9282_10364)">
                  <circle
                    cx="619.165"
                    cy="480.254"
                    r="179.665"
                    fill="#4E6EFF"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_9282_10364"
                    x="0.169678"
                    y="0.589355"
                    width="959.33"
                    height="959.33"
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
                    <feGaussianBlur
                      stdDeviation="150"
                      result="effect1_foregroundBlur_9282_10364"
                    />
                  </filter>
                  <filter
                    id="filter1_f_9282_10364"
                    x="139.5"
                    y="0.589355"
                    width="959.33"
                    height="959.33"
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
                    <feGaussianBlur
                      stdDeviation="150"
                      result="effect1_foregroundBlur_9282_10364"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
