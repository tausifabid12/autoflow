import React, { useRef, useEffect, useState } from "react";
import VideoCard from "./VideoCard";

const VideoRow = ({ videos, direction = "left" }) => {
  const rowRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let frameId;
    let scrollAmount = direction === "left" ? 1 : -1;

    const scroll = () => {
      if (rowRef.current && !isHovered) {
        rowRef.current.scrollLeft += scrollAmount;
      }
      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frameId);
  }, [direction, isHovered]);

  return (
    <div
      ref={rowRef}
      className="flex gap-5 overflow-x-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {videos.map((video, i) => (
        <VideoCard key={i} video={video} />
      ))}
    </div>
  );
};

export default VideoRow;
