import React, { Suspense } from 'react'
import Main from './Main'
import Loading from '@/components/shared/Loading'



// app/influencer/pricing/metadata.ts
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Plan | Get Creator - Unlock Unlimited Opportunities",
  description: "Upgrade to Get Creator Premium Plan and unlock unlimited influencer applications, advanced analytics, premium visibility, and priority support for your campaigns.",
  keywords: [
    "Get Creator Premium",
    "influencer marketing",
    "creator platform",
    "premium plan",
    "brand collaboration",
    "campaign management",
    "influencer applications",
    "advanced analytics",
    "priority support"
  ],
  authors: [{ name: "Get Creator" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Get Creator Premium Plan - Unlock Unlimited Opportunities",
    description: "Upgrade to Get Creator Premium and gain unlimited applications, advanced analytics, and priority support for your influencer campaigns.",
    url: "https://getcreator.online/influencer/pricing",
    siteName: "Get Creator",
    type: "website",
    images: [
      {
        url: "https://getcreator.online/assets/og-image-pricing.png",
        alt: "Get Creator Premium Plan",
        width: 1200,
        height: 630,
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Creator Premium Plan - Unlock Unlimited Opportunities",
    description: "Unlock unlimited influencer applications, premium visibility, and advanced analytics with Get Creator Premium.",
    images: ["https://getcreator.online/assets/og-image-pricing.png"],
    site: "@getcreatoronline",
    creator: "@getcreatoronline",
  },
};




export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <Main />
    </Suspense>
  )
}
