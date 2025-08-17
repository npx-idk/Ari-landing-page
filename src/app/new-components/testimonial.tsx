import React, { useState } from "react";

// Data for the testimonials
const testimonialData = [
  {
    name: "Ralph Edwards",
    company: "Big Kahuna Burger Ltd",
    image: "assets/images/users/user-1.png",
    quote:
      "As a Senior Software Developer I found TailAdmin perfect write code that easy can be used in my projects, which some are production already.",
  },
  {
    name: "Albert Flores",
    company: "Biffco Enterprises Ltd.",
    image: "assets/images/users/user-2.png",
    quote:
      "As a Senior Software Developer I found TailAdmin perfect write code that easy can be used in my projects, which some are production already.",
  },
  {
    name: "Jenny Wilson",
    company: "Acme Co.",
    image: "assets/images/users/user-3.png",
    quote:
      "As a Senior Software Developer I found TailAdmin perfect write code that easy can be used in my projects, which some are production already.",
  },
  {
    name: "Esther Howard",
    company: "Barone LLC.",
    image: "assets/images/users/user-4.png",
    quote:
      "As a Senior Software Developer I found TailAdmin perfect write code that easy can be used in my projects, which some are production already.",
  },
  {
    name: "Darlene Robertson",
    company: "Abstergo Ltd.",
    image: "assets/images/users/user-5.png",
    quote:
      "As a Senior Software Developer I found TailAdmin perfect write code that easy can be used in my projects, which some are production already.",
  },
  {
    name: "Devon Lane",
    company: "Binford Ltd.",
    image: "assets/images/users/user-6.png",
    quote:
      "As a Senior Software Developer I found TailAdmin perfect write code that easy can be used in my projects, which some are production already.",
  },
  {
    name: "Eleanor Pena",
    company: "Gekko & Co",
    image: "assets/images/users/user-1.png",
    quote:
      "The AI tools are incredibly intuitive and have significantly sped up our content creation workflow. Highly recommended for any team!",
  },
  {
    name: "Cameron Williamson",
    company: "Stark Industries",
    image: "assets/images/users/user-5.png",
    quote:
      "This UI kit is a game-changer. The components are well-designed and the code quality is top-notch, saving us countless hours.",
  },
  {
    name: "Kristin Watson",
    company: "Wayne Enterprises",
    image: "assets/images/users/user-6.png",
    quote:
      "I was impressed by the flexibility and power of the AI generator. It consistently produces high-quality, relevant content.",
  },
];

// A sub-component for a single testimonial card
interface TestimonialCardProps {
  name: string;
  company: string;
  image: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  company,
  image,
  quote,
}) => (
  <div className="p-2 bg-gray-50 dark:bg-white/5 dark:border-gray-800 dark:hover:border-white/10 border rounded-[20px] border-gray-100 hover:border-primary-200 transition">
    <div className="flex items-center p-3 mb-3 bg-white/90 dark:bg-white/[0.03] rounded-2xl">
      <div>
        <img
          src={image}
          alt={name}
          className="w-[52px] h-[52px] ring-2 ring-white dark:ring-gray-700 mr-4 rounded-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
        />
      </div>
      <div>
        <h3 className="text-gray-800 font-base dark:text-white/90">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>
      </div>
    </div>
    <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.03]">
      <p className="text-base leading-6 text-gray-700 dark:text-gray-400">
        {quote}
      </p>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  // Determine which testimonials to show based on the state
  const visibleTestimonials = showAll
    ? testimonialData
    : testimonialData.slice(0, 6);

  return (
    <section className="md:py-28 py-14 relative">
      <div className="wrapper">
        <div>
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
              What our users say
            </h2>
            <p className="max-w-xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
              Unlock the Potential of Innovation. Discover the Advanced AI Tools
              Transforming Your Ideas into Reality with Unmatched Precision and
              Intelligence.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                company={testimonial.company}
                image={testimonial.image}
                quote={testimonial.quote}
              />
            ))}
          </div>

          {/* Show More Button */}
          <div className="mt-8 text-center relative z-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 px-6 py-3.5 text-sm font-medium text-gray-800 bg-white border border-gray-200 dark:hover:bg-gray-900 rounded-full shadow-theme-xs hover:bg-gray-50 focus:outline-none"
            >
              <span>{showAll ? "Show less..." : "Show more..."}</span>
            </button>
          </div>
        </div>
      </div>
      {!showAll && (
        <div className="white-gradient h-[264px] w-full absolute bottom-0"></div>
      )}
    </section>
  );
};

export default Testimonials;
