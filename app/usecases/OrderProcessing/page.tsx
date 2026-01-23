import { Metadata } from 'next'
import { useCaseMetadata } from '@/src/config/pageMetadata'
import OrderProcessingClient from './OrderProcessingClient'

export const metadata: Metadata = useCaseMetadata.OrderProcessing

export default function OrderProcessingPage() {
  return <OrderProcessingClient />
}
