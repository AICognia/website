import { Metadata } from 'next'
import { useCaseMetadata } from '@/src/config/pageMetadata'
import CustomerSupportClient from './CustomerSupportClient'

export const metadata: Metadata = useCaseMetadata.CustomerSupport

export default function CustomerSupportPage() {
  return <CustomerSupportClient />
}
