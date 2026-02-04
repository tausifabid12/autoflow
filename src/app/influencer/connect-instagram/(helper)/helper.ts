// lib/instagram.login.ts

import { ServiceAPI } from "@/lib/service.api";
import { toast } from "sonner";

export interface InstagramAccount {
    pageId: string;
    pageName: string;
    igId: string;
    username: string;
    followers_count: number;
    media_count: number;
    profile_picture_url: string;
}

const APP_ID = "1030510835405610";
const APP_SECRET = "aeddf50c8fda2656b67fd03b201bd0de";
const REDIRECT_URI = "https://social.pinggo.in/instagram/connect-with-instagram";

// 1. Redirect User to Login
export const instagramBusinessLogin = () => {
    const scope = [
        "pages_show_list",
        "instagram_basic",
        "instagram_manage_insights",
        "instagram_manage_comments",
        "pages_read_engagement"
    ].join(",");

    const loginUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&response_type=code&scope=${scope}`;

    window.location.href = loginUrl;
};

// 2. Exchange Code for Token
export async function getAccessToken(
    code: string,
    vendorId: string,
    setLoading: (val: boolean) => void,
    router: any
) {
    const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${APP_SECRET}&code=${code}`;

    try {
        setLoading(true);
        const res = await fetch(tokenUrl);
        const data = await res.json();

        if (data?.access_token) {
            await handleGetAndSaveInstagramData(data.access_token, vendorId, router);
        } else {
            toast.error("Access token not received");
        }
    } catch (error) {
        console.error("Error getting access token:", error);
        toast.error("Error getting access token");
    } finally {
        setLoading(false);
    }
}

// 3. Get Pages, IG Business ID, Profile & Save
export async function handleGetAndSaveInstagramData(access_token: string, vendorId: string, router: any) {
    const pagesUrl = `https://graph.facebook.com/v18.0/me/accounts?access_token=${access_token}`;
    const pagesRes = await fetch(pagesUrl);
    const pagesData = await pagesRes.json();

    const pages = pagesData.data;
    if (!pages?.length) throw new Error("No connected pages found");

    const instagramAccounts: InstagramAccount[] = [];

    for (const page of pages) {
        const pageId = page.id;
        const pageAccessToken = page.access_token;

        const igAccountUrl = `https://graph.facebook.com/v18.0/${pageId}?fields=instagram_business_account,name&access_token=${pageAccessToken}`;
        const igAccountRes = await fetch(igAccountUrl);
        const igData = await igAccountRes.json();

        if (igData.instagram_business_account) {
            const igId = igData.instagram_business_account.id;

            const igProfileUrl = `https://graph.facebook.com/v18.0/${igId}?fields=username,followers_count,media_count,profile_picture_url&access_token=${pageAccessToken}`;
            const igProfileRes = await fetch(igProfileUrl);
            const igProfile = await igProfileRes.json();

            instagramAccounts.push({
                pageId,
                pageName: igData.name,
                igId,
                username: igProfile.username,
                followers_count: igProfile.followers_count,
                media_count: igProfile.media_count,
                profile_picture_url: igProfile.profile_picture_url || "",
            });
        }
    }

    if (!instagramAccounts.length) {
        throw new Error("No Instagram Business Accounts found");
    }

    await updateInstagramBusinessData({ vendorId, accessToken: access_token, instagramAccounts }, router);
}

// 4. Save to Backend
export async function updateInstagramBusinessData(postData: any, router: any) {
    try {
        const res = await ServiceAPI.post("/vendor-instagram-details", postData);
        toast.success("Instagram account connected!");
        router.push("/dashboard");
        return res.data;
    } catch (error) {
        console.error("Error saving IG data:", error);
        toast.error("Failed to save IG data");
    }
}
