import { Metadata } from 'next'
import ConstructionClient from './ConstructionClient'

export const metadata: Metadata = {
  title: 'AI Solutions for Construction | Cognia AI',
  description: 'Streamline project management, automate client communications, and capture more leads with AI-powered intelligence.'
}

export default function ConstructionPage() {
  return <ConstructionClient />
}
