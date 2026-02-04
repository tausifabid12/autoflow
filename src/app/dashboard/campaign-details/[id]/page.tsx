'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Calendar, MapPin, DollarSign, Users, Package, Video, Instagram, Youtube, Share2, Facebook, Twitter, Linkedin, MessageCircle, Link2, Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getSingleCampaign, ICampaignSingleResponse } from '../../jobs/(helper)/helper'
import ApplyForCampaign from '@/components/apply-for-campaign'
import { useSession } from 'next-auth/react'


const getStatusColor = (status: any) => {
  const colors = {
    pending: 'bg-yellow-500',
    approved: 'bg-blue-500',
    rejected: 'bg-red-500',
    active: 'bg-green-500',
    completed: 'bg-gray-500'
  }
  // @ts-ignore
  return colors[status] || 'bg-gray-500'
}

const getTypeColor = (type: any) => {
  const colors = {
    paid: 'bg-emerald-500',
    barter: 'bg-purple-500',
    'barter-commission': 'bg-indigo-500'
  }
  // @ts-ignore
  return colors[type] || 'bg-gray-500'
}

const getPlatformIcon = (platform: any) => {
  const icons = {
    instagram: <Instagram className="h-4 w-4" />,
    youtube: <Youtube className="h-4 w-4" />,
    tiktok: <Video className="h-4 w-4" />
  }
  // @ts-ignore
  return icons[platform] || <Video className="h-4 w-4" />
}

export const getDeliverableLabel = (type: any) => {
  const labels = {
    'long-video': 'Long Video',
    'short-video': 'Short Video',
    'image': 'Image',
    'text': 'Text Post',
    'story': 'Story'
  }
  // @ts-ignore
  return labels[type] || type
}

export default function CampaignDetails() {

  const [copied, setCopied] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)


  const {data: session} = useSession()


  const param = useParams<{ id: string }>();



  const { isPending, isError, data: campaign, error } = useQuery<ICampaignSingleResponse>({
    queryKey: ['campaigns', param.id],
    queryFn: () => getSingleCampaign(param.id as string),
    enabled: !!param.id,
  })


  // Get the current page URL (in production, this would be the actual URL)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = `${campaign?.data?.title} - ${campaign?.data?.brandName}`
  const shareDescription = campaign?.data?.description

  // Social media share URLs
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = (platform: any) => {
    // @ts-ignore
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className="min-h-screen bg-background pt-20">


      {/* Main Content */}
      <div className="container py-8 px-3 lg:px-4  mx-auto ">
        <div className=" space-y-6">

          {/* Brand and Campaign Header */}
          <Card className='border-border'>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Brand Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-border">
                    <img

                      // @ts-ignore
                      src={campaign?.data?.brandImage || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
                      // @ts-ignore
                      alt={campaign?.data?.brandName || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Brand</p>
                    <h2 className="text-xl font-semibold text-foreground">{campaign?.data?.brandName}</h2>
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{campaign?.data?.title}</h1>
                    <p className="text-muted-foreground mt-2">{campaign?.data?.description}</p>
                  </div>

                  {/* Status and Type Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`${getStatusColor(campaign?.data?.status)} text-white`}>
                      {campaign?.data?.status.toUpperCase()}
                    </Badge>
                    <Badge className={`${getTypeColor(campaign?.data?.type)} text-white`}>
                      {campaign?.data?.type.toUpperCase()}
                    </Badge>
                    <Badge variant="default" className="gap-1 ">
                      {campaign?.data?.platform.join(' | ')}
                    </Badge>
                    {campaign?.data?.product_provided && (
                      <Badge variant="secondary" className="gap-1">
                        <Package className="h-3 w-3" />
                        Product Provided
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Applicants Count */}
                <div className="flex-shrink-0">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-3xl font-bold text-primary">{campaign?.data?.applicants_count}</p>
                      <p className="text-sm text-muted-foreground">Applicants</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <Card className='border-border'>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price Range</p>
                    <p className="text-lg text-muted-foreground text-white font-bold">
                      {
                        session?.user?.id ? <>
                        
                          {campaign?.data?.price?.type === 'fixed'
                        ? Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(campaign?.data?.price?.fixed_price || 0)
                        : `${Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(campaign?.data?.price?.min_price || 0)} - ${Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(campaign?.data?.price?.max_price || 0)}`}
                        </> : <>XXXX</>
                      }
                    
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Duration */}
            <Card className='border-border'>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-lg text-muted-foreground text-white font-bold">
                      {/* @ts-ignore */}
                      {campaign?.data?.start_date?.slice(0, 10)} - {campaign?.data?.end_date?.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className='border-border'>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-lg font-semibold text-foreground">{campaign?.data?.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign ID */}
            <Card className='border-border'>
              <CardContent className="p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Campaign ID</p>
                  <p className="text-lg font-mono font-semibold text-foreground">{campaign?.data?.campaign_id}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Deliverables */}
          <Card className='border-border'>
            <CardHeader>
              <CardTitle>Deliverables</CardTitle>
              <CardDescription>Content requirements for this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {campaign?.data?.deliverables?.map((deliverable, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-muted/30 text-center">
                    <p className="text-2xl font-bold text-primary">{deliverable.count}</p>
                    <p className="text-sm text-muted-foreground mt-1">{getDeliverableLabel(deliverable.type)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className='border-border'>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
              <CardDescription>Criteria for campaign participation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {campaign?.data?.requirements?.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className='border-border'>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Campaign classification tags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {campaign?.data?.category?.map((cat, index) => (
                  <Badge key={index} variant="outline" className="text-base py-1 px-3">
                    {cat}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>



          {/* Reference Video */}
          {campaign?.data?.reference_video_url && (
            <Card className='border-border'>
              <CardHeader>
                <CardTitle>Reference Video</CardTitle>
                <CardDescription>Example content for inspiration</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={campaign?.data?.reference_video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Video className="h-4 w-4" />
                  {campaign?.data?.reference_video_url}
                </a>
              </CardContent>
            </Card>
          )}

          {/* Media Assets Section */}
          {campaign?.data?.media_assets && campaign?.data?.media_assets.length > 0 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Media Assets</CardTitle>
                <CardDescription>Uploaded media related to this campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {campaign?.data?.media_assets.map((url, index) => (
                    <div key={index} className="relative group">
                      {/* Check if file is a video */}
                      {url.match(/\.(mp4|mov|avi|webm)$/i) ? (
                        <video
                          src={url}
                          controls
                          className="w-full h-40 object-cover rounded-lg border border-border"
                        />
                      ) : (
                        <img
                          src={url}
                          alt={`Media asset ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg border border-border"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Barter Products (if applicable) */}
          {campaign?.data?.barter_product && campaign?.data?.barter_product.length > 0 && (
            <Card className='border-border'>
              <CardHeader>
                <CardTitle>Barter Products</CardTitle>
                <CardDescription>Products included in this campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {campaign?.data?.barter_product?.map((product, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border border-border rounded-lg">
                      <span className="font-medium text-foreground">{product.name}</span>
                      <span className="text-muted-foreground">${product?.price?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <Card className='border-border'>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">

                {
                  session?.user?.id && campaign?.data?.applicants_ids?.includes(session?.user?.id as string) ?
                  <div>
                    <Button size="lg" variant="outline" className="flex-1 sm:flex-none gap-2">
                   Already   Applied
                    </Button>
                  </div>
                  :
                        <div>
                  <ApplyForCampaign campaign_id={campaign?.data?._id || ''}
                    brandName={campaign?.data?.brandName as any}
                    brandId={campaign?.data?.brandId as any}
                    brandImage={campaign?.data?.brandImage as any}
                    duration={campaign?.data?.duration as any}
                    price={campaign?.data?.price as any}
                    />
                </div>
                }
          


                {/* Share Dialog */}
                <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="flex-1 sm:flex-none gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Campaign
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share Campaign</DialogTitle>
                      <DialogDescription>
                        Share this campaign with others on social media or copy the link.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {/* Social Media Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          className="gap-2 justify-start"
                          onClick={() => handleShare('facebook')}
                        >
                          <Facebook className="h-5 w-5 text-blue-600" />
                          Facebook
                        </Button>
                        <Button
                          variant="outline"
                          className="gap-2 justify-start"
                          onClick={() => handleShare('twitter')}
                        >
                          <Twitter className="h-5 w-5 text-sky-500" />
                          Twitter
                        </Button>
                        <Button
                          variant="outline"
                          className="gap-2 justify-start"
                          onClick={() => handleShare('linkedin')}
                        >
                          <Linkedin className="h-5 w-5 text-blue-700" />
                          LinkedIn
                        </Button>
                        <Button
                          variant="outline"
                          className="gap-2 justify-start"
                          onClick={() => handleShare('whatsapp')}
                        >
                          <MessageCircle className="h-5 w-5 text-green-600" />
                          WhatsApp
                        </Button>
                      </div>

                      {/* Copy Link Section */}
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium text-foreground mb-2">Or copy link</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={shareUrl}
                            readOnly
                            className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-muted"
                          />
                          <Button
                            variant={copied ? "default" : "outline"}
                            onClick={handleCopyLink}
                            className="gap-2"
                          >
                            {copied ? (
                              <>
                                <Check className="h-4 w-4" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Link2 className="h-4 w-4" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
