import { Metadata } from 'next'
import RealEstateClient from './RealEstateClient'

export const metadata: Metadata = {
  title: 'AI Solutions for Real Estate | Cognia AI',
  description: 'Streamline property management, automate client communications, and gain market insights with AI-powered intelligence.'
}

export default function RealEstatePage() {
  return <RealEstateClient />
}
