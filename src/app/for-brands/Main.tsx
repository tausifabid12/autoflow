'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Zap, Rocket, Users, TrendingUp, Target, Award, CheckCircle, Star, Instagram, Youtube, TrendingDown, ArrowRight, Twitter } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/home3/Footer';

const Main = () => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Verified Influencers',
      description: 'All profiles are vetted and verified for authenticity, ensuring quality partnerships.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Data-Driven Results',
      description: 'Real analytics and transparent campaign tracking with detailed performance metrics.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Seamless Collaboration',
      description: 'End-to-end tools for discovery, chat, and payment in one unified platform.'
    }
  ];

  const steps = [
    {
      number: '01',
      icon: <Rocket className="w-8 h-8" />,
      title: 'Post a Campaign',
      description: 'Define your goals, budget, and ideal creator profile in minutes.'
    },
    {
      number: '02',
      icon: <Users className="w-8 h-8" />,
      title: 'Review Applications',
      description: 'Browse creator applications and select the perfect match for your brand.'
    },
    {
      number: '03',
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Track Performance',
      description: 'Monitor real-time analytics, engagement rates, and measure your ROI.'
    }
  ];



  const caseStudies = [
    {
      brand: 'Nike',
      logo: '👟',
      campaign: 'Summer Sneaker Launch',
      reach: '12.5M',
      engagement: '8.2%',
      roi: '450%',
      description: 'Collaborated with 50 fitness influencers to launch new athletic line.'
    },
    {
      brand: 'Samsung',
      logo: '📱',
      campaign: 'Galaxy S24 Release',
      reach: '18.3M',
      engagement: '10.5%',
      roi: '380%',
      description: 'Tech creators showcased innovative features to tech-savvy audiences.'
    },
    {
      brand: 'Adidas',
      logo: '⚽',
      campaign: 'Street Style Collection',
      reach: '9.8M',
      engagement: '9.7%',
      roi: '520%',
      description: 'Fashion influencers highlighted sustainable urban fashion line.'
    }
  ];



  return (
       <>
    <div className="min-h-screen bg-[#0D0D1A] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">For Brands & Marketers</span>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Find the Perfect Influencers for Your Brand
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Launch campaigns that connect with millions through authentic creators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/sign-up" className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              Get Started Now
            </Link>

          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-8 justify-center text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-pink-400" />
              <span>500+ Brands</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>5M+ Audience Reach</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-400" />
              <span>4.8/5 Avg Rating</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Why Choose InfluencerHub
            </h2>
            <p className="text-gray-400 text-lg">The most trusted platform for brand-creator partnerships</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg">Launch your campaign in three simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    <div className="text-5xl font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent opacity-30">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Influencers Section */}
      {/* <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Top Influencers
            </h2>
            <p className="text-gray-400 text-lg">Connect with verified creators in every niche</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {influencers.map((influencer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{influencer.avatar}</div>
                    {influencer.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                        <CheckCircle className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-blue-300">Verified</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{influencer.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{influencer.niche}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 p-3 rounded-lg bg-white/5">
                      <p className="text-xs text-gray-500">Followers</p>
                      <p className="text-lg font-semibold text-pink-400">{influencer.followers}</p>
                    </div>
                    <div className="flex-1 p-3 rounded-lg bg-white/5">
                      <p className="text-xs text-gray-500">Engagement</p>
                      <p className="text-lg font-semibold text-blue-400">{influencer.engagement}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      {influencer.platform === 'Instagram' && <Instagram className="w-4 h-4" />}
                      {influencer.platform === 'YouTube' && <Youtube className="w-4 h-4" />}
                      {influencer.platform === 'TikTok' && <Star className="w-4 h-4" />}
                      {influencer.platform}
                    </span>
                    <button className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 border border-purple-500/30 text-white hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:border-transparent transition-all duration-300">
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button className="px-8 py-4 rounded-full border-2 border-purple-500/50 text-white font-semibold hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-300 hover:scale-105">
              View All Influencers
            </button>
          </motion.div>
        </div>
      </section> */}

      {/* Case Studies Section */}
      {/* <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Proven Results for Global Brands
            </h2>
            <p className="text-gray-400 text-lg">See how leading companies achieve success</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                  <div className="text-6xl mb-4">{study.logo}</div>
                  <h3 className="text-2xl font-bold mb-2">{study.brand}</h3>
                  <p className="text-sm text-gray-400 mb-4">{study.campaign}</p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-xs text-gray-500">Reach</p>
                      <p className="text-lg font-semibold text-pink-400">{study.reach}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-xs text-gray-500">Engagement</p>
                      <p className="text-lg font-semibold text-purple-400">{study.engagement}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-xs text-gray-500">ROI</p>
                      <p className="text-lg font-semibold text-green-400">{study.roi}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{study.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Pricing Section */}
      {/* <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Pricing Plans
            </h2>
            <p className="text-gray-400 text-lg">Choose the perfect plan for your brand</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative group"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-blue-500/30' 
                    : 'bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10'
                }`} />
                <div className={`relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border transition-all duration-300 ${
                  plan.popular 
                    ? 'border-purple-500/50 hover:border-purple-500' 
                    : 'border-white/10 hover:border-purple-500/50'
                }`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105'
                      : 'bg-white/5 border border-purple-500/30 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:border-transparent'
                  }`}>
                    Start Campaign
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

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
};


export default Main;