'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'

const Component = dynamic(() => import('@/src/page-components/industries/Manufacturing'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function ManufacturingClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'manufacturing']}
        industryData={{
          name: 'Manufacturing',
          description: 'Unify production data, predict equipment failures, and optimize operations with AI-powered intelligence.',
          features: ['Predictive Maintenance', 'Quality Analytics', 'Production Optimization', 'Supply Chain Intelligence']
        }}
      />
      <Component />
      <RelatedContent pageType="industry" currentSlug="manufacturing" />
    </>
  )
}
