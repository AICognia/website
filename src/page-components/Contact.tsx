'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCalendarCheck
} from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import { structuredDataTemplates } from '../config/seoConfig'
import HeroBackgroundGrid from '../components/HeroBackgroundGrid'
import MobileHeroBackground from '../components/MobileHeroBackground'

const Contact: React.FC = () => {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Glass style using CSS variables to avoid dark mode flash
  const glassStyle = {
    borderWidth: '0.5px',
    background: 'var(--hero-glass-bg)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    boxShadow: 'var(--hero-glass-shadow)',
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
      value: 'emrebenian@cogniaai.com',
      subtitle: language === 'tr' ? '24 saat içinde yanıt' : 'Response within 24h',
      href: 'mailto:emrebenian@cogniaai.com',
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

      {/* Mobile Hero Section - Matching About page style */}
      <section className="lg:hidden relative overflow-hidden transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0">
          <MobileHeroBackground />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'var(--hero-gradient-mobile)'
          }}
        />
        <div className="relative z-10 px-5 pt-24 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 dark:bg-blue-500/20 dark:border-blue-400/30">
              <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
              <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">
                {language === 'tr' ? 'Bize Ulaşın' : 'Get in Touch'}
              </span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-[1.875rem] leading-[1.15] font-serif font-light tracking-tight mb-4 text-slate-900 dark:text-white"
          >
            {language === 'tr' ? 'Hadi ' : "Let's "}<br />
            <span className="text-blue-600 dark:text-blue-400">
              {language === 'tr' ? 'Başlayalım' : 'Connect'}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base leading-relaxed mb-6 text-slate-600 dark:text-gray-300"
          >
            {language === 'tr'
              ? 'AI dönüşüm yolculuğunuza bugün başlayın. 24 saat içinde yanıt garantisi.'
              : 'Start your AI transformation journey today. Guaranteed response within 24 hours.'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex justify-between mb-6 px-2"
          >
            {stats.map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-serif font-medium text-slate-900 dark:text-white">{item.value}</div>
                <div className="text-[9px] uppercase tracking-wider font-medium mt-1 text-slate-500 dark:text-gray-400">{item.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Mobile Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border p-5 mb-4 border-slate-200/80 bg-white/60 dark:border-gray-700/50 dark:bg-gray-800/40"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          >
            <h2 className="text-lg font-serif font-normal mb-1 text-slate-900 dark:text-gray-100">
              {language === 'tr' ? 'Mesaj Gönderin' : 'Send a Message'}
            </h2>
            <p className="text-xs mb-4 text-slate-500 dark:text-gray-400">
              {language === 'tr' ? '24 saat içinde yanıt garantisi' : 'Guaranteed response within 24 hours'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="mobile-name" className="block text-xs font-semibold mb-1 text-slate-700 dark:text-gray-300">
                  {language === 'tr' ? 'Ad Soyad' : 'Full Name'}
                </label>
                <input
                  type="text"
                  id="mobile-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                  placeholder={language === 'tr' ? 'Adınız Soyadınız' : 'John Smith'}
                />
              </div>

              <div>
                <label htmlFor="mobile-email" className="block text-xs font-semibold mb-1 text-slate-700 dark:text-gray-300">
                  {language === 'tr' ? 'E-posta' : 'Work Email'}
                </label>
                <input
                  type="email"
                  id="mobile-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="mobile-company" className="block text-xs font-semibold mb-1 text-slate-700 dark:text-gray-300">
                  {language === 'tr' ? 'Şirket' : 'Company'}
                </label>
                <input
                  type="text"
                  id="mobile-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                  placeholder={language === 'tr' ? 'Şirket Adı' : 'Acme Corp'}
                />
              </div>

              <div>
                <label htmlFor="mobile-message" className="block text-xs font-semibold mb-1 text-slate-700 dark:text-gray-300">
                  {language === 'tr' ? 'Mesajınız' : 'How can we help?'}
                </label>
                <textarea
                  id="mobile-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                  placeholder={language === 'tr' ? 'Projeniz hakkında bilgi verin...' : 'Tell us about your project...'}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full h-12 rounded-2xl text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  <span>{language === 'tr' ? 'Mesajı Gönder' : 'Send Message'}</span>
                )}
              </button>

              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-xl text-center text-sm font-medium ${
                    submitStatus === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500/30'
                      : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500/30'
                  }`}
                >
                  {statusMessage}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Alternative Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="space-y-3"
          >
            <Link href="/demo" className="btn-primary flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-base font-semibold">
              <FaCalendarCheck />
              <span>{language === 'tr' ? 'Ücretsiz Demo' : 'Schedule Demo'}</span>
            </Link>
            <a
              href="tel:+16163263328"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-sm font-medium transition-colors bg-slate-100 text-slate-700 border border-slate-200 dark:bg-white/10 dark:text-white dark:border-white/20"
            >
              <FaPhone className="text-sm" />
              <span>{language === 'tr' ? 'Hemen Ara' : 'Call Now'}</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden lg:flex min-h-[700px] flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Desktop Background */}
        <div className="absolute inset-0">
          <HeroBackgroundGrid isPlaying={false} />
        </div>

        {/* Large Gradient Overlay for depth & bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none from-white/10 to-white dark:from-gray-900/10 dark:to-gray-900" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none from-white via-white/40 dark:from-gray-900 dark:via-gray-900/40" />

        {/* Radial gradient for text readability */}
        <div
          className="absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
          style={{
            background: 'var(--hero-radial-desktop)',
          }}
        />

        {/* Desktop Main container - EXACTLY matching UnifiedHero (Home page) */}
        <div className="hidden lg:flex w-full max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-12 2xl:px-16 relative z-10 flex-1 items-start pb-24" style={{ paddingTop: '10rem' }}>
          <div className="grid grid-cols-12 gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

            {/* Left Column - Value Proposition (7 cols) - EXACTLY like UnifiedHero */}
            <motion.div
              className="col-span-12 lg:col-span-7 relative rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 h-full border-[#e2e8f0] dark:border-blue-500/30"
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 lg:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 dark:from-transparent dark:to-transparent dark:bg-blue-900/40 dark:border-blue-500/30"
                  style={{
                    boxShadow: 'var(--hero-badge-shadow)',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full border-[1.5px] border-blue-500 dark:border-blue-400" />
                  <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400">
                    {language === 'tr' ? 'Bize Ulaşın' : 'Get in Touch'}
                  </span>
                </motion.div>

                <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif font-light leading-[1.08] mb-4 lg:mb-6 text-slate-900 dark:text-gray-100">
                  {language === 'tr' ? 'Hadi ' : "Let's "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                    {language === 'tr' ? 'Başlayalım' : 'Connect'}
                  </span>
                </h1>

                <p className="text-base lg:text-lg 2xl:text-xl max-w-xl lg:max-w-2xl mb-6 lg:mb-8 leading-relaxed text-slate-500 dark:text-gray-500">
                  {language === 'tr'
                    ? 'AI dönüşüm yolculuğunuza bugün başlayın. Uzman ekibimiz sizinle 24 saat içinde iletişime geçecek.'
                    : 'Start your AI transformation journey today. Our expert team will get back to you within 24 hours.'}
                </p>

                {/* Stats Row - EXACTLY like UnifiedHero */}
                <div className="flex flex-wrap items-stretch gap-3 lg:gap-4">
                  {stats.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 min-w-[110px] rounded-xl border px-4 py-3 border-slate-200/80 bg-white/50 dark:border-gray-700 dark:bg-gray-800/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className="text-2xl lg:text-3xl 2xl:text-4xl font-serif font-normal text-slate-800 dark:text-white">
                        {item.value}
                      </div>
                      <div className="text-[9px] 2xl:text-[10px] uppercase tracking-[0.12em] font-medium mt-1 text-slate-500 dark:text-gray-400">
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  className="mt-6 lg:mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="/demo"
                    className="btn-primary h-12 lg:h-14 px-8 rounded-xl text-base flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <FaCalendarCheck className="w-4 h-4" />
                    <span>{language === 'tr' ? 'Ücretsiz Danışmanlık' : 'Schedule Free Consultation'}</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form (5 cols) - EXACTLY like UnifiedHero */}
            <motion.div
              className="col-span-12 lg:col-span-5 rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 h-full pointer-events-auto border-[#e2e8f0] dark:border-gray-700"
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
                <h2 className="text-xl lg:text-2xl font-serif font-normal mb-1 text-slate-900 dark:text-gray-100">
                  {language === 'tr' ? 'Mesaj Gönderin' : 'Send a Message'}
                </h2>
                <p className="text-sm mb-6 text-slate-500 dark:text-gray-400">
                  {language === 'tr' ? '24 saat içinde yanıt garantisi' : 'Guaranteed response within 24 hours'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
                      {language === 'tr' ? 'Ad Soyad' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                      placeholder={language === 'tr' ? 'Adınız Soyadınız' : 'John Smith'}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
                      {language === 'tr' ? 'E-posta' : 'Work Email'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
                      {language === 'tr' ? 'Şirket' : 'Company'}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                      placeholder={language === 'tr' ? 'Şirket Adı' : 'Acme Corp'}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
                      {language === 'tr' ? 'Mesajınız' : 'How can we help?'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                      placeholder={language === 'tr' ? 'Projeniz hakkında bilgi verin...' : 'Tell us about your project...'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full h-11 rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
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
                      <span>{language === 'tr' ? 'Mesajı Gönder' : 'Send Message'}</span>
                    )}
                  </button>

                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-center text-sm font-medium ${
                        submitStatus === 'success'
                          ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500/30'
                          : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500/30'
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

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative bg-slate-50/50 dark:bg-gray-800/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 sm:mb-6 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30">
              {language === 'tr' ? 'İletişim Bilgileri' : 'Contact Information'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
              {language === 'tr' ? 'Bize Nasıl Ulaşabilirsiniz' : 'How to Reach Us'}
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto text-slate-600 dark:text-gray-400">
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
                blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
                purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
              }

              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-xl sm:rounded-2xl border p-5 sm:p-8 text-center transition-all ${
                    method.href ? 'hover:shadow-lg cursor-pointer' : ''
                  } border-slate-200 hover:border-blue-200 dark:border-gray-700 dark:hover:border-blue-500/30`}
                  style={glassStyle}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 ${colorClasses[method.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-slate-900 dark:text-gray-100">
                    {method.title}
                  </h3>
                  <p className="text-base sm:text-lg font-medium mb-0.5 sm:mb-1 text-slate-800 dark:text-white">
                    {method.value}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
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
              className="rounded-xl sm:rounded-2xl border p-5 sm:p-8 border-slate-200 dark:border-gray-700"
              style={glassStyle}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
                {language === 'tr' ? 'Sosyal Medya' : 'Follow Us'}
              </h3>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://www.linkedin.com/company/cognia-ai-usa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all hover:shadow-md border-slate-200 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-600 dark:hover:border-blue-500/50 dark:hover:bg-blue-900/20"
                >
                  <FaLinkedin className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-gray-200">LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/cognia.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all hover:shadow-md border-slate-200 hover:border-pink-300 hover:bg-pink-50 dark:border-gray-600 dark:hover:border-pink-500/50 dark:hover:bg-pink-900/20"
                >
                  <FaInstagram className="text-xl sm:text-2xl text-pink-600 dark:text-pink-400" />
                  <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-gray-200">Instagram</span>
                </a>
              </div>
            </motion.div>

            {/* Trust Indicators Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl sm:rounded-2xl border p-5 sm:p-8 border-slate-200 dark:border-gray-700"
              style={glassStyle}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
                {language === 'tr' ? 'Güvenilirlik' : 'Trust & Security'}
              </h3>
{/* HIDDEN: Compliance badges - uncomment to re-enable
              <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                <div className="flex items-center gap-3 grayscale opacity-70 dark:grayscale-0 dark:opacity-60">
                  <img src="/SOC2_Type1.svg" alt="SOC 2 Type I" className="h-8 sm:h-10 w-auto" />
                </div>
                <div className="flex items-center gap-3 grayscale opacity-70 dark:grayscale-0 dark:opacity-60">
                  <img src="/SOC2_Type2.svg" alt="SOC 2 Type II" className="h-8 sm:h-10 w-auto" />
                </div>
                <div className="flex items-center gap-3 grayscale opacity-70 dark:grayscale-0 dark:opacity-60">
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
                  <span key={i} className="flex items-center gap-1 sm:gap-2 text-slate-500 dark:text-gray-400">
                    <FaCheckCircle className="text-[10px] sm:text-xs text-blue-500 dark:text-blue-400" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />
      </section>

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl sm:rounded-[2rem] border p-6 sm:p-10 lg:p-16 text-center border-slate-200 dark:border-gray-700"
            style={glassStyle}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
              {language === 'tr' ? 'AI Dönüşümünüze Başlayın' : 'Start Your AI Transformation'}
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 text-slate-600 dark:text-gray-400">
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
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg border transition-colors w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
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
                <span key={i} className="flex items-center gap-1 sm:gap-2 text-slate-500 dark:text-gray-500">
                  <FaCheckCircle className="text-[10px] sm:text-xs text-blue-500 dark:text-blue-400" />
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
