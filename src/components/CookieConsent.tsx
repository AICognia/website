'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CookieManager from '../utils/cookieManager'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from 'next-themes'

const CookieConsentBanner: React.FC = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)
  const [showCustomize, setShowCustomize] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  })

  const isDark = !mounted || resolvedTheme === 'dark'

  useEffect(() => {
    setMounted(true)
    CookieManager.initialize()
    setHasConsent(CookieManager.hasConsent())
  }, [])

  // Dispatch custom event when consent changes so StickyMobileCTA can listen
  const dispatchConsentEvent = useCallback((consented: boolean) => {
    window.dispatchEvent(new CustomEvent('cookieConsentChange', { detail: { consented } }))
  }, [])

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    CookieManager.setPreferences(allEnabled)
    CookieManager.setConsent(true)
    setHasConsent(true)
    dispatchConsentEvent(true)
  }

  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    CookieManager.setPreferences(onlyNecessary)
    CookieManager.setConsent(true)
    setHasConsent(true)
    dispatchConsentEvent(true)
  }

  const handleSavePreferences = () => {
    CookieManager.setPreferences(preferences)
    CookieManager.setConsent(true)
    setHasConsent(true)
    dispatchConsentEvent(true)
  }

  // Don't render until mounted (prevents hydration mismatch)
  // Also hide if user already gave consent
  if (!mounted || hasConsent === null || hasConsent === true) return null

  const translations = {
    en: {
      message: 'We use cookies to enhance your experience.',
      acceptAll: 'Accept',
      declineAll: 'Decline',
      customize: 'Settings',
      save: 'Save',
      necessary: 'Essential',
      analytics: 'Analytics',
      marketing: 'Marketing',
      functional: 'Functional'
    },
    tr: {
      message: 'Deneyiminizi geliştirmek için çerez kullanıyoruz.',
      acceptAll: 'Kabul',
      declineAll: 'Reddet',
      customize: 'Ayarlar',
      save: 'Kaydet',
      necessary: 'Gerekli',
      analytics: 'Analitik',
      marketing: 'Pazarlama',
      functional: 'İşlevsel'
    }
  }

  const t = translations[language as keyof typeof translations]

  const cookieOptions = [
    { key: 'necessary', label: t.necessary, required: true },
    { key: 'analytics', label: t.analytics, required: false },
    { key: 'marketing', label: t.marketing, required: false },
    { key: 'functional', label: t.functional, required: false },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed bottom-4 left-4 z-[9998] max-w-[320px]"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="bento-card !p-0 overflow-hidden">
          {/* Main content */}
          <div className="p-4">
            <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-gray-300' : 'text-[rgba(55,50,47,0.80)]'}`}>
              {t.message}
            </p>

            {/* Customize Section - Compact toggles */}
            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <div className={`grid grid-cols-2 gap-2 mb-3 p-2 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-[rgba(55,50,47,0.04)]'}`}>
                    {cookieOptions.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => {
                          if (!option.required) {
                            setPreferences(prev => ({
                              ...prev,
                              [option.key]: !prev[option.key as keyof typeof prev]
                            }))
                          }
                        }}
                        disabled={option.required}
                        className={`
                          flex items-center justify-between px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-colors
                          ${option.required
                            ? isDark ? 'bg-blue-500/20 text-blue-400 cursor-default' : 'bg-blue-50 text-blue-600 cursor-default'
                            : preferences[option.key as keyof typeof preferences]
                              ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                              : isDark ? 'bg-gray-700/50 text-gray-400 hover:bg-gray-700' : 'bg-white text-[rgba(55,50,47,0.60)] hover:bg-gray-50'
                          }
                        `}
                      >
                        <span>{option.label}</span>
                        <span className={`w-3 h-3 rounded-full flex items-center justify-center ${
                          option.required || preferences[option.key as keyof typeof preferences]
                            ? isDark ? 'bg-blue-400' : 'bg-blue-500'
                            : isDark ? 'bg-gray-600' : 'bg-gray-300'
                        }`}>
                          {(option.required || preferences[option.key as keyof typeof preferences]) && (
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {showCustomize ? (
                <>
                  <button
                    onClick={() => setShowCustomize(false)}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-[rgba(55,50,47,0.06)] text-[rgba(55,50,47,0.70)] hover:bg-[rgba(55,50,47,0.10)]'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-3 py-2 rounded-lg text-xs font-medium text-white transition-colors"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
                    }}
                  >
                    {t.save}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleDeclineAll}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-[rgba(55,50,47,0.06)] text-[rgba(55,50,47,0.70)] hover:bg-[rgba(55,50,47,0.10)]'
                    }`}
                  >
                    {t.declineAll}
                  </button>
                  <button
                    onClick={() => setShowCustomize(true)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isDark
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-[rgba(55,50,47,0.50)] hover:text-[rgba(55,50,47,0.70)]'
                    }`}
                  >
                    {t.customize}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-3 py-2 rounded-lg text-xs font-medium text-white transition-colors"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
                    }}
                  >
                    {t.acceptAll}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CookieConsentBanner
