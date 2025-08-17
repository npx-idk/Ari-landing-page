import React from "react";

const Benefits: React.FC = () => {
  return (
    <section className="bg-gray-900 py-14 md:py-28">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="max-w-lg mx-auto mb-3 font-bold text-center text-white dark:text-white/90 text-3xl md:text-title-lg">
            The key benefits of using our tools.
          </h2>
          <p className="max-w-2xl mx-auto text-base font-normal leading-6 text-white/50">
            Unlock the Potential of Innovation. Discover the Advanced AI Tools
            Transforming Your Ideas into Reality with Unmatched Precision and
            Intelligence.
          </p>
        </div>
        <div className="max-w-[1008px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <div className="relative flex flex-col justify-between bg-primary-500 rounded-[20px] p-9 md:p-13">
                <div className="max-w-sm mb-32">
                  <h3 className="font-bold text-white text-2xl md:text-3xl mb-4">
                    Craft Professional-Grade Content with AI
                  </h3>
                  <p className="text-base text-white/70">
                    Transform your ideas into groundbreaking realities with
                    advanced AI tools.
                  </p>
                </div>
                <div>
                  <img
                    src="assets/images/benefits/ind-1.svg"
                    className="absolute left-8 top-[61%] floating-1"
                    alt=""
                  />
                  <img
                    src="assets/images/benefits/ind-2.svg"
                    className="absolute right-28 top-[55%] floating-2"
                    alt=""
                  />
                  <img
                    src="assets/images/benefits/ind-3.svg"
                    className="right-8 absolute bottom-[15%] floating-3"
                    alt=""
                  />
                  <img
                    src="assets/images/benefits/bn-1.svg"
                    className="-mb-8 md:-mb-11"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="benefits-bg rounded-[20px] p-12 overflow-hidden">
                <div>
                  <img src="assets/images/benefits/bn-2.svg" alt="" />
                </div>
                <div>
                  <h3 className="font-bold max-w-xs text-white text-2xl md:text-3xl mb-4">
                    Boost your Productivity 10X with our AI agent tools.
                  </h3>
                  <p className="text-base max-w-sm text-white/70">
                    Unlock the Potential of Innovation, Discover the Advanced AI
                    Tools Intelligence.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-12">
              <div className="lg:px-12 p-8 bg-[#2D0B70] lg:pb-0 lg:p-12 relative rounded-[20px] h-full lg:flex lg:flex-row justify-between bg-cover flex-col gap-5">
                <div className="max-w-sm relative z-10">
                  <h3 className="font-bold text-white text-2xl md:text-3xl mb-4">
                    Overcome Writer's Block Today
                  </h3>
                  <p className="text-base text-white/70 mb-8">
                    Discover the cutting-edge AI tools that bring your ideas to
                    life with exceptional accuracy.
                  </p>
                  <a
                    href="contact.html"
                    className="font-medium inline-block text-sm text-white rounded-full bg-primary-500 hover:bg-primary-600 transition py-3 px-6"
                  >
                    Try it now for Free
                  </a>
                </div>
                <div>
                  <img
                    src="assets/images/benefits/bn-3.svg"
                    className="hidden lg:block relative z-10"
                    alt=""
                  />
                </div>
                <img
                  src="assets/images/benefits/blur-shape.png"
                  alt=""
                  className="h-full w-full -z-0 absolute top-0 right-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
