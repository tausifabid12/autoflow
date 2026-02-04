import { Search, Plus, Bell, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import CampaignModal from './CreateCampaignModal';

interface HeaderProps {
  onCreateJob: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Header({   onCreateJob, mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-light-bg-secondary/80 dark:bg-dark-bg-secondary/80 backdrop-blur-xl border-b border-light-border dark:border-dark-border">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <div className="flex items-center gap-6 lg:gap-8 flex-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors focus-ring"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">IN</span>
              </div>
              <span className="font-semibold text-heading-sm hidden sm:block">Get Creator</span>
            </div>

            <div className={`hidden md:flex items-center flex-1 max-w-xl transition-all duration-200 ${searchFocused ? 'scale-[1.01]' : ''}`}>
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-light-text-tertiary dark:text-dark-text-tertiary" size={18} />
                <input
                  type="text"
                  placeholder="Search jobs, influencers, brands..."
                  className="w-full pl-11 pr-4 py-2.5 bg-light-bg-tertiary dark:bg-dark-bg-tertiary border border-transparent rounded-xl text-body-md placeholder:text-light-text-tertiary dark:placeholder:text-dark-text-tertiary focus:outline-none focus:border-accent-500 focus:bg-light-bg-secondary dark:focus:bg-dark-bg-secondary transition-all"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <button className="md:hidden p-2 rounded-lg hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors focus-ring">
              <Search size={20} />
            </button>
{/* 
            <button
              onClick={onCreateJob}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-medium text-label-lg transition-all hover:scale-[1.02] focus-ring"
            >
              <Plus size={18} />
              <span className="hidden lg:inline">Create Job</span>
            </button> */}

            <CampaignModal/>

            <button className="sm:hidden p-2 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors focus-ring">
              <Plus size={20} />
            </button>

            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors focus-ring relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
              </button>
            </div>



            <button className="flex items-center gap-2 p-1 pl-2 pr-1 rounded-xl hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors focus-ring">
              <span className="hidden lg:inline text-label-md font-medium">Sarah Chen</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
