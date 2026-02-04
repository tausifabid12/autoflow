import { ServiceAPI } from "@/lib/service.api";
import { ICampaignApplication } from "../../chat/(helper)";



export interface IGetDashboardDataResponse {
  success: boolean;
  data?: {
    totalApplication: number;
    totalAccepted: number;
    totalRejected: number;
    last5Applications: ICampaignApplication[];
    instagramProfileId?: string;
    instagramProfileName?: string;
    instagramProfilePicture?: string;
    userName: string;
    userPhone: string;
    userProfilePicture?: string;
  };
  message?: string;
}





export const getDashboardStats = async (creatorId: string): Promise<IGetDashboardDataResponse> => {
  try {
    const response = await ServiceAPI.get(`creator/dashboard?creatorId=${creatorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};