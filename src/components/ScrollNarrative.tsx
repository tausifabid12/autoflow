import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileText,
  Target,
  Puzzle,
  TrendingUp,
} from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

const ScrollNarrative = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const steps = [
    {
      number: "01",
      title: "POST",
      subtitle: "Your Vision",
      description: "Brands share their creative vision and campaign goals",
      Icon: FileText,
    },
    {
      number: "02",
      title: "MATCH",
      subtitle: "Perfect Fit",
      description: "AI finds creators who truly understand your brand",
      Icon: Target,
    },
    {
      number: "03",
      title: "CREATE",
      subtitle: "Magic Happens",
      description: "Collaborate seamlessly on content that resonates",
      Icon: Puzzle,
    },
    {
      number: "04",
      title: "SCALE",
      subtitle: "Go Viral",
      description: "Watch your campaign reach millions organically",
      Icon: TrendingUp,
    },
  ];


  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const horizontal = horizontalRef.current;

    if (!section || !trigger || !horizontal) return;

    const panels = gsap.utils.toArray<HTMLElement>(".narrative-panel");
    const totalWidth = panels.length * 100;

    // Horizontal scroll animation
    const horizontalTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: () => `+=${window.innerWidth * (panels.length - 1)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Animate each panel's content as it comes into view
    panels.forEach((panel, i) => {
      const number = panel.querySelector(".panel-number");
      const title = panel.querySelector(".panel-title");
      const subtitle = panel.querySelector(".panel-subtitle");
      const desc = panel.querySelector(".panel-desc");
      const visual = panel.querySelector(".panel-visual");
      const line = panel.querySelector(".panel-line");

      const panelTl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horizontalTween,
          start: "left 80%",
          end: "left 20%",
          scrub: true,
        },
      });

      panelTl
        .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, 0)
        .fromTo(
          number,
          { opacity: 0, y: 100, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.5 },
          0.1
        )
        .fromTo(
          title,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.4 },
          0.2
        )
        .fromTo(
          subtitle,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.3 },
          0.3
        )
        .fromTo(
          desc,
          { opacity: 0, y: 20 },
          { opacity: 0.7, y: 0, duration: 0.3 },
          0.4
        )
        .fromTo(
          visual,
          { opacity: 0, scale: 0.5, rotate: -20 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.5 },
          0.2
        )
        
    });

    // Progress indicator
    gsap.to(".progress-fill", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: () => `+=${window.innerWidth * (panels.length - 1)}`,
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative overflow-hidden" style={{ backgroundColor: "oklch(0.18 0.01 264)" }}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ backgroundColor: "oklch(0.96 0.02 84 / 0.05)" }}>
        <div
          className="progress-fill h-full origin-left"
          style={{
            transform: "scaleX(0)",
            backgroundImage: "linear-gradient(to right, oklch(0.72 0.15 84), oklch(0.72 0.15 348), oklch(0.72 0.15 84))"
          }}
        />
      </div>

      {/* Section Label */}
      <div className="fixed top-8 left-8 z-40 hidden md:block">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "oklch(0.72 0.15 84)" }} />
          <span className="text-xs uppercase tracking-[0.3em]" style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            color: "oklch(0.96 0.02 84 / 0.5)"
          }}>
            How It Works
          </span>
        </div>
      </div>

      <section ref={sectionRef} className="relative">
        <div
          ref={horizontalRef}
          className="flex"
          style={{ width: `${steps.length * 100}vw` }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="narrative-panel relative w-screen h-screen flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at ${30 + index * 15
                    }% 50%, oklch(0.72 0.15 84 / 0.3) 0%, transparent 50%)`,
                }}
              />

              {/* Decorative Grid */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, oklch(0.96 0.02 84) 1px, transparent 1px),
                    linear-gradient(to bottom, oklch(0.96 0.02 84) 1px, transparent 1px)
                  `,
                  backgroundSize: "80px 80px",
                }}
              />

              {/* Panel Content */}
              <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                  {/* Left - Text Content */}
                  <div className="relative">
                    {/* Animated Line */}
                    <div
                      className="panel-line absolute -left-8 top-0 w-1 h-32 origin-top"
                      style={{
                        transform: "scaleX(0)",
                        backgroundImage: "linear-gradient(to bottom, oklch(0.72 0.15 84), transparent)"
                      }}
                    />

                    {/* Number */}
                    <div
                      className="panel-number text-[8rem] md:text-[12rem] font-black leading-none absolute -top-16 -left-4 select-none"
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        transformStyle: "preserve-3d",
                        color: "oklch(0.96 0.02 84 / 0.05)"
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Title */}
                    <h2 className="panel-title relative text-5xl md:text-7xl lg:text-8xl font-black mb-2 tracking-tight" style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      color: "oklch(0.96 0.02 84)"
                    }}>
                      {step.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="panel-subtitle text-2xl md:text-3xl font-light italic mb-6" style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      color: "oklch(0.72 0.15 84)"
                    }}>
                      {step.subtitle}
                    </p>

                    {/* Description */}
                    <p className="panel-desc text-lg max-w-md" style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      color: "oklch(0.96 0.02 84 / 0.6)"
                    }}>
                      {step.description}
                    </p>

                    {/* Step Indicator */}
                    <div className="flex items-center gap-3 mt-10">
                      {steps.map((_, i) => (
                        <div
                          key={i}
                          className="h-1 rounded-full transition-all duration-500"
                          style={{
                            width: i === index ? "3rem" : "0.75rem",
                            backgroundColor: i === index ? "oklch(0.72 0.15 84)" : "oklch(0.96 0.02 84 / 0.2)"
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right - Visual */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className="panel-visual relative w-64 h-64 md:w-80 md:h-80 rounded-3xl backdrop-blur-sm flex items-center justify-center"
                      style={{
                        backgroundImage: "linear-gradient(to bottom right, oklch(0.96 0.02 84 / 0.05), oklch(0.96 0.02 84 / 0.02))",
                        border: "1px solid oklch(0.96 0.02 84 / 0.1)",
                        boxShadow: `
                          0 0 100px oklch(0.72 0.15 84 / 0.1),
                          inset 0 0 60px oklch(0.72 0.15 84 / 0.05)
                        `,
                      }}
                    >
                      {/* Orbiting Ring */}
                      <div
                        className="absolute inset-[-20px] rounded-full border border-dashed animate-[spin_20s_linear_infinite]"
                        style={{ borderColor: "oklch(0.96 0.02 84 / 0.1)" }}
                      />

                      {/* Inner Glow */}
                      <div className="absolute inset-0 rounded-3xl overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: `conic-gradient(from ${index * 90
                              }deg, transparent, oklch(0.72 0.15 84 / 0.3), transparent)`,
                          }}
                        />
                      </div>

                      {/* Icon */}
                      <step.Icon
                        className="relative z-10 w-20 h-20 md:w-24 md:h-24"
                        strokeWidth={1.5}
                        style={{
                          color: "oklch(0.96 0.02 84)",
                          filter: `
      drop-shadow(0 0 20px oklch(0.72 0.15 84 / 0.35))
      drop-shadow(0 0 60px oklch(0.72 0.15 84 / 0.15))
    `,
                        }}
                      />


                      {/* Corner Accents */}
                      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: "oklch(0.72 0.15 84 / 0.5)" }} />
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: "oklch(0.72 0.15 84 / 0.5)" }} />
                    </div>

                    {/* Floating Particles */}
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${10 + i * 20}%`,
                          backgroundColor: "oklch(0.72 0.15 84 / 0.3)",
                          animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                          animationDelay: `${i * 0.3}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel Number - Large Background */}
              <div
                className="absolute bottom-8 right-8 md:bottom-16 md:right-16 text-[20rem] md:text-[30rem] font-black leading-none select-none"
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  color: "oklch(0.96 0.02 84 / 0.02)"
                }}
              >
                {step.number}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default ScrollNarrative;