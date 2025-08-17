import React, { useState } from "react";

// Data for the FAQ items
const faqData = [
  {
    id: 1,
    question: "Do I get free updates?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus magna quis tellus euismod, eget pharetra leo mollis. Donec eget lacus non elit blandit pharetra vitae volutpat libero.",
  },
  {
    id: 2,
    question: 'What does the number of "Projects" refer to?',
    answer:
      'The number of "Projects" refers to the total number of separate workspaces you can create and manage within your account. Each project can have its own settings, team members, and resources.',
  },
  {
    id: 3,
    question: "Can I upgrade to a higher plan?",
    answer:
      "Yes, you can upgrade to a higher plan at any time. When you upgrade, you'll be charged the prorated difference for the remainder of your current billing cycle. Your new features will be available immediately after upgrading.",
  },
  {
    id: 4,
    question: 'What does "Unlimited Projects" mean?',
    answer:
      '"Unlimited Projects" means you can create as many projects as you need without any restrictions. This allows you to organize your work efficiently without worrying about hitting a project limit.',
  },
  {
    id: 5,
    question: "How can I add Open AI Key?",
    answer:
      'To add your OpenAI API key, go to your account settings and navigate to the "API Keys" section. Click on "Add New Key", paste your OpenAI API key, and save your changes. The key will be securely stored and used for all AI-powered features.',
  },
];

// Reusable component for a single FAQ item
interface FaqItemProps {
  id: number;
  question: string;
  answer: string;
  isActive: boolean;
  onToggle: (id: number) => void;
}

const FaqItem: React.FC<FaqItemProps> = ({
  id,
  question,
  answer,
  isActive,
  onToggle,
}) => {
  return (
    <div className="pb-5 border-b border-gray-200 dark:border-gray-800">
      <button
        type="button"
        className="flex items-center justify-between w-full text-left"
        onClick={() => onToggle(id)}
      >
        <span className="text-lg font-medium text-gray-800 dark:text-white/90">
          {question}
        </span>
        <span className="flex-shrink-0 ml-6 text-xl text-gray-400">
          {isActive ? (
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 11.9194V13.9194H19V11.9194H5Z" fill="#98A2B3" />
            </svg>
          ) : (
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 11.9194V5.91943H13V11.9194H19V13.9194H13V19.9194H11V13.9194H5V11.9194H11Z"
                fill="currentColor"
              />
            </svg>
          )}
        </span>
      </button>
      {isActive && (
        <div className="mt-5">
          <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

// Main FAQ component
const Faq: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <section className="py-14 md:py-28">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Frequently Asked Questions
          </h2>
          <p className="max-w-md mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Answered all frequently asked questions, Still confused? feel free
            contact with us
          </p>
        </div>
        <div className="max-w-[600px] mx-auto">
          <div className="space-y-4">
            {faqData.map((item) => (
              <FaqItem
                key={item.id}
                id={item.id}
                question={item.question}
                answer={item.answer}
                isActive={activeItem === item.id}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
