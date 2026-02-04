"use client";

import { IUser } from "@/app/auth/sign-up/(helper)";
import { getUserProfile, IProfileResponse } from "@/app/brand/profile/(helper)";
import { getUserSubscription, IUserSubscriptionResponse } from "@/app/pricing/(helper)";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// -------------------------
// Interfaces
// -------------------------
interface ISubscription {
  _id?: string;
  status: "active" | "inactive" | "pending" | "expired";
  plan?: string;
  expire_date?: string;
}

interface IInstagramData {
  id: string;
  name: string;
  picture: string;
  accessToken: string;
  brandName: string;
  brandId: string;
  brandImage: string;
}

interface IUserContext {
  userSubscription: ISubscription | null;
  instagramData: IUser | null;
  loading: boolean;
  refetchSubscription: () => void;
  refetchProfile: () => void;

}

const UserContext = createContext<IUserContext | undefined>(undefined);

// -------------------------
// Provider
// -------------------------
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status: sessionStatus } = useSession();


  // -------------------------
  // Fetch subscription data
  // -------------------------
const { data: subscriptionRes, isFetching: subLoading, refetch: refetchSubscription } = useQuery<IUserSubscriptionResponse>({
  queryKey: ["user-subscription", session?.user?.id],
  queryFn: () => getUserSubscription(session!.user!.id),
  enabled: !!session?.user?.id,
});

const { data: profileRes, isFetching: profileLoading, refetch: refetchProfile } = useQuery<IProfileResponse>({
  queryKey: ["user-profile", session?.user?.id],
  queryFn: () => getUserProfile({ user_id: session!.user!.id }),
  enabled: !!session?.user?.id,
});



  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);


  return (
    <UserContext.Provider
      value={{
        userSubscription : subscriptionRes?.data as any || null,
        instagramData : profileRes?.data as any || null,
        loading : sessionStatus === "loading" || subLoading || profileLoading,
        refetchSubscription,
        refetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// -------------------------
// Hook
// -------------------------
export const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
