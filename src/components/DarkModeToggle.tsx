'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function DarkModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hide on auth pages
  const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up')
  if (isAuthPage) return null

  // Default to dark to prevent flash
  const isDark = !mounted || resolvedTheme === 'dark'

  // Glass effect settings - matching navbar exactly
  const glassOpacity = isDark ? 0.55 : 0.30
  const glassBlur = 22

  if (!mounted) {
    return (
      <div
        className="hidden lg:block fixed top-2 sm:top-3 right-3 sm:right-6 z-[100] w-12 sm:w-14 h-12 sm:h-14 rounded-[1rem] sm:rounded-[1.25rem]"
        style={{
          background: 'rgba(17, 24, 39, 0.55)',
          backdropFilter: 'blur(22px)',
        }}
      />
    )
  }

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        hidden lg:flex
        fixed top-2 sm:top-3 right-3 sm:right-6 z-[100]
        w-12 sm:w-14 h-12 sm:h-14 rounded-[1rem] sm:rounded-[1.25rem]
        flex items-center justify-center
        border shadow-lg
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${isDark
          ? 'border-blue-500/30 shadow-black/20'
          : 'border-[#e2e8f0] shadow-black/[0.03]'
        }
      `}
      style={{
        background: isDark
          ? `rgba(17, 24, 39, ${glassOpacity})`
          : `rgba(255, 255, 255, ${glassOpacity})`,
        backdropFilter: `blur(${glassBlur}px)`,
        WebkitBackdropFilter: `blur(${glassBlur}px)`,
        boxShadow: isDark
          ? 'inset 0 2px 4px rgba(120, 184, 255, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.12), inset 0 -2px 4px rgba(120, 184, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)'
          : undefined,
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-gray-100"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-slate-700"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
