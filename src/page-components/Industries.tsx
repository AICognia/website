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
  FaCalendarCheck
} from 'react-icons/fa'
import SEO from '../components/SEO'
import HeroBackgroundGrid from '../components/HeroBackgroundGrid'

const industries = [
  {
    name: 'Healthcare',
    path: '/industries/healthcare',
    icon: FaHospital,
    description: 'AI-powered patient scheduling, appointment reminders, and care coordination',
    features: ['HIPAA Compliant', '24/7 Patient Calls', 'EHR Integration']
  },
  {
    name: 'Legal Services',
    path: '/industries/legal',
    icon: FaBalanceScale,
    description: 'Confidential client intake, appointment scheduling, and case inquiries',
    features: ['Client Screening', 'Intake Automation', 'Confidential Handling']
  },
  {
    name: 'Hospitality',
    path: '/industries/hospitality',
    icon: FaHotel,
    description: 'AI concierge for reservations, guest services, and inquiries',
    features: ['Reservation Handling', 'Guest Services', '45+ Languages']
  },
  {
    name: 'Retail',
    path: '/industries/retail',
    icon: FaShoppingCart,
    description: 'Customer service, order tracking, and support automation',
    features: ['Order Tracking', 'Returns Processing', 'Customer Support']
  },
  {
    name: 'Automotive',
    path: '/industries/automotive',
    icon: FaCar,
    description: 'Service scheduling, lead qualification, and follow-up calls',
    features: ['Service Booking', 'Lead Qualification', 'Follow-up Calls']
  }
]

const stats = [
  { value: '76%', label: 'Cost Reduction' },
  { value: '24/7', label: 'Availability' },
  { value: '87%', label: 'Conversion Rate' },
  { value: '<1s', label: 'Response Time' },
]

const Industries: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

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

  const cardGlassStyle = {
    borderWidth: '0.5px',
    background: isDark
      ? 'rgba(31, 41, 55, 0.5)'
      : 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: isDark
      ? '0 2px 8px rgba(0, 0, 0, 0.2)'
      : '0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255,255,255,0.5)',
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="solutions"
        customTitle="Industries We Serve | AI Solutions for Every Sector | Cognia AI"
        customDescription="Discover AI solutions tailored for your industry. Healthcare, legal, hospitality, retail, and automotive."
      />

      {/* Mobile Hero */}
      <section className="lg:hidden relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
        <div className="relative z-10 px-5 pt-24 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isDark ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-blue-50 border border-blue-200'}`}>
              <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
              <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Industries</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={`text-[1.875rem] leading-[1.15] font-serif font-light tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Industries{' '}
            <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>We Serve</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}
          >
            AI solutions tailored for your industry's unique challenges and compliance requirements.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex justify-between mb-6 px-2"
          >
            {stats.map((item, i) => (
              <div key={i} className="text-center">
                <div className={`text-xl font-serif font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.value}</div>
                <div className={`text-[9px] uppercase tracking-wider font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{item.label}</div>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-3"
          >
            <Link href="/demo" className="btn-primary flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-base font-semibold">
              <FaCalendarCheck />
              <span>Get Started</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Desktop Hero */}
      <section className="hidden lg:flex min-h-[70vh] flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
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

        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 flex-1 flex items-center pt-20 pb-16">
          <motion.div
            className={`max-w-3xl rounded-[2rem] border p-10 xl:p-12 ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
            style={glassStyle}
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 ${
                isDark
                  ? 'bg-blue-900/40 border border-blue-500/30'
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
                <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} animate-ping opacity-75`} />
              </div>
              <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                Industries
              </span>
            </motion.div>

            <h1 className={`text-5xl xl:text-6xl font-serif font-light leading-[1.08] mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Industries{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                We Serve
              </span>
            </h1>

            <p className={`text-xl max-w-2xl mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              AI solutions tailored for your industry's unique challenges and compliance requirements.
            </p>

            {/* Stats Row */}
            <div className="flex items-stretch gap-4 mb-8">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 min-w-[100px] rounded-2xl border px-5 py-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className={`text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {item.value}
                  </div>
                  <div className={`text-[10px] uppercase tracking-[0.12em] font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/demo"
              className="btn-primary h-14 px-8 rounded-xl text-base inline-flex items-center justify-center gap-2"
            >
              <FaCalendarCheck />
              <span>Get Started</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
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
              Solutions
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Industry-Specific AI
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Each industry has unique requirements. Our AI adapts to yours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={industry.path}>
                    <div
                      className={`group rounded-xl sm:rounded-2xl border p-5 sm:p-8 h-full transition-all duration-300 hover:scale-[1.02] ${isDark ? 'border-gray-700 hover:border-blue-500/40' : 'border-slate-200 hover:border-blue-300'}`}
                      style={cardGlassStyle}
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <h3 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                          {industry.name}
                        </h3>
                        <FaArrowRight className={`w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                      </div>

                      <p className={`text-sm mb-4 sm:mb-5 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        {industry.description}
                      </p>

                      <ul className="space-y-2">
                        {industry.features.map((feature, idx) => (
                          <li key={idx} className={`flex items-center gap-2 text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                            <FaCheckCircle className={`flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />
      </section>

      {/* CTA Section */}
      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
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
              Ready to Transform Your Industry?
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Schedule a free consultation to see how AI can work for your specific needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/demo"
                className="btn-primary h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg w-full sm:w-auto"
              >
                Schedule Demo
                <FaArrowRight className="text-sm" />
              </Link>
              <a
                href="tel:+16163263328"
                className={`h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg border transition-colors w-full sm:w-auto ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FaPhone className="text-sm" />
                Talk to Expert
              </a>
            </div>

            <div className="mt-6 sm:mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-xs">
              {['Enterprise Ready', 'HIPAA Compliant', 'SOC 2 Certified', '24/7 Support'].map((item, i) => (
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

export default Industries
