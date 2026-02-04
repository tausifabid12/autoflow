'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Gift, Sparkles, TrendingUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SubmissionStatus } from './(component)/SubmissionStatus'
import { InstructionCard } from './(component)/InstructionCard'
import { ExampleCard } from './(component)/ExampleCard'
import { SubmissionForm } from './(component)/SubmissionForm'
import { FAQAccordion } from './(component)/FAQAccordion'
import { SubmissionModal } from './(component)/SubmissionModal'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

interface CampaignSubmission {
  id: string
  email: string
  videoUrl: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt?: string
}

export default function CampaignLandingPage() {
  const [showModal, setShowModal] = useState(false)
  const [checkEmail, setCheckEmail] = useState('')
  const [submission, setSubmission] = useState<CampaignSubmission | null>(null)
  const [checking, setChecking] = useState(false)





  const handleSuccess = () => {
    setShowModal(true)
    if (checkEmail) fetchSubmission(checkEmail)
  }

  const fetchSubmission = async (email: string) => {
    if (!email.trim()) return
    setChecking(true)

    try {
      const res = await fetch(`/api/campaign/check?email=${encodeURIComponent(email.trim())}`)
      const data = await res.json()
      if (data.success) {
        setSubmission(data.submission)
      } else {
        setSubmission(null)
      }
    } catch (error) {
      console.error('Error checking submission:', error)
    } finally {
      setChecking(false)
    }
  }

  const handleCheckStatus = () => fetchSubmission(checkEmail)













  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Gift className="w-4 h-4" />
            Limited Time Offer
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Get 1 month free —
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Promote Our Platform
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Post a short video about our platform.Submit
            the video link and your email to claim your free month.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" onClick={() => document.getElementById('submit-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Submit Claim
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('instructions')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 border-border">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg">Create Content</h3>
                <p className="text-sm text-muted-foreground">
                  Make a creative video showcasing our platform
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg">Post Publicly</h3>
                <p className="text-sm text-muted-foreground">
                 Make sure your account and video are public.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg">Get Rewarded</h3>
                <p className="text-sm text-muted-foreground">
                  Submit your video and receive 1 month free
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {submission && (
          <div className="mb-12">
            
            {/* @ts-ignore */}
            <SubmissionStatus submission={submission} />
          </div>
        )}

        {/* <div className="mb-12">
          <Card className="border-2 border-border">
            <CardContent className="pt-6">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Check Your Submission Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your email to see if you&apos;ve already submitted a claim
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="check-email" className="sr-only">Email</Label>
                    <Input
                      id="check-email"
                      type="email"
                      placeholder="you@example.com"
                      value={checkEmail}
                      onChange={(e) => setCheckEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCheckStatus()}
                    />
                  </div>
                  <Button onClick={handleCheckStatus} disabled={checking}>
                    {checking ? 'Checking...' : 'Check Status'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        <div id="instructions" className="grid lg:grid-cols-2 gap-8 mb-12">
          <InstructionCard />
          <ExampleCard />
        </div>

        <div id="submit-form" className="max-w-2xl mx-auto mb-12">
          <SubmissionForm
            onSuccess={handleSuccess}
            disabled={!!submission && submission.status !== 'rejected'}
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion />
        </div>
      </div>

      <SubmissionModal open={showModal} onOpenChange={setShowModal} />
    </div>
  )
}
