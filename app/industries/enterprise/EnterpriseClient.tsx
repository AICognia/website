'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/Enterprise'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function EnterpriseClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'enterprise']}
        industryData={{
          name: 'Enterprise',
          description: 'Enterprise-grade AI solutions with custom integrations. Dedicated support & SLA guarantees.',
          features: ['Custom Integrations', 'Enterprise Security', 'Data Protection', 'SLA Guarantees', 'Dedicated Support']
        }}
      />
      <Component />
    </>
  )
}
