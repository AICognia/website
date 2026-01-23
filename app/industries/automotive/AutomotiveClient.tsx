'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'

const Component = dynamic(() => import('@/src/page-components/industries/Automotive'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function AutomotiveClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'automotive']}
        industryData={{
          name: 'Automotive',
          description: 'AI solutions for car dealerships & auto services. Service scheduling, lead qualification & customer follow-ups.',
          features: ['Service Scheduling', 'Lead Qualification', 'Customer Follow-ups', 'Appointment Reminders', 'Sales Support']
        }}
      />
      <Component />
      <RelatedContent pageType="industry" currentSlug="automotive" />
    </>
  )
}
