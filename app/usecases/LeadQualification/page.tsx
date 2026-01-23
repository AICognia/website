import { Metadata } from 'next'
import { useCaseMetadata } from '@/src/config/pageMetadata'
import LeadQualificationClient from './LeadQualificationClient'

export const metadata: Metadata = useCaseMetadata.LeadQualification

export default function LeadQualificationPage() {
  return <LeadQualificationClient />
}
