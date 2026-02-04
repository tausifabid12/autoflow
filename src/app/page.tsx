'use client'
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollNarrative from "@/components/ScrollNarrative";
import BrandExperience from "@/components/BrandExperience";
import CreatorDiscovery from "@/components/CreatorDiscovery";
import TrustSection from "@/components/TrustSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SplitNav from "@/components/SplitNav";
import CreatorDiscoveryList from "@/components/CreatorDiscoveryList";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // GSAP defaults
    gsap.defaults({
      ease: "power4.out",
      duration: 1,
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden noise-overlay">
      {/* Custom Cursor - Desktop only */}
      <CustomCursor />

      {/* Navigation */}
      {/* <SplitNav /> */}

      {/* Main Content */}
      <main>
        <HeroSection />

        {/* Scroll Narrative - How It Works */}
        <ScrollNarrative />

        {/* Brand Experience - For Brands */}
        <BrandExperience />

        <CreatorDiscoveryList />

        {/* Creator Discovery - For Creators */}
        <CreatorDiscovery />

        {/* Trust & Credibility */}
        <TrustSection />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
