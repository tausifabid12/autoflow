import React from "react";
import VideoRow from "./VideoRow";
import reelimage1 from '/assets/reelimage1.jpg'
import reelimage2 from '/assets/reelimage2.jpg'
import reelimage3 from '/assets/reelimage3.jpg'
import reelimage4 from '/assets/reelimage4.jpg'
import reelimage5 from '/assets/reelimage5.jpg'
import reelimage6 from '/assets/reelimage6.jpg'

const videosRow1 = [
  { img: reelimage1, price: "$5.00", title: "Video 1", views: "16M views", time: "49 minutes ago", premium: true },
  { img: reelimage2, price: "$5.00", title: "Video 2", views: "12M views", time: "2 hours ago", premium: true },
  { img: reelimage3, price: "$5.00", title: "Video 3", views: "8M views", time: "1 day ago", premium: false },
  { img: reelimage4, price: "$5.00", title: "Video 3", views: "8M views", time: "1 day ago", premium: false },
  { img: reelimage5, price: "$5.00", title: "Video 3", views: "8M views", time: "1 day ago", premium: false },
  { img: reelimage6, price: "$5.00", title: "Video 3", views: "8M views", time: "1 day ago", premium: false },
];

const videosRow2 = [
{ img: reelimage1, price: "$5.00", title: "Video 1", views: "16M views", time: "49 minutes ago", premium: true },
  { img: reelimage2, price: "$5.00", title: "Video 2", views: "12M views", time: "2 hours ago", premium: true },
  { img: reelimage3, price: "$5.00", title: "Video 3", views: "8M views", time: "1 day ago", premium: false },
  { img: reelimage4, price: "$5.00", title: "Video 3", views: "8M views", time: "1 day ago", premium: false },
  { img: reelimage5, price: "$5.00", title: "Video 3", views: "8M views", time: "1 day ago", premium: false },
  { img: reelimage6, price: "$5.00", title: "Video 3", views: "8M views", time: "1 day ago", premium: false },
];


const VideoSection = () => {
  return (
    <section className="py-12 bg-white px-10 space-y-6">
      <VideoRow videos={videosRow1} direction="left" />
      <VideoRow videos={videosRow2} direction="right" />
    </section>
  );
};

export default VideoSection;
