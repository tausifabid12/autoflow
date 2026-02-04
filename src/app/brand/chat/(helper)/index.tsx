import { ICampaign } from "@/app/dashboard/jobs/(helper)/helper";
import { ServiceAPI } from "@/lib/service.api";

export interface IPreviousWork {
  postType?: string
  postUrl?: string
  id?: string
}

export type ApplicationStatus = 'applied' | 'selected' | 'rejected'

export interface ICampaignApplication {
  _id: string
  application_id: string
  campaign_id: string
  creator_id: string
  creator_name: string
  creator_profile_pic?: string
  creator_followers?: number
  creator_slug?: string
  creator_engagement_rate?: number
  brand_id: string
  brand_name: string
  brand_profile_pic?: string
  pitch: string
  status: ApplicationStatus
  previous_work: IPreviousWork[]
  applied_at: Date
  campaignData: ICampaign
  creator_location?: string
  creator_unseen_message_count?: number
  brand_unseen_message_count?: number
}

export interface ICampaignApplicationResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: ICampaignApplication[];
}

export interface ICampaignSingleResponse {
  success: boolean;
  data: ICampaignApplication;
}


export interface IReview {
  _id?: string;
  creator_id: string;
  creator_name: string;
  campaign_id: string;
  campaign_name: string;
  review: string;
  rating: number;
  brand_id: string;
  brand_name: string;
  brand_logo: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface IChat {
  chat_id?: string;
  campaign_id: string;
  application_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  amount_proposed?: number | null;
  is_amount_accepted?: boolean;
  is_payment_message?: boolean;
  is_payment_completed?: boolean;
  created_at?: Date;
  is_task_message?: boolean;
  task_completed_status?: 'requested' | 'completed' | 'rejected';
}

export interface IChatResponse {
  success: boolean;
  data: IChat[];
}


export const getCampaignsApplication = async (brandId: string,  limit:number, page: number, status?: 'applied' | 'selected' | 'rejected' | null, campaignId?: string ): Promise<ICampaignApplicationResponse> => {
  try {
const query = new URLSearchParams({
  brandId,
  page: String(page),
  limit: String(limit),
});

if (status) query.append("status", status);
if (campaignId) query.append("campaign_id", campaignId);

const response = await ServiceAPI.get(`brand/applications/my?${query.toString()}`);
    return response.data as ICampaignApplicationResponse;
  } catch (error) {
    return { success: false, total: 0, page: 0, totalPages: 0, data: [] };
  }
};


export const updateCampaignsApplication = async ({applicationId, status}: {applicationId: string, status: ApplicationStatus}) => {
  try {
    const response = await ServiceAPI.put(`brand/applications/update`, { applicationId, status });
    return response.data as ICampaignApplicationResponse;
  } catch (error) {
    return { success: false };
  }
};

export const getMessages = async (applicationId: string): Promise<IChatResponse> => {
  try {
    const response = await ServiceAPI.get(`creator/chat/history/${applicationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const sendMessage = async ({data}: {data: any}) => {
  try {
    const response = await ServiceAPI.post("creator/chat/send", {
      ...data,
      userType: "brand"
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProposalMessage = async ({data}: {data: any}) => {
  try {
    const response = await ServiceAPI.post("creator/chat/update-message", data);
    return response.data;
  } catch (error) {
    throw error;
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


export const addReview = async ({data}: {data: IReview}) => {
  try {
    const response = await ServiceAPI.post("brand/review/create", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};