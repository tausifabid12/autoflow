import { ICampaign } from '@/app/dashboard/jobs/(helper)/helper';
import React from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Package,
  XCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getDeliverableLabel } from '@/app/dashboard/campaign-details/[id]/page';

export default function CampaignDetailsCard({campaign}: {campaign: ICampaign}) {



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
      color: ' bg-green-500',
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

console.log(campaign, "campaign pppppppppppppp")

  const status = statusConfig[campaign?.status];
  const StatusIcon = status?.icon;
  const campaignType = typeConfig[campaign?.type];


  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          {/* <img
            src={campaign?.brandImage}
            alt={campaign?.brandName}
            className="w-12 h-12 rounded-full object-cover border border-border"
          /> */}
          <div className="flex-1">
            <h3 className="font-semibold text-sm">
              {campaign?.brandName}
            </h3>
            <p className="text-xs ">{campaign?.platform?.join(' | ')}</p>
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
                  {campaign?.price?.type === 'fixed'
                        ? Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(campaign?.price?.fixed_price || 0)
                        : `${Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(campaign?.price?.min_price || 0)} - ${Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(campaign?.price?.max_price || 0)}`}
            </p>
          </div>
        )}

        {/* Barter Products */}
        {campaign?.barter_product && campaign?.barter_product?.length > 0 && (
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
        <Card className='border-border'>
            <CardHeader>
              <CardTitle>Deliverables</CardTitle>
              <CardDescription>Content requirements for this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
                {campaign?.deliverables?.map((deliverable, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-muted/30 text-center">
                    <p className="text-2xl font-bold text-primary">{deliverable.count}</p>
                    <p className="text-sm text-muted-foreground mt-1">{getDeliverableLabel(deliverable.type)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>



      </div>
    </div>
  );
}
