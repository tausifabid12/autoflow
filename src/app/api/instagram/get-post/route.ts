import { decrypt } from "@/lib/decryptAndencrypt";

export async function POST(request: Request) {
    // Parse the request body
    const body = await request.json();
    const { profileId, access_token, website } = body;

let url = ''

let decryptedAccessToken = decrypt(access_token)

    if(website === 'instagram'){
        url = `https://graph.instagram.com/${profileId}/media?fields=id,like_count,comments_count,owner,username,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${decryptedAccessToken}&limit=30`;
    }

    if(website === 'facebook'){
        url = `https://graph.facebook.com/${profileId}/media?fields=id,like_count,comments_count,owner,username,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${decryptedAccessToken}&limit=30`;
    }




    console.log("url", url)

    const response = await fetch(url, { method: "GET" });



    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error fetching business discovery data: ${errorResponse.error?.message || "Unknown error"}`);
    }

    const responseData = await response.json();


    return new Response(JSON.stringify({ success: true, data: responseData?.data }));
}
