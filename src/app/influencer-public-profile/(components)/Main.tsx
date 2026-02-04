'use client'
import { getUserProfile, IProfileResponse } from '@/app/influencer/profile/(helper)';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, Instagram, Users, TrendingUp, Star, Award, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useMemo } from 'react';
import { fetchAccountDetails, getInstagramPost, IInstagramAccountDetails, IMedia } from '../(helper)';
import Loading from '@/components/shared/Loading';

// Helper function to calculate engagement rate
const calculateEngagementRate = (media: IMedia[], followerCount: number) => {
    if (!media || media.length === 0 || !followerCount) return 0;

    const totalEngagements = media.reduce((sum, post) => {
        const likes = post.likes?.summary?.total_count || post.like_count || 0;
        const comments = post.comments?.summary?.total_count || post.comments_count || 0;
        const shares = post.shares?.count || 0;
        return sum + likes + comments + shares;
    }, 0);

    const avgEngagement = totalEngagements / media.length;
    const engagementRate = (avgEngagement / followerCount) * 100;

    return parseFloat(engagementRate.toFixed(2));
};

export default function Main() {
    const headerRef = useRef(null);
    const [lightboxImage, setLightboxImage] = useState(null);

    const searchParams = useSearchParams();
    const profileId = searchParams.get('influencer');

    const { isPending, isError, data: user, error, refetch } = useQuery<IProfileResponse>({
        queryKey: ['instagram-bot-replies', profileId],
        queryFn: () => getUserProfile({ user_id: profileId as string }),
        enabled: profileId ? true : false,
    });

    const { isPending: isInstagramPostPending, isError: isInstagramPostError, data: instagramPostData, error: instagramPostError, refetch: instagramPostRefetch } = useQuery<IMedia[]>({
        queryKey: ['instagramPost', user?.data?.instagram_access_token],
        queryFn: () => getInstagramPost(user?.data?.instagram_access_token as string, user?.data?.instagram_profile_id as string, 'instagram'),
        enabled: user?.data?.instagram_access_token ? true : false,
    });

    const { isPending: isInstagramAccountLoading, data: instagramAccountData, } = useQuery<IInstagramAccountDetails>({
        queryKey: ['instagramAccount', user?.data?.instagram_access_token],
        queryFn: () => fetchAccountDetails(user?.data?.instagram_access_token as string, user?.data?.instagram_profile_id as string, 'instagram'),
        enabled: user?.data?.instagram_access_token ? true : false,
    });

    // Calculate engagement rate using actual API data
    const engagementRate = useMemo(() => {
        if (!instagramPostData || !instagramAccountData?.followers_count) return 0;
        return calculateEngagementRate(instagramPostData, instagramAccountData.followers_count);
    }, [instagramPostData, instagramAccountData]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Transform Instagram posts to portfolio format
    const portfolio = useMemo(() => {
        if (!instagramPostData) return [];

        return instagramPostData.map((post) => ({
            id: post.id,
            url: post.media_url || post.full_picture,
            thumbnail: post.thumbnail_url || post.media_url || post.full_picture,
            likes: post.likes?.summary?.total_count || post.like_count || 0,
            comments: post.comments?.summary?.total_count || post.comments_count || 0,
            shares: post.shares?.count || 0,
            permalink: post.permalink,
        }));
    }, [instagramPostData]);

    const navigateLightbox = (direction: any) => {
        if (!lightboxImage || portfolio.length === 0) return;

        //@ts-ignore
        const currentIndex = lightboxImage.index;
        let newIndex;

        if (direction === 'prev') {
            newIndex = currentIndex === 0 ? portfolio.length - 1 : currentIndex - 1;
        } else {
            newIndex = currentIndex === portfolio.length - 1 ? 0 : currentIndex + 1;
        }

        const newItem = portfolio[newIndex];
        //@ts-ignore
        setLightboxImage({ url: newItem.url, index: newIndex });
    };

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (!lightboxImage) return;

            if (e.key === 'Escape') {
                setLightboxImage(null);
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox('prev');
            } else if (e.key === 'ArrowRight') {
                navigateLightbox('next');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxImage]);

    // Format follower count
    const formatFollowerCount = (count: number | undefined) => {
        if (!count) return '0';
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
        return count.toString();
    };

    // Loading state
    if (isPending || isInstagramPostPending || isInstagramAccountLoading) {
        return <Loading/>
    }

    // Error state
    if (isError || !user?.data) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400">Error loading profile</p>
                </div>
            </div>
        );
    }

    const influencer = user?.data;
    const fullName = `${influencer.firstName} ${influencer.lastName}`;

    console.log(influencer, "--------------")

    return (
        <div className="min-h-screen bg-slate-900 p-4 sm:p-6 lg:p-8 pt-28  lg:pt-32">
            <div className="max-w-7xl mx-auto">
                <div ref={headerRef} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-xl mb-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex flex-col sm:flex-row gap-6 items-start flex-1">
                            <div className="relative flex-shrink-0">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900/30 to-indigo-900/30 shadow-2xl ring-4 ring-slate-900/50">
                                    <img
                                        src={instagramAccountData?.profile_picture_url ?`/api/image-proxy?url=${encodeURIComponent(instagramAccountData?.profile_picture_url)}` : user?.data?.profile_pic}
                                        alt={fullName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {influencer.isVerified && (
                                    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center ring-4 ring-slate-800 shadow-lg">
                                        <CheckCircle2 size={22} className="text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="mb-6">
                                    <h1 className="font-bold text-4xl sm:text-5xl mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                        {fullName}
                                    </h1>
                                    {/* <p className="text-xl text-slate-300 mb-4">
                                        @{influencer.username || influencer.instagram_profile_name}
                                    </p> */}
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-amber-900/20 rounded-xl border border-amber-800/30">
                                            <Star size={20} className="text-amber-500 fill-amber-500" />
                                            <span className="font-bold text-lg text-slate-200">{influencer.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full lg:w-auto">
                            <div className="flex-1 lg:flex-initial p-5 bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-2xl border border-blue-800/30 text-center">
                                <Users size={24} className="text-blue-400 mx-auto mb-2" />
                                <p className="font-bold text-2xl text-blue-400">
                                    {formatFollowerCount(instagramAccountData?.followers_count)}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">Followers</p>
                            </div>
                            <div className="flex-1 lg:flex-initial p-5 bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 rounded-2xl border border-emerald-800/30 text-center">
                                <TrendingUp size={24} className="text-emerald-400 mx-auto mb-2" />
                                <p className="font-bold text-2xl text-emerald-400">
                                    {engagementRate}%
                                </p>
                                <p className="text-xs text-slate-400 mt-1">Engagement</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 shadow-lg">
                            <h2 className="font-bold text-2xl mb-5 text-slate-100 flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                About
                            </h2>
                            <p className="text-slate-300 leading-relaxed text-lg mb-6">
                                {influencer.role === 'creator' ? 'Professional content creator' : 'Brand representative'} with expertise in digital marketing and social media engagement.
                            </p>
                            {influencer.industry && influencer.industry.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {influencer.industry.map((category) => (
                                        <span
                                            key={category}
                                            className="px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-700/50 rounded-xl text-sm font-semibold text-slate-200 border border-slate-600 hover:scale-105 transition-transform cursor-default"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {instagramAccountData && (
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 shadow-lg">
                                <h2 className="font-bold text-2xl mb-5 text-slate-100 flex items-center gap-3">
                                    <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                    Platform Statistics
                                </h2>
                                <div className="space-y-4">
                                    <div className="group flex items-center justify-between p-5 bg-gradient-to-r from-slate-700/30 to-slate-700/10 rounded-2xl hover:shadow-md transition-all border border-slate-600/30">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                <Instagram size={28} className="text-slate-300" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-lg capitalize text-slate-200">Instagram</p>
                                                <p className="text-sm text-slate-400 flex items-center gap-1.5">
                                                    <CheckCircle2 size={16} className="text-blue-500" />
                                                    Verified
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-xl mb-1 text-slate-200">
                                                Followers: {formatFollowerCount(instagramAccountData.followers_count)}
                                            </p>
                                            <p className="text-sm text-emerald-400 flex items-center gap-1.5 justify-end font-medium">
                                                <TrendingUp size={16} />
                                                {engagementRate}% engagement
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {portfolio.length > 0 && (
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 shadow-lg">
                                <h2 className="font-bold text-2xl mb-5 text-slate-100 flex items-center gap-3">
                                    <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                    Portfolio ({portfolio.length} posts)
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {portfolio.map((item, index) => (
                                        <button
                                            key={item.id}
                                            // @ts-ignore
                                            onClick={() => setLightboxImage({ url: item.url, index })}
                                            className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-700 shadow-md hover:shadow-2xl transition-all hover:scale-105"
                                        >
                                            <img
                                                src={item.thumbnail}
                                                alt=""
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <div className="flex items-center justify-between text-white text-xs font-semibold">
                                                        <span>❤️ {item.likes.toLocaleString()}</span>
                                                        <span>💬 {item.comments.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 shadow-lg lg:sticky lg:top-24">
                            <h2 className="font-bold text-2xl mb-6 text-slate-100 flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                Quick Stats
                            </h2>

                            <div className="space-y-4">
                                <div className="p-5 bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-2xl border border-purple-800/30">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Award size={22} className="text-purple-400" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-300">
                                            Total Posts
                                        </span>
                                    </div>
                                    <p className="font-bold text-3xl text-slate-100">{instagramAccountData?.media_count || 0}</p>
                                </div>

                                <div className="p-5 bg-gradient-to-br from-pink-900/20 to-pink-800/20 rounded-2xl border border-pink-800/30">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-pink-900/30 rounded-xl flex items-center justify-center">
                                            <Users size={22} className="text-pink-400" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-300">
                                           Followings
                                        </span>
                                    </div>
                                    <p className="font-bold text-2xl text-slate-100 capitalize">{instagramAccountData?.follows_count || 0}</p>
                                </div>

                                <div className="mt-6 p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white">
                                   <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                            <Users size={22} className="text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-white/90">
                                           Account Type
                                        </span>
                                    </div>
                                    <p className="font-bold text-2xl capitalize">{instagramAccountData?.account_type || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {lightboxImage && (
                    <div
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button
                            onClick={() => setLightboxImage(null)}
                            className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all backdrop-blur-sm"
                        >
                            <X size={28} className="text-white" />
                        </button>

                        {portfolio.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateLightbox('prev');
                                    }}
                                    className="absolute left-6 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all backdrop-blur-sm"
                                >
                                    <ChevronLeft size={36} className="text-white" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateLightbox('next');
                                    }}
                                    className="absolute right-6 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all backdrop-blur-sm"
                                >
                                    <ChevronRight size={36} className="text-white" />
                                </button>
                            </>
                        )}

                        {/* @ts-ignore */}
                        <img
                        // @ts-ignore
                            src={lightboxImage.url}
                            alt=""
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}