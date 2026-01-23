import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import EnterpriseClient from './EnterpriseClient'

export const metadata: Metadata = industryMetadata.enterprise

export default function EnterprisePage() {
  return <EnterpriseClient />
}
