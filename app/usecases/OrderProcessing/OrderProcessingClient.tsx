'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/usecases/OrderProcessing'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function OrderProcessingClient() {
  return (
    <>
      <SEOHead pageType="usecase" breadcrumbs={['usecases', 'OrderProcessing']} />
      <Component />
    </>
  )
}
