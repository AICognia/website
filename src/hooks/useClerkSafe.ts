'use client'

import { useUser as useClerkUser, useClerk as useClerkInstance } from '@clerk/nextjs'

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
const isClerkConfigured = publishableKey && publishableKey.startsWith('pk_') && !publishableKey.includes('placeholder')

export function useUser() {
  if (!isClerkConfigured) {
    return {
      isLoaded: true,
      isSignedIn: false,
      user: null,
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useClerkUser()
}

export function useClerk() {
  if (!isClerkConfigured) {
    return {
      signOut: () => Promise.resolve(),
      openSignIn: () => {},
      openSignUp: () => {},
      openUserProfile: () => {},
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useClerkInstance()
}

export { isClerkConfigured }
