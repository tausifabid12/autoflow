import React from "react";
import introImg from "/assets/selfie.jpg";

const IntroSection = () => {
  return (
    <div className="relative bg-black w-full py-20 overflow-hidden">
      {/* Wrapper */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <div className="flex-1 text-white px-6 lg:pl-50 ">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-snug">
            I'm a Social Media influencer & digital{" "}
            <br className="hidden lg:block" /> content creator
          </h2>

          <p className="mb-6 text-gray-200 text-sm sm:text-base leading-relaxed">
            consectetur adipiscing elit. Donec non mattis nulla, in ultrices diam. Curabitur nec
            pharetra nunc. Nunc nec pellentesque nisl. Ut non mauris bibendum nunc pharetra laoreet sed
            eget mauris. Donec eget fermentum libero, ac aliquet lectus.
          </p>

          <div className="absolute -left-[30vw] top-20 hidden lg:block spin-slow">
            <img
              src="https://influtics.temptics.com/assets/img/intro-vector.svg"
              alt=""
              className="opacity-70"
            />
          </div>

          <ul className="mb-6 list-disc list-inside space-y-4 text-white text-sm sm:text-base">
            <li className="flex items-center">
              <img
                src="https://influtics.temptics.com/assets/img/checkmark-badge.svg"
                alt="dot"
                className="w-4 h-4 mr-2"
              />
              Non mattis nulla, in ultrices diam
            </li>
            <li className="flex items-center">
              <img
                src="https://influtics.temptics.com/assets/img/checkmark-badge.svg"
                alt="dot"
                className="w-4 h-4 mr-2"
              />
              Web design done Delightful Visualization
            </li>
            <li className="flex items-center">
              <img
                src="https://influtics.temptics.com/assets/img/checkmark-badge.svg"
                alt="dot"
                className="w-4 h-4 mr-2"
              />
              Alienum phaedrum torquatos nec eu, vis detraxit periculis
            </li>
            <li className="flex items-center">
              <img
                src="https://influtics.temptics.com/assets/img/checkmark-badge.svg"
                alt="dot"
                className="w-4 h-4 mr-2"
              />
              Software makes your Profit Double if You Scale Properly.
            </li>
          </ul>

          <a
            href="contact.html"
            className="inline-block mt-5 px-6 py-3 rounded border-2 text-white font-semibold bg-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white transition duration-300"
            style={{
              borderImage: "linear-gradient(to right, #F97316, #EC4899) 1",
              borderImageSlice: 1,
            }}
          >
            Contact Me
          </a>
        </div>

        {/* Right Image Section */}
        <div className="relative w-full sm:w-[80%] lg:w-[45%] h-[60vw] sm:h-[50vw] lg:h-[35vw] flex justify-center lg:justify-end">
          <img
            src={introImg}
            alt="Intro"
            className="w-full lg:w-[45vw] h-full object-cover rounded-t-[3rem] lg:rounded-l-full lg:rounded-tr-none lg:ml-auto"
          />
          <button className="absolute top-1/2 left-1/2 lg:left-10 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 bg-white w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-0 h-0 border-l-[14px] sm:border-l-[16px] border-l-red-600 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent ml-1"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
