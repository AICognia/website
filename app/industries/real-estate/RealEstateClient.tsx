'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/RealEstate'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function RealEstateClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'real-estate']}
        industryData={{
          name: 'Real Estate',
          description: 'AI solutions for agents, brokers, and property managers. Increase conversions and close deals faster.',
          features: ['Lead Management', 'Property Analytics', '24/7 Response', 'Market Intelligence']
        }}
      />
      <Component />
      <RelatedContent pageType="industry" currentSlug="real-estate" />
    </>
  )
}
