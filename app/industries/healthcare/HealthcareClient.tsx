'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import RelatedContent from '@/src/components/RelatedContent'

const Component = dynamic(() => import('@/src/page-components/industries/Healthcare'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function HealthcareClient() {
  return (
    <>
      <SEOHead
        pageType="industry"
        breadcrumbs={['industries', 'healthcare']}
        industryData={{
          name: 'Healthcare',
          description: 'Secure AI receptionist for healthcare. Patient scheduling, appointment reminders, insurance verification & 24/7 medical reception.',
          features: ['Patient Scheduling', 'Appointment Reminders', 'Insurance Verification', '24/7 Medical Reception', 'Enterprise Security']
        }}
      />
      <Component />
      <RelatedContent pageType="industry" currentSlug="healthcare" />
    </>
  )
}
