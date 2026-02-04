'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  DollarSign,
  Briefcase,
  TrendingUp,
  Shield,
  Calendar,
  Star,
  Users,
  Zap,
  Heart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Activity,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: DollarSign,
    title: "Get Paid What You're Worth",
    description:
      "Transparent pricing, secure payments, and no hidden fees. Get paid on time, every time.",
  },
  {
    icon: Briefcase,
    title: "Premium Brand Partnerships",
    description:
      "Work with top brands that align with your values and audience. Quality over quantity.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Career",
    description:
      "Access analytics, insights, and tools to grow your influence and command higher rates.",
  },
  {
    icon: Shield,
    title: "Protected Collaborations",
    description:
      "Clear contracts, escrow payments, and content rights protection built in.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Work on your terms. Set your availability and manage campaigns your way.",
  },
  {
    icon: Star,
    title: "Build Your Reputation",
    description:
      "Verified reviews and ratings help you stand out and attract better opportunities.",
  },
];

const creatorTypes = [
  {
    title: "Micro Creators",
    followers: "10K - 100K",
    description: "Perfect for authentic, niche campaigns",
    icon: Heart,
  },
  {
    title: "Mid-Tier Creators",
    followers: "100K - 500K",
    description: "Balance of reach and engagement",
    icon: Users,
  },
  {
    title: "Macro Creators",
    followers: "500K - 1M+",
    description: "Maximum brand awareness impact",
    icon: Zap,
  },
];

const testimonials = [
  {
    quote:
      "CREATRIX connected me with brands I actually love. My income has tripled since joining.",
    author: "Alex Rivera",
    role: "Lifestyle Creator, 250K followers",
    avatar: "AR",
  },
  {
    quote:
      "Finally, a platform that values creators. The payment protection alone is worth it.",
    author: "Jordan Lee",
    role: "Tech Reviewer, 500K followers",
    avatar: "JL",
  },
  {
    quote:
      "The analytics dashboard helps me understand my value and negotiate better deals.",
    author: "Maya Patel",
    role: "Beauty Creator, 150K followers",
    avatar: "MP",
  },
];

const Creators = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);

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
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    // Types animation
    const typeCards = typesRef.current?.querySelectorAll(".type-card");
    typeCards?.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: typesRef.current,
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
      className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden bg-[#0a0a0a] text-white selection:bg-yellow-500/30"
    >
      {/* --- Cinematic Background --- */}
      <div className="absolute inset-0 z-0">
         {/* Noise Texture for Film Grain Feel */}
         <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
         />
         
         {/* Ambient Glows - Updated to Yellow/Amber */}
         <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
         <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '7s' }} />
         
         {/* Grid Line Accent */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT: Typography & Content --- */}
          <div>
            {/* Badge - Updated to Yellow */}
            <div className="hero-animate inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:border-yellow-500/50 transition-colors cursor-default group">
              <span className="flex h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
              <span className="text-sm font-medium text-yellow-100/80 tracking-wide">For Creators</span>
            </div>

            {/* Headline - Updated Gradient */}
            <h1 className="hero-animate font-display text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
              Monetize Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 drop-shadow-lg">
                Influence
              </span>
            </h1>

            {/* Description */}
            <p className="hero-animate text-xl text-gray-400 font-body mb-8 leading-relaxed max-w-lg">
              Connect with premium brands, get paid what you deserve, and grow
              your creator career with our AI-powered toolkit.
            </p>

            {/* CTA Buttons - Updated Gradient */}
            <div className="hero-animate flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/auth" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2 group-hover:text-black transition-colors">
                  Join as Creator
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <button className="px-8 py-4 rounded-full text-lg font-semibold text-white/80 border border-white/10 hover:bg-white/5 hover:border-yellow-500/30 hover:text-white transition-all backdrop-blur-sm">
                See Stories
              </button>
            </div>

            {/* Quick Stats */}
            <div className="hero-animate flex items-center justify-between sm:justify-start sm:gap-12 border-t border-white/10 pt-8">
              {[
                { value: "$50M+", label: "Paid Out", icon: DollarSign, color: "text-yellow-400" },
                { value: "50K+", label: "Creators", icon: Users, color: "text-amber-400" },
                { value: "4.9", label: "Rating", icon: Star, color: "text-orange-400" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-display text-2xl font-bold text-white">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: Visual Dashboard --- */}
          <div className="hero-animate relative perspective-1000 group">
            
            {/* Main Glass Card (Tilted) - Glow updated to yellow */}
            <div 
              className="relative z-10 w-full aspect-square md:aspect-[4/3] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl shadow-2xl transition-transform duration-700 hover:rotate-y-2 hover:rotate-x-2"
              style={{ 
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)" 
              }}
            >
              {/* Inner Dashboard UI */}
              <div className="absolute inset-4 rounded-3xl bg-black/40 overflow-hidden border border-white/5 flex flex-col">
                
                {/* Header */}
                <div className="h-14 border-b border-white/5 flex items-center px-6 justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-600" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-zinc-600" />
                  </div>
                  <div className="flex gap-4 text-xs font-medium text-gray-500">
                    <span className="text-white/40">Overview</span>
                    <span className="text-yellow-500">Analytics</span>
                    <span className="text-white/40">Campaigns</span>
                  </div>
                </div>

                {/* Graph Content */}
                <div className="flex-1 p-6 relative">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
                      <h3 className="text-3xl font-bold text-white">$124,500.00</h3>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm bg-yellow-400/10 px-2 py-1 rounded-lg">
                      <TrendingUp className="w-3 h-3" />
                      +14.2%
                    </div>
                  </div>

                  {/* SVG Line Graph - Color changed to Yellow */}
                  <div className="absolute left-0 right-0 bottom-0 h-48 w-full">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradientGraph" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#facc15" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0,150 C50,150 100,100 150,120 C200,140 250,50 300,80 C350,110 400,20 400,20 V200 H0 Z" 
                        fill="url(#gradientGraph)" 
                      />
                      <path 
                        d="M0,150 C50,150 100,100 150,120 C200,140 250,50 300,80 C350,110 400,20 400,20" 
                        fill="none" 
                        stroke="#facc15" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements - Updated Colors */}
            
            {/* 1. Verified Badge */}
            <div className="float-card absolute -top-8 -right-8 p-4 rounded-2xl bg-[#1a1a1a]/90 border border-white/10 backdrop-blur-md shadow-2xl z-20 flex items-center gap-3 animate-[float_6s_ease-in-out_infinite]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-orange-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-black font-bold" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Status</p>
                <p className="font-bold text-white">Verified Creator</p>
              </div>
            </div>

            {/* 2. Recent Payment */}
            <div className="float-card absolute -bottom-6 -left-6 p-4 rounded-2xl bg-[#1a1a1a]/90 border border-white/10 backdrop-blur-md shadow-2xl z-20 flex items-center gap-3 animate-[float_5s_ease-in-out_2s_infinite]">
               <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-white/5">
                    <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Brand" alt="Brand" className="w-8 h-8 rounded-full" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center">
                    <DollarSign className="w-2.5 h-2.5 text-black" />
                  </div>
               </div>
               <div>
                 <p className="text-xs text-gray-400">Payment Received</p>
                 <p className="font-bold text-white">+$4,250.00</p>
               </div>
            </div>

            {/* 3. Engagement (Floating Right) */}
            <div className="float-card absolute top-1/2 -right-12 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-xl z-0 scale-90 blur-[0.5px] opacity-80 animate-[float_7s_ease-in-out_1s_infinite]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold text-yellow-50">High Engagement</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>

      {/* Creator Types */}
      <section ref={typesRef} className="py-24 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              All Creator Sizes Welcome
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-body">
              Whether you have 10K or 10M followers, we have opportunities for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {creatorTypes.map((type, i) => (
              <div
                key={i}
                className="type-card p-8 bg-card/30 border border-white/5 rounded-3xl text-center hover:border-primary/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <type.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">
                  {type.title}
                </h3>
                <div className="text-primary font-display font-semibold mb-3">
                  {type.followers}
                </div>
                <p className="text-foreground/60 font-body">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section ref={benefitsRef} className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Why Creators Choose Us
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-body">
              Built by creators, for creators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="benefit-card group p-8 bg-card/30 border border-white/5 rounded-3xl hover:border-secondary/30 hover:bg-card/50 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-secondary" />
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

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Creator Success Stories
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center font-display font-bold">
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
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-secondary/20 to-primary/20 border border-white/10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-50" />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to Level Up
                <br />
                Your Creator Career?
              </h2>
              <p className="text-xl text-foreground/70 font-body mb-10">
                Join 50,000+ creators already earning with CREATRIX
              </p>
              <Link href="/auth" className="btn-primary px-10 py-5 text-lg inline-flex items-center gap-2">
                Apply as Creator
                <Sparkles className="w-5 h-5" />
              </Link>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-foreground/60">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  Free to join
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  No minimum followers
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

export default Creators;
