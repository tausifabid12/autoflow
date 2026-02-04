import React from "react";
import fbIcon from "/assets/img/social-icon-1.png";
import igIcon from "/assets/img/social-icon-2.png";
import tiktokIcon from "/assets/img/social-icon-3.png";
import ytIcon from "/assets/img/social-icon-4.png";

const SocialLinks = () => {
  const socials = [
    { name: "Facebook", followers: "20.5K Followers", icon: fbIcon, btn: "Follow Me" },
    { name: "Instagram", followers: "30.9K Followers", icon: igIcon, btn: "Follow Me" },
    { name: "TikTok", followers: "2.5M Followers", icon: tiktokIcon, btn: "Follow Me" },
    { name: "YouTube", followers: "1.69M Subscribers", icon: ytIcon, btn: "Subscribe" },
  ];

  return (
    <div className="jo-social-links py-20 bg-white">
      <div className="flex gap-10 justify-center flex-wrap">
        {socials.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-75 h-25 bg-white shadow-md rounded-lg px-4"
          >
            {/* Left Icon */}
            <div className="w-10 h-10 flex-shrink-0">
              <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
            </div>

            {/* Middle Text */}
            <div className="flex flex-col flex-1 ml-3">
              <h5 className="text-black font-semibold text-lg">{item.name}</h5>
              <span className="text-gray-500 text-sm">{item.followers}</span>
            </div>

            {/* Right Button */}
            <a
              href="#"
              className="text-white text-sm px-3 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-pink-500 hover:to-yellow-400
             transition duration-300"
            >
              {item.btn}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
