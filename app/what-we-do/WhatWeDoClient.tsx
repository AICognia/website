'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const WhatWeDo = dynamic(() => import('@/src/page-components/WhatWeDo'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function WhatWeDoClient() {
  return (
    <>
      <SEOHead pageType="what-we-do" breadcrumbs={['what-we-do']} />
      <WhatWeDo />
    </>
  )
}
