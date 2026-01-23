'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'

const Component = dynamic(() => import('@/src/page-components/features/SmartScheduling'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function SmartSchedulingClient() {
  return (
    <>
      <SEOHead pageType="feature" breadcrumbs={['features', 'SmartScheduling']} />
      <Component />
      <RelatedContent pageType="feature" currentSlug="SmartScheduling" />
    </>
  )
}
