'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

declare global {
  interface Window {
    __theme?: string
  }
}

/**
 * Hook that provides the current theme without causing hydration mismatches or flashes.
 *
 * On the server and initial client render, it reads from:
 * 1. window.__theme (set by blocking script in layout.tsx)
 * 2. Falls back to 'dark' (the default theme)
 *
 * After mount, it uses next-themes' resolvedTheme for reactivity.
 */
export function useThemeWithoutFlash() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Get initial theme from blocking script or default
  const getInitialTheme = (): 'dark' | 'light' => {
    if (typeof window !== 'undefined' && window.__theme) {
      return window.__theme as 'dark' | 'light'
    }
    return 'dark'
  }

  const [initialTheme] = useState(getInitialTheme)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Before mount: use initial theme (from blocking script or default)
  // After mount: use next-themes' resolved theme for reactivity
  const isDark = mounted ? resolvedTheme === 'dark' : initialTheme === 'dark'

  return {
    isDark,
    theme: isDark ? 'dark' : 'light',
    setTheme,
    mounted,
  }
}
