'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const BusinessIntelligence = dynamic(() => import('@/src/page-components/BusinessIntelligence'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function BusinessIntelligenceClient() {
  return (
    <>
      <SEOHead pageType="business-intelligence" breadcrumbs={['business-intelligence']} />
      <BusinessIntelligence />
    </>
  )
}
