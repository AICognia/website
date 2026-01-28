'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Contact = dynamic(() => import('@/src/page-components/Contact'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function ContactClient() {
  return (
    <>
      <SEOHead pageType="contact" breadcrumbs={['contact']} />
      <Contact />
    </>
  )
}
