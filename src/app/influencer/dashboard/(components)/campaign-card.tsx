"use client"

import { motion } from "framer-motion"
import { Bookmark, DollarSign, MapPin, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ApplyForCampaign from "@/components/apply-for-campaign"

interface CampaignCardProps {
  id: string
  title: string
  brandName: string
  brandLogo?: string
  tags: string[]
  payRange: string
  location?: string
  deadline?: string
  isBookmarked?: boolean
  onBookmarkToggle?: () => void
  onApply?: () => void
  className?: string
}

export function CampaignCard({
  title,
  brandName,
  brandLogo,
  tags,
  payRange,
  location,
  deadline,
  isBookmarked = false,
  onBookmarkToggle,
  onApply,
  className,
}: CampaignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={cn("group", className)}
    >
      <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {brandLogo ? (
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden">
                  <img src={brandLogo} alt={brandName} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  {brandName.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-zinc-400">{brandName}</p>
              </div>
            </div>
            {onBookmarkToggle && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-blue-400"
                onClick={onBookmarkToggle}
              >
                <Bookmark
                  className={cn("h-4 w-4", isBookmarked && "fill-blue-400 text-blue-400")}
                />
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 border-0"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="text-white font-medium">{payRange}</span>
            </div>
            {location && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
            {deadline && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Calendar className="h-4 w-4" />
                <span>Deadline: {deadline}</span>
              </div>
            )}
          </div>

          {onApply && (
            // @ts-ignore
            <ApplyForCampaign/>
            // <Button
            //   onClick={onApply}
            //   className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            // >
            //   Apply Now
            // </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
