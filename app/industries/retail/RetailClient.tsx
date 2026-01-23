'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Component = dynamic(() => import('@/src/page-components/industries/Retail'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
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
