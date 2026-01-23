import { Metadata } from 'next'
import { featureMetadata } from '@/src/config/pageMetadata'
import CRMIntegrationClient from './CRMIntegrationClient'

export const metadata: Metadata = featureMetadata.CRMIntegration

export default function CRMIntegrationPage() {
  return <CRMIntegrationClient />
}
