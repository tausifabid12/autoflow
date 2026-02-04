"use client"

import { motion } from "framer-motion"
import { CheckCircle, Instagram, FileText, Upload, DollarSign, Calendar } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "../dashboard/(components)/navigation"
import ContentUrlModal from "../dashboard/(components)/ContentUrlModal"
import { useQuery } from "@tanstack/react-query"
import { getCampaignsApplication, ICampaignApplicationResponse } from "../chat/(helper)"
import { useSession } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"


const acceptedCampaigns = [
  {
    id: "1",
    title: "Summer Fashion Collection Campaign",
    brandName: "Nike Sportswear",
    brandLogo: "",
    platform: "Instagram",
    payment: "$3,500",
    status: "active",
    progress: 60,
    deadline: "Dec 31, 2025",
    deliverables: {
      total: 9,
      completed: 5,
    },
  },
  {
    id: "2",
    title: "Beauty Product Launch",
    brandName: "Sephora",
    brandLogo: "",
    platform: "Instagram",
    payment: "$2,000",
    status: "active",
    progress: 30,
    deadline: "Nov 15, 2025",
    deliverables: {
      total: 6,
      completed: 2,
    },
  },
  {
    id: "3",
    title: "Wellness Product Review",
    brandName: "Lululemon",
    brandLogo: "",
    platform: "YouTube",
    payment: "$4,500",
    status: "completed",
    progress: 100,
    deadline: "Oct 20, 2025",
    deliverables: {
      total: 8,
      completed: 8,
    },
  },
  {
    id: "4",
    title: "Travel Destination Showcase",
    brandName: "Airbnb",
    brandLogo: "",
    platform: "Instagram",
    payment: "$6,000",
    status: "active",
    progress: 45,
    deadline: "Jan 10, 2026",
    deliverables: {
      total: 12,
      completed: 5,
    },
  },
]

export default function AcceptedJobsPage() {

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);


  const { data: session } = useSession();



  const { isPending, isError, data, error, refetch } = useQuery<ICampaignApplicationResponse>({
    queryKey: ['campaigns', session?.user?.id, limit, page],
    queryFn: () => getCampaignsApplication(session?.user?.id as string, limit, page),
    enabled: session?.user?.id ? true : false
  });




  console.log(data)




  return (
    <div className="min-h-screen bg-zinc-950 pb-20 lg:pb-0 lg:pl-20">
      <div className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Accepted Campaigns</h1>
                <p className="text-zinc-400 mt-1">
                  {data?.total} accepted application found
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {data?.data?.map((campaign, index) => (
            <motion.div
              key={campaign._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className=" flex-col lg:flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br mb-3 lg:mb-0 from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/30 shrink-0">
                        {campaign?.brand_name?.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg lg:text-xl font-bold text-white">{campaign?.campaignData?.title}</h3>
                          <Badge
                            variant="outline"
                            className={
                              // @ts-ignore
                              campaign?.status === "accepted"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : campaign?.status === "rejected"
                                ? "bg-red-500/20 text-red-400 border-red-500/30":
                                "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-zinc-400 mb-4">{campaign.brand_name}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1 text-xs">
                              <Instagram className="h-3 w-3" />
                              <span>Platform</span>
                            </div>
                            <p className="text-white font-medium text-sm">{campaign?.campaignData?.platform}</p>
                          </div>
                          {/* <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1 text-xs">
                              <DollarSign className="h-3 w-3 text-green-500" />
                              <span>Payment</span>
                            </div>
                            <p className="text-white font-medium text-sm">{campaign.payment}</p>
                          </div> */}
                          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1 text-xs">
                              <Calendar className="h-3 w-3" />
                              <span>Deadline</span>
                            </div>
                            {/* @ts-ignore */}
                            <p className="text-white font-medium text-sm">{campaign.campaignData?.end_date?.slice(0, 10)}</p>
                          </div>
                          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1 text-xs">
                              <CheckCircle className="h-3 w-3" />
                              <span>Deliverables</span>
                            </div>
                            <p className="text-white font-medium text-sm">
                             {campaign?.campaignData?.deliverables?.length}
                            </p>
                          </div>
                            <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1 text-xs">
                              <CheckCircle className="h-3 w-3" />
                              <span>Status</span>
                            </div>
                            <p className="text-white font-medium text-sm">
                             {campaign?.status}
                            </p>
                          </div>
                        </div>

                        <div>
                          <Link href={`/influencer/chat?applicationId=${campaign?.application_id}`}>
                          <Button
                        variant="outline"
                        className="w-full h-full border-zinc-700 text-white hover:bg-zinc-800"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Start Conversation
                      </Button>
                      </Link>

                        </div>
                      </div>
                    </div>

                    {/* <div className="flex flex-col gap-3 lg:w-48 shrink-0">
                      <Button
                        variant="outline"
                        className="w-full h-full border-zinc-700 text-white hover:bg-zinc-800"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Start Conversation
                      </Button>
  
                      {campaign.campaignData?.status === "completed" && (
                        <Button
                          variant="outline"
                          className="w-full border-green-700 text-green-500 hover:bg-green-500/10"
                          disabled
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </Button>
                      )}
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-zinc-500 text-sm">
            Need help with a campaign?{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 underline">
              Contact support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
