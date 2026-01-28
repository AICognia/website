'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/Legal'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
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
