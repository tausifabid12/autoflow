'use client';
import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/jobs/JobCard";
import FilterSidebar, { Filters } from "@/components/jobs/FilterSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCampaigns } from "@/data/mockCampaigns";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const defaultFilters: Filters = {
  search: "",
  types: [],
  platforms: [],
  categories: [],
  status: [],
  priceRange: [0, 50000],
  location: "",
  minFollowers: 0,
};

const Jobs = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header.querySelectorAll(".animate-in"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, []);

  const filteredCampaigns = useMemo(() => {
    return mockCampaigns.filter((campaign) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          campaign.title.toLowerCase().includes(searchLower) ||
          campaign.brandName.toLowerCase().includes(searchLower) ||
          campaign.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.types.length > 0 && !filters.types.includes(campaign.type)) {
        return false;
      }

      // Platform filter
      if (filters.platforms.length > 0) {
        const hasMatchingPlatform = campaign.platform.some((p) =>
          filters.platforms.includes(p)
        );
        if (!hasMatchingPlatform) return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        const hasMatchingCategory = campaign.category.some((c) =>
          filters.categories.includes(c)
        );
        if (!hasMatchingCategory) return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(campaign.status)) {
        return false;
      }

      // Price range filter
      if (campaign.type !== "barter") {
        const price =
          campaign.price.type === "fixed"
            ? campaign.price.fixed_price
            : campaign.price.max_price;
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
          return false;
        }
      }

      // Location filter
      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        if (!campaign.location.toLowerCase().includes(locationLower)) {
          return false;
        }
      }

      // Min followers filter
      if (filters.minFollowers > 0) {
        if (campaign.min_number_of_followers < filters.minFollowers) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
          }}
        />

        <div ref={headerRef} className="content-container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="animate-in inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              🔥 {mockCampaigns.length} Active Campaigns
            </span>
            <h1 className="animate-in text-6xl font-extrabold mb-6">
              Find Your Perfect
              <span className="text-gradient-accent"> Campaign</span>
            </h1>
            <p className="animate-in text-lg text-muted-foreground mb-8">
              Browse through hundreds of brand collaborations. Filter by
              platform, category, budget, and more.
            </p>

            {/* Search Bar */}
            <div className="animate-in relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search campaigns, brands, categories..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="pl-12 pr-4 py-6 text-base bg-foreground/5 border-foreground/10 rounded-2xl focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="content-container">
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onReset={handleReset}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            {/* Jobs Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {filteredCampaigns.length}
                    </span>{" "}
                    campaigns found
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    className="w-9 h-9"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    className="w-9 h-9"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Campaign Grid */}
              {filteredCampaigns.length > 0 ? (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {filteredCampaigns.map((campaign, index) => (
                    <JobCard
                      key={campaign.campaign_id}
                      campaign={campaign}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    No campaigns found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={handleReset}>Clear all filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Jobs;
