'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
const isClerkConfigured = publishableKey && publishableKey.startsWith('pk_') && !publishableKey.includes('placeholder')

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  if (!isClerkConfigured) {
    return <>{children}</>
  }

  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}
