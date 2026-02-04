'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Rocket, Users, Heart, Lightbulb, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/home3/Footer';

export default function Main() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Find Verified Influencers",
      description: "Discover influencers that align perfectly with your brand's voice."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Launch Campaigns Easily",
      description: "Manage influencer partnerships and track performance in one dashboard."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Boost Authentic Reach",
      description: "Build long-term relationships with creators that truly connect with your audience."
    }
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Transparency",
      description: "We value honesty and data-driven insights."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Creativity",
      description: "Innovation fuels every campaign we support."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community",
      description: "Building real connections between people and brands."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Impact",
      description: "We focus on measurable, meaningful results."
    }
  ];

  const team = [
    { name: "Sarah Chen", role: "CEO & Co-Founder", tagline: "Passionate about creator growth" },
    { name: "Michael Rodriguez", role: "CTO", tagline: "Building the future of influencer tech" },
    { name: "Emma Thompson", role: "Head of Partnerships", tagline: "Connecting brands with purpose" },
    { name: "David Kim", role: "Lead Designer", tagline: "Crafting seamless experiences" }
  ];

  return (
       <>
    <div className="min-h-screen bg-[#0D0D1A] text-white overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 mx-auto text-pink-500" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Empowering Brands & Influencers to Grow Together
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            InfluencerHub bridges the gap between innovative brands and authentic creators.
          </p>
          
        
         <Link href="/auth/sign-up">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full font-semibold text-lg shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 transition-all duration-300"
          >
            Join the Community
          </motion.button>
           </Link>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-gray-400">10,000+ Influencers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400">5M+ Reach</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400">98% Campaign Success</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Mission */}
      <motion.section 
        className="relative py-20 px-4"
        {...fadeIn}
      >
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              At InfluencerHub, our mission is to make influencer marketing simple, transparent, and impactful. We help brands find the perfect creators to amplify their message, while giving influencers opportunities to monetize their creativity and grow their audience.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section 
        className="relative py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-pink-500/20 to-blue-500/20 border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full blur-3xl opacity-60"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-32 h-32 text-white/80" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                How It All Started
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                We started InfluencerHub with one goal — to make collaborations easier and more meaningful. Our founders saw how time-consuming and uncertain influencer discovery could be, and built a platform powered by data, trust, and creativity. Today, thousands of brands rely on us to drive genuine engagement.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* What We Offer */}
      <motion.section 
        className="relative py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            What We Offer
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Values */}
      <motion.section 
        className="relative py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            What Drives Us
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-pink-500">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Meet the Team */}
      {/* <motion.section 
        className="relative py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            Meet the Team
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center text-3xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                <p className="text-pink-500 text-center text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-center text-sm">{member.tagline}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section> */}

      {/* CTA Section */}
      <motion.section 
        className="relative py-20 px-4 mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-3xl rounded-full"></div>
          
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Ready to Start Your Next Campaign?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 10,000+ brands and influencers already making an impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Link href="/auth/sign-up">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full font-semibold text-lg shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 transition-all duration-300"
              >
                Get Started
              </motion.button>
              </Link>
             <Link href={'/contact-us'}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>


    </div>
          <Footer />
    </>
  );
}