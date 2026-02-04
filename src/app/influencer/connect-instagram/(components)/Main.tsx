'use client'

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from '@/components/providers';
import Loading from "@/components/shared/Loading";
import { updateProfile } from "../../profile/(helper)";
import { encrypt } from "@/lib/decryptAndencrypt";
import { useUser } from "@/context/CreatorContext";



interface AdAccount {
    id: string;
    account_id: string;
}




export default function Main() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    //   const { loading: updating, mutate } = useMutation();
    //   const { loading: userUpdate, mutate: updateUser } = useMutation();
    const { data: session, update, status } = useSession();
    const router = useRouter();
    const { refetchProfile } = useUser();

    const {
        mutate: updateProfileData,
        isPending,
    } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
               router.push('/influencer/profile')
            toast.success('Instagram Profile Connected Successfully')
            refetchProfile()
         
        },
    });



    const appId = process.env.NEXT_PUBLIC_META_INSTAGRAM_APP_ID || ''
    const appSecret = process.env.NEXT_PUBLIC_META_INSTAGRAM_APP_SECRET || ''
    const redirectUri = process.env.NEXT_PUBLIC_META_INSTAGRAM_LOGIN_WITH_INSTAGRAM_REDIRECT_URI || ''

    const facebookLogin = () => {

        const loginUrl='https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=3311587875649669&redirect_uri=https://getcreator.online/influencer/connect-instagram&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights'
        window.location.href = loginUrl;
    };

    async function getAccessToken(code: string) {
        setLoading(true);

        const response = await fetch('/api/instagram/get-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        })

        console.log(response, "===========  |||||||||||||||  -----------")

        const data = await response.json()
        if (data?.access_token) {
            await getUserData(data?.access_token)
        }
        // } catch (error) {
        //   console.log(error);
        //   setError("Error occurred while getting access token");
        // }
        setLoading(false);
    }




    const fetchAdAccounts = async (access_token: string): Promise<AdAccount[]> => {
        const res = await fetch('/api/ad-manager/meta/ad-accounts', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const data = await res.json();
        return data.data || [];
    };

    async function getUserData(access_token: string) {
        try {
            const url = `https://graph.instagram.com/me?fields=id,user_id,username,profile_picture_url,account_type,media_count&access_token=${access_token}`;
            const response = await fetch(url);
            const data = await response.json();
            const longLivedToken = await getLongLivedToken(access_token);


            await subscribeInstagramWebhooks(data?.id, longLivedToken)

            let accountData = {
                user_id: session?.user?.id,
                instagram_profile_id: data?.user_id,
                instagram_profile_name: data?.username,
                instagram_profile_image: data?.profile_picture_url,
                instagram_access_token: encrypt(longLivedToken) ,
            };

            updateProfileData({ data: accountData })


        } catch (error) {
            console.log(error);
            setError("Error occurred while fetching user data");
        }
    }


    async function getLongLivedToken(access_token: string) {
        try {
            const url = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${appSecret}&access_token=${access_token}`;
            const response = await fetch(url);
            const data = await response.json();
            return data?.access_token;
        } catch (error) {
            console.log(error);
            setError("Error occurred while getting long-lived token");
        }
    }


    async function subscribeInstagramWebhooks(userId: string, accessToken: string) {
        const baseUrl = `https://graph.instagram.com/v23.0/${userId}/subscribed_apps`;

        const subscribedFields = 'comments,messages'; // You can modify this as needed

        const url = `${baseUrl}?subscribed_fields=${encodeURIComponent(subscribedFields)}&access_token=${encodeURIComponent(accessToken)}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Subscription failed');
            }

            console.log('✅ Webhook subscription successful:', data);
            return data;
        } catch (error: any) {
            console.error('❌ Webhook subscription failed:', error.message);
            throw error;
        }
    }


    useEffect(() => {
        if (code && status === "authenticated") {
            getAccessToken(code as string);
        }
    }, [code, status]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background relative">
            <Card className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
                <div className="w-full p-8 h-full flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Connect Facebook</h2>
                        <p className="text-muted-foreground mt-2 text-sm mb-8">
                            Use your Facebook account to connect to Pinggo.
                        </p>
                        {error && <p className="text-red-500 text-sm my-2">{error}</p>}
                        <Button
                            onClick={facebookLogin}
                            className="mt-4 w-full flex items-center text-white  justify-center h-12 gap-2 gradient-bg  transition-all duration-500 hover:scale-105"
                        >
                            <FaFacebook className="h-5 w-5" /> Connect With Instagram
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">
                            Log in with Facebook and set your permissions. Once that’s done, you’re all set to
                            connect to Pinggo!
                        </p>
                    </div>
                    <div className="mt-6 flex flex-col">
                        <p className="text-xs mt-2 text-muted-foreground">
                            Pinggo has been certified by Meta as an official Tech Provider.
                        </p>
                    </div>
                </div>
                <div className="w-full bg-gray-100 flex items-center justify-center">
                    <img
                        src="/assets/connect-instagram.jpg"
                        alt="Instagram Promo"
                        className="rounded-lg w-full h-full object-fill"
                    />
                </div>
            </Card>
        </div>
    );
}