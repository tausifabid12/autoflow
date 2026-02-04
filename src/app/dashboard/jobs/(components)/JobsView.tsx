import { useState } from 'react';
import { Job, FilterState } from '../types';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';
import { ChevronDown, Funnel, Grid, List } from 'lucide-react';
import { ICampaign, ICampaignResponse } from '../(helper)/helper';
import { Button } from '@/components/ui/button';
import CampaignModal from './CreateCampaignModal';
import { useSession } from 'next-auth/react';

interface JobsViewProps {
  jobs: ICampaignResponse;
  open: boolean;
  onClose: (open: boolean) => void;
}

export function JobsView({ jobs, open, onClose }: JobsViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedJob, setSelectedJob] = useState<ICampaign | null>(null);



  const { data: session } = useSession();

  const toggleSave = (jobId: string) => {
    
// @ts-ignore
    setLocalJobs((prev) =>
      
// @ts-ignore
      prev.map((job) =>
        job._id === jobId ? { ...job, saved: !job.saved } : job
      )
    );
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4 border-b border-border">
        <div className='pb-2  flex items-center justify-between'>
          <div>
            <h1 className="font-semibold text-heading-xl mb-2">
            Available Jobs
          </h1>
          <p className="text-body-md text-light-text-secondary dark:text-dark-text-secondary">
            {jobs?.total} opportunities Found
          </p>
          </div>
         
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none px-4 py-2.5 pr-10 bg-light-bg-tertiary dark:bg-dark-bg-tertiary border border-transparent rounded-xl text-body-md font-medium focus:outline-none focus:border-accent-500 transition-all cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="budget">Highest Budget</option>
              <option value="applicants">Most Popular</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-light-text-tertiary dark:text-dark-text-tertiary"
            />
          </div> */}


{
  session?.user?.role === 'brand' && (
    <div className='hidden lg:block'>
      <CampaignModal />
    </div>
  )
}
          

           <Button 
           
           className='block lg:hidden' onClick={() => onClose(true)}>
            <Funnel size={20} />
          </Button>

          {/* <div className="flex items-center gap-1 p-1  rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-background shadow-sm'
                  : 'bg-card'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-card shadow-sm'
                  : 'hover:bg-card'
              }`}
            >
              <List size={18} />
            </button>
          </div> */}
        </div>
      </div>

      {jobs?.data.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-light-bg-tertiary dark:bg-dark-bg-tertiary flex items-center justify-center">
            <Grid size={32} className="text-light-text-tertiary dark:text-dark-text-tertiary" />
          </div>
          <h3 className="font-semibold text-heading-md mb-2">No jobs found</h3>
          <p className="text-body-md text-light-text-secondary dark:text-dark-text-secondary">
            Try adjusting your filters to see more results
          </p>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 lg:grid-cols-2'
              : 'grid-cols-1'
          }`}
        >
          {jobs?.data.map((job, index) => (
            <JobCard
              key={job._id}
              job={job}
              onClick={() => setSelectedJob(job)}
              
// @ts-ignore
              onSaveToggle={() => toggleSave(job?._id)}
              index={index}
            />
          ))}
        </div>
      )}

      {selectedJob && (
        <JobDetailModal
        
// @ts-ignore
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          
// @ts-ignore
          onSaveToggle={() => toggleSave(selectedJob._id)}
        />
      )}
    </>
  );
}
