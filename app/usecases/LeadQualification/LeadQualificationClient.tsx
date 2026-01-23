'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Component = dynamic(() => import('@/src/page-components/usecases/LeadQualification'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function LeadQualificationClient() {
  return (
    <>
      <SEOHead pageType="usecase" breadcrumbs={['usecases', 'LeadQualification']} />
      <Component />
    </>
  )
}
