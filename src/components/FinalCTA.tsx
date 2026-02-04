import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const orbs = orbsRef.current;

    if (!section || !content || !orbs) return;

    // Content reveal animation
    const title = content.querySelector(".cta-title");
    const subtitle = content.querySelector(".cta-subtitle");
    const buttons = content.querySelector(".cta-buttons");

    gsap.set([title, subtitle, buttons], { opacity: 0, y: 80 });

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
      },
    });

    contentTl
      .to(title, { opacity: 1, y: 0, duration: 1, ease: "power4.out" })
      .to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }, "-=0.6")
      .to(buttons, { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }, "-=0.4");

    // Morphing orbs animation
    const orbElements = orbs.querySelectorAll(".morph-orb");
    orbElements.forEach((orb, i) => {
      gsap.to(orb, {
        scale: 1 + Math.random() * 0.3,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: 5 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Mouse follow effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(orbs, {
        x: x * 50,
        y: y * 50,
        duration: 1.5,
        ease: "power3.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Morphing Orbs Background */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div
          className="morph-orb absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.15 84 / 0.6) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="morph-orb absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.15 348 / 0.6) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="morph-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.15 84 / 0.4) 0%, oklch(0.72 0.15 348 / 0.2) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.96 0.02 84) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.96 0.02 84) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div 
            className="w-12 h-px"
            style={{
              backgroundImage: "linear-gradient(to right, transparent, oklch(0.72 0.15 84), transparent)"
            }}
          />
          <span 
            className="text-xs uppercase tracking-[0.4em]"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              color: "oklch(0.72 0.15 84)"
            }}
          >
            Start Today
          </span>
          <div 
            className="w-12 h-px"
            style={{
              backgroundImage: "linear-gradient(to right, transparent, oklch(0.72 0.15 84), transparent)"
            }}
          />
        </div>

        {/* Title */}
        <h2 
          className="cta-title text-5xl md:text-7xl lg:text-9xl font-black leading-[0.85] tracking-tight mb-8"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          <span 
            className="block"
            style={{ color: "oklch(0.96 0.02 84)" }}
          >
            Ready to
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
            create?
          </span>
        </h2>

        {/* Subtitle */}
        <p 
          className="cta-subtitle text-xl md:text-2xl max-w-2xl mx-auto mb-12"
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            color: "oklch(0.96 0.02 84 / 0.5)"
          }}
        >
          Join thousands of brands and creators building the future of
          partnerships together.
        </p>

        {/* Buttons */}
        <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button 
            className="group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden hoverable"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              backgroundColor: "oklch(0.96 0.02 84)",
              color: "oklch(0.18 0.01 264)"
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Start as Brand
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
              style={{ backgroundColor: "oklch(0.72 0.15 84)" }}
            />
            <span 
              className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              style={{ color: "oklch(0.18 0.01 264)" }}
            >
              Start as Brand
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>

          <button 
            className="group relative px-10 py-5 bg-transparent rounded-full font-bold text-lg overflow-hidden hoverable transition-colors duration-300"
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
          </button>
        </div>

        {/* Trust Badge */}
        <div 
          className="mt-16 flex items-center justify-center gap-3"
          style={{ color: "oklch(0.96 0.02 84 / 0.3)" }}
        >
          <div className="flex -space-x-2">
            {["🎨", "📸", "🎬", "✨"].map((emoji, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{
                  backgroundColor: "oklch(0.96 0.02 84 / 0.05)",
                  border: "1px solid oklch(0.96 0.02 84 / 0.1)"
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <span 
            className="text-sm"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Trusted by{" "}
            <span style={{ color: "oklch(0.96 0.02 84)" }}>50,000+</span>{" "}
            creators
          </span>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to top, oklch(0.18 0.01 264), transparent)"
        }}
      />

      {/* Decorative Corner Elements */}
      <div className="absolute top-8 left-8 w-16 h-16">
        <div 
          className="absolute top-0 left-0 w-full h-px"
          style={{
            backgroundImage: "linear-gradient(to right, oklch(0.96 0.02 84 / 0.2), transparent)"
          }}
        />
        <div 
          className="absolute top-0 left-0 h-full w-px"
          style={{
            backgroundImage: "linear-gradient(to bottom, oklch(0.96 0.02 84 / 0.2), transparent)"
          }}
        />
      </div>
      <div className="absolute top-8 right-8 w-16 h-16">
        <div 
          className="absolute top-0 right-0 w-full h-px"
          style={{
            backgroundImage: "linear-gradient(to left, oklch(0.96 0.02 84 / 0.2), transparent)"
          }}
        />
        <div 
          className="absolute top-0 right-0 h-full w-px"
          style={{
            backgroundImage: "linear-gradient(to bottom, oklch(0.96 0.02 84 / 0.2), transparent)"
          }}
        />
      </div>
    </section>
  );
};

export default FinalCTA;