import { ServiceAPI } from "@/lib/service.api";

export interface IBarterProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_urls: string[];
}

export interface ICampaign {
  _id?: string;
  campaign_id: string;
  brandId: string;
    brandName: String,
    brandImage: String,
  title?: string;
  description: string;
  type: "paid" | "barter" | "barter-commission";
  product_provided: boolean;
  barter_product?: IBarterProduct[];
  reference_video_url?: string;
     price: {
    type: 'fixed' | 'range';
    fixed_price: number;
    min_price: number;
    max_price: number;
  };
  status: "pending" | "approved" | "rejected" | "active" | "completed";
  duration?: string;
  start_date?: Date | null;
  end_date?: Date | null;
  location?: string;
  platform: string[]
  deliverables?: {
    type: "long-video" | "short-video" | "image" | "text" |  'story'
    count: number
    
  }[];
  requirements?: string[];
  category?: string[] | null;
  media_assets: string[];
  applicants_count: number;
  createdAt: Date;
  updatedAt: Date;
  applicants_ids: string[];
}

export interface FilterState {
  platforms: string[];       // multiple platforms
  categories: string[];        // multiple categories
  locations: string[];         // multiple locations
  type?: "paid" | "barter" | "barter-commission";
  status?: "pending" | "approved" | "rejected" | "active" | "completed";
  priceRange: [number, number];
  startDate?: string;
  endDate?: string;
  duration?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  brandId?:string
  creatorId?:string | null
}

export interface CampaignFilters {
  status?: string;
  platform?: string;
  type?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface ICampaignResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: ICampaign[];
}

export interface ICampaignSingleResponse {
  success: boolean;
  data: ICampaign;
}

export const createCampaign = async (campaign: ICampaign) => {
  try {
    const response = await ServiceAPI.post("brand/campaigns/create", campaign);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCampaigns = async (filters: FilterState): Promise<ICampaignResponse> => {
  try {
    const params = new URLSearchParams();

    if (filters.platforms?.length) params.append('platform', filters.platforms.join(','));
    if (filters.categories?.length) params.append('category', filters.categories.join(','));
    if (filters.locations?.length) params.append('location', filters.locations.join(','));
    if (filters.type) params.append('type', filters.type);
    if (filters.duration) params.append('duration', filters.duration);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.search) params.append('search', filters.search);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.brandId) params.append('brandId', filters.brandId);
    if (filters.creatorId) params.append('creatorId', filters.creatorId);
    if (filters.priceRange) {
      params.append('minPrice', filters.priceRange[0].toString());
      params.append('maxPrice', filters.priceRange[1].toString());
    }

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await ServiceAPI.get(`brand/campaigns/list?${params.toString()}`);
    return response.data as ICampaignResponse;
  } catch (error) {
    return { success: false, total: 0, page: 0, totalPages: 0, data: [] };
  }
};



export const getSingleCampaign = async (campaignId: string) : Promise<ICampaignSingleResponse> => {
  try {
    const response = await ServiceAPI.get(`brand/campaigns/${campaignId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const applyForCampaign = async ({data}: {data: any}) => {
  try {
    const response = await ServiceAPI.post("creator/campaigns/apply", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};