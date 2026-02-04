export type Platform = 'instagram' | 'youtube' | 'facebook' | 'tiktok';

export interface Job {
  id: string;
  title: string;
  brand: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  description: string;
  deliverables: string[];
  platforms: Platform[];
  budget: {
    min: number;
    max: number;
  };
  timeline: string;
  requiredFollowers: {
    min: number;
  };
  category: string;
  location: string;
  postedAt: string;
  applicants: number;
  saved: boolean;
}

export interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner?: string;
  verified: boolean;
  platforms: {
    platform: Platform;
    followers: number;
    engagement: number;
    verified: boolean;
  }[];
  categories: string[];
  location: string;
  pitch: string;
  rating: number;
  totalJobs: number;
  responseRate: number;
  availability: 'immediate' | 'within_2_weeks' | 'within_month';
  priceRange: {
    min: number;
    max: number;
  };
  agency: boolean;
  demographics: {
    age: { range: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
    topLocations: { country: string; percentage: number }[];
    interests: string[];
  };
  portfolio: {
    id: string;
    type: 'image' | 'video';
    thumbnail: string;
    url: string;
    platform: Platform;
    likes: number;
    comments: number;
    views?: number;
  }[];
  caseStudies: {
    id: string;
    brand: string;
    title: string;
    description: string;
    results: string;
    image: string;
  }[];
  saved: boolean;
}

export interface FilterState {
  platforms: Platform[];
  followersRange: [number, number];
  engagementMin: number;
  categories: string[];
  locations: string[];
  priceRange: [number, number];
  availability: string[];
  verified: boolean;
  agency: boolean;
}

export type ViewMode = 'jobs' | 'influencers' | 'profile';
