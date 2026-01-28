'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/usecases/AfterHoursService'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function AfterHoursServiceClient() {
  return (
    <>
      <SEOHead pageType="usecase" breadcrumbs={['usecases', 'AfterHoursService']} />
      <Component />
    </>
  )
}
