'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Filter, X, Users, TrendingUp, Loader2 } from 'lucide-react';
import CreatorInsightsSheet from './(components)/CreatorInsightsSheet';

// TypeScript Interfaces
interface Creator {
  creator_id: string;
  creator_display_name?: string;
  creator_alias?: string;
  creator_bio?: string;
  creator_profile_url?: string;
  creator_profile_image_url?: string;
  creator_follower_count?: number;
  creator_categories?: string[];
  creator_interests?: string[];
  creator_country?: string;
  creator_languages?: string[];
  insights?: {
    name: string;
    values: Array<{ value?: number; value_with_breakdown?: Record<string, number> }>;
  }[];
}

interface ApiResponse {
  data: Creator[];
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
    next?: string;
  };
}

interface Filters {
  gender: string[];
  age: string[];
  location: string[];
  interests: string[];
  deviceType: string[];
  verified: boolean;
  featured: boolean;
  portfolio: boolean;
  language: string[];
  interactionRate: string;
  accountsEngaged: string;
  followerGrowth: string;
  latestPosts: string;
  country: string;
  followersMin: number;
  followersMax: number;
  ageRange: number[];
  genderBasic: string;
  audienceCountry: string;
  majorAudienceGender: string;
  majorAudienceAge: string;
  creatorCategories: string[];
}

const FindInfluencers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    audienceProfile: true,
    interests: true,
    deviceType: false,
    creatorTypes: false,
    language: false,
    metrics: false,
    basic: true
  });

  const [filters, setFilters] = useState<Filters>({
    gender: [],
    age: [],
    location: [],
    interests: [],
    deviceType: [],
    verified: false,
    featured: false,
    portfolio: false,
    language: [],
    interactionRate: '',
    accountsEngaged: '',
    followerGrowth: '',
    latestPosts: '',
    country: '',
    followersMin: 10000,
    followersMax: 1000000,
    ageRange: [18, 45],
    genderBasic: '',
    audienceCountry: '',
    majorAudienceGender: '',
    majorAudienceAge: '',
    creatorCategories: []
  });

  // Country mapping (API uses ISO codes)
  const countries = [
    { name: 'Argentina', flag: '🇦🇷', code: 'AR' },
    { name: 'Australia', flag: '🇦🇺', code: 'AU' },
    { name: 'Brazil', flag: '🇧🇷', code: 'BR' },
    { name: 'Canada', flag: '🇨🇦', code: 'CA' },
    { name: 'France', flag: '🇫🇷', code: 'FR' },
    { name: 'Germany', flag: '🇩🇪', code: 'DE' },
    { name: 'India', flag: '🇮🇳', code: 'IN' },
    { name: 'Indonesia', flag: '🇮🇩', code: 'ID' },
    { name: 'Israel', flag: '🇮🇱', code: 'IL' },
    { name: 'Japan', flag: '🇯🇵', code: 'JP' },
    { name: 'Mexico', flag: '🇲🇽', code: 'MX' },
    { name: 'Netherlands', flag: '🇳🇱', code: 'NL' },
    { name: 'New Zealand', flag: '🇳🇿', code: 'NZ' },
    { name: 'South Korea', flag: '🇰🇷', code: 'KR' },
    { name: 'Spain', flag: '🇪🇸', code: 'ES' },
    { name: 'Turkey', flag: '🇹🇷', code: 'TR' },
    { name: 'United Kingdom', flag: '🇬🇧', code: 'GB' },
    { name: 'United States', flag: '🇺🇸', code: 'US' }
  ];

  const creatorCategories = [
    'digital_creator', 'video_creator', 'artist', 'comedian', 
    'activity_general', 'entrepreneur', 'personal_blog', 'blogger',
    'bands_musicians', 'person', 'athlete', 'gaming_video_creator', 'chef'
  ];

  const interests = [
    'FASHION_AND_STYLE', 'ANIMALS_AND_PETS', 'VEHICLES_AND_TRANSPORTATION',
    'TRAVEL_AND_LEISURE_ACTIVITIES', 'VISUAL_ARTS_ARCHITECTURE_AND_CRAFTS',
    'FOOD_AND_DRINK', 'SPORTS', 'PERFORMING_ARTS', 'HOME_AND_GARDEN',
    'MUSIC_AND_AUDIO', 'BUSINESS_FINANCE_AND_ECONOMICS', 'GAMES_PUZZLES_AND_PLAY',
    'TV_AND_MOVIES', 'SCIENCE_AND_TECH'
  ];

  const languages = [
    { name: 'Arabic', code: 'ar' },
    { name: 'Bengali', code: 'bn' },
    { name: 'Dutch', code: 'nl' },
    { name: 'English', code: 'en' },
    { name: 'French', code: 'fr' },
    { name: 'German', code: 'de' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Indonesian', code: 'id' },
    { name: 'Japanese', code: 'ja' },
    { name: 'Korean', code: 'ko' },
    { name: 'Portuguese', code: 'pt' },
    { name: 'Spanish', code: 'es' },
    { name: 'Turkish', code: 'tr' }
  ];

  // Fetch creators from API
  const fetchCreators = async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      // Search query
      if (searchQuery) {
        queryParams.append('query', searchQuery);
      }

      // Creator countries
      if (filters.country) {
        const countryCode = countries.find(c => c.name === filters.country)?.code;
        if (countryCode) {
          queryParams.append('creator_countries', countryCode);
        }
      }

      // Follower count filter
      if (filters.followersMin || filters.followersMax) {
        queryParams.append('follower_count', JSON.stringify({
          min: filters.followersMin,
          max: filters.followersMax
        }));
      }

      // Major audience age
      if (filters.majorAudienceAge) {
        queryParams.append('major_audience_age_bucket', filters.majorAudienceAge);
      }

      // Major audience gender
      if (filters.majorAudienceGender) {
        queryParams.append('major_audience_gender', filters.majorAudienceGender.toLowerCase());
      }

      // Major audience country
      if (filters.audienceCountry) {
        const countryCode = countries.find(c => c.name === filters.audienceCountry)?.code;
        if (countryCode) {
          queryParams.append('major_audience_country', countryCode);
        }
      }

      // Creator categories
      if (filters.creatorCategories.length > 0) {
        queryParams.append('creator_categories', filters.creatorCategories.join(','));
      }

      // Creator interests
      if (filters.interests.length > 0) {
        queryParams.append('creator_interests', filters.interests.join(','));
      }

      // Creator languages
      if (filters.language.length > 0) {
        const langCodes = filters.language
          .map(lang => languages.find(l => l.name === lang)?.code)
          .filter(Boolean);
        if (langCodes.length > 0) {
          queryParams.append('creator_languages', langCodes.join(','));
        }
      }

      // Interaction rate
      if (filters.interactionRate) {
        const rates: Record<string, number> = {
          'Over 3%': 3,
          'Over 5%': 5,
          'Over 10%': 10
        };
        const minRate = rates[filters.interactionRate];
        if (minRate) {
          queryParams.append('interaction_rate', JSON.stringify({
            min: minRate,
            time_range: 'L28'
          }));
        }
      }

      // Limit
      queryParams.append('limit', '50');

      // Sort by
      queryParams.append('sort_by', 'followers');

      // Fields to return
      queryParams.append('fields', 
        'creator_id,creator_display_name,creator_alias,creator_bio,creator_profile_url,' +
        'creator_profile_image_url,creator_follower_count,creator_categories,creator_interests,' +
        'creator_country,creator_languages,insights.metrics(creator_interaction_rate)'
      );

      const response = await fetch(`/api/creator-search?${queryParams.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch creators');
      }

      const data: ApiResponse = await response.json();
      setCreators(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching creators:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckbox = (field: keyof Filters, value: string) => {
    setFilters(prev => {
      const currentValue = prev[field];
      if (Array.isArray(currentValue)) {
        return {
          ...prev,
        //   @ts-ignore
          [field]: currentValue.includes(value)
            ? currentValue.filter(v => v !== value)
            : [...currentValue, value]
        };
      }
      return prev;
    });
  };

  const resetFilters = () => {
    setFilters({
      gender: [],
      age: [],
      location: [],
      interests: [],
      deviceType: [],
      verified: false,
      featured: false,
      portfolio: false,
      language: [],
      interactionRate: '',
      accountsEngaged: '',
      followerGrowth: '',
      latestPosts: '',
      country: '',
      followersMin: 10000,
      followersMax: 1000000,
      ageRange: [18, 45],
      genderBasic: '',
      audienceCountry: '',
      majorAudienceGender: '',
      majorAudienceAge: '',
      creatorCategories: []
    });
    setSearchQuery('');
  };

  const formatFollowerCount = (count?: number): string => {
    if (!count) return '0';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getInteractionRate = (creator: Creator): string => {
    // const insights = creator?.insights?.find(i => i.name === 'creator_interaction_rate');
    // const rate = insights?.values?.[0]?.value;
    // return rate ? `${rate.toFixed(1)}%` : 'N/A';

    return '8%';
  };

  const getCountryFlag = (countryCode?: string): string => {
    const country = countries.find(c => c.code === countryCode);
    return country?.flag || '🌍';
  };

  interface FilterSectionProps {
    title: string;
    section: keyof typeof expandedSections;
    children: React.ReactNode;
  }

  const FilterSection: React.FC<FilterSectionProps> = ({ title, section, children }) => (
    <div className="mb-4 backdrop-blur-md bg-white/5 rounded-xl border border-white/10 overflow-hidden shadow-lg"
      style={{
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)'
      }}
    >
      <button
        onClick={() => toggleSection(section)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-all"
      >
        <span className="text-gray-200 font-semibold">{title}</span>
        {expandedSections[section] ? <ChevronUp className="w-5 h-5 text-pink-400" /> : <ChevronDown className="w-5 h-5 text-pink-400" />}
      </button>
      <AnimatePresence initial={false}>
        {expandedSections[section] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D1A] via-[#1a0a2e] to-[#0D0D1A] relative overflow-hidden pt-20">
      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div>


          {/* Error Message */}
          {error && (
            <div className="max-w-3xl mx-auto mb-8 backdrop-blur-md bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-1"
            >
              {/* Sticky Filter Header with Actions */}
              <div className="sticky top-4 backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-4 mb-4 shadow-2xl"
                style={{
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-purple-400" />
                    <h2 className="text-xl font-bold text-gray-200">Filters</h2>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Reset
                  </button>
                </div>
                
                <button 
                  onClick={fetchCreators}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                  }}
                >
                  {loading ? 'Applying...' : 'Apply Filters'}
                </button>
              </div>

              {/* Scrollable Filters */}
              <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar mt-3">
                {/* Basic Filters */}
                <FilterSection title="Basic Filters" section="basic">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Creator Country</p>
                      <select 
                        value={filters.country}
                        onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-3 py-2 text-gray-200 text-sm focus:border-purple-500 focus:outline-none cursor-pointer"
                      >
                        <option value="">All countries...</option>
                        {countries.map(c => (
                          <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Followers: {filters.followersMin.toLocaleString()} - {filters.followersMax.toLocaleString()}+</p>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="10000"
                          max="5000000"
                          step="10000"
                          value={filters.followersMin}
                          onChange={(e) => setFilters(prev => ({ ...prev, followersMin: parseInt(e.target.value) }))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                        <input
                          type="range"
                          min="10000"
                          max="5000000"
                          step="10000"
                          value={filters.followersMax}
                          onChange={(e) => setFilters(prev => ({ ...prev, followersMax: parseInt(e.target.value) }))}
                          className="w-full accent-pink-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </FilterSection>

                {/* Creator Categories */}
                <FilterSection title="Creator Categories" section="creatorTypes">
                  <div className="flex flex-wrap gap-2">
                    {creatorCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCheckbox('creatorCategories', category)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          filters.creatorCategories.includes(category)
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {category.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Audience Profile */}
                <FilterSection title="Audience Profile" section="audienceProfile">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Major Audience Gender</p>
                      {['Male', 'Female'].map(option => (
                        <label key={option} className="flex items-center space-x-2 mb-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="majorAudienceGender"
                            checked={filters.majorAudienceGender === option}
                            onChange={() => setFilters(prev => ({ ...prev, majorAudienceGender: option }))}
                            className="w-4 h-4 accent-purple-500 cursor-pointer"
                          />
                          <span className="text-gray-300 text-sm group-hover:text-pink-400 transition-colors">{option}</span>
                        </label>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Major Audience Age</p>
                      {['18-24', '25-34', '35-44', '45-54', '55-64', '65_and_above'].map(option => (
                        <label key={option} className="flex items-center space-x-2 mb-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="majorAudienceAge"
                            checked={filters.majorAudienceAge === option}
                            onChange={() => setFilters(prev => ({ ...prev, majorAudienceAge: option }))}
                            className="w-4 h-4 accent-purple-500 cursor-pointer"
                          />
                          <span className="text-gray-300 text-sm group-hover:text-pink-400 transition-colors">{option.replace('_', ' ')}</span>
                        </label>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Audience Country</p>
                      <select 
                        value={filters.audienceCountry}
                        onChange={(e) => setFilters(prev => ({ ...prev, audienceCountry: e.target.value }))}
                        className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-3 py-2 text-gray-200 text-sm focus:border-purple-500 focus:outline-none cursor-pointer"
                      >
                        <option value="">Select country...</option>
                        {countries.map(c => (
                          <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </FilterSection>

                {/* Audience Interests */}
                <FilterSection title="Creator Interests" section="interests">
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                    {interests.map(interest => (
                      <button
                        key={interest}
                        onClick={() => handleCheckbox('interests', interest)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          filters.interests.includes(interest)
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {interest.replace(/_/g, ' ').toLowerCase()}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Creator Language */}
                <FilterSection title="Creator Language" section="language">
                  <div className="flex flex-wrap gap-2">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleCheckbox('language', lang.name)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          filters.language.includes(lang.name)
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Creator Metrics */}
                <FilterSection title="Creator Metrics" section="metrics">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Interaction Rate</p>
                      {['Over 3%', 'Over 5%', 'Over 10%'].map(option => (
                        <label key={option} className="flex items-center space-x-2 mb-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="interactionRate"
                            checked={filters.interactionRate === option}
                            onChange={() => setFilters(prev => ({ ...prev, interactionRate: option }))}
                            className="w-4 h-4 accent-purple-500 cursor-pointer"
                          />
                          <span className="text-gray-300 text-sm group-hover:text-pink-400 transition-colors">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </FilterSection>
              </div>
            </motion.div>

            {/* Creator Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
                </div>
              ) : creators.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {creators.map((creator, index) => (
                    <motion.div
                      key={creator?.creator_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-purple-500/50 transition-all group cursor-pointer"
                      style={{
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)'
                      }}
                    >
                      {/* Profile Image */}
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse opacity-75 group-hover:opacity-100 transition-opacity"></div>
                        <img
                          src={creator?.creator_profile_image_url || 'https://i.pravatar.cc/150?img=1'}
                          alt={creator?.creator_display_name || 'Creator'}
                          className="relative w-full h-full rounded-full object-cover border-4 border-[#0D0D1A]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/150?img=1';
                          }}
                        />
                      </div>

                      {/* Name & Handle */}
                      <h3 className="text-xl font-bold text-gray-200 text-center mb-1">
                        {creator?.creator_display_name || 'Unknown Creator'}
                      </h3>
                      <p className="text-sm text-purple-400 text-center mb-4">
                        @{creator?.creator_alias || creator?.creator_id}
                      </p>

                      {/* Stats */}
                      <div className="flex justify-between items-center mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">
                            {formatFollowerCount(creator?.creator_follower_count)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">
                            {getInteractionRate(creator)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl">
                            {getCountryFlag(creator?.creator_country)}
                          </span>
                        </div>
                      </div>

                      {/* Categories Tags */}
                      {creator?.creator_categories && creator?.creator_categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {creator?.creator_categories.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-purple-500/30 rounded-full text-xs text-gray-300"
                            >
                              #{tag.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Bio Preview */}
                      {creator?.creator_bio && (
                        <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                          {creator?.creator_bio}
                        </p>
                      )}

                      {/* Insights Button */}
                      <CreatorInsightsSheet />

                      {/* View Profile Button */}
                      {/* <a
                        href={creator?.creator_profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all group-hover:scale-105 text-center"
                        style={{
                          boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
                        }}
                      >
                        View Profile
                      </a> */}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Search className="w-16 h-16 text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    No creators found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}

              {/* Load More - if there are results */}
              {creators?.length > 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-center mt-12"
                >
                  <button 
                    onClick={fetchCreators}
                    className="px-8 py-3 backdrop-blur-md bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:border-purple-500/50 hover:bg-white/10 transition-all hover:shadow-xl"
                  >
                    Load More Creators
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #a855f7, #3b82f6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ec4899, #a855f7);
        }
      `}</style>
    </div>
  );
};

export default FindInfluencers