import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import ManufacturingClient from './ManufacturingClient'

export const metadata: Metadata = industryMetadata.manufacturing || {
  title: 'AI Solutions for Manufacturing | Cognia AI',
  description: 'Unify production data, predict equipment failures, and optimize operations with AI-powered intelligence.'
}

export default function ManufacturingPage() {
  return <ManufacturingClient />
}
