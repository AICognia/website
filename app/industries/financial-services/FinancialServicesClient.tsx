'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Component = dynamic(() => import('@/src/page-components/industries/FinancialServices'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function FinancialServicesClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'financial-services']}
        industryData={{
          name: 'Financial Services',
          description: 'Secure AI for banks, insurance & fintech. Customer verification, appointment booking & account inquiries with enterprise-grade security.',
          features: ['Customer Verification', 'Appointment Booking', 'Account Inquiries', 'Enterprise Security', 'Fraud Prevention']
        }}
      />
      <Component />
    </>
  )
}
