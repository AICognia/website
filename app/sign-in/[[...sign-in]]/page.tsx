import { Metadata } from 'next'
import SignInClient from './SignInClient'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Cognia AI account to access AI receptionist dashboard and manage your voice agents.',
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

export default function SignInPage() {
  return <SignInClient />
}
