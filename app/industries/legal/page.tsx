import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import LegalClient from './LegalClient'

export const metadata: Metadata = industryMetadata.legal

export default function LegalPage() {
  return <LegalClient />
}
