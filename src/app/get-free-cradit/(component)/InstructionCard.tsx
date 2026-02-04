import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Video, Upload, TrendingUp, Send } from 'lucide-react'

export function InstructionCard() {
  const steps = [
    {
      icon: Video,
      title: 'Step 1: Create Your Video',
      description: 'Create a short video showcasing our platform. Mention @OurHandle and add the hashtag #OurPromo.',
    },
    {
      icon: Upload,
      title: 'Step 2: Post Publicly',
      description: 'Post the video publicly on YouTube, TikTok, or Instagram Reels. Make sure your account and video are public.',
    },
    {
      icon: Send,
      title: 'Step 3: Submit Your Claim',
      description: 'Return here, click "Submit Claim", paste your public video URL and email, then submit for verification.',
    },
  ]

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-2xl">How to get your free month</CardTitle>
        <CardDescription>Follow these simple steps to claim your reward</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
