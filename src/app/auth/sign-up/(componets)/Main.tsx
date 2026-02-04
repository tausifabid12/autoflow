

//signup

'use client'

import { useState } from 'react';
import { User, Mail, Lock, Sparkles, Phone, Search, Check, Eye, EyeOff, Building2, FileText, UserCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../(helper)';
import { toast } from 'sonner';
import { CATEGORIES } from '@/lib/categories';
import { useRouter } from 'next/navigation';


function Main() {
  const [currentStep, setCurrentStep] = useState(1);
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
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const router = useRouter()


  const filteredCategories = CATEGORIES.filter(cat =>
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };




  const { mutate: createNewSignup, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success('Signup successful')
      router.push('/signin')
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
      })
      setCurrentStep(1)
    },
    onError: () => {
      toast.error('Signup failed. Please try again.')
    },
  })







  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      industry: prev.industry.includes(category)
        ? prev.industry.filter(c => c !== category)
        : [...prev.industry, category],
    }));
  };

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
    // Required fields validation
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

    // Password validation
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
    }
  };

  const handleSubmit = async () => {
    if (formData.industry.length === 0) {
      setError('Please select at least one interest');
      return;
    }
    setError('');

        // @ts-ignore
    createNewSignup({ data: { ...formData, phone: Number(formData.phone) } })
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Form Card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl hover:border-purple-500/50 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-pink-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Get Creator
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {currentStep === 1 ? 'Create Your Account' : 'Choose Your Interests'}
            </h2>
            <p className="text-gray-400 text-sm">
              {currentStep === 1 
                ? 'Join 10,000+ creators and brands on Get Creator'
                : 'Select categories that match your passions'}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
                currentStep >= 1 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-pink-500' 
                  : 'border-white/20'
              }`}>
                {currentStep > 1 ? <Check className="w-5 h-5 text-white" /> : <span className="text-white font-semibold">1</span>}
              </div>
              <span className="text-white text-sm font-medium">Basic Info</span>
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
              <span className="text-white text-sm font-medium">Interests</span>
            </div>
          </div>

          {currentStep === 1 ? (
            <div className="space-y-5">
              {/* Role Selection */}
              <div>
                <label className="block text-white font-medium mb-3 text-sm">I am a</label>
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
                      <span className={`font-semibold ${formData.role === 'creator' ? 'text-white' : 'text-gray-300'}`}>
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
                      <span className={`font-semibold ${formData.role === 'brand' ? 'text-white' : 'text-gray-300'}`}>
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
  <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                    required
                  />
                </div>

                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                    required
                  />
                </div>
              </div>
<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {/* Name Fields */}
            

              {/* Username */}
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={formData.role === 'brand' ? 'Brand Name' : 'Username'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  required
                />
              </div>

              {/* Phone */}
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>

              {/* Brand-specific fields */}
              {formData.role === 'brand' && (
                <>
                  <div className="relative group">
                    <UserCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="founderName"
                      value={formData.founderName}
                      onChange={handleChange}
                      placeholder="Founder Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      placeholder="GST Number (e.g., 22AAAAA0000A1Z5)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="panCard"
                      value={formData.panCard}
                      onChange={handleChange}
                      placeholder="PAN Card (e.g., ABCDE1234F)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
                      required
                    />
                  </div>
                </>
              )}

              {/* Password */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password (min 8 characters)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
</div>

              {/* Referral Code */}
              <div className="relative group">
                <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  placeholder="Referral Code (Optional)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Next Step →
              </button>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <a
                    href="/signin"
                    className="text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text font-semibold hover:from-pink-400 hover:to-blue-400 transition-all"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search interests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                />
              </div>

              {/* Categories */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-h-80 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {filteredCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        formData.industry.includes(cat)
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
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

              <p className="text-center text-gray-400 text-sm">
                <strong className="text-pink-500">{formData.industry.length}</strong> interest
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
                  className="flex-1 bg-white/5 border border-white/10 text-white font-semibold py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;