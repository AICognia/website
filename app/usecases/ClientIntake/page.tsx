import { Metadata } from 'next'
import { useCaseMetadata } from '@/src/config/pageMetadata'
import ClientIntakeClient from './ClientIntakeClient'

export const metadata: Metadata = useCaseMetadata.ClientIntake

export default function ClientIntakePage() {
  return <ClientIntakeClient />
}
