import { X, CheckCircle2, MapPin, Calendar, DollarSign, Users, Briefcase, Clock, Instagram, Youtube, Facebook, Zap, Bookmark, Share2 } from 'lucide-react';
import { Job, Platform } from '../types';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
  onSaveToggle: () => void;
}

const platformIcons: Record<Platform, typeof Instagram> = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  tiktok: Zap,
};

export function JobDetailModal({ job, onClose, onSaveToggle }: JobDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    if (overlayRef.current && modalRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'back.out(1.2)',
        }
      );
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    if (overlayRef.current && modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: onClose,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="min-h-screen px-4 py-8 flex items-start justify-center">
        <div
          ref={modalRef}
          className="relative w-full max-w-3xl bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-3xl shadow-modal overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 bg-light-bg-secondary/95 dark:bg-dark-bg-secondary/95 backdrop-blur-xl border-b border-light-border dark:border-dark-border px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-light-border dark:ring-dark-border">
                <img src={job?.brand?.avatar} alt={job?.brand?.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold text-heading-lg">{job.title}</h2>
                  {job.brand.verified && (
                    <CheckCircle2 size={20} className="text-accent-500" />
                  )}
                </div>
                <p className="text-body-md text-light-text-secondary dark:text-dark-text-secondary">
                  {job.brand.name}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors focus-ring"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={18} className="text-accent-500" />
                  <span className="text-label-sm text-light-text-tertiary dark:text-dark-text-tertiary">Budget</span>
                </div>
                <p className="font-semibold text-heading-sm">
                  ${job.budget.min.toLocaleString()} - ${job.budget.max.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} className="text-accent-500" />
                  <span className="text-label-sm text-light-text-tertiary dark:text-dark-text-tertiary">Applicants</span>
                </div>
                <p className="font-semibold text-heading-sm">{job.applicants}</p>
              </div>

              <div className="p-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} className="text-accent-500" />
                  <span className="text-label-sm text-light-text-tertiary dark:text-dark-text-tertiary">Location</span>
                </div>
                <p className="font-semibold text-heading-sm truncate">{job.location}</p>
              </div>

              <div className="p-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={18} className="text-accent-500" />
                  <span className="text-label-sm text-light-text-tertiary dark:text-dark-text-tertiary">Posted</span>
                </div>
                <p className="font-semibold text-heading-sm">{job.postedAt}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-heading-md mb-3">Description</h3>
              <p className="text-body-md text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {job.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-heading-md mb-3">Deliverables</h3>
              <ul className="space-y-2">
                {job.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-3 text-body-md">
                    <CheckCircle2 size={20} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">
                      {deliverable}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-heading-md mb-3">Required Platforms</h3>
              <div className="flex flex-wrap gap-3">
                {job.platforms.map((platform) => {
                  const Icon = platformIcons[platform];
                  return (
                    <div
                      key={platform}
                      className="flex items-center gap-2 px-4 py-3 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-xl"
                    >
                      <Icon size={20} />
                      <span className="font-medium text-body-md capitalize">{platform}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-heading-md mb-3">
                  <Calendar className="inline mr-2" size={20} />
                  Timeline
                </h3>
                <p className="text-body-md text-light-text-secondary dark:text-dark-text-secondary">
                  {job.timeline}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-heading-md mb-3">
                  <Briefcase className="inline mr-2" size={20} />
                  Category
                </h3>
                <span className="inline-block px-4 py-2 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg font-medium text-body-md">
                  {job.category}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-heading-md mb-3">Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-body-md">
                  <Users size={20} className="text-light-text-tertiary dark:text-dark-text-tertiary flex-shrink-0 mt-0.5" />
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    Minimum {job.requiredFollowers.min.toLocaleString()} followers
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="sticky bottom-0 bg-light-bg-secondary/95 dark:bg-dark-bg-secondary/95 backdrop-blur-xl border-t border-light-border dark:border-dark-border px-8 py-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveToggle();
                }}
                className="p-3 rounded-xl border border-light-border dark:border-dark-border hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-all focus-ring"
              >
                <Bookmark
                  size={20}
                  className={job.saved ? 'fill-accent-500 text-accent-500' : ''}
                />
              </button>
              <button className="p-3 rounded-xl border border-light-border dark:border-dark-border hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-all focus-ring">
                <Share2 size={20} />
              </button>
            </div>

            <button className="flex-1 sm:flex-initial px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-semibold text-body-md transition-all hover:scale-[1.02] focus-ring">
              Apply for this Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
