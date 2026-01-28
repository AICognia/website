'use client'

import dynamic from 'next/dynamic'
import SEOHead from '@/src/components/SEOHead'
import { PageLoadingSkeleton } from '@/src/components/LoadingSkeleton'

const WorkflowAutomation = dynamic(() => import('@/src/page-components/solutions/WorkflowAutomation'), {
  ssr: true,
  loading: () => <PageLoadingSkeleton />
})

export default function WorkflowAutomationClient() {
  return (
    <>
      <SEOHead pageType="solutions" breadcrumbs={['solutions', 'workflow-automation']} />
      <WorkflowAutomation />
    </>
  )
}
