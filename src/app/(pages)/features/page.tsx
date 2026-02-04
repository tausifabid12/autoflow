'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Users,
  BarChart3,
  Shield,
  Globe,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  Layers,
  Award,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Matching",
    description:
      "Our AI-powered algorithm connects brands with perfect creators in seconds, not days.",
    color: "from-amber-500 to-yellow-400",
  },
  {
    icon: Users,
    title: "Verified Creator Network",
    description:
      "Access 50,000+ verified creators across every niche and platform.",
    color: "from-rose-500 to-pink-400",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track campaign performance with live dashboards and actionable insights.",
    color: "from-amber-400 to-orange-400",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description:
      "Protected escrow payments ensure creators get paid and brands get results.",
    color: "from-pink-500 to-rose-400",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Connect with creators worldwide and expand your brand's international presence.",
    color: "from-yellow-500 to-amber-400",
  },
  {
    icon: MessageSquare,
    title: "Seamless Communication",
    description:
      "Built-in messaging, contracts, and collaboration tools in one place.",
    color: "from-rose-400 to-pink-500",
  },
];

const stats = [
  { value: "50K+", label: "Creators", icon: Users },
  { value: "10K+", label: "Brands", icon: Award },
  { value: "$50M+", label: "Paid Out", icon: TrendingUp },
  { value: "98%", label: "Satisfaction", icon: Sparkles },
];

const additionalFeatures = [
  {
    icon: Target,
    title: "Smart Targeting",
    description: "Reach the right audience with precision targeting tools.",
  },
  {
    icon: Layers,
    title: "Campaign Management",
    description: "Manage multiple campaigns from a single dashboard.",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Monitor project timelines and deliverables effortlessly.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Ensure top-tier content with built-in review workflows.",
  },
];

const Features = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      //@ts-ignore
      heroRef.current?.querySelectorAll(".hero-animate"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    // Features animation
    const featureCards = featuresRef.current?.querySelectorAll(".feature-card");
    featureCards?.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
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
        className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <span className="hero-animate inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-display font-semibold mb-6">
            ✨ Powerful Features
          </span>
          <h1 className="hero-animate font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Everything You Need
            <br />
            <span className="text-gradient">To Scale Influence</span>
          </h1>
          <p className="hero-animate text-xl text-foreground/60 max-w-2xl mx-auto font-body mb-10">
            From discovery to payment, CREATRIX provides the complete toolkit
            for brands and creators to build successful partnerships.
          </p>
          <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth" className="btn-primary px-8 py-4 text-lg">
              Get Started Free
            </Link>
            <button className="px-8 py-4 border border-white/20 rounded-full text-lg font-display font-semibold hover:border-primary/50 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-foreground/60 font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Features Grid */}
      <section ref={featuresRef} className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Core Features
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-body">
              Built for the modern creator economy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="feature-card group relative p-8 bg-card/50 backdrop-blur-sm border border-white/5 rounded-3xl hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                And So Much
                <br />
                <span className="text-gradient">More</span>
              </h2>
              <p className="text-xl text-foreground/60 font-body mb-8">
                Every feature designed to make influencer marketing effortless
                and effective.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {additionalFeatures.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-foreground/60 font-body">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-20 h-20 text-primary mx-auto mb-4" />
                  <p className="text-2xl font-display font-bold">
                    More Features
                    <br />
                    Coming Soon
                  </p>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-foreground/60 font-body mb-10">
            Join thousands of brands and creators already using CREATRIX.
          </p>
          <Link href="/auth" className="btn-primary px-10 py-5 text-lg inline-flex items-center gap-2">
            Start Free Trial
            <Zap className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
