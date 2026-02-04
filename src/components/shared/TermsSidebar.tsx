'use client'

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TermsSidebarProps {
  title?: string;
  content?: string;
  isOpenState?: boolean;
}

export default function TermsSidebar({
  title = "Terms & Conditions",
  content,
  isOpenState = false,
}: TermsSidebarProps) {
  const [isOpen, setIsOpen] = useState(isOpenState);

const defaultContent = content || `
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


  return (
    <div className="w-full border border-border rounded-md bg-muted">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-foreground hover:bg-muted/50 rounded-t-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Content */}
      <div
        className={`px-4 text-sm text-muted-foreground transition-max-h duration-300 overflow-hidden whitespace-pre-line ${
          isOpen ? 'py-3' : 'max-h-0'
        }`}
      >
        {defaultContent}
      </div>
    </div>
  );
}
