import { Metadata } from 'next'
import { featureMetadata } from '@/src/config/pageMetadata'
import CallHandlingClient from './CallHandlingClient'

export const metadata: Metadata = featureMetadata.CallHandling

export default function CallHandlingPage() {
  return <CallHandlingClient />
}
