import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Reveal lines
      tl.fromTo(".reveal-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1, stagger: 0.1 }
      );

      // Title words stagger
      tl.fromTo(".hero-word",
        { y: 120, rotateX: -40, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
        "-=0.6"
      );

      // Accent elements
      tl.fromTo(".hero-accent",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );

      // Description
      tl.fromTo(".hero-desc",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );

      // CTAs
      tl.fromTo(".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.2"
      );

      // Marquee start
      tl.fromTo(".marquee-wrapper",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );

      // Floating elements animation
      gsap.to(".float-element", {
        y: -20,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "random" },
      });

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(".hero-content", { y: self.progress * 150 });
          gsap.set(".marquee-wrapper", { y: self.progress * -50 });
        },
      });

    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "oklch(0.18 0.01 264)" }}
    >
      {/* Gradient mesh background — inline styles with oklch + alpha baked in */}
      <div className="absolute inset-0">
        {/* Primary glow: oklch(0.72 0.15 84) at ~5% opacity */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "oklch(0.72 0.15 84 / 0.05)",
            filter: "blur(150px)",
          }}
        />
        {/* Secondary glow: oklch(0.72 0.15 348) at ~5% opacity */}
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "oklch(0.72 0.15 348 / 0.05)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.96 0.02 84) 1px, transparent 1px),
                           linear-gradient(90deg, oklch(0.96 0.02 84) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating accent shapes */}
      <div className="absolute top-20 right-[15%] float-element">
        <div
          className="hero-accent w-16 h-16 rounded-full border"
          style={{ borderColor: "oklch(0.72 0.15 84 / 0.3)" }}
        />
      </div>
      <div className="absolute top-[40%] left-[8%] float-element">
        <div 
          className="hero-accent w-3 h-3 rounded-full" 
          style={{ background: "oklch(0.72 0.15 84)" }}
        />
      </div>
      <div className="absolute bottom-[30%] right-[10%] float-element">
        <div
          className="hero-accent w-8 h-8 rotate-45 border"
          style={{ borderColor: "oklch(0.96 0.02 84 / 0.1)" }}
        />
      </div>

      {/* Main content */}
      <div className="hero-content relative z-10 min-h-screen  flex flex-col justify-center px-6 lg:px-16 pt-24">
        <div className="max-w-7xl mx-auto w-full">

          {/* Eyebrow */}
          <div className="mb-8 overflow-hidden">
            <div className="hero-word flex items-center gap-3">
              <div 
                className="w-12 h-px reveal-line origin-left" 
                style={{ background: "oklch(0.72 0.15 84)" }}
              />
              <span 
                className="text-sm tracking-[0.2em] uppercase"
                style={{ color: "oklch(0.58 0.005 264)" }}
              >
                Creator Platform
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div className="mb-8" style={{ perspective: "1000px" }}>
            <h1 className="font-display font-bold leading-[0.85] tracking-tighter">
              {/* Line 1 */}
              <div className="overflow-hidden">
                <div className="hero-word flex items-baseline gap-4 flex-wrap">
                  <span 
                    className="text-[clamp(3rem,12vw,10rem)]"
                    style={{ color: "oklch(0.96 0.02 84)" }}
                  >
                    Where
                  </span>
                  <span 
                    className="text-[clamp(3rem,12vw,10rem)]"
                    style={{ color: "oklch(0.72 0.15 84)" }}
                  >
                    Brands
                  </span>
                </div>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden">
                <div className="hero-word flex items-baseline gap-4 flex-wrap">
                  <span 
                    className="text-[clamp(3rem,12vw,10rem)]"
                    style={{ color: "oklch(0.96 0.02 84)" }}
                  >
                    Meet
                  </span>
                  <span
                    className="text-[clamp(3rem,12vw,10rem)] italic font-light"
                    style={{ color: "oklch(0.96 0.02 84 / 0.6)" }}
                  >
                    Creators
                  </span>
                  {/* Play button */}
                  <button 
                    className="hero-accent group relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    style={{ background: "oklch(0.72 0.15 84)" }}
                  >
                    <Play 
                      className="w-6 h-6 md:w-8 md:h-8 ml-1" 
                      fill="currentColor"
                      style={{ color: "oklch(0.18 0.01 264)" }}
                    />
                    <div 
                      className="absolute inset-0 rounded-full border animate-ping opacity-20"
                      style={{ borderColor: "oklch(0.72 0.15 84)" }}
                    />
                  </button>
                </div>
              </div>
            </h1>
          </div>

          {/* Description & CTAs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <p 
              className="hero-desc max-w-md text-lg leading-relaxed"
              style={{ color: "oklch(0.58 0.005 264)" }}
            >
              The platform that transforms creative partnerships into iconic campaigns.
              AI-powered matching meets seamless collaboration.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth"
                className="hero-cta group inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-semibold transition-colors duration-300 hover:opacity-90"
                style={{ 
                  background: "oklch(0.96 0.02 84)",
                  color: "oklch(0.18 0.01 264)"
                }}
              >
                Start Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/jobs"
                className="hero-cta inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-medium transition-colors duration-300 hover:opacity-90"
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "oklch(0.96 0.02 84 / 0.2)",
                  color: "oklch(0.96 0.02 84)"
                }}
              >
                Browse Jobs
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-desc grid grid-cols-3 gap-8 max-w-xl">
            {[
              { value: "50K+", label: "Active Creators" },
              { value: "2.5K", label: "Brand Partners" },
              { value: "$12M+", label: "Creator Earnings" },
            ].map((stat, i) => (
              <div
                key={i}
                className="pl-4"
                style={{ borderLeft: "1px solid oklch(0.35 0.008 264 / 0.5)" }}
              >
                <div 
                  className="text-2xl md:text-3xl font-display font-bold"
                  style={{ color: "oklch(0.96 0.02 84)" }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.58 0.005 264)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div 
        className="marquee-wrapper absolute bottom-0 left-0 right-0 backdrop-blur-sm overflow-hidden"
        style={{ 
          borderTop: "1px solid oklch(0.35 0.008 264 / 0.3)",
          background: "oklch(0.18 0.01 264 / 0.5)"
        }}
      >
        <div className="flex animate-[marquee_30s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 py-4">
              {["Instagram", "TikTok", "YouTube", "Brands", "Creators", "Campaigns", "Collaboration", "Growth"].map((word, j) => (
                <span 
                  key={j} 
                  className="mx-8 text-sm tracking-widest uppercase font-display"
                  style={{ color: "oklch(0.58 0.005 264 / 0.5)" }}
                >
                  {word} <span style={{ color: "oklch(0.72 0.15 84)" }} className="mx-4">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-24 right-8 hidden lg:flex flex-col items-center gap-2"
        style={{ color: "oklch(0.58 0.005 264)" }}
      >
        <span className="text-xs tracking-widest uppercase rotate-90 origin-center translate-y-8">
          Scroll
        </span>
        <div
          className="w-px h-16 mt-12"
          style={{ background: "linear-gradient(to bottom, oklch(0.96 0.02 84 / 0.2), transparent)" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;