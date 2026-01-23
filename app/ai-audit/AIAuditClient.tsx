'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { FaSearch, FaMapMarkedAlt, FaListOl, FaRoute, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import HeroBackgroundGrid from '@/src/components/HeroBackgroundGrid'

const AIAuditClient: React.FC = () => {
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
      ? 'inset 0 2px 4px rgba(120, 184, 255, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.2)'
      : '0 4px 12px rgba(0, 0, 0, 0.05)',
  }

  const processSteps = [
    {
      number: '1',
      title: 'Discovery',
      description: 'We analyze your current operations, tech stack, and pain points. Where are you losing time and money?',
      icon: FaSearch,
    },
    {
      number: '2',
      title: 'Opportunity Mapping',
      description: 'Identify specific areas where AI can make an immediate impact—with projected ROI for each.',
      icon: FaMapMarkedAlt,
    },
    {
      number: '3',
      title: 'Priority Ranking',
      description: 'We rank opportunities by impact and implementation effort. Know exactly what to tackle first.',
      icon: FaListOl,
    },
    {
      number: '4',
      title: 'Implementation Roadmap',
      description: 'Get a clear action plan with timelines. We can build it for you or hand off to your team.',
      icon: FaRoute,
    },
  ]

  const deliverables = [
    'Complete AI opportunity assessment',
    'ROI projections for each opportunity',
    'Competitive analysis—what others in your industry are doing',
    'Tech stack recommendations',
    'Prioritized implementation roadmap',
    '60-minute strategy session with our team',
  ]

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className={`relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
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

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className={`inline-block text-xs font-semibold uppercase tracking-wider mb-4 px-3 py-1 rounded-full ${isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
              AI Audit
            </span>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Find Your AI<br />
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Opportunities</span>
            </h1>
            <p className={`text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Not sure where AI fits in your business? We&apos;ll analyze your operations and show you exactly where AI can drive ROI.
            </p>
            <Link
              href="/demo"
              className="btn-primary inline-flex items-center gap-2 h-14 px-8 rounded-xl text-base font-semibold"
            >
              Get Your Free Audit
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-16 sm:py-24 ${isDark ? 'bg-gray-900' : 'bg-slate-50'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-light mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Our Audit Process
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              A structured approach to uncovering the highest-impact AI opportunities in your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl border p-6 ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
                style={glassStyle}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                  <span className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{step.number}</span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className={`py-16 sm:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                What You&apos;ll Get
              </h2>
              <div className="space-y-4">
                {deliverables.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <FaCheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-base ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl border p-8 ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
              style={glassStyle}
            >
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Ready to Discover Your AI Potential?
              </h3>
              <p className={`text-base mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Book a free consultation and we&apos;ll start mapping your AI opportunities.
              </p>
              <Link
                href="/demo"
                className="btn-primary inline-flex items-center gap-2 h-12 px-6 rounded-xl text-base font-semibold w-full justify-center"
              >
                Schedule Your Free Audit
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AIAuditClient
