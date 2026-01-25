'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'

const Component = dynamic(() => import('@/src/page-components/industries/ServiceBusinesses'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function ServiceBusinessesClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'service-businesses']}
        industryData={{
          name: 'Service Businesses',
          description: 'AI solutions for consulting, agencies, and professional services. Optimize utilization and client satisfaction.',
          features: ['Client Management', 'Resource Planning', 'Billing Automation', 'Project Analytics']
        }}
      />
      <Component />
      <RelatedContent pageType="industry" currentSlug="service-businesses" />
    </>
  )
}
