import { Metadata } from 'next'
import { featureMetadata } from '@/src/config/pageMetadata'
import MultiLanguageClient from './MultiLanguageClient'

export const metadata: Metadata = featureMetadata.MultiLanguage

export default function MultiLanguagePage() {
  return <MultiLanguageClient />
}
