'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import TokenProvider from "@/components/token-provider";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/CreatorContext";

import NotificationListener from "@/components/NotificationListener";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import Navbar from "@/app/Navbar";
import SplitNav from "./SplitNav";


export const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {


  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <TokenProvider />
            <SplitNav>
              {children}
            </SplitNav>
            <NotificationListener />
            <Toaster />
          </UserProvider>
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}