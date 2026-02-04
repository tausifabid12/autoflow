"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Sparkles, AlertCircle, Crown, Calendar, TrendingUp, Gift, X } from "lucide-react";
import PaymentButton from "@/components/shared/make-payment";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserSubscription, IUserSubscription, IUserSubscriptionResponse } from "./(helper)";
import { toast } from "sonner";

type Plan = "pro";

const SECRET_CODE = "FREEPRO2025";

export default function Main() {
  const router = useRouter();
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [secretCode, setSecretCode] = useState("");
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const orderId = searchParams.get("orderId");

  const { isPending, isError, data, error, refetch } = useQuery<IUserSubscriptionResponse>({
    queryKey: ['user-subscription', session?.user?.id],
    queryFn: () => getUserSubscription(session?.user?.id as string),
    enabled: session?.user?.id ? true : false,
  });

  // Check for payment success
  useEffect(() => {
    if (state === "COMPLETED" && orderId) {
      setShowSuccessModal(true);
      // Refetch subscription data after successful payment
      refetch();
    }
  }, [state, orderId, refetch]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Clean up URL parameters
    router.replace("/influencer/active-plan");
  };

  const handleApplyCode = () => {
    if (!secretCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    setIsApplyingCode(true);

    setTimeout(() => {
      if (secretCode.trim().toUpperCase() === SECRET_CODE) {
        setActivePlan("pro");
        setSecretCode("");
        toast.success("Code applied successfully — you've unlocked the Premium Plan for free!");
      } else {
        toast.error("Invalid or expired code.");
      }
      setIsApplyingCode(false);
    }, 800);
  };

  const handleLearnMore = () => {
    router.push("https://getcreator.online/get-free-cradit");
  };

  // Get subscription data
  const subscription = data?.data as IUserSubscription | undefined;
  const hasActiveSubscription = subscription?.status === "active";
  const hasNoSubscription = !isPending && !isError && !subscription;
  
  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!subscription?.expire_date) return 0;
    const expireDate = new Date(subscription.expire_date);
    const today = new Date();
    const diffTime = expireDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Calculate usage percentage
  const getUsagePercentage = () => {
    if (!subscription) return 0;
    const used = subscription.number_of_applications_used || 0;
    const total = subscription.total_number_of_applications;
    return total > 0 ? (used / total) * 100 : 0;
  };

  const daysRemaining = getDaysRemaining();
  const usagePercentage = getUsagePercentage();
  const applicationsRemaining = subscription 
    ? subscription.total_number_of_applications - (subscription.number_of_applications_used || 0)
    : 0;

  return (
    <div className="min-h-screen bg-[#0D0D1A] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"></div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 max-w-md w-full border border-emerald-500/30 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={handleCloseSuccessModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full p-4">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-white mb-3">
                Payment Successful! 🎉
              </h3>
              <p className="text-gray-300 mb-2">
                Your Premium Plan has been activated successfully.
              </p>
              <p className="text-sm text-gray-400">
                TRX ID: <span className="font-mono text-emerald-400">{orderId}</span>
              </p>
            </div>

            {/* Features Unlocked */}
            <div className="bg-white/5 rounded-2xl p-5 mb-6 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-emerald-400" />
                <h4 className="font-semibold text-emerald-300">
                  Premium Features Unlocked
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  "Unlimited job applications",
                  "Premium visibility to brands",
                  "Advanced analytics",
                  "Priority support"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleCloseSuccessModal}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
            >
              Start Exploring Premium
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Premium Plan
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Unlock unlimited opportunities and grow your influencer career.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl hover:border-purple-500/50 transition-all duration-300 relative">
            {/* Top Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-2 rounded-full shadow-lg">
                <span className="text-white font-semibold text-sm">Premium Plan</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-6 pt-4">
              {hasActiveSubscription && (
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-full">
                  <Crown className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold text-sm">Active Plan</span>
                </div>
              )}
              {hasNoSubscription && (
                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-full">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 font-semibold text-sm">No Active Subscription</span>
                </div>
              )}
              {subscription?.status === "expired" && (
                <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-full">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-300 font-semibold text-sm">Plan Expired</span>
                </div>
              )}
              {subscription?.status === "pending" && (
                <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-full">
                  <AlertCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 font-semibold text-sm">Pending Activation</span>
                </div>
              )}
            </div>

            {/* Title and Price */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                Premium Plan
                <Sparkles className="w-6 h-6 text-purple-400" />
              </h2>
              <p className="text-gray-400 mb-4">
                Unlock unlimited job applications and premium features.
              </p>
              <div>
                <span className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  ₹500
                </span>
                <span className="text-gray-400 text-xl ml-2">/ month</span>
              </div>
            </div>

            {/* Active Subscription Stats */}
            {hasActiveSubscription && subscription && (
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-6">
                  <Crown className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-semibold text-emerald-300 text-lg">
                    Your Premium Benefits
                  </h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-gray-400">Days Remaining</span>
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {daysRemaining}
                    </p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-gray-400">Applications Left</span>
                    </div>
                    <p className="text-3xl font-bold text-white">
                     Unlimited
                    </p>
                  </div>
                </div>

                {/* <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Usage Progress</span>
                    <span className="font-medium text-emerald-400">
                      {subscription.number_of_applications_used || 0} / {subscription.total_number_of_applications} used
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                  </div>
                </div> */}

                <p className="text-xs text-gray-400 mt-4">
                  Plan expires on {new Date(subscription.expire_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            )}

            {/* No Subscription Warning */}
            {hasNoSubscription && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-300 mb-1">
                      No Active Subscription
                    </h4>
                    <p className="text-sm text-amber-200/80">
                      You don't have an active subscription plan. Upgrade to Premium to unlock all features and grow your career!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Expired Subscription */}
            {subscription?.status === "expired" && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-300 mb-1">
                      Subscription Expired
                    </h4>
                    <p className="text-sm text-red-200/80">
                      Your premium plan expired on {new Date(subscription.expire_date).toLocaleDateString()}. Renew now to continue enjoying premium benefits!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {[
                "Apply for unlimited jobs",
                "Premium visibility to brands",
                "Advanced analytics and insights",
                "Dedicated chat support",
                "Priority access to campaigns",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3 group">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 group-hover:text-pink-400 transition-colors" />
                  <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Free Premium Offer */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-5 mb-6">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Gift className="w-5 h-5 text-pink-400" />
                Get Premium for FREE!
              </h3>
                <p className="text-sm text-gray-300 mb-4">
                Post a short video about our platform. Submit the video link and your email to claim your free month.
              </p>
              <button
                onClick={handleLearnMore}
                type="button"
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 rounded-xl transition-all duration-300"
              >
                Learn More & Claim
              </button>
            </div>

            {/* Promo Code Section */}
            {!hasActiveSubscription && (
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Have a promo code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter your code here"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleApplyCode();
                      }
                    }}
                    disabled={isApplyingCode || activePlan === "pro"}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:opacity-50"
                    aria-label="Promo code input"
                  />
                  <button
                    onClick={handleApplyCode}
                    disabled={isApplyingCode || activePlan === "pro"}
                    type="button"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-xl transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApplyingCode ? "Applying..." : "Apply Code"}
                  </button>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div>
              {hasActiveSubscription ? (
                <button 
                  disabled
                  type="button"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-4 rounded-xl opacity-75 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Crown className="w-5 h-5" />
                  You are on the Premium Plan
                </button>
              ) : subscription?.status === "expired" ? (
                <PaymentButton 
                  amount={500} 
                  label="Renew Premium Plan" 
                  type="subscription" 
                  campaignId="" 
                  campaignName="" 
                  chatId="" 
                  returnUrl="/influencer/active-plan"
                />
              ) : (
                <PaymentButton 
                  amount={500} 
                  label={activePlan === "pro" ? "Current Plan" : "Upgrade to Premium"} 
                  type="subscription" 
                  campaignId="" 
                  campaignName="" 
                  chatId="" 
                  returnUrl="/influencer/active-plan"
                />
              )}
            </div>
          </div>
        </div>

        {/* <p className="text-center text-sm text-gray-400 mt-8">
          Premium plan renews monthly. Cancel anytime.
        </p> */}
      </div>
    </div>
  );
}