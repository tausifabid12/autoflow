'use client'

import { useSocket } from '@/hooks/useSocket';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Context type
interface NotificationContextType {
  refetchNotifications: boolean;
  refetchChat: boolean;

}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [refetchNotifications, setRefetchNotifications] = useState(false);
  const [refetchChat, setRefetchChat] = useState(false);
 const {data: session, status} = useSession();

const socket = useSocket(status === "authenticated" ? session.user.id : undefined);
const [notifications, setNotifications] = useState<any[]>([]);

const path = usePathname();

console.log("path =====================", path)

  

useEffect(() => {
  if (!socket) return;

  const handleNotification = (data: any) => {
    console.log("📩 Received notification:", data);

    if (data.type === "notification") {
      // Update notifications state, no push
      setNotifications((prev) => [data, ...prev]);
      setRefetchNotifications((prev) => !prev);
    const notification = new Notification(data.title, { body: data.message });
    if(data.redirect_url){
   notification.onclick = () => {
      window.open(data.redirect_url); // opens in new tab
      notification.close();
    };
    }
    }

    if (data.type === "message") {
      // Always update chat state
      setRefetchChat((prev) => !prev);

      // Update notifications state if you want, but NO push notification
      if (!path.startsWith("/brand/chat") && !path.startsWith("/influencer/chat")) {
        setNotifications((prev) => [data, ...prev]);
        new Notification(data.title, { body: data.message });
        // No new Notification() here → no push
      }
    }
  };

  socket.on("receiveNotification", handleNotification);

  return () => {
    socket.off("receiveNotification", handleNotification);
  };
}, [socket, path, refetchChat, refetchNotifications]);





  return (
    <NotificationContext.Provider
      value={{
        refetchNotifications,
        refetchChat,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Hook for easy usage
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
