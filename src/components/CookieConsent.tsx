'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CookieManager from '../utils/cookieManager'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from 'next-themes'
import { FiShield, FiX, FiCheck, FiSettings } from 'react-icons/fi'

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

  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    setMounted(true)
    CookieManager.initialize()
    setHasConsent(CookieManager.hasConsent())
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
  }

  const handleSavePreferences = () => {
    CookieManager.setPreferences(preferences)
    CookieManager.setConsent(true)
    setHasConsent(true)
  }

  // Don't render until mounted (prevents hydration mismatch)
  // Also hide if user already gave consent
  if (!mounted || hasConsent === null || hasConsent === true) return null

  const translations = {
    en: {
      title: 'Cookie Preferences',
      message: 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. Choose your preferences below.',
      acceptAll: 'Accept All',
      declineAll: 'Decline All',
      customize: 'Customize',
      savePreferences: 'Save Preferences',
      necessary: 'Necessary',
      necessaryDesc: 'Essential for the website to function properly',
      analytics: 'Analytics',
      analyticsDesc: 'Help us understand how visitors interact with our site',
      marketing: 'Marketing',
      marketingDesc: 'Used to deliver relevant ads and track campaigns',
      functional: 'Functional',
      functionalDesc: 'Enable enhanced functionality and personalization',
      alwaysOn: 'Always on'
    },
    tr: {
      title: 'Çerez Tercihleri',
      message: 'Tarama deneyiminizi geliştirmek, site trafiğini analiz etmek ve içeriği kişiselleştirmek için çerezler kullanıyoruz. Aşağıdan tercihlerinizi seçin.',
      acceptAll: 'Tümünü Kabul Et',
      declineAll: 'Tümünü Reddet',
      customize: 'Özelleştir',
      savePreferences: 'Tercihleri Kaydet',
      necessary: 'Gerekli',
      necessaryDesc: 'Web sitesinin düzgün çalışması için gerekli',
      analytics: 'Analitik',
      analyticsDesc: 'Ziyaretçilerin sitemizle nasıl etkileşime girdiğini anlamamıza yardımcı olur',
      marketing: 'Pazarlama',
      marketingDesc: 'İlgili reklamlar sunmak ve kampanyaları izlemek için kullanılır',
      functional: 'İşlevsel',
      functionalDesc: 'Gelişmiş işlevsellik ve kişiselleştirme sağlar',
      alwaysOn: 'Her zaman açık'
    }
  }

  const t = translations[language as keyof typeof translations]

  const cookieOptions = [
    { key: 'necessary', label: t.necessary, desc: t.necessaryDesc, required: true },
    { key: 'analytics', label: t.analytics, desc: t.analyticsDesc, required: false },
    { key: 'marketing', label: t.marketing, desc: t.marketingDesc, required: false },
    { key: 'functional', label: t.functional, desc: t.functionalDesc, required: false },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[9999]"
      >
        <div
          className={`
            rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden
            ${isDark
              ? 'bg-gray-900/95 border-gray-700/50'
              : 'bg-white/95 border-gray-200/50'
            }
          `}
        >
          {/* Header */}
          <div className={`px-5 pt-5 pb-4 ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`
                p-2 rounded-xl
                ${isDark ? 'bg-sky-500/20' : 'bg-sky-50'}
              `}>
                <FiShield className={`w-5 h-5 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.title}
              </h3>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.message}
            </p>
          </div>

          {/* Customize Section */}
          <AnimatePresence>
            {showCustomize && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}
              >
                <div className="px-5 py-4 space-y-3">
                  {cookieOptions.map((option) => (
                    <div
                      key={option.key}
                      className={`
                        flex items-center justify-between p-3 rounded-xl transition-colors
                        ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}
                      `}
                    >
                      <div className="flex-1 mr-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {option.label}
                          </span>
                          {option.required && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                              {t.alwaysOn}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {option.desc}
                        </p>
                      </div>
                      <button
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
                          relative w-11 h-6 rounded-full transition-colors duration-200
                          ${option.required || preferences[option.key as keyof typeof preferences]
                            ? isDark ? 'bg-sky-500' : 'bg-sky-600'
                            : isDark ? 'bg-gray-600' : 'bg-gray-300'
                          }
                          ${option.required ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                        `}
                      >
                        <span
                          className={`
                            absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200
                            ${option.required || preferences[option.key as keyof typeof preferences] ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className={`px-5 pb-5 pt-2 ${showCustomize ? '' : ''}`}>
            {showCustomize ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCustomize(false)}
                  className={`
                    flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isDark
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <FiX className="w-4 h-4 inline mr-1.5" />
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className={`
                    flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-500/25
                  `}
                >
                  <FiCheck className="w-4 h-4 inline mr-1.5" />
                  {t.savePreferences}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {/* Primary actions row */}
                <div className="flex gap-2">
                  <button
                    onClick={handleDeclineAll}
                    className={`
                      flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                      ${isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                      }
                    `}
                  >
                    {t.declineAll}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className={`
                      flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                      bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-500/25
                    `}
                  >
                    {t.acceptAll}
                  </button>
                </div>
                {/* Customize button */}
                <button
                  onClick={() => setShowCustomize(true)}
                  className={`
                    w-full px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                    ${isDark
                      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <FiSettings className="w-4 h-4" />
                  {t.customize}
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CookieConsentBanner
