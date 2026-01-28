'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/Construction'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function ConstructionClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'construction']}
        industryData={{
          name: 'Construction',
          description: 'AI solutions for contractors, builders, and construction companies. Capture leads and streamline operations.',
          features: ['24/7 Call Answering', 'Lead Capture', 'Project Updates', 'Crew Scheduling']
        }}
      />
      <Component />
      <RelatedContent pageType="industry" currentSlug="construction" />
    </>
  )
}
