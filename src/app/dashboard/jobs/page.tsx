'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { FilterRail } from './(components)/FilterRail'
import { Header } from './(components)/Header'
import Loading from '@/components/shared/Loading'
import { getCampaigns, ICampaignResponse, FilterState } from './(helper)/helper'
import { JobsView } from './(components)/JobsView'

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    platforms: [],       // multiple platforms
    categories: [],        // multiple categories
    locations: [],         // multiple locations
    //@ts-ignore
    type: "", 
    status: "pending",
    priceRange: [0, 50000],
    startDate: '',
    endDate: '',
    duration: '',
    search: '',
    sortBy: '',
    // @ts-ignore
    sortOrder: "desc  ",
    page: 1,
    limit: 10,
  })

  const { data: session } = useSession()

  const { isPending, isError, data, error } = useQuery<ICampaignResponse>({
    queryKey: ['campaigns', session?.user?.id, filters],
    queryFn: () => getCampaigns({...filters, creatorId: session?.user?.role == 'creator' ? session?.user?.id : null})
  })



  return (
    <div className="min-h-screen flex pt-20 ">
      <FilterRail
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        mode="jobs"
      />

      <div className="flex-1 ">

        <section className="p-4 lg:p-10">
          {
            isPending ? <Loading /> : <JobsView jobs={data as any}        open={filterOpen}
        onClose={setFilterOpen}/>
          }
        </section>


      </div>
    </div>
  )
}
