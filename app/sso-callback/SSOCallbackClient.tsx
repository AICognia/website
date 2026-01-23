'use client'

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { isClerkConfigured } from '@/src/hooks/useClerkSafe'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SSOCallbackClient() {
  const router = useRouter()

  useEffect(() => {
    if (!isClerkConfigured) {
      router.replace('/')
    }
  }, [router])

  if (!isClerkConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Authentication is not configured. Redirecting...</p>
      </div>
    )
  }

  return <AuthenticateWithRedirectCallback />
}
