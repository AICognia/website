import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import PublicSectorClient from './PublicSectorClient'

export const metadata: Metadata = industryMetadata['public-sector']

export default function PublicSectorPage() {
  return <PublicSectorClient />
}
