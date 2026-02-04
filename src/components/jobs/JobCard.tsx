
import { Campaign } from "@/data/mockCampaigns";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  campaign: Campaign;
  index: number;
}

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

const JobCard = ({ campaign, index }: JobCardProps) => {
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
    <Link
      href={`/jobs/${campaign.campaign_id}`}
      className="job-card card-glass p-6 cursor-pointer group block relative"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-foreground/5 flex-shrink-0">
          <img
            src={campaign.brandImage}
            alt={campaign.brandName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-lg text-foreground truncate group-hover:text-primary transition-colors">
              {campaign.title}
            </h3>
          </div>
          <p className="text-sm text-primary font-medium">{campaign.brandName}</p>
        </div>
        <Badge className={`${typeColors[campaign.type]} capitalize text-xs`}>
          {campaign.type.replace("-", " ")}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {campaign.description}
      </p>

      {/* Platforms */}
      <div className="flex items-center gap-2 mb-4">
        {campaign.platform.map((p) => (
          <span
            key={p}
            className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-sm"
            title={p}
          >
            {platformIcons[p]}
          </span>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {campaign.category.slice(0, 3).map((cat) => (
          <span
            key={cat}
            className="px-2 py-1 text-xs rounded-full bg-foreground/5 text-muted-foreground"
          >
            {cat}
          </span>
        ))}
        {campaign.category.length > 3 && (
          <span className="px-2 py-1 text-xs rounded-full bg-foreground/5 text-muted-foreground">
            +{campaign.category.length - 3}
          </span>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">{getPriceDisplay()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{campaign.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{campaign.applicants_count} applicants</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{campaign.duration}</span>
        </div>
      </div>

      {/* Deliverables */}
      <div className="pt-4 border-t border-foreground/10">
        <p className="text-xs text-muted-foreground mb-2">Deliverables:</p>
        <div className="flex flex-wrap gap-2">
          {campaign.deliverables.map((d, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary capitalize"
            >
              {d.count}x {d.type.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Link>
  );
};

export default JobCard;
