import { Metadata } from 'next'
import SSOCallbackClient from './SSOCallbackClient'

export const metadata: Metadata = {
  title: 'SSO Callback',
  description: 'Processing authentication...',
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
    canonical: null,
  },
}

export default function SSOCallback() {
  return <SSOCallbackClient />
}
