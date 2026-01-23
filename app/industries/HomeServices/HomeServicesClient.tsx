'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Component = dynamic(() => import('@/src/page-components/industries/HomeServices'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
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
