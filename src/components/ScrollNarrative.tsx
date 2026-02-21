import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      description: "Brands share their creative vision, campaign goals, and target audience. Our intelligent system captures every detail.",
      icon: "📋",
      color: "from-amber-500 to-orange-600",
      mockElements: ["Campaign Brief", "Target: 18-35", "$10K Budget"],
      features: ["Campaign Brief", "Target Audience", "Budget Range", "Timeline"],
      stat: "2 min",
      statLabel: "Average setup time",
    },
    {
      number: "02",
      title: "MATCH",
      subtitle: "Perfect Fit",
      description: "Our AI analyzes creator portfolios, engagement rates, and brand alignment to find your perfect partners.",
      icon: "🎯",
      color: "from-violet-500 to-purple-600",
      mockElements: ["@alex_creates", "@maya.style", "@jordan_fit"],
      features: ["AI Analysis", "Engagement Score", "Niche Match", "Verified Profiles"],
      stat: "98%",
      statLabel: "Match accuracy",
    },
    {
      number: "03",
      title: "CREATE",
      subtitle: "Magic Happens",
      description: "Collaborate in real-time with built-in messaging, file sharing, and milestone tracking for seamless content creation.",
      icon: "✨",
      color: "from-emerald-500 to-teal-600",
      mockElements: ["Draft v2.pdf", "Approved ✓", "Final Cut"],
      features: ["Real-time Chat", "File Sharing", "Revisions", "Approvals"],
      stat: "3.2x",
      statLabel: "Faster delivery",
    },
    {
      number: "04",
      title: "SCALE",
      subtitle: "Go Viral",
      description: "Track performance with advanced analytics. Watch your campaign reach millions and optimize in real-time.",
      icon: "🚀",
      color: "from-rose-500 to-pink-600",
      mockElements: ["2.4M Views", "+340% Growth", "12K Shares"],
      features: ["Live Analytics", "ROI Tracking", "Audience Insights", "Growth Reports"],
      stat: "12M+",
      statLabel: "Average reach",
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
        .fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.5 }, 0)
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
        .fromTo(
          panel.querySelectorAll(".panel-features span"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 },
          0.4
        )
        .fromTo(
          panel.querySelector(".panel-stat"),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4 },
          0.5
        )
        .fromTo(
          panel.querySelector(".panel-card"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.5
        )
        .fromTo(
          panel.querySelector(".panel-next, .panel-cta"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3 },
          0.6
        );
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
    <div ref={triggerRef} className="relative bg-background overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-foreground/5 z-50">
        <div
          className="progress-fill h-full bg-gradient-to-r from-primary via-secondary to-primary origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Section Label */}
      <div className="fixed top-8 left-8 z-40 hidden md:block">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-body uppercase tracking-[0.3em] text-foreground/50">
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
                  background: `radial-gradient(circle at ${
                    30 + index * 15
                  }% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%)`,
                }}
              />

              {/* Decorative Grid */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Decorative Lines */}
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
              <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />

              {/* Panel Content */}
              <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16">
                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                  {/* Left - Text Content */}
                  <div className="relative md:col-span-5">
                    {/* Animated Line */}
                    <div
                      className="panel-line absolute -left-8 top-0 w-1 h-40 bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top"
                      style={{ transform: "scaleY(0)" }}
                    />

                    {/* Number */}
                    <div
                      className="panel-number text-[6rem] md:text-[10rem] font-display font-black leading-none text-foreground/[0.08] absolute -top-12 -left-4 select-none"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {step.number}
                    </div>

                    {/* Title */}
                    <h2 className="panel-title relative text-5xl md:text-6xl lg:text-7xl font-display font-black text-foreground mb-2 tracking-tight">
                      {step.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="panel-subtitle text-xl md:text-2xl font-display font-light text-primary italic mb-4">
                      {step.subtitle}
                    </p>

                    {/* Description */}
                    <p className="panel-desc text-base md:text-lg text-foreground/60 font-body max-w-md leading-relaxed mb-8">
                      {step.description}
                    </p>

                    {/* Feature Tags */}
                    <div className="panel-features flex flex-wrap gap-2 mb-8">
                      {step.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-full text-xs font-body uppercase tracking-wider bg-foreground/5 text-foreground/70 border border-foreground/10"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Stat */}
                    <div className="panel-stat flex items-end gap-3 pt-6 border-t border-foreground/10">
                      <span className="text-4xl md:text-5xl font-display font-black text-primary">
                        {step.stat}
                      </span>
                      <span className="text-sm text-foreground/50 uppercase tracking-wider pb-2">
                        {step.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Center - Visual */}
                  <div className="relative md:col-span-4 flex items-center justify-center py-8">
                    {/* Main Visual Container */}
                    <div className="panel-visual relative">
                      {/* Outer Glow Ring */}
                      <div 
                        className={`absolute inset-[-40px] rounded-full bg-gradient-to-br ${step.color} opacity-20 blur-3xl`}
                      />
                      
                      {/* Orbiting Elements */}
                      <div className="absolute inset-[-50px] rounded-full border border-dashed border-foreground/10 animate-[spin_25s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
                      </div>
                      <div className="absolute inset-[-80px] rounded-full border border-dotted border-foreground/5 animate-[spin_40s_linear_infinite_reverse]">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-secondary" />
                      </div>

                      {/* Main Card Stack */}
                      <div className="relative w-56 h-72 md:w-72 md:h-80">
                        {/* Background Card */}
                        <div 
                          className="absolute top-4 left-4 right-0 bottom-0 rounded-3xl bg-foreground/[0.02] border border-foreground/5"
                          style={{ transform: "rotate(6deg)" }}
                        />
                        <div 
                          className="absolute top-2 left-2 right-2 bottom-2 rounded-3xl bg-foreground/[0.03] border border-foreground/5"
                          style={{ transform: "rotate(3deg)" }}
                        />
                        
                        {/* Main Card */}
                        <div 
                          className="relative h-full rounded-3xl overflow-hidden border border-foreground/10 backdrop-blur-xl"
                          style={{
                            background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
                          }}
                        >
                          {/* Card Header Gradient */}
                          <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-br ${step.color} opacity-10`} />
                          
                          {/* Icon Badge */}
                          <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center border border-foreground/10">
                            <span className="text-3xl">{step.icon}</span>
                          </div>

                          {/* Status Indicator */}
                          <div className="absolute top-6 right-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-wider text-foreground/40">Active</span>
                          </div>

                          {/* Mock Content */}
                          <div className="absolute top-24 left-4 right-4 space-y-3">
                            {step.mockElements.map((elem, i) => (
                              <div 
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-xl bg-foreground/[0.03] border border-foreground/5"
                                style={{
                                  animation: `slideInMock 0.5s ease-out ${i * 0.1}s both`,
                                }}
                              >
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} opacity-20 flex items-center justify-center`}>
                                  <div className="w-3 h-3 rounded-full bg-foreground/30" />
                                </div>
                                <span className="text-sm text-foreground/60 font-body">{elem}</span>
                              </div>
                            ))}
                          </div>

                          {/* Bottom Stats Bar */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-foreground/5 bg-foreground/[0.02]">
                            <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                {[...Array(3)].map((_, i) => (
                                  <div 
                                    key={i}
                                    className="w-6 h-6 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/10 border-2 border-background"
                                  />
                                ))}
                              </div>
                              <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-[10px] font-bold text-white uppercase tracking-wider`}>
                                Live
                              </div>
                            </div>
                          </div>

                          {/* Shine Effect */}
                          <div 
                            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700"
                            style={{
                              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Floating Accent Elements */}
                      <div 
                        className={`absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} opacity-80 flex items-center justify-center`}
                        style={{ 
                          animation: "floatBounce 3s ease-in-out infinite",
                          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                        }}
                      >
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                      
                      <div 
                        className="absolute -bottom-6 -left-6 w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 backdrop-blur-sm flex items-center justify-center"
                        style={{ animation: "floatBounce 4s ease-in-out infinite 0.5s" }}
                      >
                        <span className="text-lg">✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Step Connections & Info */}
                  <div className="hidden md:flex md:col-span-3 flex-col justify-center gap-6">
                    {/* Connection Card */}
                    <div className="panel-card p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/10 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-body uppercase tracking-widest text-foreground/50">
                          Step {index + 1} of {steps.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {steps.map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                              i === index
                                ? "bg-primary"
                                : i < index
                                ? "bg-primary/30"
                                : "bg-foreground/10"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Next Step Preview */}
                    {index < steps.length - 1 && (
                      <div className="panel-next p-4 rounded-2xl border border-dashed border-foreground/10">
                        <p className="text-xs text-foreground/30 uppercase tracking-wider mb-2">
                          Next
                        </p>
                        <p className="text-lg font-display font-bold text-foreground/50">
                          {steps[index + 1].title}
                        </p>
                        <p className="text-sm text-foreground/30 italic">
                          {steps[index + 1].subtitle}
                        </p>
                      </div>
                    )}

                    {/* CTA on last step */}
                    {index === steps.length - 1 && (
                      <div className="panel-cta">
                        <button className="w-full py-4 px-6 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                          Get Started
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Panel Number - Large Background */}
              <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[15rem] md:text-[25rem] font-display font-black text-foreground/[0.02] leading-none select-none pointer-events-none">
                {step.number}
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-8 left-8 w-12 h-12">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/30 to-transparent" />
                <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary/30 to-transparent" />
              </div>
              <div className="absolute bottom-8 right-8 w-12 h-12">
                <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-primary/30 to-transparent" />
                <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-primary/30 to-transparent" />
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
        @keyframes floatBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes slideInMock {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ScrollNarrative;
