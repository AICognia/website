import { Metadata } from 'next'
import { industryMetadata } from '@/src/config/pageMetadata'
import HomeServicesClient from './HomeServicesClient'

export const metadata: Metadata = industryMetadata.HomeServices

export default function HomeServicesPage() {
  return <HomeServicesClient />
}
