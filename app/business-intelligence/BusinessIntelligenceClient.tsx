'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const BusinessIntelligence = dynamic(() => import('@/src/page-components/BusinessIntelligence'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function BusinessIntelligenceClient() {
  return (
    <>
      <SEOHead pageType="business-intelligence" breadcrumbs={['business-intelligence']} />
      <BusinessIntelligence />
    </>
  )
}
