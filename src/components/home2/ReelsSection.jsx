'use client'
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import arrowIcon from '/assets/right-arrow.png';
import fbIcon from "/assets/img/social-icon-1.png";
import thumb1 from "/assets/reelimage1.jpg";
import thumb2 from "/assets/reelimage2.jpg";
import thumb3 from "/assets/reelimage3.jpg";
import thumb4 from "/assets/reelimage4.jpg";
import thumb5 from "/assets/reelimage5.jpg";

const reels = [
  { thumb: thumb1, title: "Can Robot Solve This ...?", views: "16M views" },
  { thumb: thumb2, title: "Dancing Bot in Action", views: "9.2M views" },
  { thumb: thumb3, title: "AI Creating Art", views: "12M views" },
  { thumb: thumb4, title: "Fun with Coding", views: "5.6M views" },
  { thumb: thumb5, title: "Tech That Shocks!", views: "20M views" },
  { thumb: thumb5, title: "Tech That Shocks!", views: "20M views" },
];

const ReelsSection = () => {
  // Create refs for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="jo-reels py-12 px-4 md:px-10 lg:px-20 bg-white relative">
      <div className="flex items-center justify-center relative mb-12">
        <button
          ref={prevRef}
          className="absolute left-0 bg-red-100 text-white rounded-full w-10 h-10 flex items-center justify-center z-10"
        >
          <img src={arrowIcon} className="rotate-180 w-4" alt="prev" />
        </button>

        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Latest Video Reels
        </h2>

        <button
          ref={nextRef}
          className="absolute right-0 bg-red-100 text-white rounded-full w-10 h-10 flex items-center justify-center z-10"
        >
          <img src={arrowIcon} className="w-4" alt="next" />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        loop={true}
        spaceBetween={20}
        onBeforeInit={(swiper) => {
          // Bind navigation buttons dynamically
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="jo-reels-slider"
      >
        {reels.map((reel, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center">
              <div
                className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-center bg-cover shadow-lg"
                style={{ backgroundImage: `url(${reel.thumb})` }}
              >
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </button>

                <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full flex items-center shadow-md">
                  <img src={fbIcon} alt="Facebook" className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Facebook Reel</span>
                </div>
              </div>

              <div className="bg-white w-full mt-3 py-3 px-2 rounded-b-xl text-center sm:text-left">
                <h5 className="font-semibold text-lg">{reel.title}</h5>
                <p className="text-gray-600 text-sm">{reel.views}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReelsSection;
