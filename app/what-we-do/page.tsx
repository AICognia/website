import { Metadata } from 'next'
import { whatWeDoPageMetadata } from '@/src/config/pageMetadata'
import WhatWeDoClient from './WhatWeDoClient'

export const metadata: Metadata = whatWeDoPageMetadata

export default function WhatWeDoPage() {
  return <WhatWeDoClient />
}
