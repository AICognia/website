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
  FaBuilding,
  FaLaptopCode,
  FaUniversity,
  FaBolt,
  FaLandmark,
  FaHome,
  FaArrowRight
} from 'react-icons/fa'
import SEO from '../components/SEO'
import HeroBackgroundGrid from '../components/HeroBackgroundGrid'

const industries = [
  {
    name: 'Healthcare',
    path: '/industries/healthcare',
    icon: FaHospital,
    description: 'Secure AI for patient scheduling and care coordination',
    color: 'emerald'
  },
  {
    name: 'Legal Services',
    path: '/industries/legal',
    icon: FaBalanceScale,
    description: 'Confidential client intake and appointment management',
    color: 'blue'
  },
  {
    name: 'Hospitality',
    path: '/industries/hospitality',
    icon: FaHotel,
    description: 'AI concierge for hotels, restaurants and resorts',
    color: 'amber'
  },
  {
    name: 'Retail',
    path: '/industries/retail',
    icon: FaShoppingCart,
    description: 'Omnichannel customer service and order management',
    color: 'pink'
  },
  {
    name: 'Automotive',
    path: '/industries/automotive',
    icon: FaCar,
    description: 'Service scheduling and lead qualification for dealerships',
    color: 'orange'
  },
  {
    name: 'Enterprise',
    path: '/industries/enterprise',
    icon: FaBuilding,
    description: 'Scalable AI solutions with custom integrations',
    color: 'indigo'
  },
  {
    name: 'Technology',
    path: '/industries/technology',
    icon: FaLaptopCode,
    description: 'Technical support automation and customer onboarding',
    color: 'violet'
  },
  {
    name: 'Financial Services',
    path: '/industries/financial-services',
    icon: FaUniversity,
    description: 'Secure AI for banks, insurance and fintech',
    color: 'cyan'
  },
  {
    name: 'Energy & Utilities',
    path: '/industries/energy',
    icon: FaBolt,
    description: 'Billing inquiries, outage reporting and service requests',
    color: 'yellow'
  },
  {
    name: 'Public Sector',
    path: '/industries/public-sector',
    icon: FaLandmark,
    description: 'ADA-compliant citizen services and information hotlines',
    color: 'slate'
  },
  {
    name: 'Home Services',
    path: '/industries/HomeServices',
    icon: FaHome,
    description: 'Service scheduling for contractors, plumbers and HVAC',
    color: 'teal'
  }
]

const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    iconBg: 'bg-emerald-500/20'
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    iconBg: 'bg-blue-500/20'
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    iconBg: 'bg-amber-500/20'
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    iconBg: 'bg-pink-500/20'
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    iconBg: 'bg-orange-500/20'
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400',
    iconBg: 'bg-indigo-500/20'
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    iconBg: 'bg-violet-500/20'
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    iconBg: 'bg-cyan-500/20'
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    iconBg: 'bg-yellow-500/20'
  },
  slate: {
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-400',
    iconBg: 'bg-slate-500/20'
  },
  teal: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    text: 'text-teal-400',
    iconBg: 'bg-teal-500/20'
  }
}

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

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-900 dark:bg-gray-900" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="solutions"
        customTitle="Industries We Serve | AI Solutions for Every Sector | Cognia AI"
        customDescription="Discover AI solutions tailored for your industry. Healthcare, legal, hospitality, retail, automotive, and more. Transform your operations with industry-specific AI."
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center overflow-hidden pt-0 select-none transition-colors duration-300">
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

        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 flex-1 flex items-center pt-24 sm:pt-28 lg:pt-32 pb-12">
          <motion.div
            className={`max-w-3xl rounded-2xl sm:rounded-[2rem] border p-6 sm:p-10 lg:p-12 ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
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

              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.1] mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                AI Solutions for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                  Every Industry
                </span>
              </h1>

              <p className={`text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                We understand that each industry has unique challenges. Our AI solutions are tailored to meet your specific needs and compliance requirements.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon
              const colors = colorMap[industry.color]
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    href={industry.path}
                    className={`group block rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] ${
                      isDark
                        ? `border-gray-700 hover:${colors.border} bg-gray-800/50 hover:bg-gray-800/80`
                        : 'border-slate-200 hover:border-slate-300 bg-white/50 hover:bg-white/80'
                    }`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isDark ? colors.iconBg : 'bg-slate-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${isDark ? colors.text : 'text-slate-600'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-semibold mb-1 flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                          {industry.name}
                          <FaArrowRight className={`w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isDark ? colors.text : 'text-slate-400'}`} />
                        </h3>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          {industry.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Don't see your industry? We work with businesses of all types.
            </p>
            <Link
              href="/demo"
              className="btn-primary h-12 sm:h-14 px-8 rounded-xl inline-flex items-center justify-center gap-2"
            >
              <span>Schedule a Consultation</span>
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Industries
