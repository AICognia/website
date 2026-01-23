import { Metadata } from 'next'
import { companyPageMetadata } from '@/src/config/pageMetadata'
import CompanyClient from './CompanyClient'

export const metadata: Metadata = companyPageMetadata

export default function CompanyPage() {
  return <CompanyClient />
}
