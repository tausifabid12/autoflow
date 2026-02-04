'use client';

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
  Users,
  MapPin,
  Package,
  Tag,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';

// Interfaces
interface IBarterProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_urls: string[];
}

interface ICampaign {
  campaign_id: string;
  brandName: string;
  brandImage: string;
  title: string;
  description: string;
  type: 'paid' | 'barter' | 'barter-commission';
  product_provided: boolean;
  barter_product: IBarterProduct[];
  reference_video_url: string;
  start_price: number;
  end_price: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  duration: string;
  start_date: string;
  end_date: string;
  location: string;
  platform: string;
  deliverables: string[];
  requirements: string[];
  category: string[];
  media_assets: string[];
  applicants_count: number;
  age_start: number;
  age_end: number;
  gender: 'male' | 'female' | 'any';
  min_number_of_followers: number;
  coupon_code?: string;
  coupon_discount?: number;
  coupon_validity?: string;
}

interface CampaignDetailsProps {
  campaign: ICampaign;
}



const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign }) => {
  const statusConfig = {
    pending: {
      color: 'text-yellow-600 bg-yellow-50',
      icon: AlertCircle,
      label: 'Pending',
    },
    approved: {
      color: 'text-blue-600 bg-blue-50',
      icon: CheckCircle2,
      label: 'Approved',
    },
    rejected: {
      color: 'text-red-600 bg-red-50',
      icon: XCircle,
      label: 'Rejected',
    },
    active: {
      color: 'text-green-600 bg-green-50',
      icon: CheckCircle2,
      label: 'Active',
    },
    completed: {
      color: ' bg-gray-50',
      icon: CheckCircle2,
      label: 'Completed',
    },
  };

  const typeConfig = {
    paid: { label: 'Paid', color: 'bg-purple-100 text-purple-700' },
    barter: { label: 'Barter', color: 'bg-blue-100 text-blue-700' },
    'barter-commission': {
      label: 'Barter + Commission',
      color: 'bg-indigo-100 text-indigo-700',
    },
  };

  const status = statusConfig[campaign?.status];
  const StatusIcon = status?.icon;
  const campaignType = typeConfig[campaign?.type];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <img
            src={campaign?.brandImage}
            alt={campaign?.brandName}
            className="w-12 h-12 rounded-full object-cover border border-border"
          />
          <div className="flex-1">
            <h3 className="font-semibold ">
              {campaign?.brandName}
            </h3>
            <p className="text-sm ">{campaign?.platform}</p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${status?.color} flex items-center gap-1`}
          >
            {/* <StatusIcon className="w-3 h-3" /> */}
            {status?.label}
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h2 className="text-2xl font-bold  mb-2">
            {campaign?.title}
          </h2>
          <div
            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${campaignType?.color}`}
          >
            {campaignType?.label}
          </div>
          <p className=" mt-4 leading-relaxed">
            {campaign?.description}
          </p>
        </div>

        {/* Media Assets */}
        {campaign?.media_assets.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {campaign?.media_assets.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Campaign media ${idx + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Price Range */}
        {campaign?.type !== 'barter' && (
          <div className="bg-accent rounded-xl p-4 border border-border ">
            <div className="flex items-center gap-2 mb-2">
           
              <span className="font-semibold ">Compensation</span>
            </div>
            <p className="text-2xl font-bold text-green-700">
               ₹{campaign?.start_price} -  ₹{campaign?.end_price}
            </p>
          </div>
        )}

        {/* Barter Products */}
        {campaign?.product_provided && campaign?.barter_product.length > 0 && (
          <div className="bg-accent rounded-xl p-4 border border-border ">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="font-semibold ">
                Products Provided
              </span>
            </div>
            {campaign?.barter_product.map((product, idx) => (
              <div key={idx} className="flex gap-3 bg-card rounded-lg p-3">
                {product.image_urls[0] && (
                  <img
                    src={product.image_urls[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium ">{product.name}</p>
                  <p className="text-sm ">{product.description}</p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    Value:  ₹{product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Deliverables */}
        <div>
          <h3 className="font-semibold  mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Deliverables
          </h3>
          <ul className="space-y-2">
            {campaign?.deliverables.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 bg-accent rounded-lg p-3"
              >
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

const CampaignDetailsSidebar: React.FC<{campaign: ICampaign}> = ({campaign}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" bg-background ">
      <div className="flex">
        {/* Main Area */}
        <div className="flex-1 p-4  bg-card rounded-xl m h-[calc(100vh-8rem)]">
          <div className="max-w-4xl mx-auto">
            <div className=" p-6 mb-6 border-b border-border">
              <h1 className="text-3xl font-bold  mb-2">
                Campaign Details
              </h1>
              <p className="">
                View campaign details
              </p>
            </div>

            {/* Mobile Sheet */}
            <div className="md:hidden mb-4">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="w-full bg-card shadow-sm hover:shadow-md transition-shadow rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={campaign?.brandImage}
                        alt={campaign?.brandName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <p className="font-semibold ">
                          {campaign?.title}
                        </p>
                        <p className="text-sm ">
                          {campaign?.brandName}
                        </p>
                      </div>
                    </div>
                    <Menu className="w-5 h-5 " />
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className=" p-0">
                  <SheetHeader className="p-6 pb-0">
                    <SheetTitle>Campaign Details</SheetTitle>
                  </SheetHeader>
                  <CampaignDetails campaign={campaign} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-96 lg:w-[28rem]  bg-card ">
              <div className="sticky top-0 ">
                <CampaignDetails campaign={campaign} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsSidebar;
