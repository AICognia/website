import { Metadata } from 'next'
import { solutionsPageMetadata } from '@/src/config/pageMetadata'
import SolutionsClient from './SolutionsClient'

export const metadata: Metadata = solutionsPageMetadata

export default function SolutionsPage() {
  return <SolutionsClient />
}
