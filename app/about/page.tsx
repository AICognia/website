import { Metadata } from 'next'
import { aboutPageMetadata } from '@/src/config/pageMetadata'
import AboutClient from './AboutClient'

export const metadata: Metadata = aboutPageMetadata

export default function AboutPage() {
  return <AboutClient />
}
