"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DollarSign, MessageSquare, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { ICampaign } from "@/app/dashboard/jobs/(helper)/helper";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../(helper)";
import { queryClient } from '@/components/providers';
import { Textarea } from "@/components/ui/textarea";

export function ProposeAmountModal({ influencerName = "Influencer", selectedCampaign , selectedApplication }: { influencerName?: string, selectedCampaign?: ICampaign , selectedApplication?: string }) {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
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
        },
    });  





    const handleSubmit = () => {
        if (!amount || Number(amount) <= 0) {
            toast("Please enter a valid amount");
            return;
        }
        const data =
            { campaignId: selectedCampaign?._id, brandId: selectedCampaign?.brandId, applicationId: selectedApplication, message: message, creatorId: session?.user?.id , amount_proposed: amount }
        sendNewMessage({data})

        console.log("Proposed amount:", amount);
        setAmount("");
        setOpen(false);
    };









    //  ============================== render =================================
    return (
       <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full group">
              {/* <Sparkles className="h-4 w-4 transition-transform text-xs group-hover:rotate-12" /> */}
              Propose Amount
            </Button>
          </DialogTrigger>
    
          <DialogContent className="max-w-md rounded-2xl border-accent/20 bg-gradient-to-b from-card to-card/95 backdrop-blur-xl shadow-[0_20px_70px_-10px_hsl(217,91%,60%,0.2)]">
            <DialogHeader className="space-y-3">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center ">
                Propose Amount
              </DialogTitle>
              <p className="text-sm text-muted-foreground text-center">
                Make an offer to collaborate with <span className="font-semibold text-foreground">{influencerName}</span>
              </p>
            </DialogHeader>
    
            <div className="space-y-6 mt-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4 " />
                  Payment Amount
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg opacity-0  blur transition-opacity duration-300" />
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-lg">
                     ₹
                    </span>
                    <Input
                      id="amount"
                      type="text"
                      placeholder="5,000"
                                   value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 pr-4 h-12 text-lg font-semibold bg-card/50 border-2 border-border focus:border-accent transition-all duration-300"
                    />
                  </div>
                </div>
    
              </div>
    
              {/* Message Textarea */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 " />
                  Your Message
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0  rounded-lg  transition-opacity duration-300" />
                  <Textarea
                    id="message"
                    placeholder="Hi! I'd love to collaborate with you on this campaign. Looking forward to working together..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] resize-none bg-card/50  border-2 border-border focus:border-accent transition-all duration-300 relative"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {message.length}/500 characters
                </p>
              </div>
            </div>
    
            <DialogFooter className="mt-8 gap-3 sm:gap-3">
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="flex-1 h-11 hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!amount || !message.trim() || isPending}
                variant="default"
                className="flex-1 h-11"
              >
                {isPending ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Send Proposal
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    );
}
