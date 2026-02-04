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
  brand_id: string
  brand_name: string
  brand_profile_pic?: string
  pitch: string
  status: ApplicationStatus
  previous_work: IPreviousWork[]
  applied_at: Date
  campaignData: ICampaign
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
}

export interface IChatResponse {
  success: boolean;
  data: IChat[];
}


export const getCampaignsApplication = async (brandId: string,  limit:number, page: number): Promise<ICampaignApplicationResponse> => {
  try {
    const response = await ServiceAPI.get(`brand/applications/my?brandId=${brandId}&page=${page}&limit=${limit}`);
    return response.data as ICampaignApplicationResponse;
  } catch (error) {
    return { success: false, total: 0, page: 0, totalPages: 0, data: [] };
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
    const response = await ServiceAPI.post("creator/chat/send", data);
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