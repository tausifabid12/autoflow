import { ServiceAPI } from "@/lib/service.api";
import { ICampaignApplication } from "../../chat/(helper)";




export interface IDashboardStats {
     success: boolean,
     data: {
        totalApplications: number,
      totalCampaigns: number,
      totalActiveCampaigns: number,
      totalInactiveCampaigns: number,
      totalPendingCampaigns: number,
      last5Transactions: any,
      last5Applications: ICampaignApplication[],
     }
}




export const getDashboardStats = async (brandId: string): Promise<IDashboardStats> => {
  try {
    const response = await ServiceAPI.get(`brand/dashboard?brandId=${brandId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};