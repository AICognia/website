'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const AIReceptionist = dynamic(() => import('@/src/page-components/products/AIReceptionist'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function AIReceptionistClient() {
  return (
    <>
      <SEOHead pageType="ai-receptionist" breadcrumbs={['products', 'ai-receptionist']} />
      <AIReceptionist />
    </>
  )
}
