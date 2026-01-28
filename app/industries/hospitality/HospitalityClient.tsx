'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/Hospitality'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function HospitalityClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'hospitality']}
        industryData={{
          name: 'Hospitality',
          description: 'AI concierge for hotels, restaurants & resorts. 24/7 booking management, guest services & multilingual support in 45+ languages.',
          features: ['Hotel Booking AI', 'Guest Services', '24/7 Concierge', 'Restaurant Reservations', 'Multilingual Support']
        }}
      />
      <Component />
      <RelatedContent pageType="industry" currentSlug="hospitality" />
    </>
  )
}
