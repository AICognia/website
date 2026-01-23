import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import TechnologyClient from './TechnologyClient'

export const metadata: Metadata = industryMetadata.technology

export default function TechnologyPage() {
  return <TechnologyClient />
}
