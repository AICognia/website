import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import EnergyClient from './EnergyClient'

export const metadata: Metadata = industryMetadata.energy

export default function EnergyPage() {
  return <EnergyClient />
}
