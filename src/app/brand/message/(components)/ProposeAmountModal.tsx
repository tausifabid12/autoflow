import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, Calendar, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ICampaign } from '@/app/dashboard/jobs/(helper)/helper';

export const ProposeAmountModal = ({ influencerName, selectedCampaign, selectedApplication } : { influencerName : string, selectedCampaign : ICampaign, selectedApplication : any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !message || !deliveryDate) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Proposal sent successfully!', {
      description: `Proposed $${amount} to ${influencerName}`
    });
    
    // Reset form
    setAmount('');
    setMessage('');
    setDeliveryDate('');
    setIsOpen(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          data-testid="propose-amount-button"
        >
          <DollarSign className="w-4 h-4 mr-2" />
          Propose Amount
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-2 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Propose Collaboration
          </DialogTitle>
          <DialogDescription className="text-base">
            Send a proposal to {influencerName} for "{selectedCampaign?.title}"
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-semibold flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Proposed Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
              <Input
                id="amount"
                type="number"
                placeholder="1500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 h-12 text-lg font-semibold border-2 focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                min="0"
                step="50"
                required
                data-testid="amount-input"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Budget: ₹{selectedCampaign?.price?.fixed_price ? `${selectedCampaign?.price?.fixed_price}` : `${selectedCampaign?.price?.min_price} - ${selectedCampaign?.price?.max_price}`}
            </p>
          </div>

          {/* Delivery Date */}
          <div className="space-y-2">
            <Label htmlFor="delivery-date" className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Expected Delivery Date
            </Label>
            <Input
              id="delivery-date"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="h-12 border-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              min={new Date().toISOString().split('T')[0]}
              required
              data-testid="delivery-date-input"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold flex items-center gap-2">
              <Send className="w-4 h-4 text-purple-600" />
              Proposal Message
            </Label>
            <Textarea
              id="message"
              placeholder="Hi! We'd love to collaborate with you on this campaign. Here's what we're offering..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none border-2 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              required
              data-testid="message-input"
            />
            <p className="text-xs text-muted-foreground">
              {message.length}/500 characters
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-2 hover:bg-accent transition-all duration-200"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              disabled={isSubmitting}
              data-testid="submit-proposal-button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Proposal
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
