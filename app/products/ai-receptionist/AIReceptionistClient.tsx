'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const AIReceptionist = dynamic(() => import('@/src/page-components/products/AIReceptionist'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-gray-900 dark:text-gray-100">Loading...</div>
    </div>
  )
})

export default function AIReceptionistClient() {
  return (
    <>
      <SEOHead pageType="ai-receptionist" breadcrumbs={['products', 'ai-receptionist']} />
      <AIReceptionist />
    </>
  )
}
