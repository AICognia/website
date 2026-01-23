import { Metadata } from 'next'
import { privacyPolicyMetadata } from '@/src/config/pageMetadata'
import PrivacyPolicyClient from './PrivacyPolicyClient'

export const metadata: Metadata = privacyPolicyMetadata

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
