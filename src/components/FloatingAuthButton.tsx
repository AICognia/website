'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, useClerk } from '@/src/hooks/useClerkSafe'
import { LogIn, LogOut, User } from 'lucide-react'

export default function FloatingAuthButton() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hide on auth pages
  if (pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up')) {
    return null
  }

  // Default to dark to prevent flash
  const isDark = !mounted || resolvedTheme === 'dark'

  // Glass effect settings - matching navbar exactly
  const glassOpacity = isDark ? 0.55 : 0.30
  const glassBlur = 22

  // Position: to the left of dark mode toggle
  // Dark mode toggle is at right: 1rem, width 56px, 8px gap
  // Auth button is positioned to the left of that
  const rightPosition = 'calc(1rem + 56px + 8px)'

  const baseButtonStyles = {
    background: isDark
      ? `rgba(17, 24, 39, ${glassOpacity})`
      : `rgba(255, 255, 255, ${glassOpacity})`,
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: isDark
      ? 'inset 0 2px 4px rgba(120, 184, 255, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.12), inset 0 -2px 4px rgba(120, 184, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)'
      : undefined,
  }

  if (!mounted) {
    return (
      <div
        className="hidden xl:block fixed top-2 sm:top-3 z-[100] h-12 sm:h-14 rounded-[1rem] sm:rounded-[1.25rem]"
        style={{
          right: rightPosition,
          background: 'rgba(17, 24, 39, 0.55)',
          backdropFilter: 'blur(22px)',
          width: '56px',
        }}
      />
    )
  }

  if (isSignedIn) {
    return (
      <div
        className="hidden xl:block fixed top-2 sm:top-3 z-[100]"
        style={{ right: rightPosition }}
      >
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          className={`
            w-12 sm:w-14 h-12 sm:h-14 rounded-[1rem] sm:rounded-[1.25rem]
            flex items-center justify-center
            border shadow-lg
            transition-all duration-300 ease-out
            hover:scale-105 active:scale-95
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
            overflow-hidden
            ${isDark
              ? 'border-blue-500/30 shadow-black/20'
              : 'border-[#e2e8f0] shadow-black/[0.03]'
            }
          `}
          style={baseButtonStyles}
          aria-label="User menu"
          whileTap={{ scale: 0.9 }}
        >
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.firstName || 'User'}
              className="w-full h-full object-cover rounded-[1rem] sm:rounded-[1.25rem]"
            />
          ) : (
            <User className={`w-5 h-5 ${isDark ? 'text-gray-100' : 'text-slate-700'}`} />
          )}
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={`absolute right-0 top-14 sm:top-16 w-56 rounded-[1rem] shadow-xl border overflow-hidden ${
                isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'
              }`}
              style={{
                background: isDark
                  ? `rgba(17, 24, 39, 0.95)`
                  : `rgba(255, 255, 255, 0.95)`,
                backdropFilter: `blur(${glassBlur}px)`,
                WebkitBackdropFilter: `blur(${glassBlur}px)`,
              }}
            >
              <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-slate-100'}`}>
                <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {user?.fullName || 'Account'}
                </p>
                <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
              <button
                onClick={() => {
                  signOut()
                  setShowMenu(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  isDark
                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click outside to close */}
        {showMenu && (
          <div
            className="fixed inset-0 z-[-1]"
            onClick={() => setShowMenu(false)}
          />
        )}
      </div>
    )
  }

  return (
    <Link href="/sign-in">
      <motion.div
        className={`
          hidden xl:flex
          fixed top-2 sm:top-3 z-[100]
          h-12 sm:h-14 rounded-[1rem] sm:rounded-[1.25rem]
          flex items-center justify-center gap-2
          px-4 sm:px-5
          border shadow-lg
          transition-all duration-300 ease-out
          hover:scale-105 active:scale-95
          cursor-pointer
          ${isDark
            ? 'border-blue-500/30 shadow-black/20'
            : 'border-[#e2e8f0] shadow-black/[0.03]'
          }
        `}
        style={{
          ...baseButtonStyles,
          right: rightPosition,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <LogIn className={`w-4 h-4 ${isDark ? 'text-gray-100' : 'text-slate-700'}`} />
        <span className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-slate-700'}`}>Sign in</span>
      </motion.div>
    </Link>
  )
}
