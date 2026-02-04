'use client'
import { Instagram, Twitter, Facebook, Linkedin, Youtube, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const links = {
    product: ['Features', 'Pricing', 'Integrations', 'API', 'Security'],
    company: ['About', 'Careers', 'Press', 'Blog', 'Partners'],
    resources: ['Help Center', 'Tutorials', 'Community', 'Case Studies', 'Events'],
    legal: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses', 'GDPR'],
  };

  return (
<footer className="relative bg-gray-950 border-t border-white/10">
  <div className="max-w-7xl mx-auto px-6 py-20">
    <div className="border-t border-white/10 pt-12">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Stay Updated</h3>
              <p className="text-gray-400 text-sm">Get the latest influencer marketing insights</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-80 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors duration-300"
            />
            <button onClick={()=> {
              toast.success('We will send you the latest updates')
            }} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-gray-400 text-sm">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p>© 2025 Get Creator. All rights reserved.</p>
          <p className="text-xs text-gray-500">Managed by SITEGALLERIA PRIVATE LIMITED</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          <a href="/refund" className="hover:text-white transition-colors duration-300">Refund Policy</a>
        </div>
      </div>
    </div>

  </div>
</footer>
  );
}
