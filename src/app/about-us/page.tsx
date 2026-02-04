import React from 'react'
import Main from './Main'
export const metadata = {
  title: "About Us - GetCreator",
  description: "Learn about GetCreator — connecting brands with authentic influencers. Discover our mission, values, and how we empower creators to grow and brands to thrive.",
  keywords: "about GetCreator, influencer marketing, brand collaborations, mission, values, team, influencer platform",
  openGraph: {
    title: "About Us - GetCreator",
    description: "Connecting brands with authentic influencers. Discover our mission, values, and team.",
    url: "https://getcreator.online/about-us",
    siteName: "GetCreator",
    images: [
      {
        url: "https://getcreator.online/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "About GetCreator"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Get",
    description: "Connecting brands with authentic influencers. Discover our mission, values, and team.",
    images: ["https://getcreator.online/assets/og-image.png"],
    site: "@YourTwitterHandle"
  }
};



export default function page() {
  return (
    <Main/>
  )
}
