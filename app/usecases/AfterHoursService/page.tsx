import { Metadata } from 'next'
import { useCaseMetadata } from '@/src/config/pageMetadata'
import AfterHoursServiceClient from './AfterHoursServiceClient'

export const metadata: Metadata = useCaseMetadata.AfterHoursService

export default function AfterHoursServicePage() {
  return <AfterHoursServiceClient />
}
