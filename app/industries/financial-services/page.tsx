import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import FinancialServicesClient from './FinancialServicesClient'

export const metadata: Metadata = industryMetadata['financial-services']

export default function FinancialServicesPage() {
  return <FinancialServicesClient />
}
