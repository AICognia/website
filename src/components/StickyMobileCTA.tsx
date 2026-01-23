'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaArrowRight, FaPhone } from 'react-icons/fa'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import conversionTracker from '../utils/conversionTracking'

const StickyMobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  // Glass effect settings - matching mobile navbar
  const glassOpacity = isDark ? 0.55 : 0.30
  const glassBlur = 22

  const glassStyle = {
    background: isDark
      ? `rgba(17, 24, 39, ${glassOpacity})`
      : `rgba(255, 255, 255, ${glassOpacity})`,
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: isDark
      ? 'inset 0 2px 4px rgba(120, 184, 255, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.12), inset 0 -2px 4px rgba(120, 184, 255, 0.1), 0 -4px 20px rgba(0, 0, 0, 0.3)'
      : '0 -4px 20px rgba(0, 0, 0, 0.08)',
  }

  const handleScroll = useCallback(() => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

    if (scrollPercentage > 15 && !isDismissed) {
      setIsVisible(true)
    }

    if (scrollPercentage > 90) {
      setIsVisible(false)
    }
  }, [isDismissed])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
  }

  return (
    <>
      <style>{`
        .sticky-mobile-cta {
          display: block;
        }
        @media (min-width: 1024px) {
          .sticky-mobile-cta {
            display: none !important;
          }
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="sticky-mobile-cta fixed bottom-0 left-0 right-0 z-[9999] px-3 pb-3"
            style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
          >
            {/* Floating dismiss button */}
            <div className="flex justify-end mb-2 pr-1">
              <button
                onClick={handleDismiss}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors shadow-lg ${
                  isDark
                    ? 'bg-gray-800/90 text-gray-300 hover:text-gray-100 hover:bg-gray-700 border border-gray-700/50'
                    : 'bg-white/90 text-slate-500 hover:text-slate-700 hover:bg-white border border-slate-200/50'
                }`}
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                aria-label="Dismiss"
                type="button"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            {/* Half and half buttons */}
            <div
              className={`flex items-center gap-2 p-2 rounded-2xl border shadow-xl ${
                isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'
              }`}
              style={glassStyle}
            >
              {/* Call button - 50% width */}
              <a
                href="tel:+16163263328"
                onClick={() => {
                  conversionTracker.trackPhoneCall('+16163263328')
                  conversionTracker.trackButtonClick('Call', 'sticky_cta')
                }}
                className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl transition-colors font-semibold text-sm ${
                  isDark
                    ? 'bg-gray-800/80 text-gray-200 hover:bg-gray-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FaPhone className="text-sm" />
                <span>Talk to AI</span>
              </a>

              {/* Primary CTA - Schedule Demo - 50% width */}
              <Link
                href="/demo"
                onClick={() => conversionTracker.trackButtonClick('Schedule Demo', 'sticky_cta_primary')}
                className="flex-1 h-12 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 30%, #1d4ed8 50%, #2563eb 70%, #3b82f6 100%)',
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.35), inset 0 2px 4px rgba(147, 197, 253, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(30, 64, 175, 0.3)',
                }}
              >
                <span>Schedule Demo</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default StickyMobileCTA
