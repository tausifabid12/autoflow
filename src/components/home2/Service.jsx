import React, { useState } from "react";
import serviceImg from "/assets/serviceimage.jpg";

const services = [
  {
    title: "Brand Collaborations",
    contentTitle: "Strategy Development",
    description:
      "consectetur adipiscing elit. Donec non mattis nulla, in ultrices diam. Curabitur nec pharetra nunc. Nunc nec pellentesque nisl. Ut non mauris bibendum nunc pharetra laoreet sed eget mauris. Donec eget fermentum libero, ac aliquet lectus.",
    list: [
      "Unlimited influencer search",
      "Unlimited direct messages with freelancer.",
      "Unlimited requests for with celebrities.",
      "Unlimited project tracking",
      "Unlimited Campaign monitoring.",
      "Goal Setting Begin by clearly defining",
    ],
  },
  {
    title: "Empowering Creators",
    contentTitle: "Strategy Development",
    description:
      "consectetur adipiscing elit. Donec non mattis nulla, in ultrices diam. Curabitur nec pharetra nunc. Nunc nec pellentesque nisl. Ut non mauris bibendum nunc pharetra laoreet sed eget mauris. Donec eget fermentum libero, ac aliquet lectus.",
    list: [
      "Unlimited influencer search",
      "Unlimited direct messages with freelancer.",
      "Unlimited requests for with celebrities.",
      "Unlimited project tracking",
      "Unlimited Campaign monitoring.",
      "Goal Setting Begin by clearly defining",
    ],
  },
  {
    title: "Content Planner",
    contentTitle: "Strategy Development",
    description:
      "consectetur adipiscing elit. Donec non mattis nulla, in ultrices diam. Curabitur nec pharetra nunc. Nunc nec pellentesque nisl. Ut non mauris bibendum nunc pharetra laoreet sed eget mauris. Donec eget fermentum libero, ac aliquet lectus.",
    list: [
      "Unlimited influencer search",
      "Unlimited direct messages with freelancer.",
      "Unlimited requests for with celebrities.",
      "Unlimited project tracking",
      "Unlimited Campaign monitoring.",
      "Goal Setting Begin by clearly defining",
    ],
  },
  {
    title: "Relevant Content",
    contentTitle: "Strategy Development",
    description:
      "consectetur adipiscing elit. Donec non mattis nulla, in ultrices diam. Curabitur nec pharetra nunc. Nunc nec pellentesque nisl. Ut non mauris bibendum nunc pharetra laoreet sed eget mauris. Donec eget fermentum libero, ac aliquet lectus.",
    list: [
      "Unlimited influencer search",
      "Unlimited direct messages with freelancer.",
      "Unlimited requests for with celebrities.",
      "Unlimited project tracking",
      "Unlimited Campaign monitoring.",
      "Goal Setting Begin by clearly defining",
    ],
  },
  {
    title: "Social Media Management",
    contentTitle: "Strategy Development",
    description:
      "consectetur adipiscing elit. Donec non mattis nulla, in ultrices diam. Curabitur nec pharetra nunc. Nunc nec pellentesque nisl. Ut non mauris bibendum nunc pharetra laoreet sed eget mauris. Donec eget fermentum libero, ac aliquet lectus.",
    list: [
      "Unlimited influencer search",
      "Unlimited direct messages with freelancer.",
      "Unlimited requests for with celebrities.",
      "Unlimited project tracking",
      "Unlimited Campaign monitoring.",
      "Goal Setting Begin by clearly defining",
    ],
  },
];

const Service = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="flex flex-col items-center py-10 bg-white">
      <div className="bg-red-100/50 w-[90vw] md:w-[80vw] p-6 md:p-10 rounded-2xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold">What Will I Give You?</h2>
          <button className="bg-gradient-to-r from-orange-300 to-pink-500 text-white px-8 py-3 rounded-md hover:from-pink-500 hover:to-yellow-400 transition duration-300">
            View All Services
          </button>
        </div>

        <div className="border-b border-gray-300 mb-10"></div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Buttons */}
          <div className="flex flex-col gap-3 w-full lg:w-72">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`h-14 w-80 px-5 rounded-md text-left transition cursor-pointer ${
                  activeTab === index
                    ? "bg-gradient-to-r from-pink-500 to-orange-300 text-white font-medium"
                    : "bg-white text-black font-medium hover:bg-gray-200"
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden lg:h-82 h-auto p-5 gap-5">
            <img
              src={serviceImg}
              alt="Service"
              className="w-full lg:w-1/2 h-64 lg:h-auto object-cover rounded-xl"
            />
            <div className="w-full lg:w-1/2 flex flex-col">
              <h5 className="text-lg font-semibold mb-2">{services[activeTab].contentTitle}</h5>
              <p className="text-gray-500 mb-4 text-sm">{services[activeTab].description}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm pl-3">
                {services[activeTab].list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
