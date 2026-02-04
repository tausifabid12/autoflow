

export interface IUser {
  user_id?: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: number;
  email: string;
  password?: string; 
  role: "admin" | "brand" | "creator";
  industry: string[];
  profile_pic?: string;
  profilePicture?: string;
  googleId?: string;
  authProvider?: "local" | "google";
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  created_at?: Date;
  updated_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  instagram_profile_id?: string;
  facebook_profile_id?: string;

  bank_branch?: string;
  bank_name?: string;
  bank_account_number?: string;
  bank_ifsc_code?: string;
  bank_account_holder_name?: string;
}



 export const validateForm = (formData: any) => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (formData.industry.length === 0) newErrors.industry = 'Select at least one industry';
    return newErrors
  };


 export async function signup({data}: {data: IUser}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return error;
        
    }
    
 }