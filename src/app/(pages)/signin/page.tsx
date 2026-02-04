'use client'
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Phone, FileText, UserCircle, Building2, Sparkles, Search, Check, User2 } from "lucide-react";
import Link from "next/link";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CATEGORIES } from '@/lib/categories';
import { useRouter } from 'next/navigation';
import { signup } from "@/app/auth/sign-up/(helper)";
import { signIn } from "next-auth/react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    email: '',
    role: 'creator',
    password: '',
    confirmPassword: '',
    industry: [] as string[],
    referralCode: '',
    gstNumber: '',
    panCard: '',
    founderName: '',
  });

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    );
  }, []);

  // Signup mutation
  const { mutate: createNewSignup, isPending: isSignupPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success('Signup successful! Please sign in.');
      // Reset form and switch to login
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        username: '',
        email: '',
        role: 'creator',
        password: '',
        confirmPassword: '',
        industry: [],
        referralCode: '',
        gstNumber: '',
        panCard: '',
        founderName: '',
      });
      setCurrentStep(1);
      setIsLogin(true);
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Signup failed. Please try again.');
    },
  });

  const filteredCategories = CATEGORIES.filter(cat =>
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      industry: prev.industry.includes(category)
        ? prev.industry.filter(c => c !== category)
        : [...prev.industry, category],
    }));
  };

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateGST = (gst: string) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  const validatePAN = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First name and last name are required');
      return false;
    }
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid phone number (10-15 digits)');
      return false;
    }

    // Brand-specific validation
    if (formData.role === 'brand') {
      if (!formData.founderName.trim()) {
        setError('Founder name is required for brands');
        return false;
      }
      if (!formData.gstNumber.trim()) {
        setError('GST number is required for brands');
        return false;
      }
      if (!validateGST(formData.gstNumber)) {
        setError('Please enter a valid GST number (e.g., 22AAAAA0000A1Z5)');
        return false;
      }
      if (!formData.panCard.trim()) {
        setError('PAN card is required for brands');
        return false;
      }
      if (!validatePAN(formData.panCard)) {
        setError('Please enter a valid PAN card (e.g., ABCDE1234F)');
        return false;
      }
    }

    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setError('');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      handleNextStep();
      return;
    }

    if (formData.industry.length === 0) {
      setError('Please select at least one interest');
      return;
    }
    
    setError('');
    // @ts-ignore
    createNewSignup({ data: { ...formData, phone: Number(formData.phone) } });
  };

const handleLogin = async (
  e?: React.FormEvent,
  creds?: { email: string; password: string }
) => {
  if (e) e.preventDefault();

  const email = creds?.email ?? loginData.email;
  const password = creds?.password ?? loginData.password;

  if (!email.trim()) {
    setError('Email is required');
    return;
  }
  if (!validateEmail(email)) {
    setError('Please enter a valid email address');
    return;
  }
  if (!password) {
    setError('Password is required');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error('Invalid email or password');
    } else {
      toast.success('Login successful!');
      const session = await fetch('/api/auth/session').then(r => r.json());

      router.push(
        session?.user?.role === 'brand'
          ? '/brand/dashboard'
          : '/influencer/dashboard'
      );
    }
  } catch {
    toast.error('Something went wrong');
  } finally {
    setLoading(false);
  }
};


  const handleToggle = () => {
    const form = formRef.current;
    if (!form) return;

    // Animate out
    gsap.to(form, {
      opacity: 0,
      x: isLogin ? -50 : 50,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsLogin(!isLogin);
        setError('');
        setCurrentStep(1);
        // Animate in
        gsap.fromTo(
          form,
          { opacity: 0, x: isLogin ? 50 : -50 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-28 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Navigation */}
      <Link
        href="/"
        className="absolute top-6 left-6 font-display font-bold text-xl md:text-2xl tracking-tight hover:text-primary transition-colors"
      >
        CREATRIX
      </Link>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Toggle Tabs */}
        <div className="flex mb-8 bg-muted/50 rounded-full p-1 backdrop-blur-sm border border-white/5 max-w-md mx-auto">
          <button
            onClick={() => !isLogin && handleToggle()}
            className={`flex-1 py-3 px-6 rounded-full font-display font-semibold text-sm transition-all duration-300 ${
              isLogin
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => isLogin && handleToggle()}
            className={`flex-1 py-3 px-6 rounded-full font-display font-semibold text-sm transition-all duration-300 ${
              !isLogin
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div
          ref={formRef}
          className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl max-w-xl mx-auto" 
        >
          {isLogin ? (
            // LOGIN FORM
            <div>
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold mb-2">
                  Welcome Back
                </h1>
                <p className="text-foreground/60 font-body">
                  Sign in to continue your journey
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Field */}
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Email Address"
                    className="w-full bg-muted/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 font-body text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    className="w-full bg-muted/50 border border-white/10 rounded-xl py-4 pl-12 pr-12 font-body text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <a
                    href="#"
                    className="text-sm text-foreground/60 hover:text-primary transition-colors font-body"
                  >
                    Forgot password?
                  </a>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn-primary py-4 text-lg font-display font-semibold flex items-center justify-center gap-2 group"
                >
                 {
                  loading? <>loading...</> : <>
                   Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                 }
                </button>
              </form>
            </div>
          ) : (
            // SIGNUP FORM
            <>
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold mb-2">
                  {currentStep === 1 ? 'Join CREATRIX' : 'Choose Your Interests'}
                </h1>
                <p className="text-foreground/60 font-body">
                  {currentStep === 1
                    ? 'Create your account and start connecting'
                    : 'Select categories that match your passions'}
                </p>
              </div>

              {/* Progress Indicator */}
              {!isLogin && (
                <div className="mb-8 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
                      currentStep >= 1 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-pink-500' 
                        : 'border-white/20'
                    }`}>
                      {currentStep > 1 ? <Check className="w-5 h-5 text-white" /> : <span className="text-white font-semibold">1</span>}
                    </div>
                    <span className="text-foreground text-sm font-medium">Basic Info</span>
                  </div>
                  
                  <div className={`h-0.5 w-16 transition-all ${currentStep >= 2 ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-white/20'}`} />
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
                      currentStep === 2 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-blue-500' 
                        : 'border-white/20'
                    }`}>
                      <span className="text-white font-semibold">2</span>
                    </div>
                    <span className="text-foreground text-sm font-medium">Interests</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSignup}>
                {currentStep === 1 ? (
                  <div className="space-y-5">
                    {/* Role Selection */}
                    <div>
                      <label className="block text-foreground font-medium mb-3 text-sm">I am a</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, role: 'creator' }))}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.role === 'creator'
                              ? 'border-pink-500 bg-gradient-to-br from-pink-500/20 to-purple-500/20'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <UserCircle className={`w-8 h-8 ${formData.role === 'creator' ? 'text-pink-500' : 'text-gray-400'}`} />
                            <span className={`font-semibold ${formData.role === 'creator' ? 'text-foreground' : 'text-foreground/60'}`}>
                              Creator
                            </span>
                          </div>
                          {formData.role === 'creator' && (
                            <div className="absolute top-2 right-2">
                              <Check className="w-5 h-5 text-pink-500" />
                            </div>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, role: 'brand' }))}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.role === 'brand'
                              ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Building2 className={`w-8 h-8 ${formData.role === 'brand' ? 'text-blue-500' : 'text-gray-400'}`} />
                            <span className={`font-semibold ${formData.role === 'brand' ? 'text-foreground' : 'text-foreground/60'}`}>
                              Brand
                            </span>
                          </div>
                          {formData.role === 'brand' && (
                            <div className="absolute top-2 right-2">
                              <Check className="w-5 h-5 text-blue-500" />
                            </div>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                          className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        />
                      </div>

                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                          className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                      {/* Username */}
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder={formData.role === 'brand' ? 'Brand Name' : 'Username'}
                          className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        />
                      </div>

                      {/* Brand-specific fields */}
                      {formData.role === 'brand' && (
                        <>
                          <div className="relative group">
                            <UserCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                            <input
                              type="text"
                              name="founderName"
                              value={formData.founderName}
                              onChange={handleChange}
                              placeholder="Founder Name"
                              className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                              required
                            />
                          </div>

                          <div className="relative group">
                            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                            <input
                              type="text"
                              name="gstNumber"
                              value={formData.gstNumber}
                              onChange={handleChange}
                              placeholder="GST Number (e.g., 22AAAAA0000A1Z5)"
                              className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all uppercase"
                              required
                            />
                          </div>

                          <div className="relative group">
                            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                            <input
                              type="text"
                              name="panCard"
                              value={formData.panCard}
                              onChange={handleChange}
                              placeholder="PAN Card (e.g., ABCDE1234F)"
                              className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all uppercase"
                              required
                            />
                          </div>
                        </>
                      )}

                      {/* Password */}
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password (min 8 characters)"
                          className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Confirm Password */}
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Referral Code */}
                    <div className="relative group">
                      <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                      <input
                        type="text"
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleChange}
                        placeholder="Referral Code (Optional)"
                        className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full btn-primary py-4 text-lg font-display font-semibold flex items-center justify-center gap-2 group"
                    >
                      Next Step
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Search */}
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                      <input
                        type="text"
                        placeholder="Search interests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    {/* Categories */}
                    <div className="bg-muted/30 border border-white/10 rounded-xl p-4 max-h-80 overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {filteredCategories.map(cat => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                              formData.industry.includes(cat)
                                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                                : 'bg-muted/50 text-foreground/60 hover:bg-muted border border-white/10'
                            }`}
                          >
                            {cat}
                            {formData.industry.includes(cat) && (
                              <Check className="w-4 h-4 inline ml-1" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-center text-foreground/60 text-sm">
                      <strong className="text-primary">{formData.industry.length}</strong> interest
                      {formData.industry.length !== 1 && 's'} selected
                    </p>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 bg-muted/50 border border-white/10 text-foreground font-semibold py-3.5 rounded-xl hover:bg-muted transition-all duration-300"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSignupPending}
                        className="flex-1 btn-primary py-4 text-lg font-display font-semibold flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSignupPending ? 'Creating Account...' : 'Create Account'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-sm text-foreground/40 font-body">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button 
       onClick={() =>
    handleLogin(undefined, {
      email: "tausifabid@gmail.com",
      password: "12940000",
    })
  }
            className="flex items-center justify-center gap-2 py-3 px-4 bg-muted/50 border border-white/10 rounded-xl hover:border-primary/50 transition-all font-body">
              {/* <UserCircle/> */}
             {loading ? 'loading....'  : "Demo Login as Brand"}
            </button>
            <button
                 onClick={()=> {
              setLoginData({
                email: "tausifabid@gmail.com",
                password: "12940000"
              })

              handleLogin()
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-muted/50 border border-white/10 rounded-xl hover:border-primary/50 transition-all font-body">
              {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg> */}
                {loading ? "Loading...." : "Demo Login as Creator" }
            </button>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-sm text-foreground/40 mt-6 font-body">
          By continuing, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;