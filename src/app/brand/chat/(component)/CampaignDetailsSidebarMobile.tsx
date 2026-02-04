'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import CampaignDetailsCard from './CampaignDetailsCard';
import TermsSidebar from '@/components/shared/TermsSidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface CampaignDetailsSidebarProps {
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


const CampaignDetailsSidebarMobile: React.FC<CampaignDetailsSidebarProps> = ({ campaign }) => {
  const [isOpen, setIsOpen] = useState(false);
  const{ data : session} = useSession();

  return (
    <div>
      {/* Trigger Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant={'outline'} className='w-full lg:hidden'>
          Campaign Details
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[400px] p-0 border-border z-[50000]">
          <ScrollArea className="h-[100vh] bg-background p-4">
            <SheetHeader className="border-b border-border p-6">
              <SheetTitle className="text-xl font-bold">Campaign Details</SheetTitle>
              <p className="text-xs text-muted-foreground">View campaign details</p>
            </SheetHeader>

            {/* Campaign Card */}
            <div className="mt-4">
              {/* @ts-ignore */}
              <CampaignDetailsCard campaign={campaign} />
            </div>

            {/* Terms / Extra Sidebar */}
            <div className="mt-4 p-4">
                             <TermsSidebar content={session?.user?.role === 'brand' ? brandTerms : creatorTerms} isOpenState={campaign ? false : true} />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CampaignDetailsSidebarMobile;
