'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  FaComments,
  FaClock,
  FaGlobe,
  FaShareAlt,
  FaUserCheck,
  FaCheckCircle,
  FaQuoteLeft,
  FaRocket,
  FaHeadset,
  FaChartBar,
  FaBolt,
  FaUsers,
  FaHandshake,
  FaBrain
} from 'react-icons/fa'
import { ArrowRight, MessageSquare, Zap, BarChart3, Users } from 'lucide-react'
import SEO from '../../components/SEO'
import HeroBackgroundGrid from '../../components/HeroBackgroundGrid'

const Chatbot: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(0)
  const { resolvedTheme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = !mounted || resolvedTheme === 'dark'

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
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert('Thank you! We\'ll be in touch soon.')
    setFormData({ name: '', email: '', company: '', website: '' })
  }

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const accordionGlassStyle = (isExpanded: boolean) => ({
    background: isDark
      ? isExpanded
        ? 'rgba(31, 41, 55, 0.7)'
        : 'rgba(31, 41, 55, 0.4)'
      : isExpanded
        ? 'rgba(255, 255, 255, 0.85)'
        : 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: isDark
      ? isExpanded
        ? 'inset 0 1px 1px rgba(255, 255, 255, 0.03), 0 4px 12px rgba(0, 0, 0, 0.25)'
        : 'inset 0 1px 1px rgba(255, 255, 255, 0.02), 0 2px 6px rgba(0, 0, 0, 0.15)'
      : isExpanded
        ? 'inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.06)'
        : 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 2px 6px rgba(0, 0, 0, 0.03)',
  })

  const features = [
    {
      icon: FaClock,
      title: '24/7 Availability',
      description: 'Never miss a lead. Your AI chatbot works around the clock, engaging visitors and capturing opportunities while you sleep.',
      features: ['Always Online', 'Instant Responses', 'No Wait Times', 'Global Coverage']
    },
    {
      icon: FaGlobe,
      title: '30+ Languages',
      description: 'Speak your customers\' language. Automatic detection and fluent responses in over 30 languages for global reach.',
      features: ['Auto-Detection', 'Native Fluency', 'Cultural Context', 'Real-time Translation']
    },
    {
      icon: FaShareAlt,
      title: 'Multi-Channel',
      description: 'Deploy on your website, WhatsApp, Facebook Messenger, Instagram, and more from a single platform.',
      features: ['Website Widget', 'WhatsApp', 'Messenger', 'Instagram DM']
    },
    {
      icon: FaUserCheck,
      title: 'Lead Qualification',
      description: 'Automatically qualify leads, book appointments, and route hot prospects to your sales team instantly.',
      features: ['Smart Scoring', 'Auto-Routing', 'CRM Sync', 'Instant Alerts']
    },
    {
      icon: FaHeadset,
      title: 'Human Handoff',
      description: 'Seamless escalation to human agents when needed. Your team gets full conversation context for smooth transitions.',
      features: ['Smart Escalation', 'Full Context', 'Queue Management', 'Agent Routing']
    },
    {
      icon: FaChartBar,
      title: 'Analytics & Insights',
      description: 'Full conversation analytics, conversion tracking, and customer insights to optimize your engagement strategy.',
      features: ['Conversion Tracking', 'Heat Maps', 'Drop-off Analysis', 'A/B Testing']
    }
  ]

  const benefits = [
    { icon: Zap, text: 'Convert 3x more website visitors into leads' },
    { icon: BarChart3, text: 'Reduce response time from hours to seconds' },
    { icon: Users, text: 'Handle unlimited concurrent conversations' },
    { icon: FaHandshake, text: 'Seamless handoff to human agents when needed' },
    { icon: FaChartBar, text: 'Full conversation analytics and insights' },
    { icon: FaBrain, text: 'Custom-trained on your business knowledge' },
  ]

  const stats = [
    { value: '3x', label: 'More Conversions' },
    { value: '<1s', label: 'Response Time' },
    { value: '30+', label: 'Languages' },
    { value: '24/7', label: 'Availability' },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="solutions"
        customTitle="AI Chatbot - Convert Visitors into Customers 24/7 | Cognia AI"
        customDescription="AI chatbots that engage, qualify, and convert your website visitors 24/7. Multi-channel deployment, 30+ languages, lead qualification, and seamless human handoff."
      />

      {/* Mobile Hero */}
      <section className={`lg:hidden relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="absolute inset-0">
          <HeroBackgroundGrid isPlaying={false} />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, rgba(17,24,39,0.85) 0%, rgba(17,24,39,0.7) 40%, rgba(17,24,39,0.5) 100%)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.5) 100%)'
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
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                isDark
                  ? 'bg-emerald-500/20 border border-emerald-400/30'
                  : 'bg-emerald-50 border border-emerald-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
              <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                AI Chatbot
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={`text-[2rem] leading-[1.15] font-serif font-light tracking-tight mb-5 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Turn Visitors Into{' '}
            <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Customers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}
          >
            AI chatbots that engage, qualify, and convert your website visitors 24/7. No more missed opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-4 gap-2 mb-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-lg font-serif font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-[9px] uppercase tracking-wider font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
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
              <FaRocket className="w-4 h-4" />
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/chat"
              className={`flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-white/10 text-white border border-white/20 active:bg-white/15'
                  : 'bg-slate-900/5 text-slate-700 border border-slate-200 active:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Try Live Demo</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Desktop Hero */}
      <section className="hidden lg:flex min-h-screen flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <HeroBackgroundGrid isPlaying={false} />

        <div className={`absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none ${isDark ? 'from-gray-900/10 to-gray-900' : 'from-white/10 to-white'}`} />
        <div className={`absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none ${isDark ? 'from-gray-900 via-gray-900/40' : 'from-white via-white/40'}`} />

        <div
          className="absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 100% 90% at 20% 50%, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.85) 30%, rgba(17,24,39,0.6) 50%, rgba(17,24,39,0.3) 70%, rgba(17,24,39,0) 90%)'
              : 'radial-gradient(ellipse 80% 60% at 25% 45%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 75%)',
          }}
        />

        <div className="w-full max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 relative z-10 flex-1 flex items-center pt-24 sm:pt-20 lg:pt-20 pb-12 sm:pb-16 lg:pb-24 3xl:-mt-16">
          <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

            <motion.div
              className={`col-span-12 lg:col-span-7 relative rounded-xl sm:rounded-2xl lg:rounded-[2rem] border p-5 sm:p-6 lg:p-10 xl:p-12 h-full ${isDark ? 'border-emerald-500/30' : 'border-[#e2e8f0]'}`}
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
                  className={`inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full mb-5 sm:mb-8 lg:mb-10 ${
                    isDark
                      ? 'bg-emerald-900/40 border border-emerald-500/30'
                      : 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60'
                  }`}
                  style={{
                    boxShadow: isDark
                      ? 'inset 0 1px 2px rgba(120, 255, 184, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.05)'
                      : '0 2px 12px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative">
                    <div className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                    <div className={`absolute inset-0 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'} animate-ping opacity-75`} />
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold tracking-wide ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    AI Chatbot
                  </span>
                </motion.div>

                <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-serif font-light leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6 lg:mb-8 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  Turn Visitors Into{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                    Customers
                  </span>
                </h1>

                <p className={`text-base sm:text-lg lg:text-xl 2xl:text-2xl max-w-xl lg:max-w-2xl mb-5 sm:mb-8 lg:mb-10 leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                  AI chatbots that engage, qualify, and convert your website visitors 24/7. No more missed opportunities.
                </p>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-stretch gap-2 sm:gap-4 lg:gap-5 mb-5 sm:mb-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 min-w-0 sm:min-w-[100px] rounded-xl sm:rounded-2xl border px-3 sm:px-4 py-2 sm:py-3 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className={`text-lg sm:text-2xl lg:text-3xl 2xl:text-4xl font-serif font-normal ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-[8px] sm:text-[10px] 2xl:text-xs uppercase tracking-[0.08em] sm:tracking-[0.12em] font-medium mt-0.5 sm:mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/demo"
                    className="btn-primary h-11 sm:h-12 px-5 sm:px-6 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <FaRocket />
                    Get Started
                  </Link>
                  <Link
                    href="/chat"
                    className={`h-11 sm:h-12 px-5 sm:px-6 rounded-xl flex items-center justify-center gap-2 border transition-colors text-sm sm:text-base w-full sm:w-auto ${
                      isDark
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Try Live Demo
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className={`col-span-12 lg:col-span-5 rounded-xl sm:rounded-2xl lg:rounded-[2rem] border p-5 sm:p-6 lg:p-10 xl:p-12 h-full pointer-events-auto ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
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
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-serif font-normal mb-2 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  What You Get
                </h2>
                <p className={`text-sm sm:text-base mb-5 sm:mb-8 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  Everything you need to convert more visitors.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {benefits.map((benefit, i) => {
                    const Icon = benefit.icon
                    return (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3 sm:gap-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-emerald-900/50 border border-emerald-500/30' : 'bg-emerald-50 border border-emerald-100'}`}>
                          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        </div>
                        <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>
                          {benefit.text}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>

{/* HIDDEN: Compliance badges - uncomment to re-enable
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className={`flex items-center justify-center gap-3 sm:gap-4 flex-wrap ${isDark ? 'opacity-50' : 'grayscale opacity-60'}`}>
                    <img src="/SOC2_Type1.svg" alt="SOC 2 Type I Certified" width={24} height={24} className="h-5 sm:h-6 w-auto" loading="lazy" />
                    <img src="/SOC2_Type2.svg" alt="SOC 2 Type II Certified" width={24} height={24} className="h-5 sm:h-6 w-auto" loading="lazy" />
                    <img src="/GDPR.svg" alt="GDPR Compliant" width={24} height={24} className="h-5 sm:h-6 w-auto" loading="lazy" />
                  </div>
                </div>
                */}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 relative ${isDark ? 'bg-gray-800/30' : 'bg-slate-50/50'}`}>
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-32"
            >
              <span className={`inline-block px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full mb-4 sm:mb-6 ${isDark ? 'text-emerald-400 bg-emerald-900/30' : 'text-emerald-600 bg-emerald-50'}`}>
                Why Choose Us
              </span>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                Not Just Another Chatbot
              </h2>
              <p className={`text-base sm:text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                An AI-powered sales and support agent that understands your business and converts visitors into customers.
              </p>

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
                        ? isDark
                          ? 'border-gray-700/80'
                          : 'border-gray-200/80'
                        : isDark
                          ? 'border-gray-700/50 hover:border-gray-700/70'
                          : 'border-gray-200/50 hover:border-gray-200/80'
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
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                            : isDark
                              ? 'bg-gray-700 text-gray-400 group-hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                          }
                        `}>
                          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h3 className={`
                          text-sm sm:text-[15px] font-semibold transition-colors duration-200
                          ${isExpanded
                            ? isDark ? 'text-gray-100' : 'text-gray-900'
                            : isDark ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-700 group-hover:text-gray-900'}
                        `}>
                          {feature.title}
                        </h3>
                      </div>

                      <div className={`
                        w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                        ${isExpanded
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : isDark
                            ? 'bg-gray-700 text-gray-500 group-hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
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
                            <p className={`text-[13px] sm:text-[14px] leading-relaxed mb-3 sm:mb-4 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                              {feature.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {feature.features.map((f, i) => (
                                <span
                                  key={i}
                                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider ${isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}
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

        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />
      </section>

      {/* Testimonial Section */}
      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <FaQuoteLeft className={`text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 mx-auto ${isDark ? 'text-gray-700' : 'text-slate-200'}`} />
            <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 sm:mb-8 font-serif ${isDark ? 'text-white' : 'text-slate-800'}`}>
              "After we switched to Cognia AI, the whole situation changed. Calls actually get answered now, even when we're tied up or out on the road, and customers get a response right away instead of voicemail. Over the last few weeks, we've noticed a pretty clear bump in jobs coming in. You stop missing calls, you stop missing work."
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-emerald-900/50' : 'bg-emerald-100'}`}>
                <span className={`text-sm sm:text-base font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  EA
                </span>
              </div>
              <div className="text-left">
                <div className={`text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Elite Auto Repair</div>
                <div className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Auto Repair Shop</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 ${isDark ? 'bg-gray-800/30' : 'bg-slate-50/50'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-xl sm:rounded-2xl lg:rounded-[2rem] border p-6 sm:p-8 lg:p-12 xl:p-16 text-center ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
            style={glassStyle}
          >
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Ready to Convert More Visitors?
            </h2>
            <p className={`text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-5 sm:mb-8 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Book a free consultation and see how our AI chatbot can transform your customer engagement.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/demo"
                className="btn-primary h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg w-full sm:w-auto"
              >
                <FaRocket />
                Book Free Consultation
              </Link>
              <Link
                href="/chat"
                className={`h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg border transition-colors w-full sm:w-auto ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                Try Demo
              </Link>
            </div>

            <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-xs">
              {['Free Consultation', 'No Commitment', 'Custom Demo', 'ROI Analysis'].map((item, i) => (
                <span key={i} className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                  <FaCheckCircle className={`text-[10px] sm:text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`} />
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

export default Chatbot
