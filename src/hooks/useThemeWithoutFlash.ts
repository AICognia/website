'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

/**
 * Hook that provides the current theme without causing hydration mismatches or flashes.
 *
 * The layout includes a blocking script that sets the `dark`/`light` class on
 * <html> before any JS runs (reading from localStorage). The server always renders
 * with className="dark", but the blocking script may change it to "light" before
 * React hydrates — which would cause a hydration mismatch if our JS tried to
 * branch on window/document during initial render.
 *
 * Solution: always return `isDark = true` during the initial render (matching the
 * server's hardcoded "dark" class). After mount, switch to next-themes' resolvedTheme.
 * Components should use Tailwind `dark:` classes for CSS-based properties so the
 * blocking script's class change takes effect via CSS without JS involvement.
 * For inline styles that depend on isDark, there will be a single re-render after
 * mount — the transition-colors CSS handles this smoothly.
 */
export function useThemeWithoutFlash() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Before mount: always 'dark' to match server render (html className="dark")
  // After mount: use next-themes' resolved theme for reactivity
  const isDark = mounted ? resolvedTheme === 'dark' : true

  return {
    isDark,
    theme: isDark ? 'dark' : 'light',
    setTheme,
    mounted,
  }
}
