import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import Providers from "@/components/providers";


export const metadata: Metadata = {
  title: "GetCreator.online | Influencer Marketing Platform",
  description: "Connect brands and creators on GetCreator.online — the ultimate influencer marketing platform for collaborations, campaigns, and brand growth.",
  keywords: [
    "influencer marketing",
    "creator platform",
    "brand collaboration",
    "influencer campaigns",
    "brand deals",
    "influencer marketplace",
    "creator marketing",
    "GetCreator",
    "brand partnerships",
    "influencer platform"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}