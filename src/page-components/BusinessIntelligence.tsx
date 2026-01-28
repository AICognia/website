'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  FaDatabase,
  FaChartLine,
  FaBrain,
  FaBell,
  FaCalendarAlt,
  FaComments,
  FaArrowRight,
  FaCheckCircle,
  FaPlug,
  FaUsers,
  FaIndustry,
  FaBuilding,
  FaShoppingCart,
  FaHeartbeat,
  FaCogs,
  FaLightbulb,
  FaLayerGroup,
  FaHotel,
  FaBalanceScale,
  FaBriefcase,
  FaLaptopCode,
  FaBolt
} from 'react-icons/fa'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import HeroBackgroundGrid from '../components/HeroBackgroundGrid'
import MobileHeroBackground from '../components/MobileHeroBackground'
import DatabaseWithRestApi from '../components/ui/database-with-rest-api'

const BusinessIntelligence: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(0)
  const { resolvedTheme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Keep isDark for component props that truly need a boolean
  const isDark = !mounted || resolvedTheme === 'dark'

  // Glass style using CSS variables to prevent flash
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
          _subject: `Data Assessment Request from ${formData.name}${formData.company ? ` at ${formData.company}` : ''}`,
          form_type: 'data_assessment_request',
          source: 'data_intelligence_page',
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

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Accordion glass style using CSS variables
  const accordionGlassStyle = {
    background: 'var(--hero-glass-bg)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: 'var(--hero-glass-shadow)',
  }

  const capabilities = [
    {
      icon: FaBell,
      title: 'Anomaly Detection',
      description: 'Surface strategic signals before they become problems. Our AI continuously monitors your data streams, identifying deviations from expected patterns and alerting you to potential issues.',
      features: ['Pattern Recognition', 'Real-time Alerts', 'Threshold Tuning', 'Root Cause Analysis']
    },
    {
      icon: FaChartLine,
      title: 'Predictive Forecasting',
      description: 'Answer questions about the future with confidence. Machine learning models trained on your historical data provide accurate forecasts for revenue, demand, and resource needs.',
      features: ['Revenue Forecasting', 'Demand Prediction', 'Trend Analysis', 'Scenario Modeling']
    },
    {
      icon: FaCalendarAlt,
      title: 'Executive Briefings',
      description: 'Start every day with AI-interpreted insights. Automated reports delivered to stakeholders with key metrics, anomalies, and recommended actions.',
      features: ['Daily Digests', 'Custom Reports', 'KPI Tracking', 'Action Items']
    },
    {
      icon: FaComments,
      title: 'Natural Language Queries',
      description: 'Ask any business question in plain English. No SQL required. Your team can explore data conversationally and get instant answers.',
      features: ['Plain English', 'Instant Answers', 'Follow-up Questions', 'Data Visualization']
    },
    {
      icon: FaLayerGroup,
      title: 'Data Unification',
      description: 'Connect ERP, CRM, spreadsheets, and custom tools into a single source of truth. Break down data silos and enable cross-functional insights.',
      features: ['ERP Integration', 'CRM Sync', 'API Connectors', 'Real-time Updates']
    },
    {
      icon: FaCogs,
      title: 'Workflow Automation',
      description: 'Turn insights into action automatically. Define rules that trigger workflows based on data conditions, from alerts to approvals.',
      features: ['Trigger Rules', 'Auto-Actions', 'Approval Flows', 'Notifications']
    }
  ]

  const industries = [
    { icon: FaIndustry, name: 'Manufacturing', desc: 'Production optimization & supply chain' },
    { icon: FaBuilding, name: 'Financial Services', desc: 'Risk analytics & performance reporting' },
    { icon: FaShoppingCart, name: 'Retail & E-commerce', desc: 'Inventory & customer insights' },
    { icon: FaHeartbeat, name: 'Healthcare', desc: 'Patient outcomes & operations' },
    { icon: FaLaptopCode, name: 'Technology', desc: 'Product analytics & engineering metrics' },
    { icon: FaHotel, name: 'Hospitality', desc: 'Revenue management & guest insights' },
    { icon: FaBalanceScale, name: 'Legal', desc: 'Case analytics & resource planning' },
    { icon: FaBolt, name: 'Energy & Utilities', desc: 'Grid analytics & demand forecasting' },
  ]

  const stats = [
    { value: '94%', label: 'Forecast Accuracy' },
    { value: '3x', label: 'Faster Decisions' },
    { value: '40%', label: 'Time Saved' },
  ]

  const integrations = ['SAP', 'Oracle', 'Salesforce', 'HubSpot', 'PostgreSQL', 'MySQL', 'MongoDB', 'Snowflake', 'BigQuery', 'Excel', 'Google Sheets', 'Slack', 'Microsoft 365', 'Custom APIs']

  return (
    <div className="min-h-screen text-gray-900 relative overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-900" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="solutions"
        customTitle="Data Intelligence Platform | AI-Powered Business Analytics - Cognia AI"
        customDescription="Transform scattered data into strategic advantage. Unified data platform with AI analytics, anomaly detection, executive briefings, and natural language querying."
      />

      <section className="lg:hidden relative overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-900">
        {/* Mobile Background Grid */}
        <div className="absolute inset-0">
          <MobileHeroBackground />
        </div>

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--hero-gradient-mobile)' }}
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
                Flagship Solution
              </span>
              <FaDatabase className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-[2rem] leading-[1.15] font-serif font-light tracking-tight mb-5 text-slate-900 dark:text-white"
          >
            From Scattered Data to{' '}
            <span className="text-blue-600 dark:text-blue-400">
              Strategic Power
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base leading-relaxed mb-8 text-slate-600 dark:text-gray-300"
          >
            We help you solve complex cross-domain business problems by enabling your team to interact with data in new ways.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex justify-between mb-8 px-2"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-serif font-medium text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider font-medium mt-1 text-slate-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-3"
          >
            {/* Primary CTA */}
            <Link
              href="/demo"
              className="btn-primary flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-base font-semibold"
            >
              <span>Request Data Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-sm font-medium transition-colors bg-slate-900/5 text-slate-700 border border-slate-200 active:bg-slate-100 dark:bg-white/10 dark:text-white dark:border-white/20 dark:active:bg-white/15"
            >
              <span>Talk to an Expert</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="hidden lg:flex h-screen max-h-[960px] min-h-[700px] flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-white dark:bg-gray-900" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Dynamic Background Grid - same as homepage */}
        <HeroBackgroundGrid isPlaying={false} />

        {/* Large Gradient Overlay for depth & bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none from-white/10 to-white dark:from-gray-900/10 dark:to-gray-900" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none from-white via-white/40 dark:from-gray-900 dark:via-gray-900/40" />

        {/* Radial gradient for text readability */}
        <div
          className="absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
          style={{ background: 'var(--hero-radial-desktop)' }}
        />

        {/* Main container */}
        <div className="w-full max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] 3xl:max-w-[1584px] mx-auto px-6 lg:px-10 xl:px-12 2xl:px-16 relative z-10 flex-1 flex items-start pb-24" style={{ paddingTop: '10rem' }}>
          <div className="grid grid-cols-12 gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

            {/* Left Column - Value Proposition (7 cols) */}
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
                    Flagship Solution
                  </span>
                  <FaDatabase className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </motion.div>

                <p className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-serif font-light leading-[1.08] mb-4 lg:mb-6 text-slate-900 dark:text-gray-100" aria-hidden="true">
                  From Scattered Data to<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                    Strategic Power
                  </span>
                </p>

                <p className="text-base lg:text-lg 2xl:text-xl max-w-xl lg:max-w-2xl mb-6 lg:mb-8 leading-relaxed text-slate-500 dark:text-gray-500">
                  We help you solve complex cross-domain business problems by enabling your team to interact with data in new ways and answer strategic questions that drive better outcomes.
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-stretch gap-3 lg:gap-4 mb-6 lg:mb-8">
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

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap items-center gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="/demo"
                    className="btn-primary w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <span>Request Data Assessment</span>
                    <FaArrowRight />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Split into Two Rows (5 cols) */}
            <motion.div
              className="col-span-12 lg:col-span-5 flex flex-col gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 h-full"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="flex flex-col gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 h-full"
              >
              {/* Top Row - Data Flow Visualization */}
              <div
                className="rounded-2xl border p-5 lg:p-6 xl:p-8 flex items-center justify-center flex-1 border-[#e2e8f0] dark:border-gray-700"
                style={glassStyle}
              >
                <DatabaseWithRestApi
                  circleText="AI"
                  badgeTexts={{
                    first: "ERP",
                    second: "CRM",
                    third: "API",
                    fourth: "Legacy"
                  }}
                  buttonTexts={{
                    first: "Unified Data",
                    second: "Real-time Sync"
                  }}
                  title="Cross-domain intelligence"
                  lightColor="#3b82f6"
                  isDark={isDark}
                />
              </div>

              {/* Bottom Row - Key Benefits */}
              <div
                className="rounded-2xl border p-5 lg:p-6 xl:p-8 border-[#e2e8f0] dark:border-gray-700"
                style={glassStyle}
              >
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { icon: FaLightbulb, text: 'AI-powered insights from day one' },
                    { icon: FaBrain, text: 'Natural language data exploration' },
                    { icon: FaUsers, text: 'Built for your entire team' },
                  ].map((benefit, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 sm:gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 border border-blue-100 dark:bg-blue-900/50 dark:border-blue-500/30">
                        <benefit.icon className="text-base sm:text-lg text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-gray-200">
                        {benefit.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

{/* HIDDEN: Compliance badges - uncomment to re-enable
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap grayscale opacity-60 dark:grayscale-0 dark:opacity-50">
                    <img src="/SOC2_Type1.svg" alt="SOC 2 Type I" className="h-5 sm:h-6 w-auto" />
                    <img src="/SOC2_Type2.svg" alt="SOC 2 Type II" className="h-5 sm:h-6 w-auto" />
                    <img src="/HIPAA.svg" alt="HIPAA" className="h-5 sm:h-6 w-auto" />
                  </div>
                </div>
                */}
              </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative bg-slate-50/50 dark:bg-gray-800/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
            {/* Left: Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-32"
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 sm:mb-6 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30">
                Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
                Six Ways Your Data Becomes Strategic
              </h2>
              <p className="text-base sm:text-lg mb-3 sm:mb-4 text-slate-600 dark:text-gray-400">
                Our platform turns scattered information into actionable intelligence. Every capability is designed to answer the questions that drive your business forward.
              </p>
              <p className="text-sm sm:text-[15px] mb-6 sm:mb-8 text-slate-500 dark:text-gray-500">
                No more waiting on analysts. No more SQL. Just answers.
              </p>

              <Link
                href="/demo"
                className="btn-primary w-full sm:w-auto h-11 px-6 rounded-full text-sm inline-flex justify-center"
              >
                <span>Explore Platform</span>
              </Link>
            </motion.div>

            {/* Right: Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              {capabilities.map((capability, index) => {
                const isExpanded = expandedId === index
                const Icon = capability.icon

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`
                      rounded-xl border transition-all duration-300
                      ${isExpanded
                        ? 'border-gray-200/80 dark:border-gray-700/80'
                        : 'border-gray-200/50 hover:border-gray-200/80 dark:border-gray-700/50 dark:hover:border-gray-700/70'
                      }
                    `}
                    style={accordionGlassStyle}
                  >
                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`
                          w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300
                          ${isExpanded
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600'
                          }
                        `}>
                          <Icon size={18} />
                        </div>
                        <h3 className={`
                          text-[15px] font-semibold transition-colors duration-200
                          ${isExpanded
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100'}
                        `}>
                          {capability.title}
                        </h3>
                      </div>

                      <div className={`
                        w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                        ${isExpanded
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-500 dark:group-hover:bg-gray-600'
                        }
                      `}>
                        <motion.svg
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="w-4 h-4"
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
                          <div className="px-5 pb-5 pt-0 pl-[3.75rem]">
                            <p className="text-[14px] leading-relaxed mb-4 text-slate-600 dark:text-gray-400">
                              {capability.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {capability.features.map((f, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
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
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 sm:mb-6 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30">
              Industries
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 text-slate-900 dark:text-gray-100">
              Built for Your Industry
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto text-slate-600 dark:text-gray-400">
              Our platform adapts to your industry's unique data landscape, security requirements, and strategic priorities.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-xl sm:rounded-2xl border p-4 sm:p-6 text-center transition-all hover:shadow-lg border-slate-200 bg-white hover:border-blue-200 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-blue-500/30"
                  style={glassStyle}
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Icon className="text-lg sm:text-2xl" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 text-slate-900 dark:text-gray-100">
                    {industry.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                    {industry.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-slate-50/50 dark:bg-gray-800/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl sm:rounded-[2rem] border p-5 sm:p-8 lg:p-12 border-[#e2e8f0] dark:border-gray-700"
            style={glassStyle}
          >
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full mb-3 sm:mb-4 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30">
                <FaPlug />
                Integrations
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light mb-2 sm:mb-3 text-slate-900 dark:text-gray-100">
                Connect Your Entire Tech Stack
              </h2>
              <p className="text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto text-slate-600 dark:text-gray-400">
                We integrate with the tools you already use. No migration required. Your data stays where it is.
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {integrations.map((item) => (
                  <span key={item} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm bg-slate-100 text-slate-700 dark:bg-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-slate-50/50 dark:bg-gray-800/30">
        <div className="container-responsive px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div
              className="rounded-2xl sm:rounded-[2rem] border p-5 sm:p-8 lg:p-12 border-[#e2e8f0] dark:border-gray-700"
              style={glassStyle}
            >
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal mb-2 text-slate-900 dark:text-white">
                  See What Your Data Can Tell You
                </h2>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                  Schedule a data assessment. We'll show you the insights hiding in your systems.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-slate-500"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-slate-500"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-slate-500"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    How can we help?
                  </label>
                  <input
                    type="text"
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-slate-500"
                    placeholder="Tell us about your data challenges..."
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full h-14 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                      <>
                        <span>Request Data Assessment</span>
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </div>

                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`md:col-span-2 p-4 rounded-xl text-center text-sm font-medium ${
                      submitStatus === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500/30'
                        : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500/30'
                    }`}
                  >
                    {submitStatus === 'success'
                      ? 'Thank you! We\'ll be in touch soon.'
                      : 'Something went wrong. Please try again.'}
                  </motion.div>
                )}
              </form>

              {/* Trust indicators */}
              <div className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-xs">
                {['Free Assessment', 'No Commitment', 'Expert Consultation', 'Custom Recommendations'].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 sm:gap-2 text-slate-500 dark:text-gray-500">
                    <FaCheckCircle className="text-xs sm:text-sm text-blue-500 dark:text-blue-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BusinessIntelligence
