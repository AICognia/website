'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'

const Chatbot = dynamic(() => import('@/src/page-components/solutions/Chatbot'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-gray-900 dark:text-gray-100">Loading...</div>
    </div>
  )
})

export default function ChatbotClient() {
  return (
    <>
      <SEOHead pageType="solutions" breadcrumbs={['solutions', 'chatbot']} />
      <Chatbot />
    </>
  )
}
