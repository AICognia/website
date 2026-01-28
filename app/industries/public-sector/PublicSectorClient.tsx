'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/PublicSector'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function PublicSectorClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'public-sector']}
        industryData={{
          name: 'Public Sector',
          description: 'AI for government agencies & public services. Citizen services, appointment scheduling & information hotlines with accessible design.',
          features: ['Citizen Services', 'Appointment Scheduling', 'Information Hotlines', 'Accessible Design', 'High-Volume Handling']
        }}
      />
      <Component />
    </>
  )
}
