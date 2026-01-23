import { Metadata } from 'next'
import { featureMetadata } from '@/src/config/pageMetadata'
import NaturalConversationsClient from './NaturalConversationsClient'

export const metadata: Metadata = featureMetadata.NaturalConversations

export default function NaturalConversationsPage() {
  return <NaturalConversationsClient />
}
