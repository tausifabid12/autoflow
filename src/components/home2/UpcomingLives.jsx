import React from "react";
import fbIcon from "/assets/img/social-icon-1.png";
import ytIcon from "/assets/img/social-icon-4.png";
import live1 from "/assets/workout.jpg";
import live2 from "/assets/makeup.jpg";

const upcomingLives = [
  {
    img: live1,
    platformIcon: fbIcon,
    platformName: "Facebook Live",
    title: "Smiley woman pop party studio medium shot",
    date: "25 Jun, 2024",
    descr:
      "consectetur adipiscing elit. Donec non mattis nulla, in ultrices diam. Curabitur nec pharetra nunc. Nunc nec pellentesque nisl. Ut non mauris bibendum nunc pharetra laoreet sed eget mauris. Donec eget fermentum libero, ac aliquet lectus.",
  },
  {
    img: live2,
    platformIcon: ytIcon,
    platformName: "YouTube Live",
    title: "Smiley woman pop party studio medium shot",
    date: "25 Jun, 2024",
    descr:
      "consectetur adipiscing elit. Donec non mattis nulla, in ultrices diam. Curabitur nec pharetra nunc. Nunc nec pellentesque nisl. Ut non mauris bibendum nunc pharetra laoreet sed eget mauris. Donec eget fermentum libero, ac aliquet lectus.",
  },
];

const UpcomingLives = () => {
  return (
    <section className="bg-black py-10 px-6 sm:px-10 lg:px-40">
      {/* Title with lines */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-full h-[1px] bg-gray-500 mb-10"></div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
          My Upcoming Lives
        </h2>
        <div className="w-full h-[1px] bg-gray-500 mt-10"></div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-10">
        {upcomingLives.map((live, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row rounded-lg overflow-hidden w-full p-6 sm:p-8"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          >
            {/* Left Image */}
            <div className="flex-shrink-0 w-full lg:w-[27vw] h-[55vw] sm:h-[45vw] lg:h-[23vw] mb-6 lg:mb-0">
              <img
                src={live.img}
                alt={live.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 lg:pl-6 flex flex-col justify-between text-center lg:text-left">
              <div className="flex flex-col gap-3">
                {/* Platform Pill */}
                <div className="inline-flex items-center justify-center lg:justify-start bg-white px-4 py-1 rounded-full w-max mx-auto lg:mx-0 mb-2">
                  <img
                    src={live.platformIcon}
                    alt={live.platformName}
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-black font-semibold">
                    {live.platformName}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl text-white font-semibold">
                  {live.title}
                </h3>

                {/* Date */}
                <span className="text-sm text-gray-400">{live.date}</span>

                {/* Separator */}
                <div className="border-b border-gray-700 my-2"></div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {live.descr}
                </p>
              </div>

              {/* Book Now Button */}
              <div className="mt-6">
                <a
                  href="checkout.html"
                  className="inline-block px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-orange-400 to-pink-500 hover:from-pink-500 hover:to-orange-400 transition"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingLives;
