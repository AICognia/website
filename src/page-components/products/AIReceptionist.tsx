'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FaPhone, FaClock, FaCalendarCheck, FaGlobe, FaChartLine, FaShieldAlt, FaRobot, FaCheckCircle, FaHeadset, FaBell, FaUserTie, FaBuilding, FaMedkit, FaCar, FaQuoteLeft } from 'react-icons/fa'
import { ArrowRight } from 'lucide-react'
import SEO from '../../components/SEO'
import HeroBackgroundGrid from '../../components/HeroBackgroundGrid'
import MobileHeroBackground from '../../components/MobileHeroBackground'
import VoiceDemo from '../../components/VoiceDemo'

const AIReceptionist: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const glassStyle = {
    borderWidth: '0.5px',
    background: 'var(--hero-glass-bg)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    boxShadow: 'var(--hero-glass-shadow)',
  }

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/mqarlrwl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `AI Receptionist Demo Request from ${formData.name}${formData.company ? ` at ${formData.company}` : ''}`,
          form_type: 'ai_receptionist_demo_request',
          source: 'ai_receptionist_page',
          submitted_at: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', phone: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Subtle glass style for accordion cards - uses CSS variables for theme-aware rendering
  const accordionGlassStyle = (isExpanded: boolean) => ({
    background: isExpanded ? 'var(--accordion-bg-expanded)' : 'var(--accordion-bg)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: isExpanded ? 'var(--accordion-shadow-expanded)' : 'var(--accordion-shadow)',
  })

  const features = [
    {
      icon: FaClock,
      title: '24/7 Voice Agent',
      description: 'Phone calls handled on autopilot. Our AI answers every call instantly with human-like conversations, day or night, weekends and holidays included.',
      features: ['Instant Answer', 'No Hold Times', 'Natural Conversations', 'Overflow Handling']
    },
    {
      icon: FaChartLine,
      title: 'Lead Generation & Scoring',
      description: 'Qualify, score, and route leads automatically. Every call becomes structured data with intent signals and priority ranking.',
      features: ['Auto-Qualification', 'Lead Scoring', 'Smart Routing', 'Intent Detection']
    },
    {
      icon: FaBell,
      title: 'SMS Automation',
      description: 'Reminders and follow-ups at scale. Automatic appointment confirmations, follow-up sequences, and two-way SMS conversations.',
      features: ['Auto-Reminders', 'Follow-up Sequences', 'Two-Way SMS', 'Bulk Messaging']
    },
    {
      icon: FaCalendarCheck,
      title: 'Smart Scheduling',
      description: 'Book, confirm, and reschedule meetings automatically. Seamlessly integrates with your existing calendar systems.',
      features: ['Calendar Sync', 'Auto-Booking', 'Confirmations', 'Conflict Detection']
    },
    {
      icon: FaRobot,
      title: 'Sales Assistant & CRM',
      description: 'CRM enrichment and AI outreach. Automatically log calls, update records, and trigger follow-up sequences in Salesforce, HubSpot, and more.',
      features: ['CRM Enrichment', 'Auto-Logging', 'AI Outreach', 'Custom APIs']
    },
    {
      icon: FaGlobe,
      title: 'Multi-Language Support',
      description: 'Communicate with customers in their preferred language. Support for 30+ languages with natural, fluent conversations.',
      features: ['30+ Languages', 'Auto-Detection', 'Native Fluency', 'Cultural Awareness']
    }
  ]

  const industries = [
    { icon: FaMedkit, name: 'Healthcare', desc: 'Secure patient scheduling' },
    { icon: FaBuilding, name: 'Real Estate', desc: 'Property inquiries & showings' },
    { icon: FaCar, name: 'Automotive', desc: 'Service appointments & quotes' },
    { icon: FaUserTie, name: 'Professional Services', desc: 'Client intake & consultations' },
  ]

  const stats = [
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '<2s', label: 'Response Time' },
    { value: '30+', label: 'Languages' },
    { value: '500K+', label: 'Calls Handled' },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="solutions"
        customTitle="AI Voice Agent - Calls, Lead Scoring, SMS, CRM Automation | Cognia AI"
        customDescription="Phone calls handled on autopilot. Qualify and score leads automatically. SMS reminders at scale. CRM enrichment and AI outreach. 24/7 availability, 30+ languages."
      />

      <section className="lg:hidden relative overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-900">
        <div className="absolute inset-0">
          <MobileHeroBackground />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'var(--hero-gradient-mobile)'
          }}
        />

        <div className="relative z-10 px-5 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 dark:bg-blue-500/20 dark:border-blue-400/30"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
              <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">
                Flagship Product
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-[2rem] leading-[1.15] font-serif font-light tracking-tight mb-5 text-slate-900 dark:text-white"
          >
            AI Receptionist{' '}
            <span className="text-blue-600 dark:text-blue-400">
              That Never Sleeps
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base leading-relaxed mb-8 text-slate-600 dark:text-gray-300"
          >
            Phone calls on autopilot. Lead scoring. SMS at scale. CRM enrichment. All handled by AI, 24/7.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-4 gap-2 mb-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-lg font-serif font-medium text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[9px] uppercase tracking-wider font-medium mt-1 text-slate-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="mb-6"
          >
            <VoiceDemo
              title="Hear Our AI"
              subtitle="Listen to a real conversation"
              variant="default"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-3"
          >
            <Link
              href="/demo"
              className="btn-primary flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-base font-semibold"
            >
              <FaCalendarCheck className="w-4 h-4" />
              <span>Schedule Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:+16163263328"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-sm font-medium transition-colors bg-slate-900/5 text-slate-700 border border-slate-200 active:bg-slate-100 dark:bg-white/10 dark:text-white dark:border-white/20 dark:active:bg-white/15"
            >
              <FaPhone className="w-3 h-3" />
              <span>Call Demo Line</span>
            </a>
          </motion.div>
        </div>
      </section>

      <section className="hidden lg:flex h-screen max-h-[960px] min-h-[700px] flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-white dark:bg-gray-900" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <HeroBackgroundGrid isPlaying={false} />

        <div className="absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none from-white/10 to-white dark:from-gray-900/10 dark:to-gray-900" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none from-white via-white/40 dark:from-gray-900 dark:via-gray-900/40" />

        <div
          className="absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
          style={{
            background: 'var(--hero-radial-desktop)',
          }}
        />

        <div className="w-full max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] 3xl:max-w-[1584px] mx-auto px-6 lg:px-10 xl:px-12 2xl:px-16 relative z-10 flex-1 flex items-start pb-24" style={{ paddingTop: '10rem' }}>
          <div className="grid grid-cols-12 gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

            <motion.div
              className="col-span-12 lg:col-span-7 relative rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 h-full border-[#e2e8f0] dark:border-blue-500/30"
              style={glassStyle}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 lg:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 dark:bg-blue-900/40 dark:from-blue-900/40 dark:to-blue-900/40 dark:border-blue-500/30"
                  style={{
                    boxShadow: 'var(--hero-badge-shadow)',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full border-[1.5px] border-blue-500 dark:border-blue-400" />
                  <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400">
                    Flagship Product
                  </span>
                </motion.div>

                <p className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-serif font-light leading-[1.08] mb-4 lg:mb-6 text-slate-900 dark:text-gray-100" aria-hidden="true">
                  AI Receptionist<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                    That Never Sleeps
                  </span>
                </p>

                <p className="text-base lg:text-lg 2xl:text-xl max-w-xl lg:max-w-2xl mb-6 lg:mb-8 leading-relaxed text-slate-500 dark:text-gray-500">
                  Phone calls handled on autopilot. Qualify and score leads automatically. Send SMS reminders at scale. CRM enrichment and AI outreach—all in one.
                </p>

                <div className="flex flex-wrap items-stretch gap-3 lg:gap-4 mb-6 lg:mb-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 min-w-[110px] rounded-xl border px-4 py-3 border-slate-200/80 bg-white/50 dark:border-gray-700 dark:bg-gray-800/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className="text-2xl lg:text-3xl 2xl:text-4xl font-serif font-normal text-slate-800 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-[9px] 2xl:text-[10px] uppercase tracking-[0.12em] font-medium mt-1 text-slate-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <VoiceDemo
                  title="Hear Our AI in Action"
                  subtitle="Listen to a real conversation with our AI receptionist"
                  variant="default"
                  className="mb-4 sm:mb-6"
                />

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/demo"
                    className="btn-primary h-11 sm:h-12 px-5 sm:px-6 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <FaCalendarCheck />
                    Schedule Demo
                  </Link>
                  <a
                    href="tel:+16163263328"
                    className="h-11 sm:h-12 px-5 sm:px-6 rounded-xl flex items-center justify-center gap-2 border transition-colors text-sm sm:text-base w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <FaPhone className="text-sm" />
                    Call Demo Line
                  </a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-5 rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 h-full pointer-events-auto border-[#e2e8f0] dark:border-gray-700"
              style={glassStyle}
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h2 className="text-base lg:text-lg font-serif font-normal mb-1 text-slate-900 dark:text-gray-100">
                  Get Started Today
                </h2>
                <p className="text-[11px] mb-4 text-slate-500 dark:text-gray-400">
                  See how AI Receptionist can transform your business.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-slate-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-slate-700 dark:text-gray-300">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-slate-700 dark:text-gray-300">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-slate-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full h-12 sm:h-14 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Request Free Trial</span>
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
                      {submitStatus === 'success'
                        ? 'Thank you! Our team will contact you shortly.'
                        : 'Something went wrong. Please try again.'}
                    </motion.div>
                  )}
                </form>

{/* HIDDEN: Compliance badges - uncomment to re-enable
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap grayscale opacity-60 dark:grayscale-0 dark:opacity-50">
                    <img src="/SOC2_Type1.svg" alt="SOC 2 Type I Certified - Security Compliance Badge" width={24} height={24} className="h-5 sm:h-6 w-auto" loading="lazy" />
                    <img src="/SOC2_Type2.svg" alt="SOC 2 Type II Certified - Security Compliance Badge" width={24} height={24} className="h-5 sm:h-6 w-auto" loading="lazy" />
                    <img src="/HIPAA.svg" alt="HIPAA Compliant - Healthcare Data Security Badge" width={24} height={24} className="h-5 sm:h-6 w-auto" loading="lazy" />
                  </div>
                </div>
                */}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative bg-slate-50/50 dark:bg-gray-800/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-32"
            >
              <span className="inline-block px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full mb-4 sm:mb-6 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30">
                Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
                Complete Customer-Facing AI
              </h2>
              <p className="text-base sm:text-lg mb-4 text-slate-600 dark:text-gray-400">
                Voice, SMS, lead generation, and CRM automation—everything you need to capture and convert more customers.
              </p>

              <div className="mt-5 sm:mt-8">
                <VoiceDemo
                  title="Experience Natural Conversations"
                  subtitle="Our AI handles complex inquiries with ease"
                  variant="large"
                />
              </div>

              <Link
                href="/demo"
                className="btn-primary h-10 sm:h-11 px-5 sm:px-6 rounded-full text-xs sm:text-sm inline-flex mt-5 sm:mt-8 w-full sm:w-auto justify-center"
              >
                <span>See All Features</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2 sm:space-y-3"
            >
              {features.map((feature, index) => {
                const isExpanded = expandedId === index
                const Icon = feature.icon

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`
                      rounded-lg sm:rounded-xl border transition-all duration-300
                      ${isExpanded
                        ? 'border-gray-200/80 dark:border-gray-700/80'
                        : 'border-gray-200/50 hover:border-gray-200/80 dark:border-gray-700/50 dark:hover:border-gray-700/70'
                      }
                    `}
                    style={accordionGlassStyle(isExpanded)}
                  >
                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3.5">
                        <div className={`
                          w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0
                          ${isExpanded
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600'
                          }
                        `}>
                          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h3 className={`
                          text-sm sm:text-[15px] font-semibold transition-colors duration-200
                          ${isExpanded
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100'}
                        `}>
                          {feature.title}
                        </h3>
                      </div>

                      <div className={`
                        w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                        ${isExpanded
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-500 dark:group-hover:bg-gray-600'
                        }
                      `}>
                        <motion.svg
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 sm:px-5 pb-4 sm:pb-5 pt-0 pl-[2.75rem] sm:pl-[3.75rem]">
                            <p className="text-[13px] sm:text-[14px] leading-relaxed mb-3 sm:mb-4 text-slate-600 dark:text-gray-400">
                              {feature.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {feature.features.map((f, i) => (
                                <span
                                  key={i}
                                  className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />
      </section>

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <span className="inline-block px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full mb-4 sm:mb-6 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30">
              Industries
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
              Built for Every Industry
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto text-slate-600 dark:text-gray-400">
              From healthcare to automotive, our AI receptionist adapts to your industry's unique requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-xl sm:rounded-2xl border p-4 sm:p-5 lg:p-6 text-center transition-all hover:shadow-lg border-slate-200 bg-white hover:border-blue-200 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-blue-500/30"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 text-slate-900 dark:text-gray-100">
                    {industry.name}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-gray-400">
                    {industry.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-slate-50/50 dark:bg-gray-800/30">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border p-6 sm:p-8 border-slate-200 bg-white dark:border-gray-700 dark:bg-gray-800/50"
            style={glassStyle}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              <FaQuoteLeft className="text-2xl sm:text-3xl flex-shrink-0 text-blue-300 dark:text-blue-500/40" />
              <div className="flex-1">
                <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-5 text-slate-700 dark:text-gray-200">
                  "Working with Cognia has been a game-changer for our office. Now, with Cognia, we receive a clear email summary along with call transcripts first thing in the morning. This lets us immediately prioritize call-backs without wasting time."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100 dark:bg-blue-900/50">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      JO
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Jacob Ojalvo</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Office Manager, My Smile Miami</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border p-6 sm:p-8 lg:p-12 xl:p-16 text-center border-slate-200 dark:border-gray-700"
            style={glassStyle}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
              Ready to Transform Your Business Communications?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-5 sm:mb-8 text-slate-600 dark:text-gray-400">
              Join hundreds of businesses that trust Cognia AI's AI Receptionist to handle their calls professionally, 24/7.
            </p>

            <div className="max-w-md mx-auto mb-5 sm:mb-8">
              <VoiceDemo
                title="One Last Listen"
                subtitle="Hear the difference AI can make"
                variant="default"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/demo"
                className="btn-primary h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg w-full sm:w-auto"
              >
                <FaCalendarCheck />
                Start Free Trial
              </Link>
              <a
                href="tel:+16163263328"
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg border transition-colors w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <FaPhone />
                Talk to Sales
              </a>
            </div>

            <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-xs">
              {['No Credit Card Required', 'Free 14-Day Trial', '24/7 Support', 'Cancel Anytime'].map((item, i) => (
                <span key={i} className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-slate-500 dark:text-gray-500">
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

export default AIReceptionist
