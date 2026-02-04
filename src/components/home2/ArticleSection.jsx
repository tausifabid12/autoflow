import React from "react";
import article1 from '/assets/article1.jpg';
import article2 from '/assets/article2.jpg';
import article3 from '/assets/article3.jpg';
import { FaUser, FaTag } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const articles = [
  {
    id: 1,
    img: "",
    date: "10",
    month: "June",
    author: "Admin",
    category: "Music",
    title: "Many of those Products Offer the Potential",
    link: "#",
  },
  {
    id: 2,
    img: article2,
    date: "15",
    month: "June",
    author: "Admin",
    category: "Technology",
    title: "How to Build Better Customer Experiences",
    link: "#",
  },
  {
    id: 3,
    img: article3,
    date: "20",
    month: "June",
    author: "Admin",
    category: "Business",
    title: "Trends that will Dominate in 2025",
    link: "#",
  },
];

const ArticleSection = () => {
  return (
    <section className="py-16 bg-gray-50 pb-30">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Latest Articles & News</h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col p-4"
          >
            <div className="relative h-60 sm:h-56 md:h-60">
              <img
                src={article.img}
                alt="Article"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex flex-col items-center shadow-md bg-white rounded-t-xl rounded-b-xl">
                <span className="bg-red-500 text-white px-5 rounded-full text-sm font-semibold">
                  {article.date}
                </span>
                <span className="text-black px-3 py-1 rounded-b-md text-xs font-medium -mt-1">
                  {article.month}
                </span>
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between h-1/2">
              <div className="flex items-center gap-6 text-gray-500 text-sm mb-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <FaUser className="text-red-500" />
                  <span>By {article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTag className="text-red-500 rotate-90" />
                  <span>{article.category}</span>
                </div>
              </div>

              <h4 className="text-xl font-bold mb-3 hover:text-red-500 transition-colors duration-200">
                <a href={article.link}>{article.title}</a>
              </h4>

              <a
                href={article.link}
                className="text-red-500 text-sm font-semibold flex items-center gap-2 hover:text-black transition-colors duration-200"
              >
                Read More{" "}
                <span className="text-md">
                  <FaArrowRight className="text-red-500 group-hover:text-black" />
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArticleSection;
