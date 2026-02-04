'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  Filter,
  BarChart3,
  MessageSquare,
  Shield,
  Zap,
  Users,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Play,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Search,
    title: "Discover Perfect Creators",
    description:
      "AI-powered search finds creators that match your brand values, audience, and budget.",
  },
  {
    icon: Filter,
    title: "Advanced Filtering",
    description:
      "Filter by niche, platform, engagement rate, location, audience demographics, and more.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track ROI, engagement, conversions, and campaign performance in real-time.",
  },
  {
    icon: MessageSquare,
    title: "Streamlined Communication",
    description:
      "Negotiate, brief, and collaborate with creators all in one platform.",
  },
  {
    icon: Shield,
    title: "Secure Contracts",
    description:
      "Legally-binding contracts with milestone payments and content approval workflows.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Launch campaigns in hours, not weeks. Get content that converts, faster.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create Your Campaign",
    description: "Define your goals, budget, and ideal creator profile.",
  },
  {
    step: "02",
    title: "Discover Creators",
    description: "Browse our curated network or let AI find perfect matches.",
  },
  {
    step: "03",
    title: "Collaborate & Launch",
    description: "Brief, review content, and launch your campaign.",
  },
  {
    step: "04",
    title: "Track & Optimize",
    description: "Monitor results and scale what works.",
  },
];

const testimonials = [
  {
    quote:
      "CREATRIX helped us find the perfect creators for our launch campaign. The results exceeded all expectations.",
    author: "Sarah Chen",
    role: "CMO, TechStartup",
    avatar: "SC",
  },
  {
    quote:
      "The analytics dashboard alone is worth it. We can finally prove influencer marketing ROI.",
    author: "Marcus Johnson",
    role: "Brand Manager, FashionCo",
    avatar: "MJ",
  },
  {
    quote:
      "From discovery to payment, everything just works. Our team saves 20+ hours per campaign.",
    author: "Emily Rodriguez",
    role: "Marketing Director, BeautyCorp",
    avatar: "ER",
  },
];

const Brands = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current?.querySelectorAll(".hero-animate"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    // Benefits animation
    const benefitCards = benefitsRef.current?.querySelectorAll(".benefit-card");
    benefitCards?.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    // Steps animation
    const stepCards = stepsRef.current?.querySelectorAll(".step-card");
    stepCards?.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 70%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">


      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="hero-animate inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-display font-semibold mb-6">
                For Brands
              </span>
              <h1 className="hero-animate font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Find Creators
                <br />
                <span className="text-gradient">That Convert</span>
              </h1>
              <p className="hero-animate text-xl text-foreground/60 font-body mb-8">
                Access 50,000+ verified creators. Launch campaigns in hours.
                Track every dollar. Scale what works.
              </p>
              <div className="hero-animate flex flex-col sm:flex-row gap-4">
                <Link href="/auth" className="btn-primary px-8 py-4 text-lg inline-flex items-center gap-2">
                  Start Hiring Creators
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="px-8 py-4 border border-white/20 rounded-full text-lg font-display font-semibold hover:border-primary/50 transition-all inline-flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  See How It Works
                </button>
              </div>

              {/* Quick Stats */}
              <div className="hero-animate mt-12 flex gap-8">
                {[
                  { value: "50K+", label: "Creators" },
                  { value: "10K+", label: "Brands" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="font-display text-2xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
           <div className="hero-animate relative perspective-1000">
  {/* The "Device" - Minimalist Tablet Frame */}
  <div className="relative mx-auto w-full max-w-[500px] aspect-[16/10] bg-zinc-900 rounded-[2.5rem] p-3 shadow-[0_0_50px_-12px_rgba(251,191,36,0.3)] border border-zinc-800">
    
    {/* Screen Content */}
    <div className="w-full h-full bg-zinc-950 rounded-[2rem] overflow-hidden relative border border-white/5">
      
      {/* Top Navigation Bar */}
      <div className="h-12 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-900/50 backdrop-blur-md">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
        </div>
        <div className="h-4 w-20 bg-zinc-800 rounded-full" />
        <div className="w-6 h-6 rounded-full border border-yellow-500/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
        </div>
      </div>

      {/* Hero Metric Section */}
      <div className="p-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Performance</span>
            <h4 className="text-3xl font-display font-bold text-white mt-1">Growth Engine</h4>
          </div>
          <div className="text-right">
             <span className="block text-2xl font-mono text-yellow-400 font-bold">84.2%</span>
             <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Efficiency Score</span>
          </div>
        </div>

        {/* Abstract "Yellow" Data Visualization */}
        <div className="flex items-end gap-2 h-32">
          {[40, 70, 45, 90, 65, 80, 35, 60, 95, 50].map((height, i) => (
            <div 
              key={i} 
              className="flex-1 bg-gradient-to-t from-yellow-500/20 to-yellow-400 rounded-t-sm transition-all hover:brightness-125"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Overlapping Floating Card - Adds Depth */}
  <div className="absolute -bottom-10 -left-10 w-48 p-4 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl rotate-[-4deg] hidden md:block">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
        <Users className="w-4 h-4 text-black" />
      </div>
      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Audience</div>
    </div>
    <div className="space-y-2">
      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-yellow-500 w-[70%]" />
      </div>
      <div className="h-1.5 w-[60%] bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-yellow-500 w-[40%]" />
      </div>
    </div>
  </div>

  {/* Soft Background Glow */}
  <div className="absolute -inset-4 bg-yellow-500/10 blur-3xl -z-10 rounded-full" />
</div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section ref={benefitsRef} className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Why Brands Love CREATRIX
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-body">
              Everything you need to run successful creator campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="benefit-card group p-8 bg-card/30 border border-white/5 rounded-3xl hover:border-primary/30 hover:bg-card/50 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {benefit.title}
                </h3>
                <p className="text-foreground/60 font-body leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={stepsRef} className="py-24 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-body">
              Launch your first campaign in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="step-card relative">
                <div className="text-6xl font-display font-bold text-primary/10 mb-4">
                  {step.step}
                </div>
                <h3 className="font-display text-xl font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-foreground/60 font-body">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Trusted by Leading Brands
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="p-8 bg-card/30 border border-white/5 rounded-3xl"
              >
                <p className="text-lg font-body mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-display font-semibold">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-foreground/60">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-50" />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to Find Your
                <br />
                Perfect Creators?
              </h2>
              <p className="text-xl text-foreground/70 font-body mb-10">
                Join 10,000+ brands already scaling with CREATRIX
              </p>
              <Link href="/auth" className="btn-primary px-10 py-5 text-lg inline-flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-foreground/60">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Free trial included
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brands;
