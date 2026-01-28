'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/features/AnalyticsDashboard'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function AnalyticsDashboardClient() {
  return (
    <>
      <SEOHead pageType="feature" breadcrumbs={['features', 'AnalyticsDashboard']} />
      <Component />
    </>
  )
}
