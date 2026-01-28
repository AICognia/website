'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/Technology'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function TechnologyClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'technology']}
        industryData={{
          name: 'Technology',
          description: 'AI for tech companies. Technical support automation, customer onboarding & sales qualification with API integrations.',
          features: ['Technical Support', 'Customer Onboarding', 'Sales Qualification', 'API Integrations', 'Self-Service AI']
        }}
      />
      <Component />
    </>
  )
}
