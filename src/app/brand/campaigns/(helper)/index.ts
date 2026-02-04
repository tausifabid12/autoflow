import { ICampaign } from "@/app/dashboard/jobs/(helper)/helper";
import { ServiceAPI } from "@/lib/service.api";





export const updateCampaign = async ({campaign, id}: {campaign: ICampaign, id: string}): Promise<ICampaign> => {
  try {
    console.log(id, "========================= oid ================");
    const response = await ServiceAPI.put(`brand/campaigns/update/${id}`, campaign);
    return response.data;
  } catch (error) {
    throw error;
  }
};
