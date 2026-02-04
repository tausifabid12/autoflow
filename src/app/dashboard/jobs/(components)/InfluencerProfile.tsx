import { ArrowLeft, CheckCircle2, Instagram, Youtube, Facebook, Zap, MapPin, Star, TrendingUp, Users, MessageCircle, Bookmark, Share2, Calendar, DollarSign, Award, Clock, Building2, X as XIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Influencer, Platform } from '../types';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface InfluencerProfileProps {
  influencer: Influencer;
  onBack: () => void;
  onSaveToggle: () => void;
}

const platformIcons: Record<Platform, typeof Instagram> = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  tiktok: Zap,
};

const availabilityLabels = {
  immediate: 'Available Now',
  within_2_weeks: 'Within 2 Weeks',
  within_month: 'Within Month',
};

export function InfluencerProfile({ influencer, onBack, onSaveToggle }: InfluencerProfileProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; index: number } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxImage || influencer.portfolio.length === 0) return;

    const currentIndex = lightboxImage.index;
    let newIndex: number;

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? influencer.portfolio.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === influencer.portfolio.length - 1 ? 0 : currentIndex + 1;
    }

    const newItem = influencer.portfolio[newIndex];
    setLightboxImage({ url: newItem.url, index: newIndex });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;

      if (e.key === 'Escape') {
        setLightboxImage(null);
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  const totalFollowers = influencer.platforms.reduce((sum, p) => sum + p.followers, 0);
  const avgEngagement = influencer.platforms.reduce((sum, p) => sum + p.engagement, 0) / influencer.platforms.length;

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors focus-ring"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-body-md">Back to Influencers</span>
      </button>

      <div ref={headerRef} className="relative mb-8">
        <div className="h-64 sm:h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900 dark:to-accent-800">
          {influencer.banner && (
            <img
              src={influencer.banner}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 transform translate-y-1/2">
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-end gap-6">
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden ring-8 ring-light-bg-primary dark:ring-dark-bg-primary bg-light-bg-tertiary dark:bg-dark-bg-tertiary shadow-xl">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {influencer.verified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center ring-4 ring-light-bg-primary dark:ring-dark-bg-primary shadow-lg">
                    <CheckCircle2 size={20} className="text-white" />
                  </div>
                )}
              </div>

              <div className="pb-4 hidden sm:block">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="font-bold text-heading-xl">{influencer.name}</h1>
                </div>
                <p className="text-body-lg text-light-text-secondary dark:text-dark-text-secondary mb-2">
                  {influencer.username}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Star size={18} className="text-warning fill-warning" />
                    <span className="font-semibold text-body-md">{influencer.rating}</span>
                    <span className="text-light-text-tertiary dark:text-dark-text-tertiary text-body-sm">
                      ({influencer.totalJobs} jobs)
                    </span>
                  </div>
                  {influencer.agency && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg text-label-sm font-medium">
                      <Building2 size={14} />
                      Agency
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pb-4">
              <button
                onClick={onSaveToggle}
                className="p-3 bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-xl hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-all shadow-card focus-ring"
              >
                <Bookmark
                  size={20}
                  className={influencer.saved ? 'fill-accent-500 text-accent-500' : ''}
                />
              </button>
              <button className="p-3 bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-xl hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-all shadow-card focus-ring">
                <Share2 size={20} />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-semibold text-body-md transition-all hover:scale-[1.02] shadow-card focus-ring">
                <MessageCircle size={20} />
                <span className="hidden sm:inline">Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden px-6 mt-20 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="font-bold text-heading-lg">{influencer.name}</h1>
        </div>
        <p className="text-body-md text-light-text-secondary dark:text-dark-text-secondary mb-3">
          {influencer.username}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Star size={18} className="text-warning fill-warning" />
            <span className="font-semibold text-body-md">{influencer.rating}</span>
            <span className="text-light-text-tertiary dark:text-dark-text-tertiary text-body-sm">
              ({influencer.totalJobs} jobs)
            </span>
          </div>
          {influencer.agency && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg text-label-sm font-medium">
              <Building2 size={14} />
              Agency
            </span>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-24 sm:mt-20">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-heading-md mb-4">About</h2>
            <p className="text-body-md text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              {influencer.pitch}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {influencer.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1.5 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-lg text-label-md"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-heading-md mb-4">Platform Statistics</h2>
            <div className="space-y-4">
              {influencer.platforms.map((platform) => {
                const Icon = platformIcons[platform.platform];
                return (
                  <div
                    key={platform.platform}
                    className="flex items-center justify-between p-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-body-md capitalize">{platform.platform}</p>
                        <p className="text-label-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                          {platform.verified && (
                            <CheckCircle2 size={12} className="inline mr-1 text-accent-500" />
                          )}
                          Verified account
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-body-md mb-1">
                        {platform.followers >= 1000000
                          ? `${(platform.followers / 1000000).toFixed(1)}M`
                          : `${(platform.followers / 1000).toFixed(0)}K`}
                      </p>
                      <p className="text-label-sm text-success flex items-center gap-1">
                        <TrendingUp size={12} />
                        {platform.engagement}% engagement
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {influencer.portfolio.length > 0 && (
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-card">
              <h2 className="font-semibold text-heading-md mb-4">Portfolio</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {influencer.portfolio.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setLightboxImage({ url: item.url, index })}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-light-bg-tertiary dark:bg-dark-bg-tertiary focus-ring"
                  >
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-between text-white text-label-sm">
                          <span>{item.likes.toLocaleString()} likes</span>
                          {item.views && <span>{(item.views / 1000000).toFixed(1)}M views</span>}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {influencer.caseStudies.length > 0 && (
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-card">
              <h2 className="font-semibold text-heading-md mb-4">
                <Award className="inline mr-2" size={20} />
                Case Studies
              </h2>
              <div className="space-y-4">
                {influencer.caseStudies.map((study) => (
                  <div
                    key={study.id}
                    className="p-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={study.image} alt={study.brand} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-heading-sm mb-1">{study.title}</h3>
                        <p className="text-label-md text-accent-600 dark:text-accent-400 mb-2">{study.brand}</p>
                        <p className="text-body-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                          {study.description}
                        </p>
                        <p className="text-label-sm text-success font-medium">{study.results}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-heading-md mb-4">Audience Demographics</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-body-md mb-3">Age Distribution</h3>
                <div className="space-y-2">
                  {influencer.demographics.age.map((age) => (
                    <div key={age.range}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-label-md">{age.range}</span>
                        <span className="text-label-md font-semibold">{age.percentage}%</span>
                      </div>
                      <div className="h-2 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-500 rounded-full transition-all duration-500"
                          style={{ width: `${age.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-body-md mb-3">Gender Distribution</h3>
                <div className="space-y-2">
                  {influencer.demographics.gender.map((gender) => (
                    <div key={gender.type}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-label-md">{gender.type}</span>
                        <span className="text-label-md font-semibold">{gender.percentage}%</span>
                      </div>
                      <div className="h-2 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-500 rounded-full transition-all duration-500"
                          style={{ width: `${gender.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-body-md mb-3">Top Locations</h3>
                <div className="space-y-2">
                  {influencer.demographics.topLocations.map((location) => (
                    <div key={location.country} className="flex items-center justify-between">
                      <span className="text-label-md">{location.country}</span>
                      <span className="text-label-md font-semibold">{location.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-body-md mb-3">Audience Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {influencer.demographics.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-lg text-label-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-card sticky top-24">
            <h2 className="font-semibold text-heading-md mb-4">Quick Stats</h2>

            <div className="space-y-4">
              <div className="p-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} className="text-accent-500" />
                  <span className="text-label-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                    Total Followers
                  </span>
                </div>
                <p className="font-bold text-heading-lg">
                  {totalFollowers >= 1000000
                    ? `${(totalFollowers / 1000000).toFixed(1)}M`
                    : `${(totalFollowers / 1000).toFixed(0)}K`}
                </p>
              </div>

              <div className="p-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={18} className="text-success" />
                  <span className="text-label-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                    Avg. Engagement
                  </span>
                </div>
                <p className="font-bold text-heading-lg text-success">
                  {avgEngagement.toFixed(1)}%
                </p>
              </div>

              <div className="p-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={18} className="text-warning" />
                  <span className="text-label-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                    Completed Jobs
                  </span>
                </div>
                <p className="font-bold text-heading-lg">{influencer.totalJobs}</p>
              </div>

              <div className="p-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle size={18} className="text-accent-500" />
                  <span className="text-label-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                    Response Rate
                  </span>
                </div>
                <p className="font-bold text-heading-lg">{influencer.responseRate}%</p>
              </div>

              <div className="pt-4 border-t border-light-border dark:border-dark-border space-y-3">
                <div className="flex items-center gap-2 text-body-sm">
                  <MapPin size={16} className="text-light-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    {influencer.location}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-body-sm">
                  <Clock size={16} className="text-light-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    {availabilityLabels[influencer.availability]}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-body-sm">
                  <DollarSign size={16} className="text-light-text-tertiary dark:text-dark-text-tertiary" />
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    ${influencer.priceRange.min.toLocaleString()} - ${influencer.priceRange.max.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-semibold text-body-md transition-all hover:scale-[1.02] focus-ring mt-4">
                Hire {influencer.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors focus-ring"
          >
            <XIcon size={24} className="text-white" />
          </button>

          {influencer.portfolio.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('prev');
                }}
                className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors focus-ring"
              >
                <ChevronLeft size={32} className="text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('next');
                }}
                className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors focus-ring"
              >
                <ChevronRight size={32} className="text-white" />
              </button>
            </>
          )}

          <img
            src={lightboxImage.url}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
