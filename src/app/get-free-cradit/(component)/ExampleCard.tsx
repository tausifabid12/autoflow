import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export function ExampleCard() {
const {data: session} = useSession()

  const dos = [
    'Use a clear caption mentioning @GetCreator',
    'Add the hashtag #GetCreatorPro',
    'Make your video and account public',
    'Show genuine enthusiasm for the platform',
    'Include clear audio and good lighting',
  ]

  const donts = [
    "Don't make your video or account private",
    "Don't use misleading or false claims",
    "Don't artificially inflate likes or engagement",
    "Don't submit videos from accounts you don't own",
    "Don't repost someone else's content",
  ]


  useEffect(()=> {
    dos.push(`Ask User To use this Promo Code GC-${session?.user?.phone}`)
  }, [session?.user?.phone])



  return (
        <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-2xl">Do's & Don'ts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-green-600 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Do This
          </h3>
          <ul className="space-y-2">
            {dos.map((item, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Don't Do This
          </h3>
          <ul className="space-y-2">
            {donts.map((item, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-red-600 mt-0.5">✗</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
