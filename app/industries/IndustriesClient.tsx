'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Industries = dynamic(() => import('@/src/page-components/Industries'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center" />
})

export default function IndustriesClient() {
  return (
    <>
      <SEOHead pageType="industries" breadcrumbs={['industries']} />
      <Industries />
    </>
  )
}
