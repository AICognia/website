'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/features/CRMIntegration'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function CRMIntegrationClient() {
  return (
    <>
      <SEOHead pageType="feature" breadcrumbs={['features', 'CRMIntegration']} />
      <Component />
    </>
  )
}
