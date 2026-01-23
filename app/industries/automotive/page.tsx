import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import AutomotiveClient from './AutomotiveClient'

export const metadata: Metadata = industryMetadata.automotive

export default function AutomotivePage() {
  return <AutomotiveClient />
}
