import { Metadata } from 'next';
import Main from './Main'

export const metadata: Metadata = {
  title: "Find Verified Influencers for Your Brand | GetCreator.online",
  description: "Launch successful influencer campaigns with verified creators. Connect brands and influencers, track performance, and grow your reach on GetCreator.online.",
  keywords: [
    "influencer marketing",
    "verified influencers",
    "brand campaigns",
    "creator platform",
    "brand partnerships",
    "influencer analytics",
    "GetCreator",
    "campaign management",
    "social media marketing",
    "influencer collaboration"
  ],
  authors: [{ name: "GetCreator.online" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Find Verified Influencers for Your Brand | GetCreator.online",
    description: "Connect with verified creators, launch campaigns, and track results with GetCreator.online — the trusted influencer marketing platform.",
    url: "https://getcreator.online/",
    siteName: "GetCreator.online",
    type: "website",
    images: [
      {
        url: "https://getcreator.online/assets/og-image.png",
        alt: "GetCreator - Verified Influencer Marketing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Verified Influencers for Your Brand | GetCreator.online",
    description: "Join thousands of brands connecting with verified creators. Track campaign performance and grow your reach.",
    images: ["https://getcreator.online/assets/og-image.png"],
    site: "@GetCreatorOnline",
    creator: "@GetCreatorOnline",
  },
};


export default function page() {
  return (
    <Main />
  )
}
