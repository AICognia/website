'use client'

import React, { useState, useEffect } from 'react'
import CookieManager from '../utils/cookieManager'
import { useLanguage } from '../contexts/LanguageContext'
import { FaCookie } from 'react-icons/fa'

const CookieConsentBanner: React.FC = () => {
  const { language } = useLanguage()
  const [hasConsent, setHasConsent] = useState<boolean | null>(null) // null = not yet checked
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    CookieManager.initialize()
    setHasConsent(CookieManager.hasConsent())
  }, [])

  const handleAccept = () => {
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

  const handleDecline = () => {
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

  // Don't render until we've checked localStorage (prevents flash)
  // Also hide if user already gave consent
  if (hasConsent === null || hasConsent === true) return null

  const translations = {
    en: {
      message: 'We use cookies to enhance your experience.',
      accept: 'Accept',
      decline: 'Decline'
    },
    tr: {
      message: 'Deneyiminizi geliştirmek için çerezler kullanıyoruz.',
      accept: 'Kabul Et',
      decline: 'Reddet'
    }
  }

  const t = translations[language as keyof typeof translations]

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-4 py-3 bg-transparent border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          aria-label="Cookie settings"
        >
          <FaCookie className="text-[#1E40AF] text-lg" />
          <span className="text-sm font-medium text-gray-700">Cookies</span>
        </button>
      ) : (
        <div className="bg-transparent border border-gray-200 rounded-2xl shadow-xl p-4 min-w-[280px] max-w-[320px] animate-fade-in">
          <div className="flex items-start gap-3 mb-3">
            <FaCookie className="text-[#1E40AF] text-xl flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed">
              {t.message}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t.decline}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#1E40AF' }}
            >
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CookieConsentBanner
