'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { addReview } from '../(helper)';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { queryClient } from '@/components/providers';

interface AddReviewModalProps {
  creatorId: string;
  creatorName: string;
  campaignId: string;
  campaignName: string;


}

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  creatorId,
  creatorName,
  campaignId,
  campaignName,
}) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');


  const { data: session } = useSession();



    const {
        mutate: createNewReview,
        isPending,
    } = useMutation({
        mutationFn: addReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['aiConfigs'] });
            toast.success('Review added')
            setOpen(false)
        },
    });  





  const handleSubmit = () => {
    if (!rating || !review.trim()) return alert('Please add rating and review.');
    createNewReview({data:{
       creator_id: creatorId,
        creator_name: creatorName,
        campaign_id: campaignId,
        campaign_name: campaignName,
        review: review,
        rating: rating,
        brand_id: session?.user?.id || '',
        brand_name: session?.user?.name || '',
        brand_logo: session?.user?.image || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
    }});
    setOpen(false);
    setRating(0);
    setReview('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className='bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white w-full h-11 text-base font-medium rounded'>Leave a Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-border">
        <DialogHeader>
          <DialogTitle>Add Review for {creatorName}</DialogTitle>
        </DialogHeader>

        {/* Rating Section */}
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
              <Star
                key={i}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  starValue <= (hover || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            );
          })}
        </div>

        {/* Review Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Review</label>
          <Textarea
            placeholder="Write your feedback..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit} className="w-full">
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;
