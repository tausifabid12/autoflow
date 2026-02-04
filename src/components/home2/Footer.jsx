import React from "react";
import logoWhite from "/assets/img/logo-white.svg";
import footerImg1 from "/assets/footer1.jpg";
import footerImg2 from "/assets/footer2.jpg";
import footerImg3 from "/assets/footer3.jpg";
import footerImg4 from "/assets/footer4.jpg";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white relative px-4 md:px-10 lg:px-20 py-10">
      <div className="bg-gradient-to-r from-red-600 to-orange-400 rounded-b-2xl flex flex-col md:flex-row items-center justify-between py-6 px-4 md:px-10 gap-4 md:gap-0">
        <div className="flex items-center">
          <img src={logoWhite} alt="Logo" className="h-12" />
        </div>

        <div className="relative w-full md:w-[35vw] flex justify-center">
          <input
            type="email"
            placeholder="Email Address"
            className="rounded-full px-6 py-2 w-full h-12 focus:outline-none text-black bg-white"
          />
          <button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-pink-500 hover:to-orange-400 transition text-white font-semibold">
            Subscribe
          </button>
        </div>

        <div className="flex items-center gap-2">
          {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
            <div
              key={idx}
              className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 transition cursor-pointer"
            >
              <Icon />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-10 flex flex-col md:flex-row justify-between gap-10 md:gap-0">
        <div className="flex flex-col">
          <h5 className="text-lg font-semibold mb-3">Get in Touch</h5>
          <a
            href="mailto:getcreatoronline@gmail.com"
            className="text-gray-400 text-lg md:text-xl hover:text-pink-500"
          >
           getcreatoronline@gmail.com
          </a>
        </div>

        <div className="flex flex-col items-start">
          <h5 className="text-lg font-semibold mb-3 text-left">Browse Categories</h5>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
            <a href="#" className="hover:text-pink-500">Music</a>
            <a href="#" className="hover:text-pink-500">Sports</a>
            <a href="#" className="hover:text-pink-500">Gaming</a>
            <a href="#" className="hover:text-pink-500">Fashion</a>
            <a href="#" className="hover:text-pink-500">Art</a>
            <a href="#" className="hover:text-pink-500">Photography</a>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <h5 className="text-lg font-semibold mb-3">Instagram Feed</h5>
          <div className="flex gap-2 flex-wrap">
            {[footerImg1, footerImg2, footerImg3, footerImg4].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Footer ${idx + 1}`}
                className="h-20 w-20 rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-800 mt-10"></div>
      <div className="text-center mt-5 pb-6 text-sm text-gray-400">
        Copyright ©2024 Developed by&nbsp;Influtics
      </div>
    </footer>
  );
};

export default Footer;
