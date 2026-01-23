import { Metadata } from 'next'
import { contactPageMetadata } from '@/src/config/pageMetadata'
import ContactClient from './ContactClient'

export const metadata: Metadata = contactPageMetadata

export default function ContactPage() {
  return <ContactClient />
}
