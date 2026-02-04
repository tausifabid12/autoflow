import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  "NIKE",
  "SPOTIFY",
  "ADOBE",
  "GOOGLE",
  "META",
  "APPLE",
  "NETFLIX",
  "SAMSUNG",
];

const stats = [
  { value: 50, suffix: "K+", label: "Active Creators" },
  { value: 2.5, suffix: "K+", label: "Brand Partners" },
  { value: 12, suffix: "M+", label: "Paid to Creators" },
  { value: 98, suffix: "%", label: "Match Success" },
];

const TrustSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const marqueeTopRef = useRef<HTMLDivElement>(null);
  const marqueeBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const statsContainer = statsRef.current;
    const marqueeTop = marqueeTopRef.current;
    const marqueeBottom = marqueeBottomRef.current;

    if (!section || !statsContainer || !marqueeTop || !marqueeBottom) return;

    // Stats counter animation
    const statItems = statsContainer.querySelectorAll(".stat-item");
    statItems.forEach((item, i) => {
      const valueEl = item.querySelector(".stat-value");
      const labelEl = item.querySelector(".stat-label");
      const stat = stats[i];

      gsap.set(item, { opacity: 0, y: 60 });
      gsap.set(valueEl, { textContent: "0" });

      const itemTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        },
      });

      itemTl
        .to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power4.out",
        })
        .to(
          { val: 0 },
          {
            val: stat.value,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              const current = this.targets()[0].val;
              if (valueEl) {
                const formatted =
                  stat.value >= 10
                    ? Math.round(current)
                    : current.toFixed(1);
                valueEl.textContent = `${formatted}${stat.suffix}`;
              }
            },
          },
          "-=0.5"
        );
    });

    // Marquee animations (opposite directions)
    const topContent = marqueeTop.querySelector(".marquee-content");
    const bottomContent = marqueeBottom.querySelector(".marquee-content");

    if (topContent) {
      gsap.to(topContent, {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
    }

    if (bottomContent) {
      gsap.fromTo(
        bottomContent,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 30,
          repeat: -1,
          ease: "none",
        }
      );
    }

    // Section title animation
    const sectionTitle = section.querySelector(".section-title");
    if (sectionTitle) {
      gsap.fromTo(
        sectionTitle,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionTitle,
            start: "top 80%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(180deg, oklch(0.18 0.01 264) 0%, oklch(0.22 0.01 264) 50%, oklch(0.18 0.01 264) 100%)",
      }}
    >
      {/* Top Marquee */}
      <div
        ref={marqueeTopRef}
        className="absolute top-0 left-0 w-full overflow-hidden py-4"
        style={{ 
          borderTop: "1px solid oklch(0.96 0.02 84 / 0.05)",
          borderBottom: "1px solid oklch(0.96 0.02 84 / 0.05)"
        }}
      >
        <div className="marquee-content flex whitespace-nowrap">
          {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="mx-8 md:mx-16 text-4xl md:text-6xl font-black cursor-default transition-colors duration-500"
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                color: "oklch(0.96 0.02 84 / 0.03)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "oklch(0.96 0.02 84 / 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "oklch(0.96 0.02 84 / 0.03)";
              }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Marquee */}
      <div
        ref={marqueeBottomRef}
        className="absolute bottom-0 left-0 w-full overflow-hidden py-4"
        style={{ 
          borderTop: "1px solid oklch(0.96 0.02 84 / 0.05)",
          borderBottom: "1px solid oklch(0.96 0.02 84 / 0.05)"
        }}
      >
        <div className="marquee-content flex whitespace-nowrap">
          {[...brands, ...brands, ...brands, ...brands].reverse().map((brand, i) => (
            <span
              key={i}
              className="mx-8 md:mx-16 text-4xl md:text-6xl font-black cursor-default transition-colors duration-500"
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                color: "oklch(0.96 0.02 84 / 0.03)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "oklch(0.96 0.02 84 / 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "oklch(0.96 0.02 84 / 0.03)";
              }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="content-container relative z-10 py-24 md:py-32">
        {/* Section Title */}
        <div className="section-title text-center mb-20 md:mb-32">
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              color: "oklch(0.96 0.02 84)"
            }}
          >
            Trusted by the
            <br />
            <span 
              style={{ 
                backgroundImage: "linear-gradient(135deg, oklch(0.72 0.15 84), oklch(0.72 0.15 348))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              world's best
            </span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item relative text-center p-8 rounded-3xl"
              style={{
                backgroundColor: "oklch(0.96 0.02 84 / 0.02)",
                border: "1px solid oklch(0.96 0.02 84 / 0.05)"
              }}
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, oklch(0.72 0.15 84 / 0.1) 0%, transparent 70%)",
                }}
              />

              <p 
                className="stat-value relative text-5xl md:text-6xl lg:text-7xl font-black mb-2"
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  color: "oklch(0.96 0.02 84)"
                }}
              >
                0
              </p>
              <p 
                className="stat-label relative text-sm md:text-base uppercase tracking-wider"
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  color: "oklch(0.96 0.02 84 / 0.5)"
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="mt-20 md:mt-32 text-center">
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              color: "oklch(0.96 0.02 84 / 0.5)"
            }}
          >
            From emerging startups to Fortune 500 giants — brands trust Creatrix
            to build{" "}
            <span 
              className="font-semibold"
              style={{ color: "oklch(0.96 0.02 84)" }}
            >
              authentic partnerships
            </span>{" "}
            that resonate with millions.
          </p>
        </div>
      </div>

      {/* Central Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: "conic-gradient(from 0deg, transparent, oklch(0.72 0.15 84 / 0.2), transparent, oklch(0.72 0.15 348 / 0.2), transparent)",
            animation: "spin 30s linear infinite",
          }}
        />
        <div 
          className="absolute inset-[100px] rounded-full border"
          style={{ borderColor: "oklch(0.96 0.02 84 / 0.05)" }}
        />
        <div 
          className="absolute inset-[200px] rounded-full border"
          style={{ borderColor: "oklch(0.96 0.02 84 / 0.05)" }}
        />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default TrustSection;