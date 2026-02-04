'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Clock, Copy, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { ProgressBadge } from './ProgressBadge'

// Replace Supabase type with your own backend interface
export interface CampaignSubmission {
  id: string
  email: string
  video_url: string
  status: 'pending' | 'approved' | 'rejected'
  coupon_code?: string
  rejection_reason?: string
  created_at: string
}

interface SubmissionStatusProps {
  submission: CampaignSubmission
}

export function SubmissionStatus({ submission }: SubmissionStatusProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (submission.coupon_code) {
      await navigator.clipboard.writeText(submission.coupon_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Submission Status</CardTitle>
          <ProgressBadge status={submission.status} />
        </div>
        <CardDescription>
          Submitted on{' '}
          {new Date(submission.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Video URL */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Video URL</p>
          <a
            href={submission.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline break-all"
          >
            {submission.video_url}
          </a>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm text-muted-foreground">{submission.email}</p>
        </div>

        {/* Pending */}
        {submission.status === 'pending' && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Your submission is pending verification. Our team will review it within 7
              business days. You&apos;ll receive an email once it&apos;s been processed.
            </AlertDescription>
          </Alert>
        )}

        {/* Approved */}
        {submission.status === 'approved' && submission.coupon_code && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-900">
              <p className="font-semibold mb-2">
                Congratulations! Your claim has been approved.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <code className="flex-1 px-3 py-2 bg-white border rounded text-sm font-mono">
                  {submission.coupon_code}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm mt-2">
                Use this code to redeem your 1 month of free credit. Check your email for
                redemption instructions.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Rejected */}
        {submission.status === 'rejected' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-semibold mb-1">Your submission was not approved.</p>
              {submission.rejection_reason && (
                <p className="text-sm mt-2">Reason: {submission.rejection_reason}</p>
              )}
              <p className="text-sm mt-2">
                Please review our guidelines and ensure your video meets all requirements.
              </p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
