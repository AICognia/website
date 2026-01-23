'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const WhatWeDo = dynamic(() => import('@/src/page-components/WhatWeDo'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function WhatWeDoClient() {
  return (
    <>
      <SEOHead pageType="what-we-do" breadcrumbs={['what-we-do']} />
      <WhatWeDo />
    </>
  )
}
