'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'

const Component = dynamic(() => import('@/src/page-components/industries/Legal'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function LegalClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'legal']}
        industryData={{
          name: 'Legal Services',
          description: 'AI for law firms. Confidential client intake, appointment scheduling & 24/7 answering service.',
          features: ['Client Intake', 'Appointment Scheduling', '24/7 Answering', 'Confidential Handling', 'Consultation Booking']
        }}
      />
      <Component />
      <RelatedContent pageType="industry" currentSlug="legal" />
    </>
  )
}
