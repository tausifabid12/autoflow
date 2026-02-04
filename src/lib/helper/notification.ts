import { ICampaign } from "@/app/dashboard/jobs/(helper)/helper";
import { ServiceAPI } from "@/lib/service.api";
// types/Notification.ts

export interface INotification {
  user_id: string;
  notification_title: string;
  notification_description: string;
  notification_image_url: string;
  notification_type: 'redirect' | 'message';
  notification_redirect_url: string;
}


export interface INotificationResponse {
  success: boolean;
  data: INotification[];
}


export const getNotifications = async (userID: string): Promise<INotificationResponse> => {
  try {
    const response = await ServiceAPI.get(`notifications?user_id=${userID}`);
    return response.data as INotificationResponse;
  } catch (error) {
    return { success: false, data: [] };
  }
};


export const deleteNotification = async (id: string     ): Promise<INotificationResponse> => {
  try {
    const response = await ServiceAPI.delete(`notifications/${id}`);
    return response.data as INotificationResponse;
  } catch (error) {
    return { success: false, data: [] };
  }
};


export const deleteAllNotification = async (id: string): Promise<INotificationResponse> => {
  try {
    const response = await ServiceAPI.delete(`notifications/user/${id}`);
    return response.data as INotificationResponse;
  } catch (error) {
    return { success: false, data: [] };
  }
};

