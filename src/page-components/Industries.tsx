'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  FaHospital,
  FaBalanceScale,
  FaHotel,
  FaShoppingCart,
  FaCar,
  FaArrowRight,
  FaCheckCircle,
  FaPhone,
  FaCalendarCheck,
  FaHeadset,
  FaGlobe
} from 'react-icons/fa'
import SEO from '../components/SEO'
import HeroBackgroundGrid from '../components/HeroBackgroundGrid'

const industries = [
  {
    name: 'Healthcare',
    path: '/industries/healthcare',
    icon: FaHospital,
    description: 'Secure AI for patient scheduling, appointment reminders, and care coordination.',
    features: ['Enterprise Security', '24/7 Patient Calls', 'EHR Integration', 'Appointment Reminders'],
    color: 'blue'
  },
  {
    name: 'Legal Services',
    path: '/industries/legal',
    icon: FaBalanceScale,
    description: 'Confidential client intake, appointment scheduling, and intelligent case screening.',
    features: ['Client Screening', 'Intake Automation', 'Confidential Handling', 'Calendar Sync'],
    color: 'blue'
  },
  {
    name: 'Hospitality',
    path: '/industries/hospitality',
    icon: FaHotel,
    description: 'AI concierge for reservations, guest services, and multilingual support.',
    features: ['Reservation Handling', 'Guest Services', '45+ Languages', 'Concierge AI'],
    color: 'blue'
  },
  {
    name: 'Retail',
    path: '/industries/retail',
    icon: FaShoppingCart,
    description: 'Omnichannel customer service, order tracking, and support automation.',
    features: ['Order Tracking', 'Returns Processing', 'Customer Support', 'FAQ Automation'],
    color: 'blue'
  },
  {
    name: 'Automotive',
    path: '/industries/automotive',
    icon: FaCar,
    description: 'Service scheduling, lead qualification, and automated follow-up calls.',
    features: ['Service Booking', 'Lead Qualification', 'Follow-up Calls', 'Parts Inquiries'],
    color: 'blue'
  }
]

const Industries: React.FC = () => {
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
          _subject: `Industries Page Inquiry from ${formData.name}${formData.company ? ` at ${formData.company}` : ''}`,
          form_type: 'industries_contact',
          source: 'industries_page',
          submitted_at: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = !mounted || resolvedTheme === 'dark'

  const glassStyle = {
    borderWidth: '0.5px',
    background: isDark
      ? 'rgba(31, 41, 55, 0.6)'
      : 'rgba(255, 255, 255, 0.30)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    boxShadow: isDark
      ? 'inset 0 1px 2px rgba(59, 130, 246, 0.1), 0 2px 8px rgba(0, 0, 0, 0.3)'
      : 'inset 0 1px 2px rgba(14, 165, 233, 0.15), inset 0 -1px 2px rgba(14, 165, 233, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
  }

  const cardGlassStyle = (isHovered = false) => ({
    background: isDark
      ? isHovered ? 'rgba(31, 41, 55, 0.7)' : 'rgba(31, 41, 55, 0.4)'
      : isHovered ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: isDark
      ? isHovered
        ? 'inset 0 1px 1px rgba(255, 255, 255, 0.03), 0 4px 12px rgba(0, 0, 0, 0.25)'
        : 'inset 0 1px 1px rgba(255, 255, 255, 0.02), 0 2px 6px rgba(0, 0, 0, 0.15)'
      : isHovered
        ? 'inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.06)'
        : 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 2px 6px rgba(0, 0, 0, 0.03)',
  })

  const heroStats = [
    { value: '76%', label: 'Cost Reduction' },
    { value: '24/7', label: 'Availability' },
    { value: '87%', label: 'Conversion' },
    { value: '<1s', label: 'Response' }
  ]

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="solutions"
        customTitle="Industries We Serve | AI Solutions | Cognia AI"
        customDescription="AI solutions tailored for Healthcare, Legal, Hospitality, Retail, and Automotive industries."
      />

      {/* Mobile Hero */}
      <section className={`lg:hidden relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="absolute inset-0">
          <HeroBackgroundGrid isPlaying={false} />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, rgba(17,24,39,0.85) 0%, rgba(17,24,39,0.7) 50%, rgba(17,24,39,0.9) 100%)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.95) 100%)'
          }}
        />
        <div className="relative z-10 px-5 pt-24 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isDark ? 'bg-blue-500/15 border border-blue-400/25' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Industries</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={`text-2xl font-serif font-normal mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Industries We Serve
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}
          >
            AI solutions tailored for your industry's unique challenges.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex justify-between"
          >
            {heroStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-xl font-serif font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
                <div className={`text-[9px] uppercase tracking-wider font-medium mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Desktop Hero */}
      <section className="hidden lg:flex min-h-[80vh] flex-col items-center overflow-hidden relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <HeroBackgroundGrid isPlaying={false} />
        <div className={`absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none ${isDark ? 'from-gray-900/10 to-gray-900' : 'from-white/10 to-white'}`} />
        <div className={`absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none ${isDark ? 'from-gray-900 via-gray-900/40' : 'from-white via-white/40'}`} />
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.7) 40%, rgba(17,24,39,0.4) 60%, rgba(17,24,39,0) 80%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 80%)',
          }}
        />

        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 relative z-10 flex-1 flex items-center pt-20 pb-16">
          <div className="w-full">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60'}`}
                style={{
                  boxShadow: isDark
                    ? '0 0 20px rgba(59, 130, 246, 0.15)'
                    : '0 2px 12px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping opacity-75" />
                </div>
                <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>Industries</span>
                <FaGlobe className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </motion.div>

              <h1 className={`text-4xl lg:text-5xl xl:text-6xl font-serif font-normal leading-[1.08] mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                Industries We Serve
              </h1>

              <p className={`text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Every industry has unique challenges. Our AI adapts to yours with{' '}
                <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  custom solutions built for your specific needs.
                </span>
              </p>

              {/* Stats Row */}
              <div className="flex items-stretch justify-center gap-4 lg:gap-5">
                {heroStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className={`min-w-[120px] rounded-2xl border px-5 py-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                    style={cardGlassStyle()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className={`text-2xl lg:text-3xl font-serif font-normal ${isDark ? 'text-white' : 'text-slate-800'}`}>{stat.value}</div>
                    <div className={`text-[10px] uppercase tracking-[0.12em] font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Bento Grid */}
      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 relative ${isDark ? 'bg-gray-900/50' : 'bg-slate-50/30'}`}>
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-800' : 'via-slate-200'}`} />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 sm:mb-6 ${isDark ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-50'}`}>
              Industry Solutions
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Tailored AI for Every Sector
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Select your industry to see how we can transform your operations
            </p>
          </motion.div>

          {/* Bento Grid - 2 large + 3 medium layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
            {/* Healthcare - Large Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 lg:row-span-2"
            >
              <Link href={industries[0].path}>
                <div
                  className={`group h-full rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:scale-[1.01] ${isDark ? 'border-gray-700/80 hover:border-blue-500/40' : 'border-slate-200/80 hover:border-blue-300'}`}
                  style={cardGlassStyle()}
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 ${isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <FaHospital className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className={`text-xl sm:text-2xl font-serif font-normal ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>{industries[0].name}</h3>
                    <FaArrowRight className={`w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  </div>
                  <p className={`text-sm sm:text-base mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{industries[0].description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {industries[0].features.map((feature, idx) => (
                      <div key={idx} className={`flex items-center gap-2 text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        <FaCheckCircle className={`flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Legal - Large Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3 lg:row-span-2"
            >
              <Link href={industries[1].path}>
                <div
                  className={`group h-full rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:scale-[1.01] ${isDark ? 'border-gray-700/80 hover:border-blue-500/40' : 'border-slate-200/80 hover:border-blue-300'}`}
                  style={cardGlassStyle()}
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 ${isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <FaBalanceScale className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className={`text-xl sm:text-2xl font-serif font-normal ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>{industries[1].name}</h3>
                    <FaArrowRight className={`w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  </div>
                  <p className={`text-sm sm:text-base mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{industries[1].description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {industries[1].features.map((feature, idx) => (
                      <div key={idx} className={`flex items-center gap-2 text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        <FaCheckCircle className={`flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Hospitality, Retail, Automotive - Medium Cards */}
            {industries.slice(2).map((industry, index) => {
              const Icon = industry.icon
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="lg:col-span-2"
                >
                  <Link href={industry.path}>
                    <div
                      className={`group h-full rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:scale-[1.02] ${isDark ? 'border-gray-700/80 hover:border-blue-500/40' : 'border-slate-200/80 hover:border-blue-300'}`}
                      style={cardGlassStyle()}
                    >
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-base sm:text-lg font-serif font-normal ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>{industry.name}</h3>
                        <FaArrowRight className={`w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                      </div>
                      <p className={`text-xs sm:text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{industry.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {industry.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className={`text-[10px] sm:text-xs px-2 py-1 rounded-full ${isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-slate-100 text-slate-600'}`}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-800' : 'via-slate-200'}`} />
      </section>

      {/* Why Choose Us - Bento */}
      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 sm:mb-6 ${isDark ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-50'}`}
            >
              Why Cognia
            </motion.span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Built for Your Industry
            </h2>
            <p className={`text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Not generic AI. Solutions designed for your specific workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: FaHeadset, title: '24/7 Coverage', desc: 'Never miss a call. Our AI handles inquiries around the clock.' },
              { icon: FaGlobe, title: '45+ Languages', desc: 'Serve customers in their preferred language, automatically.' },
              { icon: FaCheckCircle, title: 'Enterprise Security', desc: 'Industry-leading security standards built in.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl border p-6 sm:p-8 text-center ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
                style={cardGlassStyle()}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className={`text-lg sm:text-xl font-serif font-normal mb-2 sm:mb-3 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>{item.title}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Explore Solutions */}
      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 ${isDark ? 'bg-gray-800/30' : 'bg-slate-50/50'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl sm:rounded-[2rem] border p-6 sm:p-10 lg:p-12 ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
            style={glassStyle}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 sm:mb-6 ${isDark ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-50'}`}>
                  Next Steps
                </span>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-normal mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  Ready to Transform Your Operations?
                </h2>
                <p className={`text-base sm:text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  Explore our full suite of AI solutions or schedule a consultation to discuss your specific needs.
                </p>

                <div className="space-y-3 mb-6">
                  {['Custom AI solutions for your industry', 'Seamless integration with existing systems', 'Dedicated support & implementation team'].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      <FaCheckCircle className={`flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/what-we-do"
                    className={`h-12 px-6 rounded-xl flex items-center justify-center gap-2 text-sm font-medium border transition-all w-full sm:w-auto ${isDark ? 'border-gray-600 text-gray-200 hover:bg-gray-700/50 hover:border-gray-500' : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'}`}
                  >
                    <span>Explore Solutions</span>
                    <FaArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/demo"
                    className="btn-primary h-12 px-6 rounded-xl flex items-center justify-center gap-2 text-sm w-full sm:w-auto"
                  >
                    <FaCalendarCheck />
                    Schedule Demo
                  </Link>
                </div>
              </div>

              {/* Right - Quick Contact Form */}
              <div className={`rounded-2xl border p-5 sm:p-6 ${isDark ? 'border-gray-600 bg-gray-800/50' : 'border-slate-200 bg-white/50'}`}>
                <h3 className={`text-lg font-serif font-medium mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  Get in Touch
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    />
                    <input
                      type="email"
                      placeholder="Work email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                  />
                  <textarea
                    placeholder="Tell us about your needs..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full h-12 rounded-xl text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>

                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-xl text-center text-sm font-medium ${
                        submitStatus === 'success'
                          ? isDark ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-green-50 text-green-700 border border-green-200'
                          : isDark ? 'bg-red-900/30 text-red-400 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {submitStatus === 'success'
                        ? "Thank you! We'll be in touch soon."
                        : 'Something went wrong. Please try again.'}
                    </motion.div>
                  )}
                </form>

                {submitStatus === 'idle' && (
                  <p className={`text-xs text-center mt-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    We'll respond within 24 hours
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Industries
