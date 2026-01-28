'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Company = dynamic(() => import('@/src/page-components/Company'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function CompanyClient() {
  return (
    <>
      <SEOHead pageType="company" breadcrumbs={['company']} />
      <Company />
    </>
  )
}
