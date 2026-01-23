import { Metadata } from 'next'
import SignUpClient from './SignUpClient'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your Cognia AI account to get started with AI receptionist and voice agents for your business.',
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
    canonical: null, // No canonical for auth pages
  },
}

export default function SignUpPage() {
  return <SignUpClient />
}
