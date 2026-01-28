'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/usecases/PatientScheduling'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function PatientSchedulingClient() {
  return (
    <>
      <SEOHead pageType="usecase" breadcrumbs={['usecases', 'PatientScheduling']} />
      <Component />
    </>
  )
}
