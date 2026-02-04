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


export interface Transaction {
  _id: string;
  transaction_id: string;
  phonepe_order_id?: string | null;
  type: "payment" | "subscription" | "refund";
  amount: number;
  status: "pending" | "completed" | "failed" | "refunded";
  campaign_id?: string | null;
  campaign_name?: string | null;
  user_id?: string | null;
  user_name?: string | null;
  created_at: string;
}

export interface FetchTransactionsOptions {
  page?: number;
  limit?: number;
  status?: "pending" | "completed" | "failed" | "refunded";
  type?: "payment" | "subscription" | "refund";
  user_id?: string;
  campaign_id?: string;
  sort?: string;
}

export interface FetchTransactionsResponse {
  success: boolean;
  page: number;
  totalPages: number;
  totalRecords: number;
  count: number;
  data: Transaction[];
}

export async function getTransactions(
  options: FetchTransactionsOptions = {}
): Promise<FetchTransactionsResponse> {
  const {
    page = 1,
    limit = 10,
    status,
    type,
    user_id,
    campaign_id,
    sort = "-created_at",
  } = options;

  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));
  if (status) params.append("status", status);
  if (type) params.append("type", type);
  if (user_id) params.append("user_id", user_id);
  if (campaign_id) params.append("campaign_id", campaign_id);
  if (sort) params.append("sort", sort);

  try {
    const response = await ServiceAPI.get(`transactions/list?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}
