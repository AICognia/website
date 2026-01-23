'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Industries = dynamic(() => import('@/src/page-components/Industries'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function IndustriesClient() {
  return (
    <>
      <SEOHead pageType="industries" breadcrumbs={['industries']} />
      <Industries />
    </>
  )
}
