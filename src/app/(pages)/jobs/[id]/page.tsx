'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCampaigns } from "@/data/mockCampaigns";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Target,
  CheckCircle2,
  Share2,
  Heart,
  ExternalLink,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const platformIcons: Record<string, string> = {
  instagram: "📸",
  tiktok: "🎵",
  youtube: "▶️",
  facebook: "👥",
};

const typeColors: Record<string, string> = {
  paid: "bg-primary/20 text-primary border-primary/30",
  barter: "bg-secondary/20 text-secondary border-secondary/30",
  "barter-commission": "bg-accent/20 text-accent border-accent/30",
};

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  paused: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  completed: "bg-muted text-muted-foreground border-muted",
};

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  const campaign = mockCampaigns.find((c) => c.campaign_id === id);

  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, [id]);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Campaign Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The campaign you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.push("/jobs/new")}>Back to Jobs</Button>
        </div>
      </div>
    );
  }

  const getPriceDisplay = () => {
    if (campaign.type === "barter") {
      return "Product Exchange";
    }
    if (campaign.price.type === "fixed") {
      return `$${campaign.price.fixed_price.toLocaleString()}`;
    }
    return `$${campaign.price.min_price.toLocaleString()} - $${campaign.price.max_price.toLocaleString()}`;
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-background">  
      {/* Hero Section */}
      <section className="pt-28 pb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at top right, hsl(var(--primary) / 0.2) 0%, transparent 50%)",
          }}
        />

        <div className="content-container relative z-10">
          {/* Back Button */}
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </Link>

          <div ref={contentRef}>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
              {/* Brand Image */}
              <div className="animate-in w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden bg-foreground/5 flex-shrink-0">
                <img
                  src={campaign.brandImage}
                  alt={campaign.brandName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Brand */}
              <div className="animate-in flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge className={`${typeColors[campaign.type]} capitalize`}>
                    {campaign.type.replace("-", " ")}
                  </Badge>
                  <Badge className={`${statusColors[campaign.status]} capitalize`}>
                    {campaign.status}
                  </Badge>
                </div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
                  {campaign.title}
                </h1>
                <p className="text-xl text-primary font-semibold">{campaign.brandName}</p>
              </div>

              {/* Action Buttons */}
              <div className="animate-in flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="animate-in grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="card-glass p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-semibold text-foreground">{getPriceDisplay()}</p>
                  </div>
                </div>
              </div>
              <div className="card-glass p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Applicants</p>
                    <p className="font-semibold text-foreground">{campaign.applicants_count}</p>
                  </div>
                </div>
              </div>
              <div className="card-glass p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-semibold text-foreground">{campaign.duration}</p>
                  </div>
                </div>
              </div>
              <div className="card-glass p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold text-foreground">{campaign.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="content-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="animate-in card-glass p-6 lg:p-8">
                <h2 className="text-xl font-display font-semibold mb-4">About This Campaign</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {campaign.description}
                </p>
              </div>

              {/* Platforms */}
              <div className="animate-in card-glass p-6 lg:p-8">
                <h2 className="text-xl font-display font-semibold mb-4">Platforms</h2>
                <div className="flex flex-wrap gap-3">
                  {campaign.platform.map((p) => (
                    <div
                      key={p}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground/5 border border-foreground/10"
                    >
                      <span className="text-xl">{platformIcons[p]}</span>
                      <span className="capitalize font-medium">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="animate-in card-glass p-6 lg:p-8">
                <h2 className="text-xl font-display font-semibold mb-4">Deliverables</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {campaign.deliverables.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                        {d.count}x
                      </div>
                      <span className="font-medium capitalize">{d.type.replace("-", " ")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="animate-in card-glass p-6 lg:p-8">
                <h2 className="text-xl font-display font-semibold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {campaign.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="animate-in card-glass p-6 lg:p-8">
                <h2 className="text-xl font-display font-semibold mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {campaign.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-4 py-2 rounded-full bg-foreground/5 text-muted-foreground text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Barter Products (if applicable) */}
              {campaign.barter_product.length > 0 && (
                <div className="animate-in card-glass p-6 lg:p-8">
                  <h2 className="text-xl font-display font-semibold mb-4">Products Included</h2>
                  <div className="space-y-4">
                    {campaign.barter_product.map((product, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-xl bg-secondary/5 border border-secondary/10"
                      >
                        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                          🎁
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-secondary">
                            ${product.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">x{product.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <div className="animate-in card-glass p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Campaign Budget</p>
                  <p className="text-3xl font-display font-bold text-primary">
                    {getPriceDisplay()}
                  </p>
                </div>

                <Button className="w-full mb-4 h-12 text-base">
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  {campaign.applicants_count} creators have already applied
                </p>

                <div className="border-t border-foreground/10 mt-6 pt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Campaign Type</span>
                    <span className="font-medium capitalize">{campaign.type.replace("-", " ")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium">
                      {campaign.start_date
                        ? new Date(campaign.start_date).toLocaleDateString()
                        : "Flexible"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-medium">
                      {campaign.end_date
                        ? new Date(campaign.end_date).toLocaleDateString()
                        : "Flexible"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Gender</span>
                    <span className="font-medium capitalize">{campaign.gender}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Age Range</span>
                    <span className="font-medium">
                      {campaign.age_start} - {campaign.age_end} years
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Min Followers</span>
                    <span className="font-medium">
                      {campaign.min_number_of_followers > 0
                        ? `${(campaign.min_number_of_followers / 1000).toFixed(0)}k+`
                        : "Any"}
                    </span>
                  </div>
                </div>

                {/* Coupon Info */}
                {campaign.coupon_code && (
                  <div className="border-t border-foreground/10 mt-6 pt-6">
                    <p className="text-sm text-muted-foreground mb-2">Coupon Code Provided</p>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <Target className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-mono font-bold text-primary">{campaign.coupon_code}</p>
                        <p className="text-xs text-muted-foreground">
                          {campaign.coupon_discount}% off • Valid: {campaign.coupon_validity}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Brand Info */}
              <div className="animate-in card-glass p-6">
                <h3 className="font-display font-semibold mb-4">About the Brand</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden">
                    <img
                      src={campaign.brandImage}
                      alt={campaign.brandName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{campaign.brandName}</p>
                    <p className="text-sm text-muted-foreground">Verified Brand</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Brand Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobDetails;
