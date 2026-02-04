import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";
import { categories, platforms, campaignTypes, statusOptions } from "@/data/mockCampaigns";

export interface Filters {
  search: string;
  types: string[];
  platforms: string[];
  categories: string[];
  status: string[];
  priceRange: [number, number];
  location: string;
  minFollowers: number;
}

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-foreground/10 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3 hover:text-primary transition-colors"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {isOpen && <div className="space-y-2">{children}</div>}
    </div>
  );
};

const FilterSidebar = ({
  filters,
  onFiltersChange,
  onReset,
  isOpen,
  onClose,
}: FilterSidebarProps) => {
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: "types" | "platforms" | "categories" | "status", value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const activeFiltersCount =
    filters.types.length +
    filters.platforms.length +
    filters.categories.length +
    filters.status.length +
    (filters.location ? 1 : 0) +
    (filters.minFollowers > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000 ? 1 : 0);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto lg:top-24 w-80 lg:w-72 bg-background lg:bg-transparent border-r lg:border-0 border-foreground/10 z-50 lg:z-0 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full lg:h-auto overflow-y-auto p-6 lg:p-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-lg">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-foreground/5 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reset Button */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="w-full mb-6"
            >
              Clear all filters
            </Button>
          )}

          {/* Campaign Type */}
          <FilterSection title="Campaign Type">
            {campaignTypes.map((type) => (
              <div key={type} className="flex items-center gap-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.types.includes(type)}
                  onCheckedChange={() => toggleArrayFilter("types", type)}
                />
                <Label
                  htmlFor={`type-${type}`}
                  className="text-sm text-muted-foreground cursor-pointer capitalize"
                >
                  {type.replace("-", " ")}
                </Label>
              </div>
            ))}
          </FilterSection>

          {/* Platform */}
          <FilterSection title="Platform">
            {platforms.map((platform) => (
              <div key={platform} className="flex items-center gap-2">
                <Checkbox
                  id={`platform-${platform}`}
                  checked={filters.platforms.includes(platform)}
                  onCheckedChange={() => toggleArrayFilter("platforms", platform)}
                />
                <Label
                  htmlFor={`platform-${platform}`}
                  className="text-sm text-muted-foreground cursor-pointer capitalize"
                >
                  {platform}
                </Label>
              </div>
            ))}
          </FilterSection>

          {/* Status */}
          <FilterSection title="Status">
            {statusOptions.map((status) => (
              <div key={status} className="flex items-center gap-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.status.includes(status)}
                  onCheckedChange={() => toggleArrayFilter("status", status)}
                />
                <Label
                  htmlFor={`status-${status}`}
                  className="text-sm text-muted-foreground cursor-pointer capitalize"
                >
                  {status}
                </Label>
              </div>
            ))}
          </FilterSection>

          {/* Category */}
          <FilterSection title="Category" defaultOpen={false}>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleArrayFilter("categories", category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Budget Range">
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
                max={50000}
                step={500}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0].toLocaleString()}</span>
                <span>${filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </FilterSection>

          {/* Location */}
          <FilterSection title="Location">
            <Input
              placeholder="Enter location..."
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="bg-foreground/5 border-foreground/10"
            />
          </FilterSection>

          {/* Min Followers */}
          <FilterSection title="Minimum Followers">
            <div className="space-y-2">
              <Slider
                value={[filters.minFollowers]}
                onValueChange={(value) => updateFilter("minFollowers", value[0])}
                max={500000}
                step={5000}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                {filters.minFollowers > 0
                  ? `${(filters.minFollowers / 1000).toFixed(0)}k+ followers`
                  : "Any follower count"}
              </p>
            </div>
          </FilterSection>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
