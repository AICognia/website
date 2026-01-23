import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import HospitalityClient from './HospitalityClient'

export const metadata: Metadata = industryMetadata.hospitality

export default function HospitalityPage() {
  return <HospitalityClient />
}
