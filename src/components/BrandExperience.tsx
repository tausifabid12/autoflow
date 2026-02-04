import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BrandExperience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "AI-Powered Matching",
      description: "Find creators who genuinely resonate with your brand values",
      icon: "🎯",
      stat: "98%",
      statLabel: "Match Rate",
      size: "large",
    },
    {
      title: "Campaign Analytics",
      description: "Real-time insights that matter",
      icon: "📊",
      stat: "2.4x",
      statLabel: "Avg. ROI",
      size: "medium",
    },
    {
      title: "Secure Payments",
      description: "Escrow protection for peace of mind",
      icon: "🔒",
      stat: "$12M+",
      statLabel: "Processed",
      size: "medium",
    },
    {
      title: "Global Reach",
      description: "Connect with creators worldwide",
      icon: "🌍",
      stat: "150+",
      statLabel: "Countries",
      size: "small",
    },
    {
      title: "Smart Contracts",
      description: "Automated milestone payments",
      icon: "📝",
      stat: "Zero",
      statLabel: "Disputes",
      size: "small",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const bento = bentoRef.current;

    if (!section || !title || !bento) return;

    // Title reveal animation
    const titleChars = title.querySelectorAll(".char");
    const titleLine = title.querySelector(".title-line");
    const titleSub = title.querySelector(".title-sub");

    gsap.set(titleChars, { opacity: 0, y: 100, rotateX: -90 });
    gsap.set(titleLine, { scaleX: 0 });
    gsap.set(titleSub, { opacity: 0, y: 30 });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: title,
        start: "top 75%",
        end: "top 25%",
        toggleActions: "play none none reverse",
      },
    });

    titleTl
      .to(titleLine, { scaleX: 1, duration: 0.8, ease: "power4.inOut" })
      .to(
        titleChars,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power4.out",
        },
        "-=0.4"
      )
      .to(titleSub, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

    // Bento grid cards animation
    const cards = bento.querySelectorAll(".bento-card");
    cards.forEach((card, i) => {
      const cardInner = card.querySelector(".card-inner");
      const cardBg = card.querySelector(".card-bg");
      const cardIcon = card.querySelector(".card-icon");
      const cardStat = card.querySelector(".card-stat");

      gsap.set(card, { opacity: 0, y: 80, rotateX: -15 });
      gsap.set(cardBg, { scale: 0 });
      gsap.set(cardIcon, { scale: 0, rotate: -45 });
      gsap.set(cardStat, { opacity: 0, x: -20 });

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      cardTl
        .to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power4.out",
        })
        .to(cardBg, { scale: 1, duration: 1, ease: "power3.out" }, "-=0.6")
        .to(
          cardIcon,
          { scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.5"
        )
        .to(cardStat, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, "-=0.3");

      // Hover animation
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -10, duration: 0.4, ease: "power3.out" });
        gsap.to(cardBg, { scale: 1.1, duration: 0.6, ease: "power3.out" });
        gsap.to(cardIcon, { scale: 1.2, rotate: 10, duration: 0.4, ease: "power3.out" });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.4, ease: "power3.out" });
        gsap.to(cardBg, { scale: 1, duration: 0.6, ease: "power3.out" });
        gsap.to(cardIcon, { scale: 1, rotate: 0, duration: 0.4, ease: "power3.out" });
      });
    });

    // Parallax background elements
    gsap.to(".brand-orb-1", {
      y: -100,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.to(".brand-orb-2", {
      y: 150,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ transformStyle: "preserve-3d" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "oklch(0.18 0.01 264)" }}
    >
      {/* Background Elements */}
      <div 
        className="brand-orb-1 absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.15 84 / 0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div 
        className="brand-orb-2 absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.15 348 / 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Decorative Lines */}
      <div 
        className="absolute top-0 left-1/4 w-px h-full"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, transparent, oklch(0.96 0.02 84 / 0.05), transparent)"
        }}
      />
      <div 
        className="absolute top-0 right-1/4 w-px h-full"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, transparent, oklch(0.96 0.02 84 / 0.05), transparent)"
        }}
      />

      <div className="content-container relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-8">
          <div 
            className="w-16 h-px"
            style={{ 
              backgroundImage: "linear-gradient(to right, oklch(0.72 0.15 84), transparent)"
            }}
          />
          <span 
            className="text-xs uppercase tracking-[0.4em]"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              color: "oklch(0.72 0.15 84)"
            }}
          >
            For Brands
          </span>
        </div>

        {/* Title */}
        <div ref={titleRef} className="mb-20 md:mb-32 max-w-4xl">
          <div
            className="title-line h-1 w-24 mb-8 origin-left"
            style={{ 
              backgroundColor: "oklch(0.72 0.15 84)",
              transform: "scaleX(0)" 
            }}
          />
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6"
            style={{ 
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              perspective: "1000px" 
            }}
          >
            <span 
              className="block"
              style={{ color: "oklch(0.96 0.02 84)" }}
            >
              {splitText("Launch campaigns")}
            </span>
            <span 
              className="block"
              style={{ 
                backgroundImage: "linear-gradient(135deg, oklch(0.72 0.15 84), oklch(0.72 0.15 348))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              {splitText("that resonate")}
            </span>
          </h2>
          <p 
            className="title-sub text-xl md:text-2xl max-w-xl"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              color: "oklch(0.96 0.02 84 / 0.5)"
            }}
          >
            Post your vision. Our AI matches you with creators who genuinely get it.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={bentoRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
          style={{ perspective: "1000px" }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bento-card relative overflow-hidden rounded-3xl cursor-pointer hoverable ${
                feature.size === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : feature.size === "medium"
                  ? "md:col-span-2"
                  : "md:col-span-1"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Background */}
              <div
                className="card-bg absolute inset-0 opacity-60"
                style={{
                  background: "radial-gradient(circle at 30% 30%, oklch(0.72 0.15 84 / 0.15) 0%, transparent 60%)",
                  transform: "scale(0)",
                }}
              />

              {/* Card Content */}
              <div 
                className="card-inner relative p-6 md:p-8 h-full min-h-[200px] md:min-h-[240px] rounded-3xl backdrop-blur-sm flex flex-col justify-between"
                style={{
                  backgroundColor: "oklch(0.96 0.02 84 / 0.02)",
                  border: "1px solid oklch(0.96 0.02 84 / 0.1)"
                }}
              >
                {/* Header */}
                <div>
                  <div 
                    className="card-icon w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "oklch(0.96 0.02 84 / 0.05)" }}
                  >
                    <span className="text-3xl md:text-4xl">{feature.icon}</span>
                  </div>
                  <h3 
                    className="text-xl md:text-2xl font-bold mb-2"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      color: "oklch(0.96 0.02 84)"
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-sm md:text-base"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      color: "oklch(0.96 0.02 84 / 0.5)"
                    }}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Stat */}
                <div 
                  className="card-stat mt-6 pt-4"
                  style={{ borderTop: "1px solid oklch(0.96 0.02 84 / 0.05)" }}
                >
                  <p 
                    className="text-3xl md:text-4xl font-black"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      color: "oklch(0.72 0.15 84)"
                    }}
                  >
                    {feature.stat}
                  </p>
                  <p 
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.96 0.02 84 / 0.4)" }}
                  >
                    {feature.statLabel}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-8 h-8">
                  <div 
                    className="absolute top-0 right-0 w-full h-px"
                    style={{ 
                      backgroundImage: "linear-gradient(to left, oklch(0.72 0.15 84 / 0.5), transparent)"
                    }}
                  />
                  <div 
                    className="absolute top-0 right-0 h-full w-px"
                    style={{ 
                      backgroundImage: "linear-gradient(to bottom, oklch(0.72 0.15 84 / 0.5), transparent)"
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <button 
            className="group relative px-8 py-4 bg-transparent rounded-full font-semibold overflow-hidden transition-colors duration-500 hoverable"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              color: "oklch(0.96 0.02 84)",
              border: "2px solid oklch(0.96 0.02 84 / 0.2)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.72 0.15 84)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.96 0.02 84 / 0.2)";
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Your Campaign
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <div 
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              style={{ backgroundColor: "oklch(0.72 0.15 84 / 0.1)" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandExperience;