'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const CustomAI = dynamic(() => import('@/src/page-components/solutions/CustomAI'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function CustomAIClient() {
  return (
    <>
      <SEOHead pageType="solutions" breadcrumbs={['solutions', 'custom-ai']} />
      <CustomAI />
    </>
  )
}
