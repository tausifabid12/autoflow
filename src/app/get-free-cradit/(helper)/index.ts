import { ServiceAPI } from "@/lib/service.api";



export const applyForFreeCredit = async ({data}: {data: any}) => {
  try {
    const response = await ServiceAPI.post("auth/create-free-credit-application", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};