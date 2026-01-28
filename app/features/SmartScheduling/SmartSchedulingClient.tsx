'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/features/SmartScheduling'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function SmartSchedulingClient() {
  return (
    <>
      <SEOHead pageType="feature" breadcrumbs={['features', 'SmartScheduling']} />
      <Component />
      <RelatedContent pageType="feature" currentSlug="SmartScheduling" />
    </>
  )
}
