"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Video,
  Download,
  CheckCircle,
  X,
  MessageSquare,
  Calendar,
  Instagram,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"


interface WorkItem {
  id: number
  contentType: string
  url: string
  thumbnail: string
  submittedDate: string
  status: string
  caption: string
  metrics: {
    likes?: string
    comments?: string
    shares?: string
    views?: string
    replies?: string
  }
  feedback?: string
}

const campaignData = {
  id: "1",
  title: "Summer Fashion Collection Campaign",
  brandName: "Nike Sportswear",
  deadline: "Dec 31, 2025",
  deliverables: [
    { type: "Instagram Post", quantity: 3, status: "required" },
    { type: "Instagram Story", quantity: 5, status: "required" },
    { type: "Instagram Reel", quantity: 1, status: "required" },
  ],
}

const influencerData = {
  id: "1",
  name: "Jessica Davis",
  username: "@jessicadavis",
  avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  followers: "125K",
  engagement: "4.8%",
}

const submittedWork: WorkItem[] = [
  {
    id: 1,
    contentType: "Instagram Post",
    url: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
    thumbnail: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
    submittedDate: "2 days ago",
    status: "pending",
    caption:
      "Loving this new summer collection from @nike! Perfect for my morning runs and everyday style. #NikeSummer #AthleisureLife",
    metrics: {
      likes: "8.2K",
      comments: "234",
      shares: "45",
    },
  },
  {
    id: 2,
    contentType: "Instagram Story",
    url: "https://images.pexels.com/photos/1661535/pexels-photo-1661535.jpeg",
    thumbnail: "https://images.pexels.com/photos/1661535/pexels-photo-1661535.jpeg",
    submittedDate: "3 days ago",
    status: "approved",
    caption: "Behind the scenes of my Nike shoot!",
    metrics: {
      views: "12.5K",
      replies: "89",
      shares: "23",
    },
  },
  {
    id: 3,
    contentType: "Instagram Reel",
    url: "https://images.pexels.com/photos/1556648/pexels-photo-1556648.jpeg",
    thumbnail: "https://images.pexels.com/photos/1556648/pexels-photo-1556648.jpeg",
    submittedDate: "5 days ago",
    status: "approved",
    caption: "30-second styling video with Nike summer pieces",
    metrics: {
      views: "45.2K",
      likes: "15.3K",
      comments: "567",
    },
  },
  {
    id: 4,
    contentType: "Instagram Post",
    url: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg",
    thumbnail: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg",
    submittedDate: "1 week ago",
    status: "revision_requested",
    caption: "New Nike gear for the summer vibes",
    metrics: {
      likes: "6.8K",
      comments: "178",
      shares: "32",
    },
    feedback: "Please include the product links in the caption and use the branded hashtag #NikeStyle",
  },
]

export default function SubmittedWorkPage() {
  const router = useRouter()
  const [workList, setWorkList] = useState(submittedWork)
  const [selectedWork, setSelectedWork] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")

  const handleApprove = (id: number) => {
    setWorkList(workList.map((work) => (work.id === id ? { ...work, status: "approved" } : work)))
  }

  const handleRequestRevision = (id: number) => {
    if (!feedback.trim()) return
    setWorkList(
      workList.map((work) =>
        work.id === id ? { ...work, status: "revision_requested", feedback } : work
      )
    )
    setFeedback("")
    setSelectedWork(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "revision_requested":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
    }
  }

  const getContentIcon = (type: string) => {
    if (type.includes("Reel") || type.includes("Video")) return Video
    if (type.includes("Story")) return ImageIcon
    return Instagram
  }

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 lg:pb-0 lg:pl-20">


      <div className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-zinc-400 hover:text-white mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Button>

            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white">Submitted Work</h1>
                    <p className="text-zinc-400 mt-1">{campaignData.title}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-12 w-12 border-2 border-blue-500">
                <AvatarImage src={influencerData.avatar} />
                <AvatarFallback>
                  {influencerData.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-white">{influencerData.name}</h3>
                <p className="text-zinc-400 text-sm">{influencerData.username}</p>
              </div>
              <div className="flex gap-4 ml-auto">
                <div className="text-right">
                  <div className="text-sm text-zinc-400">Followers</div>
                  <div className="font-bold text-white">{influencerData.followers}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-zinc-400">Engagement</div>
                  <div className="font-bold text-green-500">{influencerData.engagement}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {campaignData.deliverables.map((deliverable, index) => (
                <Card
                  key={index}
                  className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
                >
                  <CardContent className="p-4">
                    <div className="text-sm text-zinc-400">{deliverable.type}</div>
                    <div className="text-lg font-bold text-white mt-1">
                      {workList.filter((w) => w.contentType === deliverable.type && w.status === "approved").length} / {deliverable.quantity}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      {deliverable.quantity === workList.filter((w) => w.contentType === deliverable.type && w.status === "approved").length
                        ? "Complete"
                        : "In Progress"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workList.map((work, index) => {
            const Icon = getContentIcon(work.contentType)
            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={work.thumbnail}
                        alt={work.contentType}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(work.status)} capitalize backdrop-blur-sm`}
                        >
                          {work.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-zinc-900/80 text-white backdrop-blur-sm">
                          <Icon className="h-3 w-3 mr-1" />
                          {work.contentType}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                          <Calendar className="h-4 w-4" />
                          Submitted {work.submittedDate}
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-400 h-8">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>

                      <p className="text-zinc-300 text-sm mb-4 line-clamp-2">{work.caption}</p>

                      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-zinc-800">
                        {Object.entries(work.metrics).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-xs text-zinc-400 capitalize">{key}</div>
                            <div className="text-white font-bold">{value}</div>
                          </div>
                        ))}
                      </div>

                      {work.feedback && (
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mb-4">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-orange-400 mt-0.5" />
                            <div>
                              <div className="text-xs text-orange-400 font-semibold mb-1">
                                Revision Requested
                              </div>
                              <div className="text-sm text-zinc-300">{work.feedback}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {work.status === "pending" && (
                          <>
                            <Button
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApprove(work.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-orange-700 text-orange-500 hover:bg-orange-500/10"
                              onClick={() => setSelectedWork(work.id)}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Request Revision
                            </Button>
                          </>
                        )}
                        {work.status === "approved" && (
                          <Button
                            variant="outline"
                            className="w-full border-green-700 text-green-500"
                            disabled
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approved
                          </Button>
                        )}
                        {work.status === "revision_requested" && (
                          <Button
                            variant="outline"
                            className="w-full border-orange-700 text-orange-500"
                            disabled
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Awaiting Revision
                          </Button>
                        )}
                      </div>

                      {selectedWork === work.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pt-4 border-t border-zinc-800"
                        >
                          <Textarea
                            placeholder="Explain what needs to be changed..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="bg-zinc-800/50 border-zinc-700 text-white mb-3 min-h-[100px]"
                          />
                          <div className="flex gap-2">
                            <Button
                              className="flex-1 bg-orange-600 hover:bg-orange-700"
                              onClick={() => handleRequestRevision(work.id)}
                              disabled={!feedback.trim()}
                            >
                              Send Feedback
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setSelectedWork(null)
                                setFeedback("")
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
