import { IUser } from "../../sign-up/(helper)";



 export const validateForm = (formData: any) => {
    const newErrors: Record<string, string> = {}
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors
  };


 export async function login({data}: {data: IUser}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/signin`, {
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