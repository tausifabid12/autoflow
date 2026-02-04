'use client'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface PaymentButtonProps {
  amount: number
  label?: string
  className?: string
  type: string
  campaignId: string
  campaignName: string
  returnUrl: string
  chatId: string
  creatorId?: string
}

export default function PaymentButton({
  amount,
  label = 'Pay Now',
  className = '',
  type,
  campaignId,
  campaignName,
  returnUrl,
  chatId,
  creatorId

}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession();
  const router = useRouter()

  const handlePayment = async () => {
    if (!amount || amount < 1) {
      toast.error('Please enter a valid amount (at least ₹1)')
      return
    }

    if(!session?.user?.id){
      toast.error('Please Login First')
      router.push('/signin')
      return

    }

    console.log(JSON.stringify({ amount,  orderId : uuidv4(),  type, userName: session?.user?.name, userId: session?.user?.id, campaignId, campaignName, chatId, redirectUrl:`https://getcreator.online${returnUrl}`, creatorId: creatorId  }))

    setLoading(true)
    try {
      const res = await fetch('https://server.getcreator.online/api/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount,  orderId : uuidv4(),  type, userName: session?.user?.name, userId: session?.user?.id, campaignId, campaignName, chatId, redirectUrl:`https://getcreator.online${returnUrl}`, creatorId: creatorId } ),
      })

      const data = await res.json()
      setLoading(false)

      if (data.success && data.data?.redirectUrl) {
        window.location.href = data.data.redirectUrl
      } else {
        alert('Payment initiation failed')
        console.error(data)
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white w-full h-11 text-base font-medium rounded ${className}`}
    >
      {loading ? 'Processing...' : label}
    </button>
  )
}
