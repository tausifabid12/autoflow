import React from "react";
import contactImg from "/assets/contact-img.png";
import contactbg from "/assets/img/contact-bg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const logos = [
  { src: "https://influtics.temptics.com/assets/img/partner-1.png", link: "#" },
  { src: "https://influtics.temptics.com/assets/img/partner-2.png", link: "#" },
  { src: "https://influtics.temptics.com/assets/img/partner-3.png", link: "#" },
  { src: "https://influtics.temptics.com/assets/img/partner-4.png", link: "#" },
  { src: "https://influtics.temptics.com/assets/img/partner-4.png", link: "#" },
  { src: "https://influtics.temptics.com/assets/img/partner-4.png", link: "#" },
  { src: "https://influtics.temptics.com/assets/img/partner-4.png", link: "#" },
];

const Contactpage = () => {
  return (
    <div className="relative">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div
          className="relative w-full h-160 flex bg-cover bg-center"
          style={{ backgroundImage: `url(${contactbg})` }}
        >
          <div>
            <img
              src={contactImg}
              alt=""
              className="w-[38vw] absolute bottom-0 right-43"
            />
          </div>
        </div>

        <div className="h-[52vw] w-[40vw] absolute bg-white top-20 left-30 rounded-4xl p-10">
          <img
            src="https://influtics.temptics.com/assets/img/contact-form-icon.svg"
            alt=""
          />
          <h1 className="font-bold text-3xl mt-2">
            Let's Work Together on your next project
          </h1>
          <p className="mt-5 mb-5">
            consectetur adipiscing elit. Donec non mattis nulla, in ultrices diam. Curabitur nec pharetra nunc. Nunc nec pellentesque nisl. Ut non mauris bibendum
          </p>
          <label className="font-bold text-sm ">Your name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 bg-zinc-100 h-13 mt-3 mb-5 rounded-lg p-5 text-sm focus:outline-none"
          />
          <label className="font-bold text-sm ">Your Email Address</label>
          <input
            type="email"
            placeholder="Your email"
            className="w-full border border-gray-300 bg-zinc-100 h-13 mt-3 mb-5 rounded-lg p-5 text-sm focus:outline-none"
          />
          <label className="font-bold text-sm ">Your Message</label>
          <textarea
            placeholder="Write message..."
            className="w-full border border-gray-300 bg-zinc-100 h-35 mt-3 rounded-lg p-5 text-sm focus:outline-none"
          />
          <div className="mt-4">
            <a
              href="checkout.html"
              className="inline-block px-7 py-2 rounded-lg text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 transition"
            >
              Send Message
            </a>
          </div>
        </div>

        <div className="w-full h-80 bg-red-100 py-10">
          <h1 className="text-end mr-80 text-2xl font-semibold">
            Trusted Partners
          </h1>
          <div className="w-[30%] ml-[60vw] mt-8">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              grabCursor={true}
              pagination={{
                clickable: true,
                bulletClass:
                  "swiper-pagination-bullet bg-gray-300 w-3 h-3 rounded-full inline-block mx-1",
                bulletActiveClass:
                  "swiper-pagination-bullet-active bg-red-500 w-3 h-3 rounded-full mx-1",
              }}
              modules={[Pagination]}
              className="pb-10"
            >
              {logos.map((logo, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <a href={logo.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={logo.src}
                      alt={`Partner ${index + 1}`}
                      className="h-12 object-contain hover:scale-105 transition-transform duration-200"
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden px-5 py-10">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <img
            src="https://influtics.temptics.com/assets/img/contact-form-icon.svg"
            alt=""
            className="w-10 h-10"
          />
          <h1 className="font-bold text-2xl mt-2">
            Let's Work Together on your next project
          </h1>
          <p className="mt-3 mb-5 text-gray-600 text-sm">
            consectetur adipiscing elit. Donec non mattis nulla, in ultrices diam. Curabitur nec pharetra nunc. Nunc nec pellentesque nisl.
          </p>

          <label className="font-bold text-sm">Your name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 bg-zinc-100 h-12 mt-3 mb-5 rounded-lg p-4 text-sm focus:outline-none"
          />

          <label className="font-bold text-sm">Your Email Address</label>
          <input
            type="email"
            placeholder="Your email"
            className="w-full border border-gray-300 bg-zinc-100 h-12 mt-3 mb-5 rounded-lg p-4 text-sm focus:outline-none"
          />

          <label className="font-bold text-sm">Your Message</label>
          <textarea
            placeholder="Write message..."
            className="w-full border border-gray-300 bg-zinc-100 h-28 mt-3 rounded-lg p-4 text-sm focus:outline-none"
          />

          <div className="mt-4">
            <a
              href="checkout.html"
              className="inline-block px-6 py-2 rounded-lg text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-pink-500 hover:to-orange-400 transition"
            >
              Send Message
            </a>
          </div>
        </div>

        <div className="w-full bg-red-100 py-10 mt-10 rounded-2xl">
          <h1 className="text-center text-2xl font-semibold">
            Trusted Partners
          </h1>

          <div className="w-[90%] mx-auto mt-8">
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              loop={true}
              grabCursor={true}
              pagination={{
                clickable: true,
                bulletClass:
                  "swiper-pagination-bullet bg-gray-300 w-3 h-3 rounded-full inline-block mx-1",
                bulletActiveClass:
                  "swiper-pagination-bullet-active bg-red-500 w-3 h-3 rounded-full mx-1",
              }}
              modules={[Pagination]}
              className="pb-10"
            >
              {logos.map((logo, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <a href={logo.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={logo.src}
                      alt={`Partner ${index + 1}`}
                      className="h-12 object-contain hover:scale-105 transition-transform duration-200"
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactpage;
