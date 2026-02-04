'use client';

import React from 'react';
import { X, Instagram, Youtube, Facebook, Zap } from 'lucide-react';
import { categories, locations } from '../data/mockData';
import { FilterState } from '../(helper)/helper';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import CitySelector from '@/components/shared/CitySelector';
import { CATEGORIES } from '@/lib/categories';


interface FilterRailProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  open: boolean;
  onClose: () => void;
  mode: 'jobs' | 'influencers';
}

const platformIcons: Record<string, typeof Instagram> = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  tiktok: Zap,
};

export function FilterRail({ filters, setFilters, open, onClose, mode }: FilterRailProps) {
  const toggleArray = (key: 'platforms' | 'categories' | 'locations', value: string) => {
    const arr = filters[key];
    setFilters({
      ...filters,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  };

  const clearFilters = () => {
    setFilters({
      platforms: [],
      categories: [],
      locations: [],
      priceRange: [0, 50000],
      type: undefined,
      status: undefined,
      startDate: undefined,
      endDate: undefined,
      duration: undefined,
      search: undefined,
      sortBy: undefined,
      sortOrder: 'asc',
      page: 1,
      limit: 10,
    });
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-background z-40 lg:hidden backdrop-blur-sm" onClick={onClose} />}
      <aside
        className={`
          fixed lg:sticky top-0 lg:top-[72px] left-0 h-screen lg:h-[calc(100vh-72px)]
          w-80 bg-card border-r border-border
          transform transition-transform duration-300 ease-out z-40
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto scrollbar-hide
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-semibold text-heading-sm">Filters</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className='border-border bg-accent' onClick={clearFilters}>
              Clear all
            </Button>
            <Button variant="ghost" size="sm" className="lg:hidden p-1.5 border-border" onClick={onClose}>
              <X size={18} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Platforms */}
          <div>
            <Label className="mb-2">Platform</Label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(platformIcons) as string[]).map((p) => {
                const Icon = platformIcons[p];
                return (
                  <Button
                    key={p}
                    variant={filters.platforms.includes(p) ? 'default' : 'outline'}
                    size="sm"
                    className="flex items-center gap-2 border-border bg-accent"
                    onClick={() => toggleArray('platforms', p)}
                  >
                    <Icon size={16} />
                    {p}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div>
            <Label className="mb-2">Category</Label>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-hide">
              {CATEGORIES.map((c) => (
                <Button
                  key={c}
                  variant={filters.categories.includes(c) ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full border-border bg-accent"
                  onClick={() => toggleArray('categories', c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            {/* <Label className="mb-2">Location</Label> */}
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-hide">

              <CitySelector
              city={filters.locations[0]}
              setCity={(city) => setFilters({ ...filters, locations: [city] })}
              />

            </div>
          </div>

          {/* Type */}
          <div>
            <Label className="mb-2">Type</Label>
            <Select
              value={filters.type || ''}
              onValueChange={(val) => setFilters({ ...filters, type: val as FilterState['type'] })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="barter">Barter</SelectItem>
                <SelectItem value="barter-commission">Barter Commission</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="flex flex-col gap-2">
            <Label>Start Date</Label>
            <Input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border-border border"
            />
            <Label>End Date</Label>
            <Input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border-border border"
            />
          </div>

          {/* Price Range */}

                    <div>
            <Label className="mb-2">
              Price Range:  ₹ {filters.priceRange[0]} -  ₹ {filters.priceRange[1]}
            </Label>
            <Input
              type="range"
              min={0}
              max={50000}
              step={500}
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
              className="w-full accent-accent-500"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
