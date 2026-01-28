'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import Link from 'next/link'
import { FaQuoteLeft } from 'react-icons/fa'
import { IconType } from 'react-icons'
import SEO from '../SEO'
import HeroBackgroundGrid from '../HeroBackgroundGrid'
import MobileHeroBackground from '../MobileHeroBackground'
import { useTheme } from 'next-themes'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" })
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v))
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [value, count, rounded])

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>
}

export interface IndustryData {
  // Meta
  slug: string
  seoTitle: string
  seoDescription: string

  // Hero
  badge: string
  title: string
  titleHighlight?: string
  subtitle: string
  heroImage: string
  heroStats: Array<{ value: string; label: string }>

  // Custom hero widget content
  heroWidget?: {
    title: string
    items: string[]
  }

  // Problem Section
  problemTitle: string
  problemDescription: string
  challenges: string[]

  // Custom Bento Content
  bentoContent?: {
    // Card 1: Main challenge visualization
    mainChallenge: {
      badge: string
      title: string
      description: string
    }
    // Radar/Pentagon chart configuration
    radarChart?: {
      categories: Array<{
        label: string
        current: number
        potential: number
      }>
      colors?: {
        current: string
        potential: string
      }
      // Visual style variation: 'default' | 'dots' | 'glow' | 'minimal' | 'neon' | 'gradient'
      style?: 'default' | 'dots' | 'glow' | 'minimal' | 'neon' | 'gradient'
    }
    // Card 2: Ring chart metric
    ringChart: {
      percentage: number
      title: string
      description: string
      metric: string
      metricValue: string
      color: 'red' | 'orange' | 'amber' | 'blue' | 'purple'
    }
    // Card 3: Bar chart / capacity visualization
    barChart: {
      title: string
      description: string
      data: Array<{ label: string; value: number }>
      statusBadge: string
      statusColor: 'red' | 'orange' | 'amber' | 'blue' | 'green' | 'purple'
    }
  }

  // Solutions Section
  solutionsTitle: string
  solutionsSubtitle: string
  solutions: Array<{
    icon: IconType
    title: string
    description: string
    features: string[]
  }>

  // Results Section
  resultsTitle: string
  results: Array<{ value: string; label: string; suffix?: string }>

  // Testimonial
  testimonial?: {
    quote: string
    author: string
    role: string
    company: string
  }

  // Use Cases
  useCasesTitle: string
  useCases: Array<{
    icon: IconType
    title: string
    features: string[]
  }>

  // CTA
  ctaTitle: string
  ctaSubtitle: string
}

interface IndustryPageTemplateProps {
  data: IndustryData
}

const IndustryPageTemplate: React.FC<IndustryPageTemplateProps> = ({ data }) => {
  const [expandedId, setExpandedId] = useState<number | null>(0)
  const [mounted, setMounted] = useState(false)
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

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  const glassOpacity = isDark ? 0.6 : 0.30
  const glassBlur = 22

  const glassStyle = {
    borderWidth: '0.5px',
    background: isDark
      ? `rgba(31, 41, 55, ${glassOpacity})`
      : `rgba(255, 255, 255, ${glassOpacity})`,
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: isDark
      ? 'inset 0 1px 2px rgba(59, 130, 246, 0.1), 0 2px 8px rgba(0, 0, 0, 0.3)'
      : 'inset 0 1px 2px rgba(14, 165, 233, 0.15), inset 0 -1px 2px rgba(14, 165, 233, 0.08), inset 1px 0 2px rgba(14, 165, 233, 0.12), inset -1px 0 2px rgba(14, 165, 233, 0.05), 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
  }

  // Stats card style matching homepage
  const statCardStyle = {
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

  // Subtle glass style for accordion cards
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
          _subject: `Industry Consultation Request from ${formData.name}${formData.company ? ` at ${formData.company}` : ''}`,
          form_type: 'industry_consultation_request',
          source: 'industry_page',
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

  return (
    <div className="min-h-screen text-text-primary transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="solutions"
        customTitle={data.seoTitle}
        customDescription={data.seoDescription}
      />

      <section className="lg:hidden relative overflow-hidden transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Background Grid */}
        <div className="absolute inset-0">
          <MobileHeroBackground />
        </div>

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.8) 50%, rgba(17,24,39,0.6) 100%)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.6) 100%)'
          }}
        />

        <div className="relative z-10 px-5 pt-24 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                isDark
                  ? 'bg-blue-500/20 border border-blue-400/30'
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
              <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                {data.badge}
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={`text-[1.875rem] leading-[1.15] font-serif font-light tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            {data.title}
            {data.titleHighlight && (
              <>
                {' '}
                <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {data.titleHighlight}
                </span>
              </>
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}
          >
            {data.subtitle}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex justify-between mb-6 px-2"
          >
            {data.heroStats.slice(0, 3).map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-xl font-serif font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-[9px] uppercase tracking-wider font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-6"
          >
            <div className={`rounded-2xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-slate-200'}`}>
              <img
                src={data.heroImage}
                alt={data.badge}
                className="w-full h-[180px] object-cover"
              />
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <Link
              href="/demo"
              className="btn-primary flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-base font-semibold"
            >
              <span>Schedule Consultation</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="hidden lg:flex h-screen max-h-[960px] min-h-[700px] flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <HeroBackgroundGrid isPlaying={false} />

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

        {/* Main container */}
        <div className="w-full max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10 flex-1 flex items-start pb-24" style={{ paddingTop: '10rem' }}>
          <div className="grid grid-cols-12 gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-start w-full">

            {/* Left Column - Value Proposition (7 cols) */}
            <motion.div
              className={`col-span-7 relative rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
              style={glassStyle}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 lg:mb-8 w-fit ${
                    isDark
                      ? 'bg-blue-500/10 border border-blue-500/20'
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60'
                  }`}
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
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-blue-500 animate-ping opacity-75" />
                  </div>
                  <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    {data.badge}
                  </span>
                  <svg className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>

                <h1 className={`text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-serif font-normal leading-[1.08] mb-4 lg:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  {data.title}
                  {data.titleHighlight && (
                    <>
                      {' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                        {data.titleHighlight}
                      </span>
                    </>
                  )}
                </h1>

                <p className={`text-base lg:text-lg 2xl:text-xl max-w-xl lg:max-w-2xl mb-6 lg:mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  {data.subtitle}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-stretch gap-3 lg:gap-4">
                  {data.heroStats.slice(0, 3).map((stat, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 min-w-[110px] rounded-xl border px-4 py-3 ${isDark ? 'border-gray-700' : 'border-slate-200/80'} bg-white/50 dark:bg-gray-800/50`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className={`text-2xl lg:text-3xl 2xl:text-4xl font-serif font-normal ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-[9px] 2xl:text-[10px] uppercase tracking-[0.12em] font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  className="mt-6 lg:mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    href="/demo"
                    className="btn-primary inline-flex items-center gap-2 h-11 px-6 rounded-xl text-sm font-semibold"
                  >
                    <span>Schedule Consultation</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Hero Image (5 cols) */}
            <motion.div
              className={`col-span-5 rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
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
                <div className={`relative w-full rounded-[1.5rem] overflow-hidden border ${
                  isDark
                    ? 'border-gray-600 shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
                    : 'border-[#e2e8f0] shadow-[inset_0_1px_2px_rgba(14,165,233,0.1),inset_0_-1px_2px_rgba(14,165,233,0.05),0_4px_12px_rgba(0,0,0,0.04)]'
                }`}>
                  <img
                    src={data.heroImage}
                    alt={data.badge}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-5 left-6">
                    <span className="text-white text-lg font-medium tracking-tight font-serif drop-shadow-lg">
                      {data.badge}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Industry-Specific Bento Grid - The Problem Section */}
      <section className="py-10 sm:py-14 lg:py-18 xl:py-22 relative bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">

          <div className="text-left max-w-3xl mb-8 sm:mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 sm:mb-6 ${isDark ? 'text-red-400 bg-red-900/30' : 'text-red-600 bg-red-50'}`}
            >
              The Challenge
            </motion.span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-tight mb-3 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-text-primary'}`}>
              {data.problemTitle}
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              {data.problemDescription}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">

            {/* Card 1: Main Problem Visualization - Animated Pentagon Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 lg:col-span-5"
            >
              <div className="bento-card compact h-full flex flex-col">
                <div className="mb-3 sm:mb-4">
                  <span className={`inline-block px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold rounded-full mb-2 sm:mb-3 ${isDark ? 'text-red-400 bg-red-900/30' : 'text-red-600 bg-red-50'}`}>
                    {data.bentoContent?.mainChallenge?.badge || 'Data Silos'}
                  </span>
                  <h3 className={`text-lg sm:text-xl font-serif font-medium mb-1.5 sm:mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                    {data.bentoContent?.mainChallenge?.title || 'Fragmented Systems'}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {data.bentoContent?.mainChallenge?.description || 'Critical data scattered across multiple disconnected platforms.'}
                  </p>
                </div>

                {/* Large Animated Pentagon Radar Visualization */}
                <div className="flex-1 flex flex-col justify-center items-center min-h-[260px] sm:min-h-[340px] py-2 sm:py-4">
                  {(() => {
                    // Use custom radar data from industry config, or fall back to defaults
                    const radarConfig = data.bentoContent?.radarChart
                    const radarData = radarConfig?.categories || [
                      { label: 'Integration', current: 35, potential: 90 },
                      { label: 'Visibility', current: 25, potential: 85 },
                      { label: 'Automation', current: 30, potential: 95 },
                      { label: 'Analytics', current: 20, potential: 88 },
                      { label: 'Efficiency', current: 40, potential: 92 },
                    ]

                    // Custom colors and style from config
                    const currentColor = radarConfig?.colors?.current || '#ef4444'
                    const potentialColor = radarConfig?.colors?.potential || '#3b82f6'
                    const chartStyle = radarConfig?.style || 'default'

                    // Color manipulation helpers
                    const hexToRgb = (hex: string) => {
                      const num = parseInt(hex.replace('#', ''), 16)
                      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
                    }

                    const lightenColor = (hex: string, percent: number) => {
                      const { r, g, b } = hexToRgb(hex)
                      const amt = Math.round(2.55 * percent)
                      return `#${(1 << 24 | Math.min(255, r + amt) << 16 | Math.min(255, g + amt) << 8 | Math.min(255, b + amt)).toString(16).slice(1)}`
                    }

                    const darkenColor = (hex: string, percent: number) => {
                      const { r, g, b } = hexToRgb(hex)
                      const amt = Math.round(2.55 * percent)
                      return `#${(1 << 24 | Math.max(0, r - amt) << 16 | Math.max(0, g - amt) << 8 | Math.max(0, b - amt)).toString(16).slice(1)}`
                    }

                    const colorWithAlpha = (hex: string, alpha: number) => {
                      const { r, g, b } = hexToRgb(hex)
                      return `rgba(${r}, ${g}, ${b}, ${alpha})`
                    }

                    // Geometry - increased size and better label positioning
                    const svgWidth = 380
                    const svgHeight = 340
                    const centerX = svgWidth / 2
                    const centerY = svgHeight / 2 - 5
                    const maxRadius = 105
                    const labelRadius = maxRadius + 45
                    const levels = 5
                    const numPoints = radarData.length

                    // Calculate polygon points
                    const getPolygonPoints = (radius: number, offset: number = -90) => {
                      return radarData.map((_, i) => {
                        const angle = (offset + (i * 360) / numPoints) * (Math.PI / 180)
                        return {
                          x: centerX + radius * Math.cos(angle),
                          y: centerY + radius * Math.sin(angle),
                        }
                      })
                    }

                    const getPathFromPoints = (points: { x: number; y: number }[]) => {
                      return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
                    }

                    // Get smooth curved path (for 'gradient' style)
                    const getSmoothPath = (points: { x: number; y: number }[]) => {
                      if (points.length < 3) return getPathFromPoints(points)
                      let path = `M ${points[0].x} ${points[0].y}`
                      for (let i = 0; i < points.length; i++) {
                        const p0 = points[(i - 1 + points.length) % points.length]
                        const p1 = points[i]
                        const p2 = points[(i + 1) % points.length]
                        const p3 = points[(i + 2) % points.length]
                        const cp1x = p1.x + (p2.x - p0.x) / 6
                        const cp1y = p1.y + (p2.y - p0.y) / 6
                        const cp2x = p2.x - (p3.x - p1.x) / 6
                        const cp2y = p2.y - (p3.y - p1.y) / 6
                        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
                      }
                      return path
                    }

                    // Calculate data points
                    const currentPoints = radarData.map((d, i) => {
                      const angle = (-90 + (i * 360) / numPoints) * (Math.PI / 180)
                      const radius = (d.current / 100) * maxRadius
                      return { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) }
                    })

                    const potentialPoints = radarData.map((d, i) => {
                      const angle = (-90 + (i * 360) / numPoints) * (Math.PI / 180)
                      const radius = (d.potential / 100) * maxRadius
                      return { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) }
                    })

                    const labelPoints = getPolygonPoints(labelRadius)

                    // Style-specific configurations
                    const styleConfig = {
                      default: { gridDash: '', currentDash: '', potentialDash: '8 4', showPulse: true, pulseCount: 1 },
                      dots: { gridDash: '2 4', currentDash: '', potentialDash: '4 4', showPulse: true, pulseCount: 2 },
                      glow: { gridDash: '', currentDash: '', potentialDash: '6 3', showPulse: true, pulseCount: 3 },
                      minimal: { gridDash: '1 3', currentDash: '', potentialDash: '4 2', showPulse: false, pulseCount: 0 },
                      neon: { gridDash: '', currentDash: '', potentialDash: '', showPulse: true, pulseCount: 2 },
                      gradient: { gridDash: '', currentDash: '', potentialDash: '10 5', showPulse: true, pulseCount: 1 },
                    }
                    const style = styleConfig[chartStyle] || styleConfig.default

                    return (
                      <div className="relative w-full flex justify-center">
                        {/* Background glow effect */}
                        <div
                          className="absolute blur-3xl opacity-20"
                          style={{
                            width: '280px',
                            height: '280px',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: chartStyle === 'neon'
                              ? `radial-gradient(circle, ${potentialColor} 0%, ${currentColor} 50%, transparent 70%)`
                              : `radial-gradient(circle at 50% 50%, ${potentialColor} 0%, transparent 70%)`,
                          }}
                        />

                        <svg
                          width="100%"
                          height={svgHeight}
                          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                          className="relative z-10 max-w-full"
                          style={{ overflow: 'visible' }}
                        >
                          <defs>
                            {/* Gradients */}
                            <linearGradient id={`currentGrad-${data.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={isDark ? lightenColor(currentColor, 15) : currentColor} />
                              <stop offset="100%" stopColor={isDark ? currentColor : darkenColor(currentColor, 15)} />
                            </linearGradient>

                            <linearGradient id={`potentialGrad-${data.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={isDark ? lightenColor(potentialColor, 15) : potentialColor} />
                              <stop offset="100%" stopColor={isDark ? potentialColor : darkenColor(potentialColor, 15)} />
                            </linearGradient>

                            <radialGradient id={`radialGrad-${data.slug}`} cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor={potentialColor} stopOpacity="0.3" />
                              <stop offset="100%" stopColor={potentialColor} stopOpacity="0" />
                            </radialGradient>

                            {/* Glow filters */}
                            <filter id={`glowCurrent-${data.slug}`} x="-100%" y="-100%" width="300%" height="300%">
                              <feGaussianBlur stdDeviation={chartStyle === 'neon' ? '6' : '3'} result="blur"/>
                              <feMerge>
                                <feMergeNode in="blur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>

                            <filter id={`glowPotential-${data.slug}`} x="-100%" y="-100%" width="300%" height="300%">
                              <feGaussianBlur stdDeviation={chartStyle === 'neon' ? '8' : '4'} result="blur"/>
                              <feMerge>
                                <feMergeNode in="blur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>

                            {/* Neon outer glow */}
                            {chartStyle === 'neon' && (
                              <filter id={`neonGlow-${data.slug}`} x="-150%" y="-150%" width="400%" height="400%">
                                <feGaussianBlur stdDeviation="10" result="blur1"/>
                                <feGaussianBlur stdDeviation="5" result="blur2"/>
                                <feMerge>
                                  <feMergeNode in="blur1"/>
                                  <feMergeNode in="blur2"/>
                                  <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                              </filter>
                            )}
                          </defs>

                          {/* Background circle for 'glow' style */}
                          {chartStyle === 'glow' && (
                            <circle
                              cx={centerX}
                              cy={centerY}
                              r={maxRadius + 10}
                              fill={`url(#radialGrad-${data.slug})`}
                            />
                          )}

                          {/* Grid levels - concentric polygons */}
                          {[...Array(levels)].map((_, level) => {
                            const radius = ((level + 1) / levels) * maxRadius
                            const points = getPolygonPoints(radius)
                            const isOuter = level === levels - 1
                            return (
                              <path
                                key={level}
                                d={chartStyle === 'gradient' ? getSmoothPath(points) : getPathFromPoints(points)}
                                fill="none"
                                stroke={isDark ? '#374151' : '#cbd5e1'}
                                strokeWidth={isOuter ? 1.5 : 0.75}
                                opacity={isOuter ? 0.7 : 0.35}
                                strokeDasharray={style.gridDash}
                              />
                            )
                          })}

                          {/* Axis lines */}
                          {getPolygonPoints(maxRadius).map((point, i) => (
                            <line
                              key={i}
                              x1={centerX}
                              y1={centerY}
                              x2={point.x}
                              y2={point.y}
                              stroke={isDark ? '#374151' : '#cbd5e1'}
                              strokeWidth={0.75}
                              opacity={0.5}
                              strokeDasharray={chartStyle === 'dots' ? '2 6' : ''}
                            />
                          ))}

                          {/* Potential area */}
                          <path
                            d={chartStyle === 'gradient' ? getSmoothPath(potentialPoints) : getPathFromPoints(potentialPoints)}
                            fill={`url(#potentialGrad-${data.slug})`}
                            fillOpacity={chartStyle === 'neon' ? 0.1 : 0.12}
                            stroke={`url(#potentialGrad-${data.slug})`}
                            strokeWidth={chartStyle === 'neon' ? 2.5 : 2}
                            strokeDasharray={style.potentialDash}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter={chartStyle === 'neon' ? `url(#neonGlow-${data.slug})` : `url(#glowPotential-${data.slug})`}
                          />

                          {/* Current state area */}
                          <path
                            d={chartStyle === 'gradient' ? getSmoothPath(currentPoints) : getPathFromPoints(currentPoints)}
                            fill={`url(#currentGrad-${data.slug})`}
                            fillOpacity={chartStyle === 'neon' ? 0.2 : 0.22}
                            stroke={`url(#currentGrad-${data.slug})`}
                            strokeWidth={chartStyle === 'neon' ? 3 : 2.5}
                            strokeDasharray={style.currentDash}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter={`url(#glowCurrent-${data.slug})`}
                          />

                          {/* Potential data points with smooth pulses */}
                          {potentialPoints.map((point, i) => (
                            <g key={`potential-${i}`}>
                              {/* Smooth pulse rings */}
                              {style.showPulse && [...Array(style.pulseCount)].map((_, pulseIdx) => (
                                <motion.circle
                                  key={`pulse-${i}-${pulseIdx}`}
                                  cx={point.x}
                                  cy={point.y}
                                  r={6}
                                  fill="none"
                                  stroke={potentialColor}
                                  strokeWidth={1.5}
                                  initial={{ scale: 1, opacity: 0 }}
                                  animate={{
                                    scale: [1, 2.2, 2.8],
                                    opacity: [0.5, 0.25, 0],
                                  }}
                                  transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    delay: i * 0.4 + pulseIdx * 0.8,
                                    ease: 'easeOut',
                                  }}
                                />
                              ))}
                              {/* Main dot */}
                              <motion.circle
                                cx={point.x}
                                cy={point.y}
                                r={chartStyle === 'minimal' ? 4 : 6}
                                fill={isDark ? lightenColor(potentialColor, 20) : potentialColor}
                                stroke={isDark ? darkenColor(potentialColor, 20) : lightenColor(potentialColor, 30)}
                                strokeWidth={2}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 1 + i * 0.06, ease: 'backOut' }}
                              />
                            </g>
                          ))}

                          {/* Current state data points */}
                          {currentPoints.map((point, i) => (
                            <motion.circle
                              key={`current-${i}`}
                              cx={point.x}
                              cy={point.y}
                              r={chartStyle === 'minimal' ? 3 : 5}
                              fill={isDark ? lightenColor(currentColor, 20) : currentColor}
                              stroke={isDark ? darkenColor(currentColor, 20) : lightenColor(currentColor, 30)}
                              strokeWidth={2}
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 1.2 + i * 0.06, ease: 'backOut' }}
                            />
                          ))}

                          {/* Category labels - positioned with smart text anchoring */}
                          {labelPoints.map((point, i) => {
                            // Determine text anchor based on position
                            const angle = (-90 + (i * 360) / numPoints)
                            const normalizedAngle = ((angle % 360) + 360) % 360
                            let textAnchor: 'start' | 'middle' | 'end' = 'middle'
                            let dx = 0
                            if (normalizedAngle > 45 && normalizedAngle < 135) {
                              textAnchor = 'start'
                              dx = 4
                            } else if (normalizedAngle > 225 && normalizedAngle < 315) {
                              textAnchor = 'end'
                              dx = -4
                            }

                            return (
                              <motion.text
                                key={i}
                                x={point.x + dx}
                                y={point.y}
                                textAnchor={textAnchor}
                                dominantBaseline="middle"
                                fill={isDark ? '#9ca3af' : '#64748b'}
                                fontSize={11}
                                fontWeight={500}
                                className="select-none"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                              >
                                {radarData[i].label}
                              </motion.text>
                            )
                          })}

                          {/* Center dot */}
                          <motion.circle
                            cx={centerX}
                            cy={centerY}
                            r={chartStyle === 'neon' ? 4 : 3}
                            fill={chartStyle === 'neon' ? potentialColor : (isDark ? '#6b7280' : '#94a3b8')}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                          />

                          {/* Decorative elements for 'dots' style */}
                          {chartStyle === 'dots' && getPolygonPoints(maxRadius).map((point, i) => (
                            <motion.circle
                              key={`decor-${i}`}
                              cx={point.x}
                              cy={point.y}
                              r={2}
                              fill={isDark ? '#4b5563' : '#94a3b8'}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.2, delay: 0.5 + i * 0.05 }}
                            />
                          ))}
                        </svg>
                      </div>
                    )
                  })()}

                  {/* Legend - uses custom colors */}
                  {(() => {
                    const legendCurrentColor = data.bentoContent?.radarChart?.colors?.current || '#ef4444'
                    const legendPotentialColor = data.bentoContent?.radarChart?.colors?.potential || '#3b82f6'
                    return (
                      <motion.div
                        className="flex justify-center gap-8 mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="relative">
                            <div
                              className="w-3.5 h-3.5 rounded-full shadow-lg"
                              style={{
                                background: `linear-gradient(135deg, ${legendCurrentColor}, ${legendCurrentColor}dd)`,
                                boxShadow: `0 4px 6px -1px ${legendCurrentColor}40`
                              }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Current State</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="relative">
                            <div
                              className="w-3.5 h-3.5 rounded-full shadow-lg"
                              style={{
                                background: `linear-gradient(135deg, ${legendPotentialColor}, ${legendPotentialColor}dd)`,
                                boxShadow: `0 4px 6px -1px ${legendPotentialColor}40`
                              }}
                            />
                            <div
                              className="absolute inset-0 w-3.5 h-3.5 rounded-full animate-ping opacity-40"
                              style={{ backgroundColor: legendPotentialColor }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>AI Potential</span>
                        </div>
                      </motion.div>
                    )
                  })()}
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="md:col-span-2 lg:col-span-7 flex flex-col gap-4 sm:gap-5 lg:gap-6">

              {/* Row 1: Problem Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">

                {/* Card 2: Impact Metric - Ring Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bento-card compact flex flex-col"
                >
                  {(() => {
                    const ringData = data.bentoContent?.ringChart
                    const colorConfig = {
                      red: { bg: isDark ? 'bg-red-900/30' : 'bg-red-50', text: isDark ? 'text-red-400' : 'text-red-500', border: isDark ? 'border-red-800/50' : 'border-red-100', track: isDark ? '#374151' : '#fee2e2', gradient: ['#ef4444', '#f97316'] },
                      orange: { bg: isDark ? 'bg-orange-900/30' : 'bg-orange-50', text: isDark ? 'text-orange-400' : 'text-orange-500', border: isDark ? 'border-orange-800/50' : 'border-orange-100', track: isDark ? '#374151' : '#ffedd5', gradient: ['#f97316', '#fb923c'] },
                      amber: { bg: isDark ? 'bg-amber-900/30' : 'bg-amber-50', text: isDark ? 'text-amber-400' : 'text-amber-500', border: isDark ? 'border-amber-800/50' : 'border-amber-100', track: isDark ? '#374151' : '#fef3c7', gradient: ['#f59e0b', '#fbbf24'] },
                      blue: { bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50', text: isDark ? 'text-blue-400' : 'text-blue-500', border: isDark ? 'border-blue-800/50' : 'border-blue-100', track: isDark ? '#374151' : '#dbeafe', gradient: ['#3b82f6', '#60a5fa'] },
                      purple: { bg: isDark ? 'bg-purple-900/30' : 'bg-purple-50', text: isDark ? 'text-purple-400' : 'text-purple-500', border: isDark ? 'border-purple-800/50' : 'border-purple-100', track: isDark ? '#374151' : '#f3e8ff', gradient: ['#8b5cf6', '#a78bfa'] },
                    }
                    const color = colorConfig[ringData?.color || 'red']
                    const percentage = ringData?.percentage || 35
                    const gradientId = `ringGradient-${data.slug}`

                    return (
                      <>
                        <div className="mb-3 sm:mb-4">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 border ${color.bg} ${color.text} ${color.border}`}>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className={`text-base sm:text-lg font-semibold mb-1 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                            {ringData?.title || 'Lost Efficiency'}
                          </h3>
                          <p className={`text-xs sm:text-[13px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                            {ringData?.description || 'Manual processes drain your team\'s productivity.'}
                          </p>
                        </div>

                        {/* Ring chart */}
                        <div className="flex-1 flex items-center justify-center">
                          <div className={`backdrop-blur-sm border rounded-xl sm:rounded-2xl p-3 sm:p-5 ${isDark ? 'bg-gray-800/60 border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'bg-white/60 border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'}`}>
                            <div className="flex items-center gap-3 sm:gap-5">
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                  <circle cx="50" cy="50" r="40" fill="none" stroke={color.track} strokeWidth="10" />
                                  <motion.circle
                                    cx="50" cy="50" r="40" fill="none"
                                    stroke={`url(#${gradientId})`}
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeDasharray="251.2"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    whileInView={{ strokeDashoffset: 251.2 * (1 - percentage / 100) }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                                  />
                                  <defs>
                                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor={color.gradient[0]} />
                                      <stop offset="100%" stopColor={color.gradient[1]} />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                  <span className={`text-base sm:text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                    <AnimatedCounter value={percentage} suffix="%" />
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-1 sm:space-y-2">
                                <div>
                                  <div className={`text-[9px] sm:text-[10px] uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {ringData?.metric || 'Time Lost'}
                                  </div>
                                  <div className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {ringData?.metricValue || '~14hrs/week'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </motion.div>

                {/* Card 3: Capacity Bars */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bento-card compact flex flex-col"
                >
                  {(() => {
                    const barData = data.bentoContent?.barChart
                    const statusColorConfig = {
                      red: { bg: isDark ? 'bg-red-900/30' : 'bg-red-50', border: isDark ? 'border-red-800/50' : 'border-red-100', text: isDark ? 'text-red-400' : 'text-red-600', dot: 'bg-red-500' },
                      orange: { bg: isDark ? 'bg-orange-900/30' : 'bg-orange-50', border: isDark ? 'border-orange-800/50' : 'border-orange-100', text: isDark ? 'text-orange-400' : 'text-orange-600', dot: 'bg-orange-500' },
                      amber: { bg: isDark ? 'bg-amber-900/30' : 'bg-amber-50', border: isDark ? 'border-amber-800/50' : 'border-amber-100', text: isDark ? 'text-amber-400' : 'text-amber-600', dot: 'bg-amber-500' },
                      blue: { bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50', border: isDark ? 'border-blue-800/50' : 'border-blue-100', text: isDark ? 'text-blue-400' : 'text-blue-600', dot: 'bg-blue-500' },
                      green: { bg: isDark ? 'bg-green-900/30' : 'bg-green-50', border: isDark ? 'border-green-800/50' : 'border-green-100', text: isDark ? 'text-green-400' : 'text-green-600', dot: 'bg-green-500' },
                      purple: { bg: isDark ? 'bg-purple-900/30' : 'bg-purple-50', border: isDark ? 'border-purple-800/50' : 'border-purple-100', text: isDark ? 'text-purple-400' : 'text-purple-600', dot: 'bg-purple-500' },
                    }
                    const statusColor = statusColorConfig[barData?.statusColor || 'red']
                    const chartData = barData?.data || [
                      { label: 'Mon', value: 65 },
                      { label: 'Tue', value: 78 },
                      { label: 'Wed', value: 92 },
                      { label: 'Thu', value: 88 },
                      { label: 'Fri', value: 95 },
                    ]

                    return (
                      <>
                        <div className="mb-3 sm:mb-4">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 border ${isDark ? 'bg-orange-900/30 text-orange-400 border-orange-800/50' : 'bg-orange-50 text-orange-500 border-orange-100'}`}>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                          </div>
                          <h3 className={`text-base sm:text-lg font-semibold mb-1 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                            {barData?.title || 'Resource Strain'}
                          </h3>
                          <p className={`text-xs sm:text-[13px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                            {barData?.description || 'Teams operating beyond sustainable capacity.'}
                          </p>
                        </div>

                        {/* Capacity bars */}
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="grid grid-cols-5 gap-2 sm:gap-3 px-1">
                            {chartData.map((item, i) => {
                              const shortLabel = item.label.split(' ')[0]
                              return (
                                <div key={i} className="flex flex-col items-center">
                                  <div className="w-full h-28 sm:h-32 relative">
                                    <div className={`absolute inset-0 rounded ${isDark ? 'bg-gray-700/40' : 'bg-gray-100'}`} />
                                    <motion.div
                                      initial={{ height: 0 }}
                                      whileInView={{ height: `${item.value}%` }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                                      className={`absolute bottom-0 left-0 right-0 rounded flex items-end justify-center pb-2 ${
                                        item.value > 85 ? 'bg-gradient-to-t from-red-500 to-red-400' :
                                        item.value > 70 ? 'bg-gradient-to-t from-orange-500 to-orange-400' :
                                        item.value > 50 ? 'bg-gradient-to-t from-amber-500 to-amber-400' :
                                        'bg-gradient-to-t from-blue-500 to-blue-400'
                                      }`}
                                    >
                                      <span className="text-[9px] sm:text-[10px] font-medium text-white/90 writing-mode-vertical transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>{shortLabel}</span>
                                    </motion.div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              </div>

              {/* Row 2: Solution Preview + CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">

                {/* Results Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bento-card p-0 overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    <span className={`inline-block px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold rounded-full mb-3 sm:mb-4 ${isDark ? 'text-emerald-400 bg-emerald-900/30' : 'text-emerald-600 bg-emerald-50'}`}>
                      The Impact
                    </span>
                    <h3 className={`text-base sm:text-lg font-serif font-medium mb-3 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                      {data.resultsTitle}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {data.results.slice(0, 4).map((result, i) => (
                        <div key={i}>
                          <div className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{result.value}</div>
                          <div className={`text-[9px] sm:text-[10px] uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* CTA Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bento-card compact flex flex-col justify-between"
                >
                  <div>
                    <span className={`inline-block px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold rounded-full mb-3 sm:mb-4 ${isDark ? 'text-blue-400 bg-blue-900/30' : 'text-primary bg-blue-50'}`}>
                      The Solution
                    </span>
                    <h3 className={`text-lg sm:text-xl font-serif font-medium mb-1.5 sm:mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>We change that.</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      Unified data, intelligent automation, and actionable insights. See measurable ROI from day one.
                    </p>
                  </div>

                  <Link
                    href="/demo"
                    className="btn-primary h-10 sm:h-12 px-4 sm:px-6 rounded-full text-xs sm:text-sm mt-4 sm:mt-6 w-full justify-center"
                  >
                    <span>See How It Works</span>
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - Accordion Style */}
      <section className={`py-10 sm:py-14 lg:py-18 xl:py-22 relative ${isDark ? 'bg-gray-800/30' : 'bg-slate-50/50'}`}>
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />

        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-start">
            {/* Left: Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-32"
            >
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-tight mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-text-primary'}`}>
                {data.solutionsTitle}
              </h2>
              <p className={`text-base sm:text-lg mb-3 sm:mb-4 font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                {data.solutionsSubtitle}
              </p>
              <p className={`text-sm sm:text-[15px] mb-6 sm:mb-8 font-serif leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                Every engagement is custom. Every solution is built for your specific challenges.
              </p>
              <Link
                href="/demo"
                className="btn-primary h-10 sm:h-11 px-4 sm:px-6 rounded-full text-xs sm:text-sm inline-flex w-full sm:w-auto justify-center"
              >
                <span>Schedule a Consultation</span>
              </Link>
            </motion.div>

            {/* Right: Accordion */}
            <div className="space-y-2 sm:space-y-3">
              {data.solutions.map((solution, index) => {
                const isExpanded = expandedId === index

                return (
                  <div
                    key={index}
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
                            ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/25'
                            : isDark
                              ? 'bg-gray-700 text-gray-400 group-hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                          }
                        `}>
                          <solution.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h3 className={`
                          text-sm sm:text-[15px] font-semibold font-serif transition-colors duration-200
                          ${isExpanded
                            ? isDark ? 'text-gray-100' : 'text-gray-900'
                            : isDark ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-700 group-hover:text-gray-900'}
                        `}>
                          {solution.title}
                        </h3>
                      </div>

                      <div className={`
                        w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                        ${isExpanded
                          ? 'bg-primary/10 text-primary'
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
                            <p className={`text-xs sm:text-[14px] leading-relaxed mb-3 sm:mb-4 font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                              {solution.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                              {solution.features.map((feature, i) => (
                                <span
                                  key={i}
                                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider font-serif ${isDark ? 'bg-blue-900/40 text-blue-400 shadow-[2px_2px_4px_rgba(59,130,246,0.1)]' : 'bg-blue-100 text-[#1E40AF] shadow-[2px_2px_4px_rgba(30,64,175,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.5)]'}`}
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />
      </section>

      {/* Testimonial Section */}
      {data.testimonial && (
        <section className="py-10 sm:py-14 lg:py-18 xl:py-22 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="container-responsive">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <FaQuoteLeft className={`text-2xl sm:text-4xl mb-4 sm:mb-6 mx-auto ${isDark ? 'text-gray-700' : 'text-slate-200'}`} />
              <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 sm:mb-8 font-serif ${isDark ? 'text-white' : 'text-slate-800'}`}>
                "{data.testimonial.quote}"
              </p>
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                  <span className={`text-sm sm:text-base font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {data.testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-left">
                  <div className={`text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{data.testimonial.author}</div>
                  <div className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{data.testimonial.role}, {data.testimonial.company}</div>
                </div>
              </div>

{/* HIDDEN: Compliance badges - uncomment to re-enable
              <div className={`mt-8 sm:mt-10 pt-6 sm:pt-8 border-t ${isDark ? 'border-gray-700/50' : 'border-slate-200/50'}`}>
                <p className={`text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Compliance & Security</p>
                <div className={`flex items-center justify-center gap-3 sm:gap-4 flex-wrap ${isDark ? 'opacity-50' : 'grayscale opacity-60'}`}>
                  <img src="/SOC2_Type1.svg" alt="SOC 2 Type I" className="h-6 sm:h-8 w-auto" />
                  <img src="/SOC2_Type2.svg" alt="SOC 2 Type II" className="h-6 sm:h-8 w-auto" />
                  <img src="/GDPR.svg" alt="GDPR" className="h-6 sm:h-8 w-auto" />
                  <img src="/HIPAA.svg" alt="HIPAA" className="h-6 sm:h-8 w-auto" />
                </div>
              </div>
              */}
            </motion.div>
          </div>
        </section>
      )}

      {/* Full Width Contact Form Section */}
      <section className={`py-10 sm:py-14 lg:py-18 xl:py-22 ${isDark ? 'bg-gray-800/30' : 'bg-slate-50/50'}`}>
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div
              className={`rounded-xl sm:rounded-2xl lg:rounded-3xl border p-4 sm:p-6 lg:p-10 ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
              style={glassStyle}
            >
              <div className="text-center mb-6 sm:mb-10">
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-serif font-normal mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {data.ctaTitle}
                </h2>
                <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {data.ctaSubtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-slate-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-slate-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-slate-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    How can we help?
                  </label>
                  <input
                    type="text"
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-slate-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="Tell us about your challenges..."
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full h-12 sm:h-14 rounded-lg sm:rounded-xl text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Schedule Consultation</span>
                    )}
                  </button>
                </div>

                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`md:col-span-2 p-4 rounded-xl text-center text-sm font-medium ${
                      submitStatus === 'success'
                        ? isDark ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-green-50 text-green-700 border border-green-200'
                        : isDark ? 'bg-red-900/30 text-red-400 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {submitStatus === 'success'
                      ? 'Thank you! We\'ll be in touch soon.'
                      : 'Something went wrong. Please try again.'}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default IndustryPageTemplate
