import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar, Package, DollarSign, MapPin, Clock, Tag, Image, Plus, X, Video, Gift, CheckCircle2, Instagram, Facebook, Check } from 'lucide-react';
import { InfluencerCategoriesSelect } from '@/components/shared/influencer-categories-select';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/components/providers';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useUser } from '@/context/CreatorContext';
import { useRouter } from 'next/navigation';
import { useFileUpload } from '@/hooks/useFileUpload';
import StateCitySelector from '@/components/shared/StateCitySelector';
import { createCampaign } from '@/app/dashboard/jobs/(helper)/helper';

interface IBarterProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_urls: string[];
}

interface IDeliverable {
  type: 'long-video' | 'short-video' | 'image' | 'text' | 'story';
  count: number;
}

interface ICampaignFormData {
  brandName: string;
  brandImage: string;
  title: string;
  description: string;
  type: 'paid' | 'barter' | 'barter-commission';
  product_provided: boolean;
  barter_product: IBarterProduct[];
  reference_video_url: string;
  price: {
    type: 'fixed' | 'range';
    fixed_price: number;
    min_price: number;
    max_price: number;
  };
  duration: string;
  location: string;
  platform: ('instagram' | 'tiktok' | 'youtube' | 'facebook')[];
  deliverables: IDeliverable[];
  requirements: string[];
  category: string[];
  start_date: string;
  end_date: string;
  media_assets: string[];
}

// Predefined common requirements
const COMMON_REQUIREMENTS = [
  'Minimum 10k followers',
  'Minimum 50k followers',
  'Minimum 100k followers',
  'Engagement rate above 3%',
  'Engagement rate above 5%',
  'Must be located in US',
  'Must have worked with similar brands',
  'Professional content quality',
  'Active audience in target demographic',
  'Prior brand collaboration experience',
];

const DELIVERABLE_TYPES: Array<{ value: IDeliverable['type']; label: string }> = [
  { value: 'long-video', label: 'Long Video (YouTube, IGTV)' },
  { value: 'short-video', label: 'Short Video (Reels, TikTok)' },
  { value: 'story', label: 'Story' },
  { value: 'image', label: 'Image Post' },
  { value: 'text', label: 'Text Post' },
];

export default function CreateCampaignModalForOtherBrands() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState<ICampaignFormData>({
    brandName: '',
    brandImage: '',
    title: '',
    description: '',
    type: 'paid',
    product_provided: false,
    barter_product: [],
    reference_video_url: '',
    price: {
      type: 'fixed', //or range
      fixed_price: 0,
      min_price: 0,
      max_price: 0,
    },
    duration: '',
    location: '',
    platform: ['instagram'],
    deliverables: [],
    requirements: [],
    category: [],
    start_date: '',
    end_date: '',
    media_assets: [],
  });

  const [mediaAssetInput, setMediaAssetInput] = useState('');
  const [customRequirement, setCustomRequirement] = useState('');





  // Deliverable inputs
  const [deliverableType, setDeliverableType] = useState<IDeliverable['type']>('short-video');
  const [deliverableCount, setDeliverableCount] = useState(1);

  // Barter product inputs
  const [barterProduct, setBarterProduct] = useState<IBarterProduct>({
    name: '',
    description: '',
    price: 0,
    quantity: 1,
    image_urls: [],
  });
  const [barterImageInput, setBarterImageInput] = useState('');

  const { data: session } = useSession();
  const { uploadFile, deleteFile, loading } = useFileUpload();

  const {
    mutate: createNewCampaign,
    isPending,
  } = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast.success('Campaign created successfully');
      setOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error('Failed to create campaign');
    },
  });

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedCategories([]);
    setFormData({
      brandName: '',
      brandImage: '',
      title: '',
      description: '',
      type: 'paid',
      product_provided: false,
      barter_product: [],
      reference_video_url: '',
      price: {
        type: 'fixed', //or range
        fixed_price: 0,
        min_price: 0,
        max_price: 0,
      },
      duration: '',
      location: '',
      platform: ['instagram'],
      deliverables: [],
      requirements: [],
      category: [],
      start_date: '',
      end_date: '',
      media_assets: [],
    });
    setBarterProduct({
      name: '',
      description: '',
      price: 0,
      quantity: 1,
      image_urls: [],
    });
  };

  const { instagramData, loading : userLoading } = useUser()
  const router = useRouter();

  console.log(userLoading, "userLoading *************", instagramData)




  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.title.trim() || !formData.description.trim()) {
          toast.error('Please fill in title and description.');
          return false;
        }
        return true;

      case 2:
        // Pricing validation
            if (formData.price.type === 'fixed' && formData.price.fixed_price === 0) {
            toast.error('Please fill in price.');
            return false;
          }
          //MIN PRICE 500
          if (formData.price.type === 'fixed' && formData.price.fixed_price < 500) {
            toast.error('Price must be at least 500.');
            return false;
          }
          if (formData.price.type === 'range' && formData.price.max_price < formData.price.min_price) {
            toast.error('End price cannot be lower than start price.');
            return false;
          }
              //MIN PRICE 500
          if (formData.price.type === 'range' && formData.price.min_price < 500) {
            toast.error('Min price must be at least 500.');
            return false;
          }

        // Barter validation
        if ((formData.type === 'barter' || formData.type === 'barter-commission') &&
          formData.barter_product.length === 0) {
          toast.error('Please add at least one barter product.');
          return false;
        }

        return true;

      case 3:
        // if (!formData.duration.trim() || !formData.location.trim()) {
        //   toast.error('Please fill in duration and location.');
        //   return false;
        // }

        if (!formData.start_date || !formData.end_date) {
          toast.error('Please select start and end dates.');
          return false;
        }

        const start = new Date(formData.start_date);
        const end = new Date(formData.end_date);
        if (end < start) {
          toast.error('End date cannot be earlier than start date.');
          return false;
        }

        if (selectedCategories.length === 0) {
          toast.error('Please select at least one category.');
          return false;
        }

        return true;

      case 4:
        if (formData.deliverables.length === 0) {
          toast.error('Please add at least one deliverable.');
          return false;
        }
        return true;

      default:
        return true;
    }
  };


  const handleAddBarterImage = () => {
    if (barterImageInput.trim()) {
      setBarterProduct((prev) => ({
        ...prev,
        image_urls: [...prev.image_urls, barterImageInput.trim()],
      }));
      setBarterImageInput('');
    }
  };

  const handleRemoveBarterImage = async (index: number) => {
    const imageUrl = barterProduct.image_urls[index];
    const filename = imageUrl.split("/").pop()!;
    const success = await deleteFile("barter-products", filename);

    if (success) {
      setBarterProduct((prev) => ({
        ...prev,
        image_urls: prev.image_urls.filter((_, i) => i !== index),
      }));
      toast.success("Image deleted successfully!");
    } else {
      toast.error("Failed to delete image.");
    }
  };

  const handleRemoveMediaAsset = async (index: number) => {
    const url = formData.media_assets[index];
    const filename = url.split("/").pop()!;
    const success = await deleteFile("campaign-media-assets", filename);

    if (success) {
      setFormData((prev) => ({
        ...prev,
        media_assets: prev.media_assets.filter((_, i) => i !== index),
      }));
      toast.success("Media asset deleted successfully!");
    } else {
      toast.error("Failed to delete file.");
    }
  };



  const handleAddBarterProduct = () => {
    if (barterProduct.name && barterProduct.description) {
      setFormData((prev) => ({
        ...prev,
        barter_product: [...prev.barter_product, { ...barterProduct }],
      }));
      setBarterProduct({
        name: '',
        description: '',
        price: 0,
        quantity: 1,
        image_urls: [],
      });
      toast.success('Barter product added');
    } else {
      toast.error('Please fill in product name and description');
    }
  };

  const handleRemoveBarterProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      barter_product: prev.barter_product.filter((_, i) => i !== index),
    }));
  };

  const handleAddDeliverable = () => {
    if (deliverableCount > 0) {
      setFormData((prev) => ({
        ...prev,
        deliverables: [...prev.deliverables, { type: deliverableType, count: deliverableCount }],
      }));
      setDeliverableCount(1);
      toast.success('Deliverable added');
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index),
    }));
  };

  const handleToggleRequirement = (requirement: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.includes(requirement)
        ? prev.requirements.filter((r) => r !== requirement)
        : [...prev.requirements, requirement],
    }));
  };

  const handleAddCustomRequirement = () => {
    if (customRequirement.trim() && !formData.requirements.includes(customRequirement.trim())) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, customRequirement.trim()],
      }));
      setCustomRequirement('');
    }
  };

  const handleRemoveRequirement = (requirement: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((r) => r !== requirement),
    }));
  };

  const handleSubmit = () => {

    if (!session?.user?.id) {
      toast.error('Please login to create a campaign.');
      router.push('/login');
      return;
    }





    // ✅ Basic required fields
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in the required fields: title and description.');
      return;
    }



    // ✅ Pricing validation (only for paid or barter-commission)
 
      if (formData.price.type === 'fixed' && !formData.price.fixed_price) {
        toast.error('Please provide fixed price.');
        return;
      }
      if (formData.price.type === 'range' && !formData.price.min_price && !formData.price.max_price) {
        toast.error('Please provide price range.');
        return;
      }
    

    // ✅ Barter validation
    if ((formData.type === 'barter' || formData.type === 'barter-commission') && formData.barter_product.length === 0) {
      toast.error('Please add at least one barter product.');
      return;
    }

    // ✅ Deliverables validation
    if (formData.deliverables.length === 0) {
      toast.error('Please add at least one deliverable.');
      return;
    }

    // ✅ Category validation
    if (selectedCategories.length === 0) {
      toast.error('Please select at least one category.');
      return;
    }

    // ✅ Date validation
    if (!formData.start_date || !formData.end_date) {
      toast.error('Please select both start and end dates.');
      return;
    }

    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    if (endDate < startDate) {
      toast.error('End date cannot be earlier than start date.');
      return;
    }

    // ✅ Check if end date exceeds 30 days from start date
    const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    if (dayDiff > 30) {
      toast.error('End date cannot be more than 30 days from the start date.');
      return;
    }

    // ✅ All good → prepare payload
    const data = {
      brandId: session?.user?.id,
      brandName: formData.brandName,
      brandImage: formData.brandImage,
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type,
      product_provided: formData.product_provided,
      barter_product: formData.barter_product,
      reference_video_url: formData.reference_video_url.trim(),
      price: formData.price,
      duration: formData.duration.trim(),
      start_date: formData.start_date,
      end_date: formData.end_date,
      location: formData.location.trim(),
      platform: formData.platform,
      deliverables: formData.deliverables,
      requirements: formData.requirements,
      category: selectedCategories,
      media_assets: formData.media_assets,

    };

    // ✅ Submit the campaign
    //@ts-ignore
    createNewCampaign(data);
  };

  const steps = [
    { num: 1, title: 'Basic Info' },
    { num: 2, title: 'Pricing & Products' },
    { num: 3, title: 'Details' },
    { num: 4, title: 'Requirements' },
  ];

  const showBarterFields = formData.type === 'barter' || formData.type === 'barter-commission';
  const showPricingFields = formData.type === 'paid' || formData.type === 'barter-commission';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 w-full">
          <Plus className="w-5 h-5" />
          Create Campaign For brands
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[800px] max-w-full max-h-[90vh] overflow-y-auto border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Campaign</DialogTitle>
          <DialogDescription>
            Fill in the details to launch your influencer marketing campaign
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="hidden lg:flex items-center  justify-center gap-2 py-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${currentStep >= step.num
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                    }`}
                >
                  {step.num}
                </div>
                <span
                  className={`text-sm font-medium ${currentStep >= step.num ? 'text-blue-600' : 'text-gray-500'
                    }`}
                >
                  {step.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 ${currentStep > step.num ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in-50 duration-300">
              <div className="space-y-2">
                <Label htmlFor="title">Brand Name *</Label>
                <Input
                  id="title"
                  placeholder="Enter a catchy campaign title"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Brand Image *</Label>
                <Input
                  id="title"
                  placeholder="Enter a catchy campaign title"
                  // value={formData.brandImage}
                      onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const url = await uploadFile(file, "barter-products");
                            if (url) {
                              setFormData((prev) => ({
                                ...prev,
                                brandImage: url,
                              }));
                              toast.success("Image uploaded successfully!");
                            } else {
                              toast.error("Failed to upload image.");
                            }

                            // Reset input
                            e.target.value = "";
                          }}
                  required
                  type="file"
                />
   {loading && (
                          <p className="text-sm text-gray-500 animate-pulse">Uploading...</p>
                        )}
                {
                  formData.brandImage && (
                    <div className="mt-2">
                      <img
                        src={formData.brandImage}
                        alt="Brand Image"
                        className="rounded-md w-24 h-24 object-cover"
                      />
                    </div>
                  )
                }
              </div>

               <div className="space-y-2">
                <Label htmlFor="title">Campaign Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter a catchy campaign title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign goals, target audience, and expectations..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid  gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Campaign Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(val: 'paid' | 'barter' | 'barter-commission') =>
                      setFormData({ ...formData, type: val })
                    }
                  >
                    <SelectTrigger id="type" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Paid Campaign
                        </div>
                      </SelectItem>
                      <SelectItem value="barter">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Barter/Exchange
                        </div>
                      </SelectItem>
                      <SelectItem value="barter-commission">
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4" />
                          Barter + Commission
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>

              {/* <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="product">Product Provided</Label>
                  <p className="text-sm text-gray-500">Will you provide products to influencers?</p>
                </div>
                <Switch
                  id="product"
                  checked={formData.product_provided}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, product_provided: checked })
                  }
                />
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="reference_video" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Reference Video URL (optional)
                </Label>
                <Input
                  id="reference_video"
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.reference_video_url}
                  onChange={(e) =>
                    setFormData({ ...formData, reference_video_url: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  Share a reference video to show the style you're looking for
                </p>
              </div>


              <div className="space-y-3">
                <Label htmlFor="platform" className="text-sm font-medium">
                  Select Platform(s)
                </Label>
                <div className="flex flex-wrap gap-3">
                  {/* Instagram */}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        platform: formData.platform.includes('instagram')
                          ? formData.platform.filter(p => p !== 'instagram')
                          : [...formData.platform, 'instagram']
                      })
                    }}
                    className={`
        group relative flex items-center gap-2 px-4 py-2.5 rounded-lg 
        cursor-pointer transition-all duration-300 ease-out
        bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] to-[#bc1888]
        hover:shadow-lg hover:scale-105 active:scale-95
        ${formData.platform.includes('instagram')
                        ? 'ring-2 ring-offset-2 ring-[#bc1888] shadow-md'
                        : 'hover:shadow-[#bc1888]/30'
                      }
      `}
                    aria-pressed={formData.platform.includes('instagram')}
                    aria-label="Toggle Instagram"
                  >
                    <Instagram className="w-5 h-5 text-white drop-shadow" />
                    <span className="text-white font-semibold text-sm">Instagram</span>

                    {/* Animated Checkmark */}
                    {formData.platform.includes('instagram') && (
                      <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md animate-in zoom-in duration-200">
                        <Check className="w-3.5 h-3.5 text-[#bc1888]" strokeWidth={3} />
                      </div>
                    )}
                  </button>

                  {/* Facebook */}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        platform: formData.platform.includes('facebook')
                          ? formData.platform.filter(p => p !== 'facebook')
                          : [...formData.platform, 'facebook']
                      })
                    }}
                    className={`
        group relative flex items-center gap-2 px-4 py-2.5 rounded-lg
        cursor-pointer transition-all duration-300 ease-out
        bg-gradient-to-br from-[#1877F2] to-[#0d5dbf]
        hover:shadow-lg hover:scale-105 active:scale-95
        ${formData.platform.includes('facebook')
                        ? 'ring-2 ring-offset-2 ring-[#1877F2] shadow-md'
                        : 'hover:shadow-[#1877F2]/30'
                      }
      `}
                    aria-pressed={formData.platform.includes('facebook')}
                    aria-label="Toggle Facebook"
                  >
                    <Facebook className="w-5 h-5 text-white drop-shadow" />
                    <span className="text-white font-semibold text-sm">Facebook</span>

                    {/* Animated Checkmark */}
                    {formData.platform.includes('facebook') && (
                      <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md animate-in zoom-in duration-200">
                        <Check className="w-3.5 h-3.5 text-[#1877F2]" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Step 2: Pricing & Products */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in-50 duration-300">
              
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Pricing Type</Label>
                    <Select value={formData.price.type} onValueChange={(val: 'fixed' | 'range') => setFormData({ ...formData, price: { ...formData.price, type: val } })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Pricing Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="range">Price Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.price.type === 'fixed' && (
                    <div className="space-y-2">
                      <Label>Price </Label>
                      <Input
                        type="number"
                        placeholder="e.g., 500"
                        value={formData.price?.fixed_price || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, price: { ...formData.price, fixed_price: Number(e.target.value) } })
                        }
                      />
                    </div>
                  )}
                  {formData.price.type === 'range' && (
                    <>
                      <div className="space-y-2">
                        <Label>Min Price </Label>
                        <Input
                          type="number"
                          placeholder="e.g., 500"
                          value={formData.price?.min_price || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, price: { ...formData.price, min_price: Number(e.target.value) } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Price </Label>
                        <Input
                          type="number"
                          placeholder="e.g., 500"
                          value={formData.price?.max_price || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, price: { ...formData.price, max_price: Number(e.target.value) } })
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
            

              {showBarterFields && (
                <div className="space-y-4 p-4 bg-accent rounded-lg">
                  <Label className="text-lg font-semibold flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Barter Products
                  </Label>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Product Name *</Label>
                      <Input
                        placeholder="e.g., Premium Skincare Set"
                        value={barterProduct.name}
                        onChange={(e) =>
                          setBarterProduct({ ...barterProduct, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Product Description *</Label>
                      <Textarea
                        placeholder="Describe the product..."
                        value={barterProduct.description}
                        onChange={(e) =>
                          setBarterProduct({ ...barterProduct, description: e.target.value })
                        }
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Price (Rs.)</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={barterProduct.price || ''}
                          onChange={(e) =>
                            setBarterProduct({ ...barterProduct, price: Number(e.target.value) })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          placeholder="1"
                          value={barterProduct.quantity}
                          onChange={(e) =>
                            setBarterProduct({
                              ...barterProduct,
                              quantity: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Product Images</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const url = await uploadFile(file, "barter-products");
                            if (url) {
                              setBarterProduct((prev) => ({
                                ...prev,
                                image_urls: [...prev.image_urls, url],
                              }));
                              toast.success("Image uploaded successfully!");
                            } else {
                              toast.error("Failed to upload image.");
                            }

                            // Reset input
                            e.target.value = "";
                          }}
                          disabled={loading}
                        />
                        {loading && (
                          <p className="text-sm text-gray-500 animate-pulse">Uploading...</p>
                        )}
                      </div>

                      {barterProduct.image_urls.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {barterProduct.image_urls.map((url, idx) => (
                            <div key={idx} className="relative group">
                              <img
                                src={url}
                                alt=""
                                className="w-20 h-20 object-cover rounded"
                              />
                              <button
                                onClick={() => handleRemoveBarterImage(idx)}
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>


                    <Button
                      type="button"
                      onClick={handleAddBarterProduct}
                      className="w-full"
                    >
                      Add Product
                    </Button>
                  </div>

                  {formData.barter_product.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <Label>Added Products ({formData.barter_product.length})</Label>
                      {formData.barter_product.map((product, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-background rounded border"
                        >
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {product.quantity} • ${product.price}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveBarterProduct(idx)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in-50 duration-300">


              <div className="space-y-2">

                <StateCitySelector
                  city={formData.location}
                  setCity={(city) => setFormData({ ...formData, location: city })}
                />
                {/* <Input
                  id="location"
                  placeholder="e.g., New York, USA or Remote"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                /> */}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    End Date
                  </Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Categories
                </Label>
                <InfluencerCategoriesSelect
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              </div>

              <div className="space-y-2">
                <Label>Media Assets (Images or Videos)</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={loading}
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files?.length) return;

                      const uploadedUrls: string[] = [];

                      for (const file of Array.from(files)) {
                        const url = await uploadFile(file, "campaign-media-assets");
                        if (url) uploadedUrls.push(url);
                      }

                      if (uploadedUrls.length > 0) {
                        setFormData((prev) => ({
                          ...prev,
                          media_assets: [...prev.media_assets, ...uploadedUrls],
                        }));
                        toast.success(`${uploadedUrls.length} file(s) uploaded successfully!`);
                      }

                      e.target.value = "";
                    }}
                  />
                  {loading && (
                    <p className="text-sm text-gray-500 animate-pulse">Uploading...</p>
                  )}
                </div>

                {formData.media_assets.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-2">
                    {formData.media_assets.map((url, index) => (
                      <div key={index} className="relative group">
                        {url.match(/\.(mp4|mov|webm)$/i) ? (
                          <video
                            src={url}
                            controls
                            className="w-28 h-28 object-cover rounded"
                          />
                        ) : (
                          <img
                            src={url}
                            alt="asset"
                            className="w-28 h-28 object-cover rounded"
                          />
                        )}

                        <button
                          onClick={() => handleRemoveMediaAsset(index)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Step 4: Requirements & Deliverables */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              {/* Deliverables Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Deliverables
                </Label>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2 col-span-2">
                    <Label>Type</Label>
                    <Select
                      value={deliverableType}
                      onValueChange={(val: IDeliverable['type']) => setDeliverableType(val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DELIVERABLE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Count</Label>
                    <Input
                      type="number"
                      min="1"
                      value={deliverableCount}
                      onChange={(e) => setDeliverableCount(Number(e.target.value))}
                    />
                  </div>
                </div>

                <Button type="button" onClick={handleAddDeliverable} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Deliverable
                </Button>

                {formData.deliverables.length > 0 && (
                  <div className="space-y-2">
                    <Label>Added Deliverables ({formData.deliverables.length})</Label>
                    <div className="space-y-2">
                      {formData.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-accent rounded"
                        >
                          <div>
                            <p className="font-medium capitalize">
                              {item.type.replace('-', ' ')}
                            </p>
                            <p className="text-sm text-gray-500">Count: {item.count}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveDeliverable(idx)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Requirements Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Requirements</Label>

                {/* Common Requirements */}
                <div className="space-y-2">
                  <Label className="text-sm">Select Common Requirements</Label>
                  <div className="grid grid-cols-2 gap-2 p-4 bg-accent rounded-lg max-h-60 overflow-y-auto">
                    {COMMON_REQUIREMENTS.map((requirement) => (
                      <button
                        key={requirement}
                        type="button"
                        onClick={() => handleToggleRequirement(requirement)}
                        className={`flex items-center gap-2 p-3 rounded-lg text-left text-sm transition-all ${formData.requirements.includes(requirement)
                          ? 'bg-blue-600 text-white'
                          : 'bg-background hover:bg-card'
                          }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 ${formData.requirements.includes(requirement)
                            ? 'opacity-100'
                            : 'opacity-30'
                            }`}
                        />
                        <span>{requirement}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Requirement */}
                <div className="space-y-2">
                  <Label>Add Custom Requirement</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Must provide draft for approval"
                      value={customRequirement}
                      onChange={(e) => setCustomRequirement(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomRequirement();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddCustomRequirement}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Selected Requirements */}
                {formData.requirements.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Requirements ({formData.requirements.length})</Label>
                    <div className="space-y-2">
                      {formData.requirements.map((requirement, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-accent rounded"
                        >
                          <span className="text-sm flex-1">{requirement}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveRequirement(requirement)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-blue-900/20 rounded-lg">
                <p className="text-sm">
                  <strong>Tip:</strong> Clear deliverables and requirements help attract the
                  right influencers and set proper expectations.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={() => {
                  if (validateStep()) {
                    setCurrentStep(Math.min(4, currentStep + 1))
                  }

                }}


              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? 'Creating...' : 'Create Campaign'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}