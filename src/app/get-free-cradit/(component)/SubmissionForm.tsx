'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { applyForFreeCredit } from '../(helper)'
import { useSession } from 'next-auth/react'

interface SubmissionFormProps {
  onSuccess: () => void
  disabled?: boolean
}





export function validateUrl(url: string): { valid: boolean; error?: string } {
  if (!url || url.trim().length === 0) {
    return { valid: false, error: 'URL is required' };
  }

  const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

  if (urlRegex.test(url)) {
    return { valid: true };
  }

  return { valid: false, error: 'Please enter a valid URL' };
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' }
  }

  return { valid: true }
}




export function SubmissionForm({ onSuccess, disabled = false }: SubmissionFormProps) {
  const [videoUrl, setVideoUrl] = useState('')
  const [email, setEmail] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{
    videoUrl?: string
    email?: string
    confirmed?: string
    submit?: string
  }>({})

  const {data: session} = useSession()
      
    const {
        mutate: applyForNewFreeCredit,
        isPending,
    } = useMutation({
        mutationFn: applyForFreeCredit,
        onSuccess: () => {
            toast.success('Application submitted successfully. Please wait for approval. You will be notified via email.')
            setSubmitted(true)
        },
    });  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: typeof errors = {}




    if(!session?.user?.id){
      newErrors.submit = 'You must be logged in to apply for free credit'
    }


    const videoValidation = validateUrl(videoUrl)
    if (!videoValidation?.valid) {
      newErrors.videoUrl = 'Please enter a valid URL'
    }

    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error
    }

    if (!confirmed) {
      newErrors.confirmed = 'You must confirm that you meet all requirements'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
   
    applyForNewFreeCredit({
      data: { video_url : videoUrl, user_email : email , user_id : session?.user?.id}
    })

    try {

    } catch (err) {
      setErrors({
        submit: 'An unexpected error occurred. Please try again.',
      })
      console.error(err)
    } finally {

    }
  }

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle>Submit Your Claim</CardTitle>
        <CardDescription>
          Enter your video URL and email to claim your free month
        </CardDescription>
      </CardHeader>

    

      <CardContent>
          {submitted && (
       <div className='my-3'>
         <Alert variant="default" className='border-none bg-green-600/30 '>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Application submitted successfully. Please wait for approval. You will be notified via email.</AlertDescription>
        </Alert>
       </div>
      )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video URL */}
          <div className="space-y-2">
            <Label htmlFor="videoUrl">
              Video URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="videoUrl"
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value)
                if (errors.videoUrl) setErrors({ ...errors, videoUrl: undefined })
              }}
              disabled={loading || disabled}
              aria-invalid={!!errors.videoUrl}
              aria-describedby={errors.videoUrl ? 'videoUrl-error' : undefined}
            />
            {errors.videoUrl && (
              <p id="videoUrl-error" className="text-sm text-red-500" role="alert">
                {errors.videoUrl}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Supported platforms: YouTube, TikTok, Instagram Reels
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              disabled={loading || disabled}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-500" role="alert">
                {errors.email}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              We&apos;ll send your coupon code to this email
            </p>
          </div>

          {/* Confirmation Checkbox */}
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="confirmed"
                checked={confirmed}
                onCheckedChange={(checked) => {
                  setConfirmed(checked as boolean)
                  if (errors.confirmed) setErrors({ ...errors, confirmed: undefined })
                }}
                disabled={loading || disabled}
              />
              <Label
                htmlFor="confirmed"
                className="text-sm font-normal leading-tight cursor-pointer"
              >
                I confirm this video is public, I own the account
              </Label>
            </div>
            {errors.confirmed && (
              <p id="confirmed-error" className="text-sm text-red-500" role="alert">
                {errors.confirmed}
              </p>
            )}
          </div>

          {/* Submit Errors */}
          {errors.submit && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading || disabled}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Claim'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
