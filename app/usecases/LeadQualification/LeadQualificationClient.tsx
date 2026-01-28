'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/usecases/LeadQualification'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function LeadQualificationClient() {
  return (
    <>
      <SEOHead pageType="usecase" breadcrumbs={['usecases', 'LeadQualification']} />
      <Component />
    </>
  )
}
