"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Briefcase, Plus, Users, Eye, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { FilterState } from "@/app/dashboard/jobs/types"
import { getCampaigns, ICampaignResponse } from "@/app/dashboard/jobs/(helper)/helper"
import { useSession } from "next-auth/react"
import UpdateCampaignModal from "./(component)/UpdateCampaign"
import CampaignModal from "@/app/dashboard/jobs/(components)/CreateCampaignModal"
import CreateCampaignModalForOtherBrands from "./(component)/CreateCampaignModalForOtherBrands"



export default function BrandCampaignsPage() {
  const [filters, setFilters] = useState<any>({
    platforms: [],
    categories: [],
    locations: [],
    type: "",
    status: "pending",
    priceRange: [0, 50000],
    startDate: '',
    endDate: '',
    duration: '',
    search: '',
    sortBy: '',
    sortOrder: "asc",
    page: 1,
    limit: 10,
  })






  // ============= hooks =====================
  const router = useRouter()
  const { data: session } = useSession()
  const { isPending, isError, data: campaigns, error } = useQuery<ICampaignResponse>({
    queryKey: ['campaigns', session?.user?.id, filters],
    queryFn: () => getCampaigns({ ...filters, brandId: session?.user?.id as string }),
    enabled: !!session?.user?.id,
  })










  // ========================
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "completed":
        return " text-primary border-blue-500/30"
      case "draft":
        return "bg-zinc-500/20 text-muted-foreground border-zinc-500/30"
      default:
        return "bg-zinc-500/20 text-muted-foreground border-zinc-500/30"
    }
  }

  const handleCampaignClick = (campaignId: string) => {
    router.push(`/brand/campaign-applications?id=${campaignId}`)
  }


  // =========================== render ==============================
  return (
    <div className="min-h-screen bg-background ">

      <div className="relative bg-background">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" lg:flex items-center justify-between "
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl  flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-xl lg:text-4xl font-bold ">My Campaigns</h1>
                <p className="text-muted-foreground mt-1">
                  {campaigns?.total} campaigns found
                </p>
              </div>
            </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-full lg:w-auto mt-3 lg:mt-0">
                          <CampaignModal />
                      </div>

                      {
                        session?.user?.id == '690ecb4ce4d5e8098fe70c8e' &&
                        <div className="w-full lg:w-auto mt-3 lg:mt-0">
                          <CreateCampaignModalForOtherBrands />
                      </div>
                      }
                      
                    </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns?.data?.map((campaign, index) => (
            <motion.div
              key={campaign.campaign_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}

              className="cursor-pointer"
            >
              <Card className="border-border bg-card backdrop-blur-sm  transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(campaign.status)} capitalize`}
                    >
                      {campaign.status}
                    </Badge>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className=""
                        onClick={() => handleCampaignClick(campaign?._id as string)}
                      >
                        <Eye  />
                        View Applicants
                      </Button>

                      <UpdateCampaignModal oldData={campaign as any} />
                    </div>

                  </div>

                  <h3 className="font-bold text-lg  capitalize mb-2  transition-colors truncate">
                    {campaign.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-accent text-xs border-0 capitalize"
                    >
                      {campaign?.platform?.join(' | ')}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-accent text-xs border-0 capitalize"
                    >
                      {campaign?.category?.slice(0, 2)?.join(' | ')}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Applications
                      </span>
                      <span className=" font-medium">{campaign?.applicants_count || '00'}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Deadline
                      </span>
                      <span className=" font-medium">{campaign?.end_date?.toString()?.slice(0, 10)}</span>
                    </div>
                  </div>


                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
