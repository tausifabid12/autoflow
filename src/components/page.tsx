
'use client'
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import './custom.css'

import { useGSAP } from "@gsap/react";
import Navbar from "../components/home/NavBar";
import HeroSection from "../components/home/sections/HeroSection";
import MessageSection from "../components/home/sections/MessageSection";
import FlavorSection from "../components/home/sections/FlavorSection";
import NutritionSection from "../components/home/sections/NutritionSection";
import BenefitSection from "../components/home/sections/BenefitSection";
import TestimonialSection from "../components/home/sections/TestimonialSection";
import FooterSection from "../components/home/sections/FooterSection";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <main>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <MessageSection />
          <FlavorSection />
          <NutritionSection />

          <div>
            <BenefitSection />
            <TestimonialSection />
          </div>

          <FooterSection />
        </div>
      </div>
    </main>
  );
};

export default App;
