'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/usecases/CustomerSupport'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function CustomerSupportClient() {
  return (
    <>
      <SEOHead pageType="usecase" breadcrumbs={['usecases', 'CustomerSupport']} />
      <Component />
      <RelatedContent pageType="usecase" currentSlug="CustomerSupport" />
    </>
  )
}
