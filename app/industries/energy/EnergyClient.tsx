'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/Energy'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
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
