import { Metadata } from 'next'
import { featureMetadata } from '@/src/config/pageMetadata'
import SmartSchedulingClient from './SmartSchedulingClient'

export const metadata: Metadata = featureMetadata.SmartScheduling

export default function SmartSchedulingPage() {
  return <SmartSchedulingClient />
}
