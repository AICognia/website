'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Contact = dynamic(() => import('@/src/page-components/Contact'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function ContactClient() {
  return (
    <>
      <SEOHead pageType="contact" breadcrumbs={['contact']} />
      <Contact />
    </>
  )
}
