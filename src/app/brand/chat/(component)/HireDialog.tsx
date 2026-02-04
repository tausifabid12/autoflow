'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { CalendarIcon, DollarSign, Loader2 } from 'lucide-react';

interface HireDialogProps {
  isOpen: boolean;
  onClose: () => void;
  brandId: string;
  influencerId: string;
  influencerName: string;
}

export function HireDialog({
  isOpen,
  onClose,
  brandId,
  influencerId,
  influencerName,
}: HireDialogProps) {
  const [form, setForm] = useState({
    amount: '',
    deliveryDate: undefined as Date | undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: 'amount' | 'deliveryDate', value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validateForm = (): boolean => {
    const { amount, deliveryDate } = form;

    if (!amount || !deliveryDate) {
      toast.error('Please fill in all fields');
      return false;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      toast.error('Please enter a valid amount');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const { amount, deliveryDate } = form;
    const amountNumber = parseFloat(amount);

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/hire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand_id: brandId,
          influencer_id: influencerId,
          amount: amountNumber,
          delivery_date: format(deliveryDate!, 'yyyy-MM-dd'),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.error || 'Failed to create contract');

      toast.success(`Successfully hired ${influencerName}!`, {
        description: `Amount: $${amountNumber.toFixed(2)} | Delivery: ${format(
          deliveryDate!,
          'MMM dd, yyyy'
        )}`,
      });

      setForm({ amount: '', deliveryDate: undefined });
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setForm({ amount: '', deliveryDate: undefined });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Hire {influencerName}
          </DialogTitle>
          <DialogDescription>
            Fill in contract details carefully before confirming the hire.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Payment Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-semibold">
              Payment Amount
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                disabled={isSubmitting}
                className="pl-9 border-2 focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                min="0"
                step="0.01"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Total payment amount for this collaboration.
            </p>
          </div>

          {/* Delivery Date */}
          <div className="space-y-2">
            <Label htmlFor="delivery-date" className="text-sm font-semibold">
              Delivery Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="delivery-date"
                  variant="outline"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full justify-start text-left font-normal border-2 hover:border-emerald-500 transition-all duration-200',
                    !form.deliveryDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.deliveryDate
                    ? format(form.deliveryDate, 'PPP')
                    : 'Select a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={form.deliveryDate}
                  onSelect={(date) => handleChange('deliveryDate', date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              Expected completion date of the project.
            </p>
          </div>

          {/* Contract Summary */}
          {form.amount && form.deliveryDate && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-2 border-emerald-200 dark:border-emerald-800">
              <h4 className="font-semibold text-sm mb-2 text-emerald-900 dark:text-emerald-100">
                Contract Summary
              </h4>
              <div className="space-y-1 text-sm">
                <SummaryItem label="Influencer" value={influencerName} />
                <SummaryItem
                  label="Amount"
                  value={`$${parseFloat(form.amount).toFixed(2)}`}
                  valueClass="text-emerald-700 dark:text-emerald-400"
                />
                <SummaryItem
                  label="Delivery"
                  value={format(form.deliveryDate, 'MMM dd, yyyy')}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="border-2"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!form.amount || !form.deliveryDate || isSubmitting}
            className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Creating Contract...' : 'Confirm Hire'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SummaryItem({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}:</span>
      <span className={cn('font-medium', valueClass)}>{value}</span>
    </div>
  );
}
