import { Metadata } from 'next'
import ChatbotClient from './ChatbotClient'

export const metadata: Metadata = {
  title: 'AI Chatbot - Convert Visitors into Customers 24/7',
  description: 'AI chatbots that engage, qualify, and convert your website visitors 24/7. Multi-channel deployment on website, WhatsApp, Instagram, and more. 30+ languages, lead qualification, and seamless human handoff.',
  keywords: [
    'AI chatbot', 'website chatbot', 'lead generation chatbot', 'WhatsApp bot',
    'Instagram chatbot', 'Facebook Messenger bot', 'conversational AI', 'chatbot software',
    '24/7 customer support', 'lead qualification bot', 'multilingual chatbot', 'sales chatbot'
  ],
  openGraph: {
    title: 'AI Chatbot | Turn Visitors Into Customers 24/7',
    description: 'AI chatbots that engage, qualify, and convert. Multi-channel. 30+ languages. Seamless human handoff.',
    url: 'https://cogniaai.com/solutions/chatbot',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chatbot | Cognia AI',
    description: 'Convert 3x more visitors. 24/7 engagement. Multi-channel deployment.',
  },
  alternates: {
    canonical: 'https://cogniaai.com/solutions/chatbot',
  },
}

export default function ChatbotPage() {
  return <ChatbotClient />
}
