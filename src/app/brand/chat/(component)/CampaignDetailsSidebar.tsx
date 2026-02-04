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
import CampaignDetailsCard from './CampaignDetailsCard';
import TermsSidebar from '@/components/shared/TermsSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSession } from 'next-auth/react';

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

const brandTerms =  `
Account Info:
Provide accurate company name, contact person, phone number, and business email. 
False or incomplete details may lead to suspension.

Campaign Creation:
Brands must clearly mention deliverables, timelines, and content requirements while creating campaigns.

Communication:
All communication with influencers must happen only through the platform.
Do not request influencers’ phone numbers or social handles directly.
Any attempt to contact influencers outside the platform is prohibited.

Content Approval:
Influencers will submit content for approval before posting.
Approval or revisions must be given within the specified timeline.

Payments:
Full payment for campaigns must be made through the platform.
Payments are held in escrow (if applicable) and released to influencers after successful completion and approval.
Platform service fee: Rs. 100.

Usage Rights:
The brand may reuse influencer content for marketing only if permitted within the campaign terms.

Confidentiality:
Brand must not disclose influencer data, platform pricing, or campaign details outside the platform.

Termination:
Contacting influencers directly via phone, email, or social handles may result in permanent suspension.
Misuse of platform data or repeated policy violations will lead to account termination.

Agreement:
Creating or running a campaign on the platform means you agree to all these terms and policies.
`;
const creatorTerms = `
1. Account Info: Provide correct name, phone number, and social handles. False details may lead to suspension.
2. Communication: Do not share phone numbers, emails, or social handles directly with brands unless approved by the platform.
3. Collaboration: All chats, approvals, and deal discussions must happen only through the platform.
4. Content: Must follow the brand brief and avoid offensive or misleading content.
5. Usage Rights: Brands and the platform may reuse or repost your campaign content for marketing.
6. Payment: Payment after brand approval.
Processing time: 3–5 business days.

Platform fee: Rs 100.
Confidentiality: Do not reveal campaign details before official posting.
Termination:Sharing your phone number or social handle directly with brands is strictly prohibited.
Any violation, misconduct, or direct dealing outside the platform can lead to account suspension or permanent termination.
Agreement: Using the platform means you agree to all these terms and policies.
`


const CampaignDetailsSidebar: React.FC<{campaign: ICampaign}> = ({campaign}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const{ data : session} = useSession();

  console.log(campaign, "==========  ||||||||||||||  +++++++++++++++")

  return (
    <div className=" bg-background ">
      <div className="flex">
        {/* Main Area */}
      
      <ScrollArea className='h-[calc(100vh-8rem)]'>
        <div className="flex-1 p-4  bg-card rounded-xl m ">
          <div className=" mx-auto">
            <div className=" p-6 mb-6 border-b border-border">
              <h1 className="text-xl font-bold  mb-1">
                Campaign Details
              </h1>
              <p className="text-xs">
                View campaign details
              </p>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block   bg-card ">
              <div className="sticky top-0 ">

                {
                  campaign && (
                    // @ts-ignore
                    <CampaignDetailsCard campaign={campaign} />
                  )
                }

                <div className='p-4'>
                  <TermsSidebar content={session?.user?.role === 'brand' ? brandTerms : creatorTerms} isOpenState={campaign ? false : true} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CampaignDetailsSidebar;
