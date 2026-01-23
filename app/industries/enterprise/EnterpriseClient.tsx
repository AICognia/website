'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Component = dynamic(() => import('@/src/page-components/industries/Enterprise'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function EnterpriseClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'enterprise']}
        industryData={{
          name: 'Enterprise',
          description: 'Enterprise-grade AI solutions with custom integrations. Dedicated support & SLA guarantees.',
          features: ['Custom Integrations', 'Enterprise Security', 'Data Protection', 'SLA Guarantees', 'Dedicated Support']
        }}
      />
      <Component />
    </>
  )
}
