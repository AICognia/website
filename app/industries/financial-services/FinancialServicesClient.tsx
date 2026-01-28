'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Component = dynamic(() => import('@/src/page-components/industries/FinancialServices'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
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
