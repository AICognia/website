'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/Manufacturing'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function ManufacturingClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'manufacturing']}
        industryData={{
          name: 'Manufacturing',
          description: 'Unify production data, predict equipment failures, and optimize operations with AI-powered intelligence.',
          features: ['Predictive Maintenance', 'Quality Analytics', 'Production Optimization', 'Supply Chain Intelligence']
        }}
      />
      <Component />
      <RelatedContent pageType="industry" currentSlug="manufacturing" />
    </>
  )
}
