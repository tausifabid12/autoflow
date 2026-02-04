import React, { useState } from "react";

const VideoCard = ({ video }) => {
  const [hover, setHover] = useState(false);
 


  return (
    <div
      className="relative w-[40vw] h-[20vw] overflow-hidden rounded-lg cursor-pointer flex-shrink-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <img src={video.img} alt={video.title} className="w-full h-full object-cover" />

      {/* Top-left small play button */}
      <button
        className={`absolute top-2 left-2 w-8 h-8 border border-white rounded-full flex items-center justify-center transition ${
          hover ? "bg-white" : "bg-transparent"
        }`}
      >
        <div
          className={`w-0 h-0 border-l-[6px] border-l-${hover ? "red-600" : "white"} border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent`}
        ></div>
      </button>

      {/* Top-right premium button */}
      {video.premium && (
        <div className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center">
          <img src="/assets/img/crown.svg" alt="premium" className="w-5 h-5" />
        </div>
      )}

      {/* Bottom-left price pill */}
      <span
        className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-red-600 bg-white/30 backdrop-blur-sm transition-transform ${
          hover ? "-translate-y-4" : ""
        }`}
      >
        {video.price}
      </span>

      {/* Info overlay */}
      <div
        className={`absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-pink-500/70 via-orange-400/70 to-transparent text-white transition-transform ${
          hover ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h5 className="text-lg font-semibold">{video.title}</h5>
        <p className="text-sm mt-1">{video.views} | {video.time}</p>
      </div>
    </div>
  );
};

export default VideoCard;
