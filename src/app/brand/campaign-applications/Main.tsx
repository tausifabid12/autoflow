"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Users, Instagram, TrendingUp, MapPin, Mail, CheckCircle, X, Eye, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useSession } from "next-auth/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ApplicationStatus, getCampaignsApplication, ICampaignApplicationResponse, updateCampaignsApplication } from "../chat/(helper)"
import Link from "next/link"
import { queryClient } from '@/components/providers';
import { toast } from "sonner"




export default function Main() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("all")
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);


  const searchParams = useSearchParams()
  const campaignId = searchParams.get("id")



  const { data: session } = useSession();

  const { isPending, isError, data, error, refetch } = useQuery<ICampaignApplicationResponse>({
    queryKey: ['applications', session?.user?.id, limit, page],
    queryFn: () => getCampaignsApplication(session?.user?.id as string, limit, page, null, campaignId as string),
    enabled: session?.user?.id ? true : false
  });


    const {
        mutate: updateApplication,
        isPending : updatePending,
    } = useMutation({
        mutationFn: updateCampaignsApplication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applications', session?.user?.id, limit, page] });
            toast.success('application Updated')
        },
    });  


  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
    }
  }


  async function handleUpdateApplication(applicationId: string, status: ApplicationStatus) {
    updateApplication({ applicationId, status });
  }

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 lg:pb-0 lg:pl-20">


<div className="relative border-b border-zinc-800 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black">
  {/* subtle glow */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 blur-2xl" />

  <div className="container mx-auto py-6 px-4 lg:py-12 lg:px-6">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="group mb-6 flex items-center gap-2 text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Campaigns
      </Button>

      {/* Campaign Title Block */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 ring-1 ring-blue-500/30">
          <Users className="h-7 w-7 text-blue-400" />
        </div>

        <div>
          <h1 className="text-2xl capitalize font-bold tracking-tight text-white md:text-4xl">
            {data?.data[0]?.campaignData?.title}
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            Campaign applications overview
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</div>


      <div className="container mx-auto px-2 py-4 lg:px-6 lg:py-8">
        {/* <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
              All ({appList.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-blue-600">
              Pending ({appList.filter((a) => a.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="data-[state=active]:bg-blue-600">
              Accepted ({appList.filter((a) => a.status === "accepted").length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-blue-600">
              Rejected ({appList.filter((a) => a.status === "rejected").length})
            </TabsTrigger>
          </TabsList>
        </Tabs> */}

        <div className="space-y-6">
          {data?.data?.map((application, index) => (
            <motion.div
              key={application._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-16 w-16 border-2 border-blue-500">
                        <AvatarImage src={application?.creator_profile_pic} />
                        <AvatarFallback>
                          {application?.creator_name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-xl text-white">
                            {application?.creator_name}
                          </h3>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(application.status)} capitalize`}
                          >
                            {application.status}
                          </Badge>
                        </div>
                        {/* <p className="text-zinc-400 mb-1">
                          {application?.creator_username}
                        </p> */}
                        <p className="text-sm text-zinc-500 mb-4">
                          {/* @ts-ignore */}
                          Applied {application?.created_at?.slice(0, 10)}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1 text-xs">
                              <Users className="h-3 w-3" />
                              <span>Amount</span>
                            </div>
                            <p className="text-white font-bold">
                              {/* @ts-ignore */}
                              {application.amount_proposed  || 0}
                            </p>
                          </div>
                          {/* <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1 text-xs">
                              <TrendingUp className="h-3 w-3" />
                              <span>Engagement</span>
                            </div>
                            <p className="text-green-500 font-bold">
                              {application.creator_engagement_rate  || 0}
                            </p>
                          </div> */}
                          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1 text-xs">
                              <MapPin className="h-3 w-3" />
                              <span>Location</span>
                            </div>
                            <p className="text-white font-medium text-sm">
                              {application.creator_location}
                            </p>
                          </div>
                          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1 text-xs">
                              <Instagram className="h-3 w-3" />
                              <span>Platform</span>
                            </div>
                            <p className="text-white font-medium text-sm">Instagram</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-white font-semibold mb-2 text-sm">Pitch</h4>
                          <p className="text-zinc-300 text-sm leading-relaxed">
                            {application.pitch}
                          </p>
                        </div>

               
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:w-48 shrink-0">
                      {/* <Button
                        variant="outline"
                        className="w-full border-zinc-700 text-white hover:bg-zinc-800"
                        onClick={() =>
                          router.push(
                            `/band/campaign-submissions?campaign=${application.campaignData.id}&influencer=${application.id}`
                          )
                        }
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Work
                      </Button> */}
                      {application.status === "applied" && (
                        <>
                          <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => updateApplication({ applicationId: application._id, status: "selected" })}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                           {updatePending ? "Updating..." : "Accept"}
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-red-700 text-red-500 hover:bg-red-500/10"
                            onClick={() => updateApplication({ applicationId: application._id, status: "rejected" })}
                          >
                            <X className="h-4 w-4 mr-2" />
                            {updatePending ? "Updating..." : "Reject"}
                          </Button>
                        </>
                      )}
                      {application.status === "selected" && (
                        <Button
                          variant="outline"
                          className="w-full border-green-700 text-green-500"
                          disabled
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accepted
                        </Button>
                      )}
                      <Link href={`/brand/chat`}>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full text-zinc-400 hover:text-white"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                      </Link>
                      <Link href={`/influencer-public-profile?influencer=${application.creator_slug}`}>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full text-zinc-400 hover:text-white"
                        >
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                     
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
