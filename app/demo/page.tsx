import { Metadata } from 'next'
import { demoPageMetadata } from '@/src/config/pageMetadata'
import DemoClient from './DemoClient'

export const metadata: Metadata = demoPageMetadata

export default function DemoPage() {
  return <DemoClient />
}
