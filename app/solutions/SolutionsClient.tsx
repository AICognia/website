'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Solutions = dynamic(() => import('@/src/page-components/Solutions'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function SolutionsClient() {
  return (
    <>
      <SEOHead pageType="solutions" breadcrumbs={['solutions']} />
      <Solutions />
    </>
  )
}
