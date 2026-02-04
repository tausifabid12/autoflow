import { Search, Sparkles, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Hero() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 animate-gradient-shift"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium">Trusted by 10,000+ Brands & Creators</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 animate-slide-up">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Connect Brands
          </span>
          <br />
          <span className="text-white">with the Hottest</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Influencers
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-slide-up animation-delay-200">
          Launch campaigns, discover creators, and track performance—all in one powerful platform
        </p>

        {/* <div className="max-w-2xl mx-auto mb-12 animate-slide-up animation-delay-400">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2 hover:bg-white/20 transition-all duration-300">
              <Search className="w-6 h-6 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search influencers by niche, platform, or name..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder-gray-400 focus:outline-none"
              />
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-pink-500/50">
                Search
              </button>
            </div>
          </div>
        </div> */}

        <Link href="/auth/sign-up" className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-600">
          <button className="group cursor-pointer relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50">
            <span className="relative z-10">Hire Influencers</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button className="px-8 py-4 cursor-pointer bg-white/10 backdrop-blur-md rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
            Join as Influencer
          </button>
        </Link>

        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 animate-fade-in animation-delay-800">
          <div className="group hover:scale-110 transition-transform duration-300">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg group-hover:shadow-pink-500/50 transition-all duration-300">
              <Users className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-1">10K+</div>
            <div className="text-gray-400 text-sm">Influencers</div>
          </div>
          <div className="group hover:scale-110 transition-transform duration-300">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-1">5M+</div>
            <div className="text-gray-400 text-sm">Campaigns</div>
          </div>
          <div className="group hover:scale-110 transition-transform duration-300">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-1">98%</div>
            <div className="text-gray-400 text-sm">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
