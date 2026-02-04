'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, TrendingUp, Eye, MousePointer, Instagram, Youtube, ExternalLink } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CreatorInsights = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data
  const creator = {
    name: 'Sarah Chen',
    handle: '@sarahstyle',
    avatar: 'https://i.pravatar.cc/150?img=1',
    category: 'Beauty & Fashion',
    location: 'Los Angeles, CA',
    followers: '2.4M',
    engagement: '8.2%',
    avgReach: '1.8M',
    avgViews: '950K'
  };

  const reachOverTime = [
    { date: 'Jan', reach: 1200000 },
    { date: 'Feb', reach: 1450000 },
    { date: 'Mar', reach: 1380000 },
    { date: 'Apr', reach: 1620000 },
    { date: 'May', reach: 1550000 },
    { date: 'Jun', reach: 1800000 }
  ];

  const interactionsPerPost = [
    { type: 'Posts', interactions: 85000 },
    { type: 'Reels', interactions: 145000 },
    { type: 'Stories', interactions: 62000 },
    { type: 'IGTV', interactions: 38000 }
  ];

  const engagementRate = [
    { date: 'Week 1', rate: 7.2 },
    { date: 'Week 2', rate: 8.1 },
    { date: 'Week 3', rate: 7.8 },
    { date: 'Week 4', rate: 8.5 },
    { date: 'Week 5', rate: 8.9 },
    { date: 'Week 6', rate: 8.2 }
  ];

  const contentBreakdown = [
    { name: 'Posts', value: 35 },
    { name: 'Reels', value: 45 },
    { name: 'Stories', value: 20 }
  ];

  const topCountries = [
    { country: 'United States', percentage: 45 },
    { country: 'United Kingdom', percentage: 18 },
    { country: 'Canada', percentage: 12 },
    { country: 'Australia', percentage: 10 },
    { country: 'Germany', percentage: 8 },
    { country: 'Others', percentage: 7 }
  ];

  const genderDistribution = [
    { name: 'Female', value: 68 },
    { name: 'Male', value: 30 },
    { name: 'Other', value: 2 }
  ];

  const ageGroups = [
    { name: '13-17', value: 8 },
    { name: '18-24', value: 35 },
    { name: '25-34', value: 38 },
    { name: '35-44', value: 14 },
    { name: '45+', value: 5 }
  ];

  const topPosts = [
    { id: 1, image: 'https://picsum.photos/300/300?random=1', type: 'Reel', reach: '2.1M', interactions: '185K', views: '1.8M', date: 'May 28' },
    { id: 2, image: 'https://picsum.photos/300/300?random=2', type: 'Post', reach: '1.9M', interactions: '156K', views: '1.5M', date: 'May 25' },
    { id: 3, image: 'https://picsum.photos/300/300?random=3', type: 'Reel', reach: '2.3M', interactions: '201K', views: '2.0M', date: 'May 22' },
    { id: 4, image: 'https://picsum.photos/300/300?random=4', type: 'Post', reach: '1.7M', interactions: '142K', views: '1.4M', date: 'May 19' },
    { id: 5, image: 'https://picsum.photos/300/300?random=5', type: 'Reel', reach: '2.5M', interactions: '218K', views: '2.2M', date: 'May 15' },
    { id: 6, image: 'https://picsum.photos/300/300?random=6', type: 'Post', reach: '1.6M', interactions: '138K', views: '1.3M', date: 'May 12' }
  ];

  const COLORS = ['#ec4899', '#a855f7', '#3b82f6'];

  const StatCard = ({ icon: Icon, label, value, trend }: { icon: any, label: any, value: any, trend: any }) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all"
      style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-pink-400" />
        </div>
        {trend && (
          <span className="text-green-400 text-sm font-semibold">+{trend}%</span>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-200">{value}</p>
    </motion.div>
  );

  const CustomTooltip = ({ active, payload, label }: { active: boolean, payload: any, label: any }) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-md bg-black/80 border border-purple-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm font-semibold mb-1">{label}</p>
          {payload.map((entry: any, index: any) => (
            <p key={index} className="text-gray-200 text-sm">
              {entry.name}: <span className="font-bold" style={{ color: entry.color }}>{entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D1A] via-[#1a0a2e] to-[#0D0D1A] relative overflow-hidden">
      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Search</span>
        </motion.button>

        {/* Creator Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-8 mb-8"
          style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.2)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Creator Info */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse"></div>
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="relative w-full h-full rounded-full object-cover border-4 border-[#0D0D1A]"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-200 mb-1">{creator.name}</h1>
                <p className="text-purple-400 mb-2">{creator.handle}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-purple-500/30 rounded-full">
                    {creator.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{creator.location}</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <p className="text-gray-400 text-sm">Followers</p>
                </div>
                <p className="text-2xl font-bold text-gray-200">{creator.followers}</p>
              </div>
              <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <p className="text-gray-400 text-sm">Engagement</p>
                </div>
                <p className="text-2xl font-bold text-gray-200">{creator.engagement}</p>
              </div>
              <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-pink-400" />
                  <p className="text-gray-400 text-sm">Avg Reach</p>
                </div>
                <p className="text-2xl font-bold text-gray-200">{creator.avgReach}</p>
              </div>
              <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <p className="text-gray-400 text-sm">Avg Views</p>
                </div>
                <p className="text-2xl font-bold text-gray-200">{creator.avgViews}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="flex-1 md:flex-initial px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
            </button>
            <button className="flex-1 md:flex-initial px-8 py-3 backdrop-blur-md bg-white/5 border border-purple-500/50 text-gray-200 font-semibold rounded-xl hover:bg-white/10 transition-all hover:scale-105">
              Collaborate
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-2 mb-8"
          style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
        >
          <div className="flex flex-wrap gap-2">
            {['overview', 'engagement', 'audience', 'content'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} label="Total Reach" value="10.8M" trend="12" />
                <StatCard icon={Eye} label="Total Views" value="5.7M" trend="8" />
                <StatCard icon={MousePointer} label="Total Clicks" value="284K" trend="15" />
                <StatCard icon={TrendingUp} label="Avg CTR" value="4.98%" trend="5" />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Reach Over Time */}
                <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6"
                  style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
                >
                  <h3 className="text-xl font-bold text-gray-200 mb-6">Reach Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={reachOverTime}>
                      <defs>
                        <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#a855f7" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip content={<CustomTooltip active={true} payload={[]} label={''} />} />
                      <Line type="monotone" dataKey="reach" stroke="#ec4899" strokeWidth={3} fill="url(#reachGradient)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Interactions Per Post */}
                <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6"
                  style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
                >
                  <h3 className="text-xl font-bold text-gray-200 mb-6">Interactions per Post Type</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={interactionsPerPost}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="type" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                      <Tooltip content={<CustomTooltip active={true} payload={[]} label={''} />} />
                      <Bar dataKey="interactions" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Engagement Tab */}
          {activeTab === 'engagement' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Engagement Rate Chart */}
                <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6"
                  style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
                >
                  <h3 className="text-xl font-bold text-gray-200 mb-6">Interaction Rate % by Week</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={engagementRate}>
                      <defs>
                        <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#a855f7" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" tickFormatter={(value) => `${value}%`} />
                      <Tooltip content={<CustomTooltip active={true} payload={[]} label={''} />} />
                      <Area type="monotone" dataKey="rate" stroke="#ec4899" strokeWidth={3} fill="url(#engagementGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Content Engagement Breakdown */}
                <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6"
                  style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
                >
                  <h3 className="text-xl font-bold text-gray-200 mb-6">Content Engagement Breakdown</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={contentBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        //@ts-ignore
                        label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contentBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip active={true} payload={[]} label={''} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Audience Tab */}
          {activeTab === 'audience' && (
            <div className="space-y-8">
              {/* Top Countries */}
              <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6"
                style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
              >
                <h3 className="text-xl font-bold text-gray-200 mb-6">Top Countries</h3>
                <div className="space-y-4">
                  {topCountries.map((country, index) => (
                    <div key={country.country} className="flex items-center gap-4">
                      <span className="text-gray-300 w-32">{country.country}</span>
                      <div className="flex-1 h-8 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${country.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-end pr-3"
                        >
                          <span className="text-white text-sm font-semibold">{country.percentage}%</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Gender Distribution */}
                <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6"
                  style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
                >
                  <h3 className="text-xl font-bold text-gray-200 mb-6">Gender Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={genderDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        //@ts-ignore
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {genderDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip active={true} payload={[]} label={''} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Age Groups */}
                <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6"
                  style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
                >
                  <h3 className="text-xl font-bold text-gray-200 mb-6">Age Groups</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ageGroups}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        //@ts-ignore
                        label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ageGroups.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip active={true} payload={[]} label={''} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-8">
              {/* Top Posts Grid */}
              <div>
                <h3 className="text-2xl font-bold text-gray-200 mb-6">Top Performing Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative group backdrop-blur-md bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer"
                      style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
                    >
                      <img src={post.image} alt={`Post ${post.id}`} className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span className="text-pink-400 text-sm font-semibold mb-2">{post.type}</span>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                          <div>
                            <p className="text-gray-400">Reach</p>
                            <p className="font-bold">{post.reach}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Interactions</p>
                            <p className="font-bold">{post.interactions}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Views</p>
                            <p className="font-bold">{post.views}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Date</p>
                            <p className="font-bold">{post.date}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Data Table */}
              <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
                style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Post Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Reach</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Interactions</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Views</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topPosts.map((post, index) => (
                        <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-purple-500/30 rounded-full text-sm text-gray-300">
                              {post.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{post.reach}</td>
                          <td className="px-6 py-4 text-gray-300">{post.interactions}</td>
                          <td className="px-6 py-4 text-gray-300">{post.views}</td>
                          <td className="px-6 py-4 text-gray-400 text-sm">{post.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 backdrop-blur-md bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/30 p-8 md:p-12"
          style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.3)' }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Start Your Next Collaboration with {creator.name}
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Connect with one of the top creators in the {creator.category} niche and reach millions of engaged followers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2"
                style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
              >
                Hire Now
                <ExternalLink className="w-5 h-5" />
              </button>
              <button className="px-10 py-4 backdrop-blur-md bg-white/5 border-2 border-purple-500/50 text-gray-200 font-semibold rounded-xl hover:bg-white/10 hover:border-purple-500 transition-all hover:scale-105">
                View Similar Creators
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatorInsights;


// import React from 'react'

// export default function page() {
//   return (
//     <div>page</div>
//   )
// }
