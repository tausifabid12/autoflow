import { ServiceAPI } from "@/lib/service.api";


export interface IWallet {
  _id?: string; // Mongoose automatically assigns this
  wallet_id: string;
  creator_id: string;
  pending_balance: number;
  withdrawable_balance: number;
  balance_withdrawn: number;
  transaction_history: Array<Record<string, any>>; // or define a detailed transaction interface
  updated_at: Date;
}

export interface IWithdrawRequest {
  _id?: string; // MongoDB document ID
  wallet_id: string;
  creator_id: string;
  creator_name: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  bank_name: string;
  bank_account_number: string;
  bank_ifsc_code: string;
  bank_branch: string;
  bank_account_holder_name: string;
  updated_at: Date;
}



export interface IWalletResponse{
    success: boolean;
    message: string;
    data: IWallet;
}

export interface IWithdrawRequestResponse {
    success: boolean;
    message: string;
    data: IWithdrawRequest[];
}



export const getWallet = async (creatorId: string): Promise<IWalletResponse> => {
  try {
    const response = await ServiceAPI.get(`creator/wallet?creatorId=${creatorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWithdrawRequest = async (creatorId: string): Promise<IWithdrawRequestResponse> => {
  try {
    const response = await ServiceAPI.get(`creator/withdraw-requests?creatorId=${creatorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const withdraw = async (data: any): Promise<IWalletResponse> => {
  try {
    const response = await ServiceAPI.post(`creator/withdraw`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


