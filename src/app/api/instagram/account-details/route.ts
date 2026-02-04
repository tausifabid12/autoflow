// app/api/instagram/account-insights/route.ts
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/decryptAndencrypt";

export async function POST(req: NextRequest) {

  const body = await req.json();

  const {
    instagramAccountId,
    accessToken,
    website
  } = body;


  const decryptedAccessToken = decrypt(accessToken)



  const fields = [
  "followers_count",
  "follows_count",
  "id",
  "media_count",
  "name",
  "profile_picture_url",
  "username",
  "website",
  "account_type",
  "biography",
  ].join(",");



  let url = ''

  if (website === 'facebook') {
    url = `https://graph.facebook.com/v23.0/${instagramAccountId}?fields=${fields}&access_token=${decryptedAccessToken}`;
  }

  if (website === 'instagram') {
    url = `https://graph.instagram.com/v23.0/${instagramAccountId}?fields=${fields}&access_token=${decryptedAccessToken}`
  }




  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to fetch IG user data: ${response.status} - ${errorBody}`);
    }
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
