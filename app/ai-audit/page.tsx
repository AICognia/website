import { Metadata } from 'next'
import AIAuditClient from './AIAuditClient'

export const metadata: Metadata = {
  title: 'AI Audit | Find Your AI Opportunities - Cognia AI',
  description: 'Not sure where AI fits in your business? We\'ll analyze your operations and show you exactly where AI can drive ROI. Get your free AI audit today.',
  openGraph: {
    title: 'AI Audit | Find Your AI Opportunities - Cognia AI',
    description: 'Discover where AI can transform your business. Comprehensive analysis with ROI projections and implementation roadmap.',
  },
}

export default function AIAuditPage() {
  return <AIAuditClient />
}
