import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import HealthcareClient from './HealthcareClient'

export const metadata: Metadata = industryMetadata.healthcare

export default function HealthcarePage() {
  return <HealthcareClient />
}
