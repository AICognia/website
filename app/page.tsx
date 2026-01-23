import { Metadata } from 'next'
import { homePageMetadata } from '@/src/config/pageMetadata'
import HomeClient from './HomeClient'

export const metadata: Metadata = homePageMetadata

export default function HomePage() {
  return <HomeClient />
}
