import { MapPin, TrendingUp, Star, Bookmark, CheckCircle2, Instagram, Youtube, Facebook, Zap, DollarSign, MessageCircle, Clock } from 'lucide-react';
import { Influencer, Platform } from '../types';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface InfluencerCardProps {
  influencer: Influencer;
  onClick: () => void;
  onSaveToggle: () => void;
  onMessage: () => void;
  index: number;
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

export function InfluencerCard({ influencer, onClick, onSaveToggle, onMessage, index }: InfluencerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: index * 0.04,
          ease: 'power2.out',
        }
      );
    }
  }, [index]);

  const handleMouseEnter = () => {
    if (cardRef.current && actionsRef.current) {
      gsap.to(cardRef.current, {
        y: -4,
        scale: 1.01,
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.12), 0 4px 6px -4px rgba(0, 0, 0, 0.08)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(actionsRef.current, {
        opacity: 1,
        height: 'auto',
        marginTop: 16,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && actionsRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(actionsRef.current, {
        opacity: 0,
        height: 0,
        marginTop: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const primaryPlatform = influencer.platforms[0];

  return (
    <div
      ref={cardRef}
      className="group bg-light-bg-secondary border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-card cursor-pointer transition-all"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="relative h-28 bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900 dark:to-accent-800">
        {influencer.banner && (
          <img
            src={influencer.banner}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSaveToggle();
          }}
          className="absolute top-3 right-3 p-2 bg-light-bg-secondary/90 dark:bg-dark-bg-secondary/90 backdrop-blur-sm rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors focus-ring"
        >
          <Bookmark
            size={16}
            className={influencer.saved ? 'fill-accent-500 text-accent-500' : ''}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-3 -mt-16 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-light-bg-secondary dark:ring-dark-bg-secondary bg-light-bg-tertiary dark:bg-dark-bg-tertiary">
              <img
                src={influencer.avatar}
                alt={influencer.name}
                className="w-full h-full object-cover"
              />
            </div>
            {influencer.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center ring-2 ring-light-bg-secondary dark:ring-dark-bg-secondary">
                <CheckCircle2 size={14} className="" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 mt-12">
            <h3 className="font-semibold text-heading-sm truncate mb-0.5">
              {influencer.name}
            </h3>
            <p className="text-label-md text-light-text-secondary dark:text-dark-text-secondary">
              {influencer.username}
            </p>
          </div>
        </div>

        <p className="text-body-sm text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-2">
          {influencer.pitch}
        </p>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-light-border dark:border-dark-border">
          {primaryPlatform && (
            <>
              <div className="flex items-center gap-1.5">
                {(() => {
                  const Icon = platformIcons[primaryPlatform.platform];
                  return <Icon size={14} className="text-light-text-tertiary dark:text-dark-text-tertiary" />;
                })()}
                <span className="text-label-md font-semibold">
                  {primaryPlatform.followers >= 1000000
                    ? `${(primaryPlatform.followers / 1000000).toFixed(1)}M`
                    : `${(primaryPlatform.followers / 1000).toFixed(0)}K`}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp size={14} className="text-success" />
                <span className="text-label-md font-semibold text-success">
                  {primaryPlatform.engagement}%
                </span>
              </div>
            </>
          )}
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-warning fill-warning" />
            <span className="text-label-md font-semibold">
              {influencer.rating}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {influencer.categories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="px-2 py-1 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-md text-label-sm"
            >
              {category}
            </span>
          ))}
          {influencer.agency && (
            <span className="px-2 py-1 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-md text-label-sm font-medium">
              Agency
            </span>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-body-sm">
            <MapPin size={14} className="text-light-text-tertiary dark:text-dark-text-tertiary" />
            <span className="text-light-text-secondary dark:text-dark-text-secondary truncate">
              {influencer.location}
            </span>
          </div>
          <div className="flex items-center gap-2 text-body-sm">
            <DollarSign size={14} className="text-light-text-tertiary dark:text-dark-text-tertiary" />
            <span className="text-light-text-secondary dark:text-dark-text-secondary">
              ${influencer.priceRange.min.toLocaleString()} - ${influencer.priceRange.max.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-body-sm">
            <Clock size={14} className="text-light-text-tertiary dark:text-dark-text-tertiary" />
            <span className="text-light-text-secondary dark:text-dark-text-secondary">
              {availabilityLabels[influencer.availability]}
            </span>
          </div>
        </div>

        <div
          ref={actionsRef}
          className="opacity-0 h-0 overflow-hidden grid grid-cols-2 gap-2"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="px-4 py-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-label-md font-medium transition-all hover:scale-[1.02] focus-ring"
          >
            View Profile
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMessage();
            }}
            className="px-4 py-2.5 bg-light-bg-tertiary dark:bg-dark-bg-tertiary hover:bg-light-border dark:hover:bg-dark-border rounded-lg text-label-md font-medium transition-all hover:scale-[1.02] focus-ring flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
