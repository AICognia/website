'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/HomeServices'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function HomeServicesClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'HomeServices']}
        industryData={{
          name: 'Home Services',
          description: 'AI for contractors, plumbers, electricians & HVAC. Service scheduling, customer follow-ups & lead management.',
          features: ['Service Scheduling', 'Customer Follow-ups', 'Lead Management', '24/7 Booking', 'Appointment Reminders']
        }}
      />
      <Component />
    </>
  )
}
