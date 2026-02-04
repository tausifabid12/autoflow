import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Users, TrendingUp, Eye, MousePointer, Instagram, ExternalLink } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const CreatorInsightsSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const StatCard = ({ icon: Icon, label, value, trend }: { icon: React.ComponentType<{ className?: string }>, label: string, value: string, trend?: number }) => (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-4 hover:border-purple-500/50 transition-all"
      style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.1)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-pink-400" />
        </div>
        {trend && (
          <span className="text-green-400 text-xs font-semibold">+{trend}%</span>
        )}
      </div>
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-200">{value}</p>
    </motion.div>
  );

  const CustomTooltip = ({ active, payload, label }: { active: boolean, payload: any, label: string }) => {
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
    <>
      {/* Trigger Button */}
      {/* <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4"> */}
      <button
        onClick={() => setIsOpen(true)}
        className="block w-full py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all group-hover:scale-105 text-center"
      >
        View Profile
      </button>
      {/* </div> */}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="left"
          className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto bg-gradient-to-br from-[#0D0D1A] via-[#1a0a2e] to-[#0D0D1A] border-r border-purple-500/30 p-0"
        >
          {/* Floating Gradient Orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

          {/* Content */}
          <div className="relative z-10 p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Creator Insights
                </SheetTitle>
              </SheetHeader>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Creator Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6"
              style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)' }}
            >
              {/* Creator Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse"></div>
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="relative w-full h-full rounded-full object-cover border-4 border-[#0D0D1A]"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-200 mb-1">{creator.name}</h1>
                  <p className="text-purple-400 text-sm mb-2">{creator.handle}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-purple-500/30 rounded-full text-xs">
                      {creator.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{creator.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-blue-400" />
                    <p className="text-gray-400 text-xs">Followers</p>
                  </div>
                  <p className="text-xl font-bold text-gray-200">{creator.followers}</p>
                </div>
                <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <p className="text-gray-400 text-xs">Engagement</p>
                  </div>
                  <p className="text-xl font-bold text-gray-200">{creator.engagement}</p>
                </div>
                <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-pink-400" />
                    <p className="text-gray-400 text-xs">Avg Reach</p>
                  </div>
                  <p className="text-xl font-bold text-gray-200">{creator.avgReach}</p>
                </div>
                <div className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <p className="text-gray-400 text-xs">Avg Views</p>
                  </div>
                  <p className="text-xl font-bold text-gray-200">{creator.avgViews}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"
                  style={{ boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)' }}
                >
                  <Instagram className="w-4 h-4" />
                  Follow
                </button>
                <button className="flex-1 px-6 py-3 backdrop-blur-md bg-white/5 border border-purple-500/50 text-gray-200 font-semibold rounded-xl hover:bg-white/10 transition-all hover:scale-105 text-sm">
                  Collaborate
                </button>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-2"
            >
              <div className="grid grid-cols-2 gap-2">
                {['overview', 'engagement', 'audience', 'content'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all capitalize text-sm ${activeTab === tab
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
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard icon={Users} label="Total Reach" value="10.8M" />
                    <StatCard icon={Eye} label="Total Views" value="5.7M" />
                    <StatCard icon={MousePointer} label="Total Clicks" value="284K" />
                    <StatCard icon={TrendingUp} label="Avg CTR" value="4.98%" />
                  </div>

                  <div className="space-y-6">
                    <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-5">
                      <h3 className="text-lg font-bold text-gray-200 mb-4">Reach Over Time</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={reachOverTime}>
                          <defs>
                            <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                              <stop offset="100%" stopColor="#a855f7" stopOpacity={0.2} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                          <YAxis stroke="#9ca3af" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} style={{ fontSize: '12px' }} />
                          <Tooltip content={<CustomTooltip active={true} payload={[]} label="" />} />
                          <Line type="monotone" dataKey="reach" stroke="#ec4899" strokeWidth={3} fill="url(#reachGradient)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-5">
                      <h3 className="text-lg font-bold text-gray-200 mb-4">Interactions per Post Type</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={interactionsPerPost}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="type" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                          <YAxis stroke="#9ca3af" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} style={{ fontSize: '12px' }} />
                          <Tooltip content={<CustomTooltip active={true} payload={[]} label="" />} />
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
                <div className="space-y-6">
                  <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-5">
                    <h3 className="text-lg font-bold text-gray-200 mb-4">Interaction Rate % by Week</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={engagementRate}>
                        <defs>
                          <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#9ca3af" tickFormatter={(value) => `${value}%`} style={{ fontSize: '12px' }} />
                        <Tooltip content={<CustomTooltip active={true} payload={[]} label="" />} />
                        <Area type="monotone" dataKey="rate" stroke="#ec4899" strokeWidth={3} fill="url(#engagementGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-5">
                    <h3 className="text-lg font-bold text-gray-200 mb-4">Content Engagement Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={contentBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          //@ts-ignore
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {contentBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip active={true} payload={[]} label="" />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Audience Tab */}
              {activeTab === 'audience' && (
                <div className="space-y-6">
                  <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-5">
                    <h3 className="text-lg font-bold text-gray-200 mb-4">Top Countries</h3>
                    <div className="space-y-3">
                      {topCountries.map((country, index) => (
                        <div key={country.country} className="flex items-center gap-3">
                          <span className="text-gray-300 text-sm w-28">{country.country}</span>
                          <div className="flex-1 h-7 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${country.percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-end pr-2"
                            >
                              <span className="text-white text-xs font-semibold">{country.percentage}%</span>
                            </motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-5">
                      <h3 className="text-lg font-bold text-gray-200 mb-4">Gender Distribution</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={genderDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            //@ts-ignore
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={90}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {genderDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip active={true} payload={[]} label="" />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-5">
                      <h3 className="text-lg font-bold text-gray-200 mb-4">Age Groups</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={ageGroups}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            //@ts-ignore
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={90}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {ageGroups.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip active={true} payload={[]} label="" />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-200 mb-4">Top Performing Posts</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {topPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ scale: 1.03 }}
                          className="relative group backdrop-blur-md bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer"
                        >
                          <img src={post.image} alt={`Post ${post.id}`} className="w-full h-40 object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                            <span className="text-pink-400 text-xs font-semibold mb-2">{post.type}</span>
                            <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
                              <div>
                                <p className="text-gray-400 text-xs">Reach</p>
                                <p className="font-bold text-xs">{post.reach}</p>
                              </div>
                              <div>
                                <p className="text-gray-400 text-xs">Views</p>
                                <p className="font-bold text-xs">{post.views}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
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
              className="backdrop-blur-md bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/30 p-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Start Collaborating with {creator.name}
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Connect with a top creator in {creator.category} and reach millions.
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm">
                    Hire Now
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="flex-1 px-6 py-3 backdrop-blur-md bg-white/5 border-2 border-purple-500/50 text-gray-200 font-semibold rounded-xl hover:bg-white/10 hover:border-purple-500 transition-all hover:scale-105 text-sm">
                    View Similar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreatorInsightsSheet;