"use client"

import { motion } from "framer-motion"
import { Briefcase, CheckCircle, Clock, TrendingUp, Users, Target, Instagram, Calendar, Edit, InstagramIcon, X, LinkIcon, Check } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "./(components)/stats-card"
import { Navigation } from "./(components)/navigation"
import { useQuery } from "@tanstack/react-query"
import { getDashboardStats, IGetDashboardDataResponse } from "./(helper)"
import { useSession } from "next-auth/react"
import Link from "next/link"



export default function DashboardPage() {


  const { data: session } = useSession();


  const { isPending, isError, data, error, refetch } = useQuery<IGetDashboardDataResponse>({
    queryKey: ['dashboard-stats', session?.user?.id],
    queryFn: () => getDashboardStats(session?.user?.id as string),
    enabled: session?.user?.id ? true : false,
  });









  return (
    <div className="min-h-screen bg-zinc-950 pb-20 lg:pb-0 lg:pl-20">

      {
        !data?.data?.instagramProfileId && <>
          <div className="relative group w-full mx-auto mb-4">
            {/* Gradient background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>

            {/* Card container */}
            <div className="relative bg-black/40 backdrop-blur-sm border rounded-3xl p-6 hover:border-yellow-500/30 transition-all duration-500 border-yellow-500/50 shadow-xl">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Instagram className="w-8 h-8 text-black" />
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-black mb-2 text-yellow-400">Connect Your Instagram</h3>
              <p className="text-gray-300 mb-6 min-h-[48px]">
                Ready to get started? Link your Instagram to explore opportunities and apply for jobs easily.
              </p>

              {/* Button */}
              <Link href="/influencer/connect-instagram">
                <button
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl font-bold text-black hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Connect Instagram
                </button>
              </Link>
            </div>
          </div>


        </>
      }
      <div className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" flex-col  lg:flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-blue-500 shadow-lg shadow-blue-500/20">
                <AvatarImage src={data?.data?.userProfilePicture} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl lg:text-4xl font-bold  mb-1 capitalize">Welcome back, {data?.data?.userName || session?.user?.name}!</h1>
                <p className="text-zinc-400">Here's what's happening with your Profile</p>
              </div>
            </div>
            <div className="space-x-2 mt-4 lg:mt-0">
              <Link href="/influencer/profile">
                <Button variant="outline" className="border-zinc-700  hover:bg-zinc-800">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              {
                !data?.data?.instagramProfileId && (
                  <Link href="/influencer/connect-instagram">
                    <Button variant="destructive" >
                      <InstagramIcon className="h-4 w-4 mr-2" />
                      Connect Instagram
                    </Button>
                  </Link>
                )
              }
            </div>


          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Applications"
            value={data?.data?.totalApplication || 0}
            icon={Briefcase}
            trend={{ value: "12% from last month", isPositive: true }}
          />
          <StatsCard
            title="Applications Accepted"
            value={data?.data?.totalAccepted || 0}
            icon={CheckCircle}
            trend={{ value: "25% from last month", isPositive: true }}
          />
          <StatsCard
            title="Applications Rejected"
            value={data?.data?.totalRejected || 0}
            icon={Clock}
            trend={{ value: "3 from last week", isPositive: false }}
          />

        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className=" flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Recent Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data?.data?.last5Applications?.map((application) => (
                  <motion.div
                    key={application?._id}
                    whileHover={{ x: 4 }}
                    className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className=" font-semibold">{application?.campaignData?.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              application?.status === "selected"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : application?.status === "applied"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {application?.status}
                          </Badge>
                        </div>
                        <p className="text-zinc-400 text-sm mb-2">{application?.campaignData?.brandName}</p>
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Instagram className="h-3 w-3" />
                            {application?.campaignData?.platform}
                          </span>
                          {/* @ts-ignore */}
                          <span>Applied {application?.applied_at}</span>
                        </div>
                      </div>

                      <Link href={`/influencer/applications`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>


        </div>

      </div>
    </div>
  )
}
