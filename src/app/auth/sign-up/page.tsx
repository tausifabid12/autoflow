
import React from 'react'
import Main from './(componets)/Main'

export const metadata = {
  title: "Sign Up - InfluencerHub",
  description: "Create your InfluencerHub account and start collaborating with top brands. Turn your content into income and grow your reach.",
  keywords: "sign up, influencer account, create profile, influencer platform, social media collaborations",
  openGraph: {
    title: "Sign Up - InfluencerHub",
    description: "Create your account and start collaborating with top brands.",
    url: "https://getcreator.online/auth/sign-up",
    siteName: "InfluencerHub",
    images: [
      {
        url: "https://getcreator.online/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sign Up InfluencerHub"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up - InfluencerHub",
    description: "Create your account and start collaborating with top brands.",
    images: ["https://getcreator.online/assets/og-image.png"],
    site: "@getcreatoronline"
  }
};



export default function page() {
  return (
    <Main />
  )
}
