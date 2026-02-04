import React from 'react'
import Main from './(componets)/Main'
export const metadata = {
  title: "Login - InfluencerHub",
  description: "Access your InfluencerHub account to manage campaigns, track collaborations, and grow your influence on top platforms.",
  keywords: "login, influencer dashboard, influencer platform, social media management, campaigns",
  openGraph: {
    title: "Login - InfluencerHub",
    description: "Access your account to manage campaigns and collaborations.",
    url: "https://getcreator.online/signin",
    siteName: "InfluencerHub",
    images: [
      {
        url: "https://getcreator.online/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Login InfluencerHub"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Login - InfluencerHub",
    description: "Access your account to manage campaigns and collaborations.",
    images: ["https://getcreator.online/assets/og-image.png"],
    site: "@getcreatoronline"
  }
};


export default function page() {
  return (
    <Main/>
  )
}
