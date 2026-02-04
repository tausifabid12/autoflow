import React from 'react'
import Main from './Main'

export const metadata = {
  title: "InfluencerHub - Empower Your Influence",
  description: "Join thousands of creators turning passion into partnerships. Collaborate with top brands, grow your audience, and get paid for your content.",
  keywords: "influencer marketing, creator economy, influencer jobs, brand collaborations, social media influencers, influencer campaigns",
  openGraph: {
    title: "InfluencerHub - Empower Your Influence",
    description: "Join thousands of creators turning passion into partnerships.",
    url: "https://getcreator.online/influencer-hub",
    siteName: "InfluencerHub",
    images: [
      {
        url: "https://getcreator.online/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "InfluencerHub"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "InfluencerHub - Empower Your Influence",
    description: "Join thousands of creators turning passion into partnerships.",
    images: ["https://getcreator.online/assets/og-image.png"],
    site: "@getcreatoronline"
  }
};



export default function page() {
  return (
  <Main />
  )
}
