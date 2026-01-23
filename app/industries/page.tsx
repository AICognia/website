import { Metadata } from 'next'
import { industriesPageMetadata } from '@/src/config/pageMetadata'
import IndustriesClient from './IndustriesClient'

export const metadata: Metadata = industriesPageMetadata

export default function IndustriesPage() {
  return <IndustriesClient />
}
