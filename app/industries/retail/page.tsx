import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import RetailClient from './RetailClient'

export const metadata: Metadata = industryMetadata.retail

export default function RetailPage() {
  return <RetailClient />
}
