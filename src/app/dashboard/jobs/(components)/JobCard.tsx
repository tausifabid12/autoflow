import { MapPin, Users, Calendar, CheckCircle2, Instagram, Youtube, Facebook, Share2, TrendingUp, Package, Video, Image as ImageIcon, FileText, Clock, Bookmark } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ICampaign } from '../(helper)/helper';
import Link from 'next/link';
import ApplyForCampaign from '@/components/apply-for-campaign';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

interface IBarterProduct {
  name: string;
  value: number;
}


interface JobCardProps {
  job: ICampaign;
  onClick: () => void;
  onSaveToggle: () => void;
  index: number;
  saved?: boolean;
}

const platformConfig: Record<string, { icon: any; color: string; label: string }> = {
  instagram: { icon: Instagram, color: 'from-pink-500 to-purple-600', label: 'Instagram' },
  youtube: { icon: Youtube, color: 'from-red-500 to-red-600', label: 'YouTube' },
  facebook: { icon: Facebook, color: 'from-blue-500 to-blue-600', label: 'Facebook' },
  tiktok: { icon: Share2, color: 'from-gray-800 to-gray-900', label: 'TikTok' }
};

const deliverableIcons: Record<string, any> = {
  'short-video': Video,
  'long-video': Video,
  'image': ImageIcon,
  'story': Share2,
  'text': FileText
};

const typeConfig = {
  paid: {
    label: 'Paid Campaign',
    className: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
  },
  barter: {
    label: 'Barter',
    className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
  },
  'barter-commission': {
    label: 'Barter + Commission',
    className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
  }
};

export function JobCard({ job, onClick, onSaveToggle, index, saved = false }: JobCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  const formatPrice = (price: ICampaign['price']) => {
    const format = (val: number) =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(val);

    return price?.type === 'fixed'
      ? format(price?.fixed_price)
      : `${format(price?.min_price)} - ${format(price?.max_price)}`;
  };

  const getDaysAgo = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const days = Math.floor((Date.now() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <Link
      href={`/dashboard/campaign-details/${job._id}`}
      className="group relative bg-card border-border relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.4s ease-out ${index * 0.05}s backwards`
      }}
    >
      {/* Header with Brand */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-gray-700 shadow-sm">
              {job?.brandImage ? (
                <img
                  // @ts-ignore
                  src={job?.brandImage || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                  // @ts-ignore
                  alt={job?.brandName || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary flex items-center justify-center e text-xl font-bold">
                  {job?.brandName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {job?.product_provided && (
              <div className="absolute -bottom-1 -right-1 bg-amber-400 dark:bg-amber-500 rounded-full p-1.5 shadow-md" title="Product Provided">
                <Package size={12} className="e" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg  truncate">
                {job?.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              {job?.brandName}
              <CheckCircle2 size={14} className="text-blue-500" />
            </p>

            {/* Campaign Type Badge */}
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${typeConfig[job?.type]?.className}`}>
                {typeConfig[job?.type]?.label}
              </span>
            </div>

            {
              session?.user?.id && job?.applicants_ids?.includes(session?.user?.id as string) &&

              <div className="absolute top-2 right-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800`}>
                  {'Applied'}
                </span>
              </div>
            }

          </div>


        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {job?.description}
        </p>

        {/* Platforms */}
        {job?.platform && job?.platform.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {job?.platform.map((platform) => {
              const config = platformConfig[platform.toLowerCase()];
              if (!config) return null;
              const Icon = config.icon;

              return (
                <span
                  key={platform}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${config.color} e text-xs font-medium shadow-sm`}
                >
                  <Icon size={14} />
                  <span className="capitalize">{platform}</span>
                </span>
              );
            })}
          </div>
        )}

        {/* Categories */}
        {job?.category && job?.category?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {job?.category?.slice(0, 4)?.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-accent  text-white  rounded-lg text-xs font-medium"
              >
                {cat}
              </span>
            ))}
                    {job?.category && job?.category?.length > 4 && (

                <span className="px-3 py-1 bg-accent text-white rounded-lg text-xs font-medium">
                  +{job?.category?.length - 4} more
                </span>
 
            )}
          </div>
        )}




        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-3 bg-accent rounded-xl">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <TrendingUp size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
              <p className="text-sm font-semibold  truncate">
                {
                  session?.user?.id ? <>
                    {
                      job?.price?.type === 'fixed'
                        ? Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(job?.price?.fixed_price || 0)
                        : `${Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(job?.price?.min_price || 0)} - ${Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(job?.price?.max_price || 0)}`
                    }
                  </>

                    :
                    <p>XXXX</p>
                }

              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-accent rounded-xl">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Applicants</p>
              <p className="text-sm font-semibold ">
                {session?.user?.id ? job?.applicants_count : 'XXXX'}
              </p>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        {job?.deliverables && job?.deliverables?.length > 0 && (
          <div className="mb-4 p-3 bg-accent rounded-xl border-none ">
            <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {job?.deliverables?.map((deliverable, idx) => {
                const Icon = deliverableIcons[deliverable?.type];
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-card rounded-lg text-xs  border-border"
                  >
                    <Icon size={12} />
                    <span>{deliverable?.count}x {deliverable?.type.replace('-', ' ')}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Expandable Details */}
        <div
          className="space-y-2 transition-all duration-300 overflow-hidden"
          style={{
            maxHeight: isHovered ? '200px' : '0',
            opacity: isHovered ? 1 : 0
          }}
        >
          {job?.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} className="text-gray-400" />
              <span>{job?.location}</span>
            </div>
          )}
          {job?.duration && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={14} className="text-gray-400" />
              <span>{job?.duration}</span>
            </div>
          )}
          {job?.start_date && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={14} className="text-gray-400" />
              <span>Starts: {new Date(job?.start_date).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-card flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Clock size={12} />
          Posted {getDaysAgo(job?.createdAt)}
        </span>

        <div>
          <Button>
            View Details
          </Button>
        </div>
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 e rounded-lg text-sm font-medium transition-all hover:scale-105 shadow-md hover:shadow-lg"
        >
          Apply Now
        </button> */}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Link>
  );
}