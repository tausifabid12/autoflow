import { ServiceAPI } from "@/lib/service.api";

export interface IUser {
  _id?: string;
  user_id?: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: number;
  email: string;
  password?: string;
  role: "admin" | "brand" | "creator";
  industry?: string[];
  profile_pic?: string;
  profilePicture?: string;
  googleId?: string;
  authProvider: "local" | "google" | "facebook" | "instagram";
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  // Instagram profile data
  instagram_profile_id?: string;
  instagram_profile_name?: string;
  instagram_profile_picture?: string;
  instagram_access_token?: string;

  // Facebook profile data
  facebook_profile_id?: string;
  facebook_profile_name?: string;
  facebook_profile_picture?: string;
  facebook_access_token?: string;

  gstNumber?: string;
  panCard?: string;
  founderName?: string;

  slug?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfileResponse {
  success: boolean;
  data: IUser;
}



export const getUserProfile = async ({user_id}: {user_id: string}) : Promise<IProfileResponse> => {
  try {
    const response = await ServiceAPI.get(`auth/profile?user_id=${user_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateProfile = async ({data}: {data: any}) => {
  try {
    const response = await ServiceAPI.put("auth/update", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};