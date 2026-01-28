'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/Retail'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function RetailClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'retail']}
        industryData={{
          name: 'Retail',
          description: 'AI for retail customer service. Order inquiries, product information & sales support across phone, WhatsApp & Instagram.',
          features: ['Order Inquiries', 'Product Information', 'Sales Support', 'Omnichannel Support', 'AI Recommendations']
        }}
      />
      <Component />
    </>
  )
}
