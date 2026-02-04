import { ServiceAPI } from "@/lib/service.api";



export interface IUserSubscription {
  _id?: string;
  user_id: string;
  name: string;
  total_number_of_applications: number;
  expire_date: Date;
  price: number;
  status: 'active' | 'inactive' | 'pending' | 'expired';
  number_of_applications_used?: number;
  created_at?: Date;
}


export interface IUserSubscriptionResponse {
  success: boolean;
  data: IUserSubscription;
}



export const getUserSubscription = async (userId: string): Promise<IUserSubscriptionResponse> => {
  try {
    const response = await ServiceAPI.get(`creator/subscription?user_id=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};





