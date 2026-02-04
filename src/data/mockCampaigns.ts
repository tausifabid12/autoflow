export interface BarterProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_urls: string[];
}

export interface Deliverable {
  type: "long-video" | "short-video" | "image" | "text" | "story";
  count: number;
}

export interface Campaign {
  campaign_id: string;
  brandId: string;
  brandName: string;
  brandImage: string;
  title: string;
  description: string;
  type: "paid" | "barter" | "barter-commission";
  product_provided: boolean;
  barter_product: BarterProduct[];
  reference_video_url?: string;
  price: {
    type: "fixed" | "range";
    fixed_price: number;
    min_price: number;
    max_price: number;
  };
  status: "pending" | "approved" | "rejected" | "active" | "completed" | "paused";
  duration: string;
  start_date: string | null;
  end_date: string | null;
  location: string;
  platform: ("instagram" | "tiktok" | "youtube" | "facebook")[];
  deliverables: Deliverable[];
  requirements: string[];
  category: string[];
  media_assets: string[];
  applicants_count: number;
  age_start: number;
  age_end: number;
  gender: "male" | "female" | "any";
  min_number_of_followers: number;
  coupon_code?: string;
  coupon_discount?: number;
  coupon_validity?: string;
  is_reviewed: boolean;
  createdAt: string;
}

export const mockCampaigns: Campaign[] = [
  {
    campaign_id: "camp_001",
    brandId: "brand_001",
    brandName: "Nike",
    brandImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
    title: "Summer Fitness Campaign",
    description: "Looking for fitness enthusiasts to showcase our new summer collection. Create engaging content that inspires people to stay active.",
    type: "paid",
    product_provided: true,
    barter_product: [],
    price: {
      type: "range",
      fixed_price: 0,
      min_price: 5000,
      max_price: 15000,
    },
    status: "active",
    duration: "30 days",
    start_date: "2024-02-01",
    end_date: "2024-03-01",
    location: "United States",
    platform: ["instagram", "tiktok"],
    deliverables: [
      { type: "short-video", count: 3 },
      { type: "story", count: 5 },
    ],
    requirements: ["Min 50k followers", "Fitness niche", "High engagement rate"],
    category: ["Sports", "Fitness", "Lifestyle"],
    media_assets: [],
    applicants_count: 234,
    age_start: 18,
    age_end: 35,
    gender: "any",
    min_number_of_followers: 50000,
    is_reviewed: true,
    createdAt: "2024-01-15",
  },
  {
    campaign_id: "camp_002",
    brandId: "brand_002",
    brandName: "Glossier",
    brandImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop",
    title: "Clean Beauty Tutorial Series",
    description: "Create authentic beauty tutorials featuring our clean skincare line. We want real, unfiltered content that resonates with Gen Z.",
    type: "barter",
    product_provided: true,
    barter_product: [
      { name: "Full Skincare Set", description: "Complete skincare routine", price: 350, quantity: 1, image_urls: [] },
    ],
    price: {
      type: "fixed",
      fixed_price: 0,
      min_price: 0,
      max_price: 0,
    },
    status: "active",
    duration: "14 days",
    start_date: "2024-02-10",
    end_date: "2024-02-24",
    location: "Worldwide",
    platform: ["instagram", "youtube"],
    deliverables: [
      { type: "long-video", count: 1 },
      { type: "image", count: 3 },
    ],
    requirements: ["Beauty/skincare niche", "Authentic content style", "Female audience preferred"],
    category: ["Beauty", "Skincare", "Lifestyle"],
    media_assets: [],
    applicants_count: 567,
    age_start: 18,
    age_end: 28,
    gender: "female",
    min_number_of_followers: 10000,
    is_reviewed: true,
    createdAt: "2024-01-20",
  },
  {
    campaign_id: "camp_003",
    brandId: "brand_003",
    brandName: "Spotify",
    brandImage: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop",
    title: "Playlist Takeover Challenge",
    description: "Share your morning routine with your favorite Spotify playlist. Create content that shows how music enhances your daily life.",
    type: "paid",
    product_provided: false,
    barter_product: [],
    price: {
      type: "fixed",
      fixed_price: 2500,
      min_price: 0,
      max_price: 0,
    },
    status: "active",
    duration: "7 days",
    start_date: "2024-02-15",
    end_date: "2024-02-22",
    location: "United States",
    platform: ["tiktok", "instagram"],
    deliverables: [
      { type: "short-video", count: 2 },
    ],
    requirements: ["Music lovers", "Creative editing skills", "Trending audio usage"],
    category: ["Music", "Entertainment", "Lifestyle"],
    media_assets: [],
    applicants_count: 892,
    age_start: 16,
    age_end: 30,
    gender: "any",
    min_number_of_followers: 25000,
    is_reviewed: true,
    createdAt: "2024-01-25",
  },
  {
    campaign_id: "camp_004",
    brandId: "brand_004",
    brandName: "Adobe",
    brandImage: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop",
    title: "Creative Suite Masterclass",
    description: "Showcase your creative process using Adobe Creative Suite. We want to see tutorials, tips, and behind-the-scenes content.",
    type: "barter-commission",
    product_provided: true,
    barter_product: [
      { name: "1-Year Creative Cloud", description: "Full Adobe CC subscription", price: 600, quantity: 1, image_urls: [] },
    ],
    price: {
      type: "range",
      fixed_price: 0,
      min_price: 1000,
      max_price: 5000,
    },
    status: "active",
    duration: "60 days",
    start_date: "2024-02-01",
    end_date: "2024-04-01",
    location: "Worldwide",
    platform: ["youtube", "tiktok"],
    deliverables: [
      { type: "long-video", count: 2 },
      { type: "short-video", count: 4 },
    ],
    requirements: ["Design/creative niche", "Tutorial experience", "High production quality"],
    category: ["Design", "Tech", "Education"],
    media_assets: [],
    applicants_count: 345,
    age_start: 20,
    age_end: 40,
    gender: "any",
    min_number_of_followers: 100000,
    is_reviewed: true,
    createdAt: "2024-01-18",
  },
  {
    campaign_id: "camp_005",
    brandId: "brand_005",
    brandName: "HelloFresh",
    brandImage: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=100&h=100&fit=crop",
    title: "Weekly Meal Prep Series",
    description: "Create content around meal prepping with HelloFresh. Show your audience how easy it is to cook delicious, healthy meals.",
    type: "barter",
    product_provided: true,
    barter_product: [
      { name: "4-Week Meal Box", description: "Weekly meal deliveries", price: 200, quantity: 4, image_urls: [] },
    ],
    price: {
      type: "fixed",
      fixed_price: 0,
      min_price: 0,
      max_price: 0,
    },
    status: "active",
    duration: "28 days",
    start_date: "2024-02-05",
    end_date: "2024-03-04",
    location: "United States",
    platform: ["instagram", "youtube", "tiktok"],
    deliverables: [
      { type: "short-video", count: 4 },
      { type: "story", count: 8 },
    ],
    requirements: ["Food/cooking content", "Kitchen setup", "Family-friendly content"],
    category: ["Food", "Lifestyle", "Health"],
    media_assets: [],
    applicants_count: 678,
    age_start: 25,
    age_end: 45,
    gender: "any",
    min_number_of_followers: 20000,
    is_reviewed: true,
    createdAt: "2024-01-22",
  },
  {
    campaign_id: "camp_006",
    brandId: "brand_006",
    brandName: "Lululemon",
    brandImage: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop",
    title: "Yoga & Wellness Journey",
    description: "Share your wellness journey wearing Lululemon. Focus on mindfulness, yoga, and overall well-being content.",
    type: "paid",
    product_provided: true,
    barter_product: [],
    price: {
      type: "range",
      fixed_price: 0,
      min_price: 3000,
      max_price: 8000,
    },
    status: "active",
    duration: "21 days",
    start_date: "2024-02-12",
    end_date: "2024-03-04",
    location: "Canada",
    platform: ["instagram", "youtube"],
    deliverables: [
      { type: "long-video", count: 1 },
      { type: "image", count: 5 },
      { type: "story", count: 3 },
    ],
    requirements: ["Yoga/fitness instructor", "Wellness content creator", "High-quality visuals"],
    category: ["Fitness", "Wellness", "Lifestyle"],
    media_assets: [],
    applicants_count: 189,
    age_start: 22,
    age_end: 38,
    gender: "female",
    min_number_of_followers: 75000,
    is_reviewed: true,
    createdAt: "2024-01-28",
  },
  {
    campaign_id: "camp_007",
    brandId: "brand_007",
    brandName: "Samsung",
    brandImage: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop",
    title: "Galaxy S24 Unboxing & Review",
    description: "Create an authentic unboxing and review of the new Galaxy S24. Highlight camera features and daily usage scenarios.",
    type: "paid",
    product_provided: true,
    barter_product: [],
    price: {
      type: "fixed",
      fixed_price: 10000,
      min_price: 0,
      max_price: 0,
    },
    status: "active",
    duration: "14 days",
    start_date: "2024-02-20",
    end_date: "2024-03-05",
    location: "Worldwide",
    platform: ["youtube", "tiktok", "instagram"],
    deliverables: [
      { type: "long-video", count: 1 },
      { type: "short-video", count: 3 },
    ],
    requirements: ["Tech reviewer", "High production value", "Unbiased review style"],
    category: ["Tech", "Gadgets", "Reviews"],
    media_assets: [],
    applicants_count: 1234,
    age_start: 18,
    age_end: 45,
    gender: "any",
    min_number_of_followers: 200000,
    is_reviewed: true,
    createdAt: "2024-02-01",
  },
  {
    campaign_id: "camp_008",
    brandId: "brand_008",
    brandName: "Airbnb",
    brandImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=100&h=100&fit=crop",
    title: "Unique Stays Experience",
    description: "Document your stay at a unique Airbnb property. Capture the experience, local attractions, and travel tips.",
    type: "barter",
    product_provided: false,
    barter_product: [
      { name: "3-Night Stay Credit", description: "Credit for unique property", price: 1500, quantity: 1, image_urls: [] },
    ],
    price: {
      type: "fixed",
      fixed_price: 0,
      min_price: 0,
      max_price: 0,
    },
    status: "paused",
    duration: "30 days",
    start_date: "2024-03-01",
    end_date: "2024-03-31",
    location: "Europe",
    platform: ["instagram", "tiktok", "youtube"],
    deliverables: [
      { type: "short-video", count: 5 },
      { type: "image", count: 10 },
      { type: "story", count: 15 },
    ],
    requirements: ["Travel content creator", "Aesthetic visuals", "Storytelling ability"],
    category: ["Travel", "Lifestyle", "Adventure"],
    media_assets: [],
    applicants_count: 456,
    age_start: 21,
    age_end: 40,
    gender: "any",
    min_number_of_followers: 50000,
    is_reviewed: false,
    createdAt: "2024-02-05",
  },
];

export const categories = [
  "Sports",
  "Fitness",
  "Beauty",
  "Skincare",
  "Lifestyle",
  "Music",
  "Entertainment",
  "Design",
  "Tech",
  "Education",
  "Food",
  "Health",
  "Wellness",
  "Gadgets",
  "Reviews",
  "Travel",
  "Adventure",
];

export const platforms = ["instagram", "tiktok", "youtube", "facebook"] as const;
export const campaignTypes = ["paid", "barter", "barter-commission"] as const;
export const statusOptions = ["active", "pending", "paused", "completed"] as const;
