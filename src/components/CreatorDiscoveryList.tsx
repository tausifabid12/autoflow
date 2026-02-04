import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const creators = [
  {
    id: 1,
    name: "Alex Chen",
    handle: "@alexcreates",
    niche: "Tech & Innovation",
    followers: "2.4M",
    engagement: "8.2%",
    avatar: "🎮",
  },
  {
    id: 2,
    name: "Maya Johnson",
    handle: "@mayastyle",
    niche: "Fashion & Beauty",
    followers: "1.8M",
    engagement: "12.1%",
    avatar: "💄",
  },
  {
    id: 3,
    name: "Jordan Rivera",
    handle: "@jordanfits",
    niche: "Fitness & Wellness",
    followers: "3.2M",
    engagement: "9.8%",
    avatar: "💪",
  },
  {
    id: 4,
    name: "Sam Taylor",
    handle: "@samtravels",
    niche: "Travel & Adventure",
    followers: "1.5M",
    engagement: "11.3%",
    avatar: "✈️",
  },
];

const CreatorDiscoveryList = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const marquee = marqueeRef.current;

    if (!section || !cards || !marquee) return;

    // Title animation
    const titleWords = section.querySelectorAll(".title-word");
    gsap.set(titleWords, { opacity: 0, y: 80, rotateX: -60 });

    gsap.to(titleWords, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      },
    });

    // Cards stagger animation
    const cardElements = cards.querySelectorAll(".creator-card");
    cardElements.forEach((card, i) => {
      gsap.set(card, { opacity: 0, x: 100, rotateY: -30 });

      gsap.to(card, {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1,
        delay: i * 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cards,
          start: "top 75%",
        },
      });
    });

    // Continuous card floating
    cardElements.forEach((card, i) => {
      gsap.to(card, {
        y: 15 + i * 5,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });

    // Marquee animation
    const marqueeContent = marquee.querySelector(".marquee-content");
    if (marqueeContent) {
      gsap.to(marqueeContent, {
        xPercent: -50,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }

    // Parallax for decorative elements
    gsap.to(".creator-orb", {
      y: -200,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleCardHover = (id: number, entering: boolean) => {
    if (entering) {
      setActiveCard(id);
      gsap.to(`[data-creator="${id}"]`, {
        scale: 1.05,
        zIndex: 10,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(`[data-creator="${id}"] .card-glow`, {
        opacity: 1,
        duration: 0.4,
      });
    } else {
      setActiveCard(null);
      gsap.to(`[data-creator="${id}"]`, {
        scale: 1,
        zIndex: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(`[data-creator="${id}"] .card-glow`, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "oklch(0.18 0.01 264)" }}
    >
      {/* Background Orb */}
      <div
        className="creator-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.15 348 / 0.5) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* Marquee Background */}
      <div
        ref={marqueeRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden opacity-[0.03] pointer-events-none"
      >
        <div className="marquee-content flex whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="text-[20rem] font-black tracking-tighter mx-8"
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              CREATORS • BRANDS • CONNECT •
            </span>
          ))}
        </div>
      </div>

      <div className="content-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 md:mb-32">
          <div className="mb-8 md:mb-0">
            {/* Label */}
            <div className="flex items-center gap-4 mb-6">
              <span 
                className="text-xs uppercase tracking-[0.4em]"
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  color: "oklch(0.72 0.15 348)"
                }}
              >
                For Creators
              </span>
              <div 
                className="w-16 h-px"
                style={{
                  backgroundImage: "linear-gradient(to right, oklch(0.72 0.15 348), transparent)"
                }}
              />
            </div>

            {/* Title */}
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight"
              style={{ 
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                perspective: "1000px" 
              }}
            >
              <span 
                className="title-word inline-block"
                style={{ color: "oklch(0.96 0.02 84)" }}
              >
                Get
              </span>{" "}
              <span 
                className="title-word inline-block"
                style={{ color: "oklch(0.96 0.02 84)" }}
              >
                discovered
              </span>
              <br />
              <span 
                className="title-word inline-block"
                style={{ 
                  backgroundImage: "linear-gradient(135deg, oklch(0.72 0.15 84), oklch(0.72 0.15 348))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                by brands
              </span>{" "}
              <span 
                className="title-word inline-block italic font-light"
                style={{ color: "oklch(0.96 0.02 84)" }}
              >
                you love
              </span>
            </h2>
          </div>

          {/* Stats */}
          <div className="flex gap-8 md:gap-12">
            <div>
              <p 
                className="text-4xl md:text-5xl font-black"
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  color: "oklch(0.72 0.15 84)"
                }}
              >
                50K+
              </p>
              <p 
                className="text-sm uppercase tracking-wider"
                style={{ color: "oklch(0.96 0.02 84 / 0.5)" }}
              >
                Creators
              </p>
            </div>
            <div>
              <p 
                className="text-4xl md:text-5xl font-black"
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  color: "oklch(0.72 0.15 348)"
                }}
              >
                2.5K
              </p>
              <p 
                className="text-sm uppercase tracking-wider"
                style={{ color: "oklch(0.96 0.02 84 / 0.5)" }}
              >
                Brands
              </p>
            </div>
          </div>
        </div>

        {/* Creator Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: "1000px" }}
        >
          {creators.map((creator) => (
            <div
              key={creator.id}
              data-creator={creator.id}
              className="creator-card relative group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={() => handleCardHover(creator.id, true)}
              onMouseLeave={() => handleCardHover(creator.id, false)}
            >
              {/* Card Glow */}
              <div
                className="card-glow absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, oklch(0.72 0.15 84 / 0.3) 0%, transparent 70%)",
                  filter: "blur(30px)",
                  transform: "translateZ(-10px)",
                }}
              />

              {/* Card */}
              <div 
                className="relative p-6 md:p-8 rounded-3xl backdrop-blur-sm overflow-hidden"
                style={{
                  backgroundColor: "oklch(0.96 0.02 84 / 0.02)",
                  border: "1px solid oklch(0.96 0.02 84 / 0.1)"
                }}
              >
                {/* Background Pattern */}
                <div
                  className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                  style={{
                    background: "radial-gradient(circle at 80% 20%, oklch(0.72 0.15 84 / 0.2) 0%, transparent 50%)",
                  }}
                />

                {/* Avatar */}
                <div 
                  className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundImage: "linear-gradient(to bottom right, oklch(0.96 0.02 84 / 0.1), oklch(0.96 0.02 84 / 0.05))",
                    border: "1px solid oklch(0.96 0.02 84 / 0.1)"
                  }}
                >
                  <span className="text-4xl md:text-5xl">{creator.avatar}</span>
                  {/* Online Indicator */}
                  <div 
                    className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2"
                    style={{
                      backgroundColor: "#22c55e",
                      borderColor: "oklch(0.18 0.01 264)"
                    }}
                  />
                </div>

                {/* Info */}
                <div className="relative text-center mb-6">
                  <h3 
                    className="text-xl font-bold mb-1"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      color: "oklch(0.96 0.02 84)"
                    }}
                  >
                    {creator.name}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      color: "oklch(0.72 0.15 84)"
                    }}
                  >
                    {creator.handle}
                  </p>
                  <p 
                    className="text-xs uppercase tracking-wider mt-2"
                    style={{ color: "oklch(0.96 0.02 84 / 0.4)" }}
                  >
                    {creator.niche}
                  </p>
                </div>

                {/* Stats */}
                <div 
                  className="relative grid grid-cols-2 gap-4 pt-4"
                  style={{ borderTop: "1px solid oklch(0.96 0.02 84 / 0.1)" }}
                >
                  <div className="text-center">
                    <p 
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        color: "oklch(0.96 0.02 84)"
                      }}
                    >
                      {creator.followers}
                    </p>
                    <p 
                      className="text-xs uppercase"
                      style={{ color: "oklch(0.96 0.02 84 / 0.4)" }}
                    >
                      Followers
                    </p>
                  </div>
                  <div className="text-center">
                    <p 
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        color: "oklch(0.72 0.15 84)"
                      }}
                    >
                      {creator.engagement}
                    </p>
                    <p 
                      className="text-xs uppercase"
                      style={{ color: "oklch(0.96 0.02 84 / 0.4)" }}
                    >
                      Engagement
                    </p>
                  </div>
                </div>

                {/* Hover CTA */}
                <div 
                  className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{
                    backgroundImage: "linear-gradient(to top, oklch(0.18 0.01 264 / 0.9), transparent)"
                  }}
                >
                  <button 
                    className="w-full py-3 rounded-full font-semibold text-sm"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      backgroundColor: "oklch(0.72 0.15 84)",
                      color: "oklch(0.18 0.01 264)"
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-24 text-center">
          <p 
            className="text-xl md:text-2xl mb-8"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              color: "oklch(0.96 0.02 84 / 0.5)"
            }}
          >
            No cold DMs. Just authentic matches with brands that{" "}
            <span 
              className="font-semibold"
              style={{ color: "oklch(0.96 0.02 84)" }}
            >
              get you
            </span>.
          </p>
          <button 
            className="group relative px-8 py-4 rounded-full font-semibold overflow-hidden hoverable"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              backgroundColor: "oklch(0.72 0.15 84)",
              color: "oklch(0.18 0.01 264)"
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Join as Creator
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div 
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-700"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreatorDiscoveryList;