'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, DollarSign, TrendingUp, CheckCircle, ArrowRight, Users, Globe, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/home3/Footer';

const Main = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const campaigns = [
    {
      brand: 'TechVibe',
      logo: '🎧',
      category: 'Tech',
      description: 'Promote premium wireless headphones',
      budget: '$500 - $2,000',
      requirements: '50K+ followers'
    },
    {
      brand: 'StyleCo',
      logo: '👗',
      category: 'Fashion',
      description: 'Summer collection campaign',
      budget: '$800 - $3,000',
      requirements: '100K+ followers'
    },
    {
      brand: 'FoodieBox',
      logo: '🍱',
      category: 'Food',
      description: 'Meal kit subscription promotion',
      budget: '$300 - $1,500',
      requirements: '30K+ followers'
    },
    {
      brand: 'FitGear',
      logo: '💪',
      category: 'Fitness',
      description: 'Athletic wear collaboration',
      budget: '$600 - $2,500',
      requirements: '75K+ followers'
    },
    {
      brand: 'BeautyLux',
      logo: '💄',
      category: 'Beauty',
      description: 'Skincare product launch',
      budget: '$1,000 - $4,000',
      requirements: '150K+ followers'
    },
    {
      brand: 'TravelWave',
      logo: '✈️',
      category: 'Travel',
      description: 'Destination marketing campaign',
      budget: '$2,000 - $5,000',
      requirements: '200K+ followers'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: '👩‍💼',
      platform: 'Instagram',
      followers: '245K',
      engagement: '8.2%',
      story: 'InfluencerHub connected me with brands that truly align with my values. I\'ve earned over $50K in 6 months!'
    },
    {
      name: 'Marcus Chen',
      avatar: '👨‍💻',
      platform: 'YouTube',
      followers: '580K',
      engagement: '12.5%',
      story: 'The platform makes collaboration seamless. I focus on creating content while they handle the partnerships.'
    },
    {
      name: 'Emma Rodriguez',
      avatar: '👩‍🎨',
      platform: 'TikTok',
      followers: '1.2M',
      engagement: '15.8%',
      story: 'Finally, a platform that values authenticity over follower count. The campaigns are diverse and exciting!'
    }
  ];

  const benefits = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Collaborate with Top Brands',
      description: 'Work with global brands that value authenticity and creative freedom.'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Get Paid for Your Passion',
      description: 'Transparent payments and guaranteed deals with secure escrow protection.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Grow Your Reach',
      description: 'Access analytics and personalized opportunities to expand your audience.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Showcase your niche, audience demographics, and past collaborations.'
    },
    {
      number: '02',
      title: 'Apply to Campaigns',
      description: 'Browse curated opportunities and apply to campaigns that match your brand.'
    },
    {
      number: '03',
      title: 'Get Hired & Get Paid',
      description: 'Deliver content, get approved, and receive payments directly to your account.'
    }
  ];

  return (
       <>
    <div className="min-h-screen bg-[#0D0D1A] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
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
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-gray-300">Join the Creator Economy</span>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            Empower Your Influence
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Join thousands of creators turning passion into partnerships.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/sign-up">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105">
              Join as Influencer
            </button>
            </Link>
            {/* <Link href="/dashboard/jobs">
            <button className="px-8 py-4 rounded-full border-2 border-pink-500/50 text-white font-semibold hover:bg-pink-500/10 hover:border-pink-500 transition-all duration-300 group">
              <span className="flex items-center gap-2">
                Explore Campaigns
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            </Link> */}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-8 justify-center text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-400" />
              <span>10K+ Active Influencers</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-400" />
              <span>$5M+ in Collaborations</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Join Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Why Join InfluencerHub
            </h2>
            <p className="text-gray-400 text-lg">Transform your content into meaningful partnerships</p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all duration-300">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/20 to-blue-500/20 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform duration-300">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg">Get started in three simple steps</p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                  <div className="text-6xl font-bold bg-gradient-to-br from-pink-500 to-blue-500 bg-clip-text text-transparent mb-4 opacity-30">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                  <CheckCircle className="w-6 h-6 text-green-400 mt-4 group-hover:scale-110 transition-transform" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      {/* <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Featured Campaigns
            </h2>
            <p className="text-gray-400 text-lg">Discover opportunities that match your brand</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all duration-300">
                  <div className="text-5xl mb-4">{campaign.logo}</div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{campaign.brand}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-gradient-to-r from-pink-500/20 to-blue-500/20 border border-pink-500/30 text-pink-300">
                      {campaign.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{campaign.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Budget</p>
                      <p className="text-lg font-semibold text-green-400">{campaign.budget}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Requirements</p>
                      <p className="text-sm text-gray-300">{campaign.requirements}</p>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500/10 to-blue-500/10 border border-pink-500/30 text-white font-medium hover:from-pink-500 hover:to-blue-500 hover:border-transparent transition-all duration-300">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Success Stories Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-gray-400 text-lg">Hear from creators who found success with us</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.platform}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1 p-3 rounded-lg bg-white/5">
                      <p className="text-xs text-gray-500">Followers</p>
                      <p className="text-lg font-semibold text-pink-400">{testimonial.followers}</p>
                    </div>
                    <div className="flex-1 p-3 rounded-lg bg-white/5">
                      <p className="text-xs text-gray-500">Engagement</p>
                      <p className="text-lg font-semibold text-blue-400">{testimonial.engagement}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic">"{testimonial.story}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            Start Collaborating Today
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Turn your content into opportunities that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Link href="/auth/sign-up">
            <button className="px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold text-lg shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/70 transition-all duration-300 hover:scale-105">
              Sign Up as Influencer
            </button>
            </Link>
            <Link href="/dashboard/jobs">
            <button className="px-10 py-5 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              View Campaigns
            </button>
            </Link>
          </div>
        </motion.div>
      </section>


    </div>
          <Footer />
    </>
  );
};

export default Main;