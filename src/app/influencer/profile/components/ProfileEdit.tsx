"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  Save,
  X,
  Upload,
  Loader2,
  Camera,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { IUser, updateProfile } from "../(helper)";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from '@/components/providers';
import { useFileUpload } from "@/hooks/useFileUpload";
import { CATEGORIES } from "@/lib/categories";

// === Interfaces ===

interface IProfileEditProps {
  user: IUser;
  onCancel: () => void;
  isLoading: boolean;
}



const ProfileEdit: React.FC<IProfileEditProps> = ({ user,  onCancel, isLoading }) => {
  const [formData, setFormData] = useState<any>({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    phone: user.phone,
    email: user.email,
    role: user.role,
    industry: user.industry || [],
    profile_pic: user.profile_pic || user.profilePicture,
    bank_account_holder_name: user.bank_account_holder_name,
    bank_account_number: user.bank_account_number,
    bank_ifsc_code: user.bank_ifsc_code,
    bank_name: user.bank_name,
    bank_branch: user.bank_branch,
  });
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  const [previewImage, setPreviewImage] = useState<string>(
    user.profile_pic || user.profilePicture || ""
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { uploadFile, loading: uploadingImage } = useFileUpload();

  const { mutate: updateNewProfile } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully!");
    },
  });

  // === Handlers ===
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev : any) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev : any) => ({ ...prev, role: value }));
  };

  const toggleIndustry = (industry: string) => {
    setFormData((prev : any) => {
      const currentIndustries = prev.industry || [];
      const isSelected = currentIndustries.includes(industry);
      return {
        ...prev,
        industry: isSelected
          ? currentIndustries.filter((i : any) => i !== industry)
          : [...currentIndustries, industry],
      };
    });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const uploadedUrl = await uploadFile(file, "profile");

    if (uploadedUrl) {

        console.log(uploadedUrl, "=============");
      setPreviewImage(uploadedUrl);
      setFormData((prev : any) => ({ ...prev, profile_pic: uploadedUrl }));
      toast.success("Profile picture uploaded successfully!");
    } else {
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(formData, "=============");

    if (!formData.firstName.trim()) return toast.error("First name is required");
    if (!formData.lastName.trim()) return toast.error("Last name is required");
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.phone) return toast.error("Phone number is required");

    updateNewProfile({data: {
        ...formData,
        user_id: user?._id
    }});
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Edit Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Update your personal information
            </p>
          </div>
          <Button onClick={onCancel} variant="outline" className="border-2">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <Card className="p-6 shadow-lg border-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              Profile Picture
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-2xl ring-4 ring-blue-100 dark:ring-blue-900"
                />
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Upload a new profile picture. Recommended size: 256x256px
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingImage ? "Uploading..." : "Upload New Picture"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Basic Information */}
          <Card className="p-6 shadow-lg border-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 shadow-lg border-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </Card>

          {/* bank details */}

       <Card className="p-6 shadow-lg border-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              Bank Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank_account_holder_name">Bank Account Holder Name</Label>
                <Input
                  id="bank_account_holder_name"
                  name="bank_account_holder_name"
                  type="text"
                  value={formData.bank_account_holder_name}
                  onChange={handleInputChange}
                  placeholder="Enter bank account holder name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_account_number">Bank Account Number</Label>
                <Input
                  id="bank_account_number"
                  name="bank_account_number"
                  type="text"
                  value={formData.bank_account_number}
                  onChange={handleInputChange}
                  placeholder="Enter bank account number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_ifsc_code">Bank IFSC Code</Label>
                <Input
                  id="bank_ifsc_code"
                  name="bank_ifsc_code"
                  type="text"
                  value={formData.bank_ifsc_code}
                  onChange={handleInputChange}
                  placeholder="Enter bank ifsc code"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_name">Bank Name</Label>
                <Input
                  id="bank_name"
                  name="bank_name"
                  type="text"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                  placeholder="Enter bank name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_branch">Bank Branch</Label>
                <Input
                  id="bank_branch"
                  name="bank_branch"
                  type="text"
                  value={formData.bank_branch}
                  onChange={handleInputChange}
                  placeholder="Enter bank branch"
                />
              </div>

            </div>
          </Card>

 {/* Industry Selection */}
           <Card className="p-6 shadow-lg border-2">
             <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
               <Tag className="w-5 h-5 text-purple-600" />
               Industries & Interests
             </h2>
             <div className="flex flex-wrap gap-2">
               {CATEGORIES?.slice(0, showAllIndustries ? CATEGORIES.length : 20).map((industry) => {
                 const isSelected = formData.industry?.includes(industry);
                 return (
                   <button
                     key={industry}
                     type="button"
                     onClick={() => toggleIndustry(industry)}
                     className={`px-4 py-2 rounded-xl text-sm font-medium ${
                       isSelected
                         ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                         : "bg-accent border-2 border-border hover:bg-muted"
                     }`}
                   >
                     {industry}
                   </button>
                 );
               })}
             </div>
             {CATEGORIES && CATEGORIES.length > 20 && (
               <button
                 type="button"
                 onClick={() => setShowAllIndustries(!showAllIndustries)}
                 className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
               >
                 {showAllIndustries ? "Show Less" : `View All (${CATEGORIES.length})`}
               </button>
             )}
           </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button type="button" onClick={onCancel} variant="outline" disabled={isLoading}>
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
