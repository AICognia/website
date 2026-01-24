'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarCheck
} from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import { structuredDataTemplates } from '../config/seoConfig'
import HeroBackgroundGrid from '../components/HeroBackgroundGrid'

const Contact: React.FC = () => {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  // Glass style matching homepage hero exactly
  const glassOpacity = isDark ? 0.30 : 0.30
  const glassBlur = 22

  const glassStyle = {
    borderWidth: '0.5px',
    background: isDark
      ? `rgba(31, 41, 55, ${glassOpacity})`
      : `rgba(255, 255, 255, ${glassOpacity})`,
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: isDark
      ? 'inset 0 3px 6px rgba(120, 184, 255, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.15), inset 0 -3px 6px rgba(120, 184, 255, 0.12), inset 3px 0 6px rgba(120, 184, 255, 0.08), inset -3px 0 6px rgba(120, 184, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.3)'
      : 'inset 0 1px 2px rgba(14, 165, 233, 0.15), inset 0 -1px 2px rgba(14, 165, 233, 0.08), inset 1px 0 2px rgba(14, 165, 233, 0.12), inset -1px 0 2px rgba(14, 165, 233, 0.05), 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/xkgbykwq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setStatusMessage(language === 'tr' ? 'Mesajınız başarıyla gönderildi!' : 'Message sent successfully!')
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        setSubmitStatus('error')
        setStatusMessage(language === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.')
      }
    } catch {
      setSubmitStatus('error')
      setStatusMessage(language === 'tr' ? 'Bağlantı hatası. Lütfen daha sonra tekrar deneyin.' : 'Connection error. Please try again later.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitStatus('idle')
        setStatusMessage('')
      }, 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Cognia AI',
      url: 'https://cogniaai.com',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-616-326-3328',
        contactType: 'sales',
        availableLanguage: ['English', 'Turkish', 'Spanish'],
        areaServed: 'Worldwide'
      }
    }
  }

  const contactMethods = [
    {
      icon: FaPhone,
      title: language === 'tr' ? 'Telefon' : 'Phone',
      value: '+1 616-326-3328',
      subtitle: language === 'tr' ? 'Hafta içi 9-17 EST' : 'Mon-Fri 9AM-5PM EST',
      href: 'tel:+16163263328',
      color: 'blue'
    },
    {
      icon: FaEnvelope,
      title: language === 'tr' ? 'E-posta' : 'Email',
      value: 'hello@cogniaai.com',
      subtitle: language === 'tr' ? '24 saat içinde yanıt' : 'Response within 24h',
      href: 'mailto:hello@cogniaai.com',
      color: 'green'
    },
    {
      icon: FaMapMarkerAlt,
      title: language === 'tr' ? 'Ofisler' : 'Offices',
      value: language === 'tr' ? 'ABD & Türkiye' : 'US & Turkey',
      subtitle: language === 'tr' ? 'Global hizmet' : 'Global service',
      href: null,
      color: 'purple'
    }
  ]

  const stats = [
    { value: '99.9%', label: language === 'tr' ? 'Çalışma Süresi' : 'Uptime SLA' },
    { value: '3x', label: language === 'tr' ? 'Daha Hızlı' : 'Faster Decisions' },
    { value: '500+', label: language === 'tr' ? 'Entegrasyon' : 'Integrations' },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="contact"
        structuredData={[
          structuredDataTemplates.organization,
          contactStructuredData
        ]}
      />

      <section className="min-h-screen flex flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Dynamic Background Grid - same as homepage */}
        <HeroBackgroundGrid isPlaying={false} />

        {/* Large Gradient Overlay for depth & bottom fade */}
        <div className={`absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none ${isDark ? 'from-gray-900/10 to-gray-900' : 'from-white/10 to-white'}`} />
        <div className={`absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none ${isDark ? 'from-gray-900 via-gray-900/40' : 'from-white via-white/40'}`} />

        {/* Radial gradient for text readability - hidden on mobile for simplicity */}
        <div
          className="hidden sm:block absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 100% 90% at 20% 50%, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.85) 30%, rgba(17,24,39,0.6) 50%, rgba(17,24,39,0.3) 70%, rgba(17,24,39,0) 90%)'
              : 'radial-gradient(ellipse 80% 60% at 25% 45%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 75%)',
          }}
        />

        {/* Main container */}
        <div className="w-full max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 relative z-10 flex-1 flex items-center pt-20 sm:pt-16 lg:pt-20 pb-12 sm:pb-24 3xl:-mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

            {/* Left Column - Value Proposition (7 cols) */}
            <motion.div
              className={`lg:col-span-7 relative rounded-2xl sm:rounded-[2rem] border p-5 sm:p-8 lg:p-10 xl:p-12 h-full ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
              style={glassStyle}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 lg:mb-10 ${
                    isDark
                      ? 'bg-blue-900/40 border border-blue-500/30'
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60'
                  }`}
                  style={{
                    boxShadow: isDark
                      ? 'inset 0 1px 2px rgba(120, 184, 255, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.05)'
                      : '0 2px 12px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative">
                    <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
                    <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} animate-ping opacity-75`} />
                  </div>
                  <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    {language === 'tr' ? 'Bize Ulaşın' : 'Get in Touch'}
                  </span>
                  <FaEnvelope className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </motion.div>

                <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-serif font-light leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6 lg:mb-8 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  {language === 'tr' ? 'Hadi ' : "Let's "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                    {language === 'tr' ? 'Başlayalım' : 'Connect'}
                  </span>
                </h1>

                <p className={`text-base sm:text-lg lg:text-xl 2xl:text-2xl max-w-xl lg:max-w-2xl mb-6 sm:mb-8 lg:mb-10 leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                  {language === 'tr'
                    ? 'AI dönüşüm yolculuğunuza bugün başlayın. Uzman ekibimiz sizinle 24 saat içinde iletişime geçecek.'
                    : 'Start your AI transformation journey today. Our expert team will get back to you within 24 hours.'}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-stretch gap-2 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
                  {stats.map((item, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 min-w-[90px] sm:min-w-[120px] rounded-xl sm:rounded-2xl border px-3 sm:px-5 py-3 sm:py-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className={`text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-serif font-normal ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {item.value}
                      </div>
                      <div className={`text-[9px] sm:text-[10px] 2xl:text-xs uppercase tracking-[0.12em] font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="/demo"
                    className="btn-primary h-12 sm:h-14 px-6 sm:px-8 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <FaCalendarCheck />
                    <span>{language === 'tr' ? 'Demo Talep Et' : 'Schedule Demo'}</span>
                  </Link>
                  <a
                    href="tel:+16163263328"
                    className={`h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 border transition-colors w-full sm:w-auto ${
                      isDark
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <FaPhone className="text-sm" />
                    <span>{language === 'tr' ? 'Hemen Ara' : 'Call Now'}</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form (5 cols) */}
            <motion.div
              className={`lg:col-span-5 rounded-2xl sm:rounded-[2rem] border p-5 sm:p-8 lg:p-10 xl:p-12 h-full pointer-events-auto ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
              style={glassStyle}
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-serif font-normal mb-1 sm:mb-2 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  {language === 'tr' ? 'Mesaj Gönderin' : 'Send a Message'}
                </h2>
                <p className={`text-sm sm:text-base mb-6 sm:mb-8 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {language === 'tr' ? '24 saat içinde yanıt garantisi' : 'Guaranteed response within 24 hours'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label htmlFor="name" className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      {language === 'tr' ? 'Ad Soyad' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                      placeholder={language === 'tr' ? 'Adınız Soyadınız' : 'John Smith'}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      {language === 'tr' ? 'E-posta' : 'Work Email'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      {language === 'tr' ? 'Şirket' : 'Company'}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                      placeholder={language === 'tr' ? 'Şirket Adı' : 'Acme Corp'}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      {language === 'tr' ? 'Mesajınız' : 'Message'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                      placeholder={language === 'tr' ? 'Projeniz hakkında bilgi verin...' : 'Tell us about your project...'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full h-12 sm:h-14 rounded-lg sm:rounded-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{language === 'tr' ? 'Gönderiliyor...' : 'Sending...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{language === 'tr' ? 'Mesajı Gönder' : 'Send Message'}</span>
                        <FaArrowRight />
                      </>
                    )}
                  </button>

                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-center text-sm font-medium ${
                        submitStatus === 'success'
                          ? isDark ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-green-50 text-green-700 border border-green-200'
                          : isDark ? 'bg-red-900/30 text-red-400 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {statusMessage}
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 relative ${isDark ? 'bg-gray-800/30' : 'bg-slate-50/50'}`}>
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 sm:mb-6 ${isDark ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-50'}`}>
              {language === 'tr' ? 'İletişim Bilgileri' : 'Contact Information'}
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              {language === 'tr' ? 'Bize Nasıl Ulaşabilirsiniz' : 'How to Reach Us'}
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              {language === 'tr'
                ? 'Size en uygun yöntemle iletişime geçin. Global ekibimiz her zaman yardıma hazır.'
                : 'Reach out through your preferred channel. Our global team is always ready to help.'}
            </p>
          </motion.div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              const colorClasses = {
                blue: isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600',
                green: isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600',
                purple: isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-50 text-purple-600',
              }

              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-xl sm:rounded-2xl border p-5 sm:p-8 text-center transition-all ${
                    method.href ? 'hover:shadow-lg cursor-pointer' : ''
                  } ${
                    isDark
                      ? 'border-gray-700 hover:border-blue-500/30'
                      : 'border-slate-200 hover:border-blue-200'
                  }`}
                  style={glassStyle}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 ${colorClasses[method.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                    {method.title}
                  </h3>
                  <p className={`text-base sm:text-lg font-medium mb-0.5 sm:mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {method.value}
                  </p>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {method.subtitle}
                  </p>
                </motion.div>
              )

              return method.href ? (
                <a key={index} href={method.href}>
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              )
            })}
          </div>

          {/* Social Media & Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Social Media Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`rounded-xl sm:rounded-2xl border p-5 sm:p-8 ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
              style={glassStyle}
            >
              <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                {language === 'tr' ? 'Sosyal Medya' : 'Follow Us'}
              </h3>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://www.linkedin.com/company/cognia-ai-usa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all hover:shadow-md ${
                    isDark
                      ? 'border-gray-600 hover:border-blue-500/50 hover:bg-blue-900/20'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <FaLinkedin className={`text-xl sm:text-2xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`text-sm sm:text-base font-medium ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/cognia.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all hover:shadow-md ${
                    isDark
                      ? 'border-gray-600 hover:border-pink-500/50 hover:bg-pink-900/20'
                      : 'border-slate-200 hover:border-pink-300 hover:bg-pink-50'
                  }`}
                >
                  <FaInstagram className={`text-xl sm:text-2xl ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
                  <span className={`text-sm sm:text-base font-medium ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>Instagram</span>
                </a>
              </div>
            </motion.div>

            {/* Trust Indicators Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`rounded-xl sm:rounded-2xl border p-5 sm:p-8 ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
              style={glassStyle}
            >
              <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                {language === 'tr' ? 'Güvenilirlik' : 'Trust & Security'}
              </h3>
{/* HIDDEN: Compliance badges - uncomment to re-enable
              <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                <div className={`flex items-center gap-3 ${isDark ? 'opacity-60' : 'grayscale opacity-70'}`}>
                  <img src="/SOC2_Type1.svg" alt="SOC 2 Type I" className="h-8 sm:h-10 w-auto" />
                </div>
                <div className={`flex items-center gap-3 ${isDark ? 'opacity-60' : 'grayscale opacity-70'}`}>
                  <img src="/SOC2_Type2.svg" alt="SOC 2 Type II" className="h-8 sm:h-10 w-auto" />
                </div>
                <div className={`flex items-center gap-3 ${isDark ? 'opacity-60' : 'grayscale opacity-70'}`}>
                  <img src="/HIPAA.svg" alt="HIPAA" className="h-8 sm:h-10 w-auto" />
                </div>
              </div>
              */}
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
                {[
                  language === 'tr' ? '24/7 Destek' : '24/7 Support',
                  language === 'tr' ? '20+ Dil' : '20+ Languages',
                  language === 'tr' ? 'Global Hizmet' : 'Global Service'
                ].map((item, i) => (
                  <span key={i} className={`flex items-center gap-1 sm:gap-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    <FaCheckCircle className={`text-[10px] sm:text-xs ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />
      </section>

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl sm:rounded-[2rem] border p-6 sm:p-10 lg:p-16 text-center ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
            style={glassStyle}
          >
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              {language === 'tr' ? 'AI Dönüşümünüze Başlayın' : 'Start Your AI Transformation'}
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              {language === 'tr'
                ? 'Ücretsiz danışmanlık görüşmesi için randevu alın. Verilerinizin potansiyelini birlikte keşfedelim.'
                : 'Schedule a free consultation call. Let\'s explore the potential in your data together.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/demo"
                className="btn-primary h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg w-full sm:w-auto"
              >
                <FaCalendarCheck />
                {language === 'tr' ? 'Ücretsiz Demo' : 'Free Demo'}
              </Link>
              <a
                href="tel:+16163263328"
                className={`h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg border transition-colors w-full sm:w-auto ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FaPhone />
                +1 616-326-3328
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 sm:mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-xs">
              {[
                language === 'tr' ? 'Ücretsiz Danışmanlık' : 'Free Consultation',
                language === 'tr' ? 'Taahhüt Yok' : 'No Commitment',
                language === 'tr' ? 'Uzman Ekip' : 'Expert Team',
                language === 'tr' ? 'Hızlı Başlangıç' : 'Fast Onboarding'
              ].map((item, i) => (
                <span key={i} className={`flex items-center gap-1 sm:gap-2 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                  <FaCheckCircle className={`text-[10px] sm:text-xs ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
