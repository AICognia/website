'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Component = dynamic(() => import('@/src/page-components/industries/Energy'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function EnergyClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'energy']}
        industryData={{
          name: 'Energy & Utilities',
          description: 'AI for energy companies & utilities. Billing inquiries, outage reporting & service requests with high-volume handling.',
          features: ['Billing Inquiries', 'Outage Reporting', 'Service Requests', 'High-Volume Handling', 'Call Center Automation']
        }}
      />
      <Component />
    </>
  )
}
