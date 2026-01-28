'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const Demo = dynamic(() => import('@/src/page-components/Demo'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function DemoClient() {
  return (
    <>
      <SEOHead pageType="demo" breadcrumbs={['demo']} />
      <Demo />
    </>
  )
}
