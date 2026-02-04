import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FAQAccordion() {
  const faqs = [
    {
      question: 'How long does verification take?',
      answer: 'Our team typically verifies submissions within 7 business days. You\'ll receive an email once your submission has been reviewed.',
    },
    {
      question: 'Can I submit multiple videos?',
      answer: 'No, each email address is limited to one submission per campaign. Make sure your video meets all requirements before submitting.',
    },
    {
      question: 'Which platforms are accepted?',
      answer: 'We accept videos from YouTube, TikTok, and Instagram Reels. The video and your account must be set to public.',
    },
    {
      question: 'What happens if my submission is rejected?',
      answer: 'If your submission is rejected, you\'ll receive an email with the reason. Common reasons include insufficient likes, private videos, or content that doesn\'t meet our guidelines.',
    },
    {
      question: 'How do I receive my coupon code?',
      answer: 'Once approved, you\'ll receive an email with your unique coupon code for 1 month of free credit. The code will also be visible on this page.',
    },
    {
      question: 'Can I use a different email than the one on my social account?',
      answer: 'Yes, but we recommend using an email you check regularly as that\'s where we\'ll send your coupon code.',
    },
    {
      question: 'What if I already submitted but want to change my video?',
      answer: 'Due to the one-submission-per-email limit, you cannot change your submission. Please ensure your video meets all requirements before submitting.',
    },
  ]

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className=" border-border">
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
