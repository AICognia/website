import { Metadata } from 'next'
import BusinessIntelligenceClient from './BusinessIntelligenceClient'

export const metadata: Metadata = {
  title: 'Business Intelligence - AI Analytics & Predictive Insights',
  description: 'Transform business data into actionable insights with Cognia AI. Predictive analytics, real-time reporting, anomaly detection, executive briefings, and natural language querying. Make data-driven decisions faster.',
  keywords: [
    'business intelligence', 'AI analytics', 'predictive analytics', 'data intelligence',
    'data insights', 'enterprise analytics', 'customer analytics', 'anomaly detection',
    'executive briefings', 'real-time reporting', 'AI data analysis', 'predictive modeling'
  ],
  openGraph: {
    title: 'Business Intelligence | AI Analytics & Predictive Insights',
    description: 'Predictive analytics, anomaly detection & real-time reporting. Make data-driven decisions.',
    url: 'https://cogniaai.com/business-intelligence',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Intelligence | Cognia AI',
    description: 'AI analytics & predictive insights. Transform data into decisions.',
  },
  alternates: {
    canonical: 'https://cogniaai.com/business-intelligence',
  },
}

export default function BusinessIntelligencePage() {
  return <BusinessIntelligenceClient />
}
