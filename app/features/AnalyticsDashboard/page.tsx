import { Metadata } from 'next'
import { featureMetadata } from '@/src/config/pageMetadata'
import AnalyticsDashboardClient from './AnalyticsDashboardClient'

export const metadata: Metadata = featureMetadata.AnalyticsDashboard

export default function AnalyticsDashboardPage() {
  return <AnalyticsDashboardClient />
}
