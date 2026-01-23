'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Component = dynamic(() => import('@/src/page-components/industries/PublicSector'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
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
