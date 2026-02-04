import { useState } from 'react';
import { Influencer, FilterState } from '../types';
import { InfluencerCard } from './InfluencerCard';
import { ChevronDown, Grid, Users } from 'lucide-react';

interface InfluencersViewProps {
  influencers: Influencer[];
  filters: FilterState;
  onSelectInfluencer: (influencer: Influencer) => void;
}

export function InfluencersView({ influencers, filters, onSelectInfluencer }: InfluencersViewProps) {
  const [sortBy, setSortBy] = useState<'followers' | 'engagement' | 'rating'>('followers');
  const [localInfluencers, setLocalInfluencers] = useState(influencers);

  const filteredInfluencers = localInfluencers.filter((influencer) => {
    if (filters.platforms.length > 0) {
      const hasMatchingPlatform = influencer.platforms.some((p) => filters.platforms.includes(p.platform));
      if (!hasMatchingPlatform) return false;
    }

    if (filters.categories.length > 0) {
      const hasMatchingCategory = influencer.categories.some((c) => filters.categories.includes(c));
      if (!hasMatchingCategory) return false;
    }

    if (filters.locations.length > 0 && !filters.locations.some((loc) => influencer.location.includes(loc))) {
      return false;
    }

    const maxFollowers = Math.max(...influencer.platforms.map((p) => p.followers));
    if (maxFollowers < filters.followersRange[0] || maxFollowers > filters.followersRange[1]) {
      return false;
    }

    const maxEngagement = Math.max(...influencer.platforms.map((p) => p.engagement));
    if (maxEngagement < filters.engagementMin) {
      return false;
    }

    if (influencer.priceRange.max < filters.priceRange[0] || influencer.priceRange.min > filters.priceRange[1]) {
      return false;
    }

    if (filters.availability.length > 0 && !filters.availability.includes(influencer.availability)) {
      return false;
    }

    if (filters.verified && !influencer.verified) {
      return false;
    }

    if (filters.agency && !influencer.agency) {
      return false;
    }

    return true;
  });

  const sortedInfluencers = [...filteredInfluencers].sort((a, b) => {
    switch (sortBy) {
      case 'followers':
        return Math.max(...b.platforms.map((p) => p.followers)) - Math.max(...a.platforms.map((p) => p.followers));
      case 'engagement':
        return Math.max(...b.platforms.map((p) => p.engagement)) - Math.max(...a.platforms.map((p) => p.engagement));
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const toggleSave = (influencerId: string) => {
    setLocalInfluencers((prev) =>
      prev.map((inf) =>
        inf.id === influencerId ? { ...inf, saved: !inf.saved } : inf
      )
    );
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-semibold text-heading-xl mb-2">
            Top Influencers
          </h1>
          <p className="text-body-md text-light-text-secondary dark:text-dark-text-secondary">
            {sortedInfluencers.length} creators matching your criteria
          </p>
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="appearance-none px-4 py-2.5 pr-10 bg-light-bg-tertiary dark:bg-dark-bg-tertiary border border-transparent rounded-xl text-body-md font-medium focus:outline-none focus:border-accent-500 transition-all cursor-pointer"
          >
            <option value="followers">Most Followers</option>
            <option value="engagement">Best Engagement</option>
            <option value="rating">Highest Rated</option>
          </select>
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-light-text-tertiary dark:text-dark-text-tertiary"
          />
        </div>
      </div>

      {sortedInfluencers.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary flex items-center justify-center">
            <Users size={32} className="text-light-text-tertiary dark:text-dark-text-tertiary" />
          </div>
          <h3 className="font-semibold text-heading-md mb-2">No influencers found</h3>
          <p className="text-body-md text-light-text-secondary dark:text-dark-text-secondary">
            Try adjusting your filters to see more results
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {sortedInfluencers.map((influencer, index) => (
            <InfluencerCard
              key={influencer.id}
              influencer={influencer}
              onClick={() => onSelectInfluencer(influencer)}
              onSaveToggle={() => toggleSave(influencer.id)}
              onMessage={() => console.log('Message', influencer.id)}
              index={index}
            />
          ))}
        </div>
      )}
    </>
  );
}
