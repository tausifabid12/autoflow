'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { sendMessage } from "../(helper)"
import { queryClient } from '@/components/providers';
import { ICampaign } from "@/app/dashboard/jobs/(helper)/helper"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

export default function TaskCompleteAlert({ influencerName = "Influencer", selectedCampaign , selectedApplication }: { influencerName?: string, selectedCampaign?: ICampaign , selectedApplication?: string }) {
  const [open, setOpen] = React.useState(false)
  const [messageText, setMessageText] = React.useState("")


  const { data: session } = useSession();




    const {
        mutate: sendNewMessage,
        isPending,
    } = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            // toast.success('config created')
            setOpen(false)
            setMessageText("")
            toast.success('Task complete requested successfully')
        },
    });  





    const handleSubmit = () => {
          const data =
            { campaignId: selectedCampaign?._id, brandId: selectedCampaign?.brandId, applicationId: selectedApplication, message: messageText, creatorId: session?.user?.id , is_task_message: true, task_completed_status: "requested" }
        sendNewMessage({data})

        }
    



  





  








  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Mark Task Complete</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] border-border">
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to mark this task as complete? You can also add a message below.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Add a message..."
            className="w-full rounded-md border border-border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
