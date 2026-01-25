import { Metadata } from 'next'
import ServiceBusinessesClient from './ServiceBusinessesClient'

export const metadata: Metadata = {
  title: 'AI Solutions for Service Businesses | Cognia AI',
  description: 'Unify client data, optimize resource utilization, and deliver exceptional service with AI-powered intelligence across your business.'
}

export default function ServiceBusinessesPage() {
  return <ServiceBusinessesClient />
}
