import { Metadata } from 'next'
import { useCaseMetadata } from '@/src/config/pageMetadata'
import PatientSchedulingClient from './PatientSchedulingClient'

export const metadata: Metadata = useCaseMetadata.PatientScheduling

export default function PatientSchedulingPage() {
  return <PatientSchedulingClient />
}
