import React from "react";




const Banner = () => {
  return (
    <section className="relative jo-banner overflow-hidden">
      <div className="jo-banner-container max-w-[1500px] mx-auto px-4 md:px-10 lg:px-20 pt-18">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="lg:w-7/12 mt-8 lg:mt-0">
            <div className="relative jo-banner__notifi flex items-center gap-2 bg-white backdrop-blur-lg px-2 py-1 rounded-full w-40">
              <img src={'/assets/userdp.png'} alt="img" className="w-10 h-10 rounded-full" />
              <span>Bryan has liked</span>
              <span className="icon absolute right-0 mb-12 mr-2">
                <img src={'/assets/img/love.svg'} alt="icon" className="w-7 h-7" />
              </span>
            </div>

            <h1 className="jo-banner__title text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-tight text-white mt-6">
              I'm <span className="styled text-primary">Linda</span> Susan
              Beauty & Lifestyle Influencer
            </h1>

            <div className="jo-banner__btns flex flex-wrap gap-4 mt-5">
              <a
                href="#"
                className="jo-btn bg-gradient-to-r from-yellow-500 to-pink-500 text-white px-6 py-3 rounded-md"
              >
                About Me
              </a>
              <a
                href="#"
                className="jo-btn hover:bg-pink-500 border text-white px-6 py-3 rounded-md"
              >
                Contact Me
              </a>
            </div>

            <img
              src={'/assets/img/jo-banner-vector-1.svg'}
              alt="vector"
              className="vector absolute bottom-0 left-[28rem] w-24 hidden lg:block"
            />
          </div>

          <div className="lg:w-6/14 relative">
            <img
              src={'/assets/bannerimage.png'}
              alt="Image"
              className="w-full rounded-lg"
            />

            <div className="absolute top-1/4 right-0 transform -translate-y-1/4">
              <div className="bg-white px-6 py-3 rounded-[60%_60%_50%_50%] -rotate-25 flex flex-col items-center justify-center">
                <div className="rotate-25 text-center">
                  <span className="number text-xl sm:text-2xl font-bold text-red-500">74K</span>
                  <span className="txt block text-sm sm:text-base">Followers</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 left-6 flex items-center gap-2 bg-white backdrop-blur-lg px-3 py-1 rounded-full w-40">
              <img src={'/assets/img/jo-banner-vector-2.svg'} alt="img" className="w-10 h-10 rounded-full" />
              <span>Bryan has liked</span>
              <span className="icon absolute right-0 mb-12 mr-2">
                <img src={'/assets/img/love.svg'} alt="icon" className="w-7 h-7" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <img
        src={'/assets/img/jo-banner-vector-2.svg'}
        alt="vector"
        className="vector absolute bottom-10 right-0 w-30 hidden lg:block z-0"
      />
    </section>
  );
};

export default Banner;
