'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const About = dynamic(() => import('@/src/page-components/About'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function AboutClient() {
  return (
    <>
      <SEOHead pageType="about" breadcrumbs={['about']} />
      <About />
    </>
  )
}
