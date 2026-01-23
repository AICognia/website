import { Metadata } from 'next'
import WorkflowAutomationClient from './WorkflowAutomationClient'

export const metadata: Metadata = {
  title: 'Workflow Automation - Stop Doing Repetitive Work',
  description: 'Custom automations that connect your tools, eliminate manual tasks, and free your team. 1000+ app integrations, instant triggers, bi-directional sync, and error-free operations.',
  keywords: [
    'workflow automation', 'business automation', 'process automation', 'task automation',
    'Zapier alternative', 'automation platform', 'CRM automation', 'lead automation',
    'invoice automation', 'data sync', 'integration platform', 'no-code automation'
  ],
  openGraph: {
    title: 'Workflow Automation | Stop Doing Repetitive Work',
    description: 'Connect 1000+ tools. Eliminate manual tasks. Save 10+ hours weekly.',
    url: 'https://cogniaai.com/solutions/workflow-automation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workflow Automation | Cognia AI',
    description: 'Custom automations for your exact workflows. 99.9% accuracy.',
  },
  alternates: {
    canonical: 'https://cogniaai.com/solutions/workflow-automation',
  },
}

export default function WorkflowAutomationPage() {
  return <WorkflowAutomationClient />
}
