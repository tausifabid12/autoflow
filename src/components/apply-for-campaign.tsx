import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMutation } from '@tanstack/react-query';
import { applyForCampaign } from '@/app/dashboard/jobs/(helper)/helper';
import { queryClient } from '@/components/providers';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/CreatorContext';

export default function ApplyForCampaign({
  campaign_id,
  brandName,
  brandId,
  brandImage,
  duration,
  price,
}: {
  campaign_id: string;
  brandName: string;
  brandId: string;
  brandImage: string;
  duration: string;
  price:{
    type: 'fixed' | 'range';
    fixed_price: number;
    min_price: number;
    max_price: number;
  };
}) {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([{ id: 1, postType: '', postUrl: '' }]);
  const [pitch, setPitch] = useState('');
  const [amount, setAmount] = useState('');
  const [completionDuration, setCompletionDuration] = useState('');
  const { data: session } = useSession();
  const { userSubscription , instagramData, loading } = useUser();
  const router = useRouter();


  console.log(loading, 'loading', instagramData?.instagram_profile_id)





  const { mutate: createNewApplication, isPending } = useMutation({
    mutationFn: applyForCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast.success('Applied successfully');
      setOpen(false);
      setPosts([{ id: 1, postType: '', postUrl: '' }]);
      setPitch('');
      setAmount('');
      setCompletionDuration('');
    },
    onError: (error: any) => {
      if(error?.message == 'Already applied for this campaign'){
        toast.error('You have already applied for this campaign');
      }else{
        toast.error( 'Failed to apply for this campaign . Please try again later');
      }
    },
  });


console.log(instagramData, 'instagramData')

  const addPost = () => {
    const newId = Math.max(...posts.map((p) => p.id), 0) + 1;
    setPosts([...posts, { id: newId, postType: '', postUrl: '' }]);
  };

  const removePost = (id: any) => {
    if (posts.length > 1) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const updatePost = (id: any, field: any, value: any) => {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, [field]: value } : post))
    );
  };

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    console.log('Submitted:', { posts, pitch });

    if (!session?.user?.id) {
      toast.error('Please login to create a campaign.');
      router.push('/login');
      return;
    }

    if (session?.user?.role !== 'creator') {
      toast.error('You are not authorized to apply for a campaign.');
      return;
    }



    if(!userSubscription?.expire_date){
      toast.error('Please upgrade to a premium plan to create a campaign.');
      router.push('/pricing');
      return;
    }

    const expireDate = userSubscription?.expire_date;
    const isExpired = new Date(expireDate) < new Date();

    if (isExpired) {
      toast.error('Your subscription has expired. Please upgrade to a premium plan to create a campaign.');
      router.push('/pricing');
      return;
    }


    if(!loading && !instagramData?.instagram_profile_id){
      toast.error('Please connect your instagram to create a campaign.');
      router.push('/influencer/connect-instagram');
      return;
    }


    // ✅ Form Validation
    if (!pitch.trim()) {
      toast.error('Please write a pitch before submitting.');
      return;
    }

    if (pitch.trim().length < 20) {
      toast.error('Pitch should be at least 20 characters long.');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount greater than 0.');
      return;
    }

    if (!completionDuration || parseInt(completionDuration) <= 0) {
      toast.error('Please enter a valid completion duration.');
      return;
    }

    // for (const post of posts) {
    //   if (!post.postType) {
    //     toast.error('Please select a post type for all previous works.');
    //     return;
    //   }
    //   if (!post.postUrl.trim()) {
    //     toast.error('Please enter post URL for all previous works.');
    //     return;
    //   }
    //   if (!validateURL(post.postUrl)) {
    //     toast.error('Please enter a valid URL for all previous works.');
    //     return;
    //   }
    // }

    if (parseFloat(amount) < 500) {
      toast.error('Amount can not be less than 500.');
      return;
    }

    // if (price.type === 'range' && parseFloat(amount) <= price.min_price) {
    //   toast.error('Amount should be less than minimum price.');
    //   return;
    // }

    // if (price.type === 'range' && parseFloat(amount) > price.max_price) {
    //   toast.error('Amount should be greater than maximum price.');
    //   return;
    // }

    if(completionDuration <= duration){
      toast.error('Completion duration should be less than or equal to campaign duration.');
      return;
    }

    // ✅ If all validations pass
    const data = {
      pitch,
      amount_proposed: (parseFloat(amount)),
      completion_duration: completionDuration,
      previous_work: posts,
      creator_id: session?.user?.id,
      creator_profile_pic: session?.user?.image,
      creator_name: session?.user?.name,
      brand_name: brandName || 'Unknown',
      brand_id: brandId,
      brand_profile_pic: brandImage,
      campaign_id: campaign_id,
      // @ts-ignore
      creator_slug:instagramData?.slug,
    };

    createNewApplication({ data });
    setOpen(false);
  };

  const handleReset = () => {
    setPosts([{ id: 1, postType: '', postUrl: '' }]);
    setPitch('');
    setAmount('');
    setCompletionDuration('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild> */}
        <Button onClick={() => {
          if(!session?.user?.id){
            toast.error('Please login to apply for a campaign.');
            // router.push('/login');
            return;
          }else{
         setOpen(true)
          }
 
        }} size="lg" className="shadow-lg w-full">
          Apply
        </Button>
      {/* </DialogTrigger> */}
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto border-border">
        <DialogHeader>
          <DialogTitle>Post Pitch</DialogTitle>
          <DialogDescription>
            Add one or more posts with their URLs, then write your pitch.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Pitch */}
          <div className="space-y-2 pt-2">
            <Label htmlFor="pitch" className="text-base font-semibold">
              Pitch
            </Label>
            <Textarea
              id="pitch"
              placeholder="Write your pitch here..."
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2 pt-2">
            <Label htmlFor="amount" className="text-base font-semibold">
              Amount
            </Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Completion Duration */}
          <div className="space-y-2 pt-2">
            <Label
              htmlFor="completionDuration"
              className="text-base font-semibold"
            >
              Completion Duration (in days)
            </Label>
            <Input
              id="completionDuration"
              placeholder="Enter completion duration in days"
              type="number"
              value={completionDuration}
              onChange={(e) => setCompletionDuration(e.target.value)}
            />
          </div>

          {/* Posts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Previous Work</Label>
            </div>

            {posts.map((post, index) => (
              <div
                key={post.id}
                className="p-4 border border-border rounded-lg bg-card space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">
                    Post {index + 1}
                  </span>
                  {posts.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePost(post.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`postType-${post.id}`}>Post Type</Label>
                  <Select
                    value={post.postType}
                    onValueChange={(value) =>
                      updatePost(post.id, 'postType', value)
                    }
                  >
                    <SelectTrigger id={`postType-${post.id}`} className="w-full">
                      <SelectValue placeholder="Select post type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photo">Photo</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="reel">Reel</SelectItem>
                      <SelectItem value="shorts">Shorts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`postUrl-${post.id}`}>Post URL</Label>
                  <Input
                    id={`postUrl-${post.id}`}
                    placeholder="https://example.com/post"
                    value={post.postUrl}
                    onChange={(e) =>
                      updatePost(post.id, 'postUrl', e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addPost}
              className="w-full border-dashed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Post
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Pitch'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
