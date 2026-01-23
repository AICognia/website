import { Metadata } from 'next'
import ChatClient from './ChatClient'

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat with Cognia AI assistant.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: null, // No canonical for chat page
  },
}

export default function Chat() {
  return <ChatClient />
}
