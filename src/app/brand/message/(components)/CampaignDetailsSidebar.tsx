import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Menu,
  Calendar,
  DollarSign,
  MapPin,
  Package,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronRight,
  Users,
  Target,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ICampaign } from '@/app/dashboard/jobs/(helper)/helper';

const CampaignDetails = ({ campaign } : any) => {
  if (!campaign) return null;

  const statusConfig = {
    pending: {
      color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
      icon: AlertCircle,
      label: 'Pending',
      dotColor: 'bg-amber-500'
    },
    approved: {
      color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
      icon: CheckCircle2,
      label: 'Approved',
      dotColor: 'bg-blue-500'
    },
    rejected: {
      color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
      icon: XCircle,
      label: 'Rejected',
      dotColor: 'bg-red-500'
    },
    active: {
      color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
      icon: CheckCircle2,
      label: 'Active',
      dotColor: 'bg-green-500'
    },
    completed: {
      color: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20',
      icon: CheckCircle2,
      label: 'Completed',
      dotColor: 'bg-slate-500'
    },
  };

  const typeConfig = {
    paid: { 
      label: 'Paid Campaign', 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md',
      icon: DollarSign
    },
    barter: { 
      label: 'Barter', 
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md',
      icon: Package
    },
    'barter-commission': {
      label: 'Barter + Commission',
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md',
      icon: Sparkles
    },
  };

//   @ts-ignore
  const status = statusConfig[campaign?.status];
  const StatusIcon = status?.icon;
  
//   @ts-ignore
  const campaignType = typeConfig[campaign?.type];
  const TypeIcon = campaignType?.icon;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border border-border shadow-sm hover:shadow-md transition-all duration-200">
          <img
            src={campaign?.brandImage}
            alt={campaign?.brandName}
            className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-lg ring-2 ring-blue-100 dark:ring-blue-900"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate">
              {campaign?.brandName}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Target className="w-3 h-3" />
              {campaign?.platform}
            </p>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${status?.color} flex items-center gap-1.5 shadow-sm`}>
            <span className={`w-2 h-2 rounded-full ${status?.dotColor} animate-pulse`}></span>
            {status?.label}
          </div>
        </div>

        {/* Title & Type */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {campaign?.title}
          </h2>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${campaignType?.color}`}>
            <TypeIcon className="w-4 h-4" />
            {campaignType?.label}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {campaign?.description}
          </p>
        </div>

        <Separator className="my-4" />

        {/* Media Assets Gallery */}
        {campaign?.media_assets?.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Campaign Media
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {campaign?.media_assets.map((url : string, idx : number) => (
                <div key={idx} className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  <img
                    src={url}
                    alt={`Campaign media ${idx + 1}`}
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-4" />

        {/* Compensation */}
        {campaign?.type !== 'barter' && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 border-2 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Compensation</span>
            </div>
            <p className="text-3xl font-bold text-green-700 dark:text-green-400 mb-1">
              ${campaign?.start_price?.toLocaleString()} - ${campaign?.end_price?.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Based on engagement & deliverables</p>
          </div>
        )}

        {/* Barter Products */}
        {campaign?.product_provided && campaign?.barter_product?.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-5 border-2 border-blue-200 dark:border-blue-800 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-md">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Products Provided</span>
            </div>
            <div className="space-y-3">
              {campaign?.barter_product.map((product : any, idx : number) => (
                <div key={idx} className="flex gap-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-border">
                  {product.image_urls[0] && (
                    <img
                      src={product.image_urls[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-md flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base mb-1 truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600 text-white shadow-sm">
                        Value: ${product.price}
                      </Badge>
                      <Badge variant="outline" className="border-2">
                        Qty: {product.quantity}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-4" />

        {/* Campaign Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-accent rounded-xl p-4 border border-border hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium">Duration</span>
            </div>
            <p className="font-semibold">{campaign?.duration}</p>
          </div>
          <div className="bg-accent rounded-xl p-4 border border-border hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-medium">Location</span>
            </div>
            <p className="font-semibold">{campaign?.location}</p>
          </div>
          <div className="bg-accent rounded-xl p-4 border border-border hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Applicants</span>
            </div>
            <p className="font-semibold">{campaign?.applicants_count}</p>
          </div>
          <div className="bg-accent rounded-xl p-4 border border-border hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Target className="w-4 h-4" />
              <span className="text-xs font-medium">Min. Followers</span>
            </div>
            <p className="font-semibold">{campaign?.min_number_of_followers?.toLocaleString()}</p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Deliverables */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Deliverables
          </h3>
          <ul className="space-y-2">
            {campaign?.deliverables?.map((item : string, idx : number) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-accent rounded-xl p-4 border border-border hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        {campaign?.requirements?.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Requirements
              </h3>
              <ul className="space-y-2">
                {campaign?.requirements?.map((item : string, idx : number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 bg-accent rounded-xl p-4 border border-border hover:shadow-md transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Categories */}
        {campaign?.category?.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-3">
              <h3 className="font-bold text-lg">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {campaign?.category?.map((cat : string, idx : number) => (
                  <Badge
                    key={idx}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Coupon (if available) */}
        {campaign?.coupon_code && (
          <>
            <Separator className="my-4" />
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 border-2 border-amber-200 dark:border-amber-800 shadow-lg">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Affiliate Coupon
              </h3>
              <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl p-4 border-2 border-dashed border-amber-400 shadow-md">
                <div>
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 mb-1">{campaign?.coupon_code}</p>
                  <p className="text-sm text-muted-foreground">{campaign?.coupon_discount}% off • Valid for {campaign?.coupon_validity}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  );
};

const CampaignDetailsSidebar = ({ campaign } : { campaign : ICampaign }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!campaign) return null;

  return (
    <>
      {/* Mobile Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-xl hover:scale-110 transition-all duration-200 z-40 flex items-center justify-center">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-3xl">
            <SheetHeader className="p-6 pb-4 border-b border-border">
              <SheetTitle className="text-xl">Campaign Details</SheetTitle>
            </SheetHeader>
            <CampaignDetails campaign={campaign} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-96 border-l border-border bg-white dark:bg-slate-900 shadow-2xl">
        <div className="sticky top-0 h-screen flex flex-col">
          <div className="p-6 border-b border-border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Campaign Details
            </h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <CampaignDetails campaign={campaign} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDetailsSidebar;