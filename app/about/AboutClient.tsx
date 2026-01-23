'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const About = dynamic(() => import('@/src/page-components/About'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-100">Loading...</div></div>
})

export default function AboutClient() {
  return (
    <>
      <SEOHead pageType="about" breadcrumbs={['about']} />
      <About />
    </>
  )
}
