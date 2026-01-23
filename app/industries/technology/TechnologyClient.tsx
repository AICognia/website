'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Component = dynamic(() => import('@/src/page-components/industries/Technology'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function TechnologyClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'technology']}
        industryData={{
          name: 'Technology',
          description: 'AI for tech companies. Technical support automation, customer onboarding & sales qualification with API integrations.',
          features: ['Technical Support', 'Customer Onboarding', 'Sales Qualification', 'API Integrations', 'Self-Service AI']
        }}
      />
      <Component />
    </>
  )
}
