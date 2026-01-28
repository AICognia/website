'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const PrivacyPolicy = dynamic(() => import('@/src/page-components/PrivacyPolicy'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function PrivacyPolicyClient() {
  return (
    <>
      <SEOHead pageType="privacy" breadcrumbs={['privacy-policy']} />
      <PrivacyPolicy />
    </>
  )
}
