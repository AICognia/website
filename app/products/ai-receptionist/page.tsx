import { Metadata } from 'next'
import { aiReceptionistPageMetadata } from '@/src/config/pageMetadata'
import AIReceptionistClient from './AIReceptionistClient'

export const metadata: Metadata = aiReceptionistPageMetadata

export default function AIReceptionistPage() {
  return <AIReceptionistClient />
}
