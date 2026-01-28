'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { IconType } from 'react-icons'
import { FaCheckCircle, FaPhone, FaArrowRight } from 'react-icons/fa'
import SEO from '../SEO'
import HeroBackgroundGrid from '../HeroBackgroundGrid'
import MobileHeroBackground from '../MobileHeroBackground'
import { useTheme } from 'next-themes'

export interface ProductFeature {
  icon: IconType
  title: string
  description: string
}

export interface ProductStep {
  step: string
  title: string
  description: string
}

export interface ProductStat {
  value: string
  label: string
  suffix?: string
}

export interface ProductPageData {
  // Meta
  pageType: 'feature' | 'usecase'
  slug: string
  seoTitle?: string
  seoDescription?: string

  // Hero
  badge: string
  badgeIcon?: IconType
  title: string
  titleHighlight?: string
  subtitle: string
  heroStats: ProductStat[]

  // Features Section
  featuresTitle: string
  featuresSubtitle: string
  features: ProductFeature[]

  // Process Section
  processTitle: string
  processSubtitle: string
  steps: ProductStep[]

  // Benefits/Stats Section
  benefitsTitle: string
  benefitsSubtitle: string
  benefits: ProductStat[]

  // Integrations Section (optional)
  integrations?: {
    title: string
    subtitle: string
    categories: Array<{
      title: string
      items: string[]
    }>
  }

  // CTA Section
  ctaTitle: string
  ctaSubtitle: string
  ctaButtons: Array<{
    label: string
    href: string
    primary?: boolean
  }>
  ctaFeatures: string[]
}

interface ProductPageTemplateProps {
  data: ProductPageData
}

const ProductPageTemplate: React.FC<ProductPageTemplateProps> = ({ data }) => {
  const [mounted, setMounted] = useState(false)
  const [expandedFeature, setExpandedFeature] = useState<number | null>(0)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash
  const isDark = !mounted || resolvedTheme === 'dark'

  const glassStyle = {
    background: isDark
      ? 'rgba(31, 41, 55, 0.6)'
      : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: isDark
      ? 'inset 0 1px 2px rgba(59, 130, 246, 0.1), 0 2px 8px rgba(0, 0, 0, 0.3)'
      : 'inset 0 1px 2px rgba(14, 165, 233, 0.15), 0 2px 8px rgba(0, 0, 0, 0.04)',
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

  const statCardStyle = {
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
    <div className="min-h-screen text-text-primary transition-colors duration-300 bg-gray-900 dark:bg-gray-900" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="solutions"
        customTitle={data.seoTitle}
        customDescription={data.seoDescription}
      />

      {/* Mobile Hero */}
      <section className="lg:hidden relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0">
          <MobileHeroBackground />
        </div>

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
              {data.badgeIcon && <data.badgeIcon className={`w-3 h-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />}
              <span className={`text-xs font-semibold tracking-wide uppercase ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                {data.badge}
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={`text-[1.875rem] leading-[1.15] font-serif font-light tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            {data.title}
            {data.titleHighlight && (
              <>
                <br />
                <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {data.titleHighlight}
                </span>
              </>
            )}
          </motion.h1>

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

          {/* CTA Buttons */}
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
              <span>Schedule Demo</span>
              <FaArrowRight className="w-3 h-3" />
            </Link>
            <a
              href="tel:+16163263328"
              className={`flex items-center justify-center gap-2 w-full h-12 rounded-xl border font-medium transition-colors ${
                isDark
                  ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FaPhone className="w-3 h-3" />
              <span>+1 616-326-3328</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Desktop Hero */}
      <section className="hidden lg:flex h-screen max-h-[960px] min-h-[700px] flex-col items-center overflow-hidden relative pt-0 select-none transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <HeroBackgroundGrid isPlaying={false} />

        <div className="absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none from-white/10 to-white dark:from-gray-900/10 dark:to-gray-900" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none from-white via-white/40 dark:from-gray-900 dark:via-gray-900/40" />

        <div
          className="absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
          style={{
            background: 'var(--hero-radial-desktop)',
          }}
        />

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
                      ? 'inset 0 1px 2px rgba(120, 184, 255, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.05)'
                      : '0 2px 12px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {data.badgeIcon && <data.badgeIcon className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />}
                  <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    {data.badge}
                  </span>
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
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Key Features (5 cols) */}
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
                <h2 className={`text-xl lg:text-2xl font-serif font-normal mb-1 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  Key Capabilities
                </h2>
                <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  What this solution delivers.
                </p>

                <div className="space-y-3">
                  {data.features.slice(0, 4).map((feature, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${isDark ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                        <feature.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>
                          {feature.title}
                        </div>
                        <div className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                          {feature.description.length > 80 ? feature.description.slice(0, 80) + '...' : feature.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section - Accordion Style */}
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
                {data.featuresTitle}
              </h2>
              <p className={`text-base sm:text-lg mb-6 sm:mb-8 font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                {data.featuresSubtitle}
              </p>
              <Link
                href="/demo"
                className="btn-primary h-10 sm:h-11 px-4 sm:px-6 rounded-full text-xs sm:text-sm inline-flex w-full sm:w-auto justify-center"
              >
                <span>Schedule a Consultation</span>
              </Link>
            </motion.div>

            {/* Right: Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2 sm:space-y-3"
            >
              {data.features.map((feature, index) => {
                const isExpanded = expandedFeature === index

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
                      onClick={() => setExpandedFeature(isExpanded ? null : index)}
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
                          <feature.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h3 className={`
                          text-sm sm:text-[15px] font-semibold font-serif transition-colors duration-200
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
                            <p className={`text-xs sm:text-[14px] leading-relaxed font-serif ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                              {feature.description}
                            </p>
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

      {/* Process Section */}
      <section className="py-10 sm:py-14 lg:py-18 xl:py-22 relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-tight mb-3 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-text-primary'}`}>
              {data.processTitle}
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              {data.processSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {data.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bento-card compact"
              >
                <div className="flex items-start gap-4">
                  <div className={`text-4xl font-serif font-light ${isDark ? 'text-gray-500' : 'text-slate-300'}`}>
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits/Stats Section */}
      <section className={`py-10 sm:py-14 lg:py-18 xl:py-22 relative ${isDark ? 'bg-gray-800/30' : 'bg-slate-50/50'}`}>
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />

        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-tight mb-3 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-text-primary'}`}>
              {data.benefitsTitle}
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              {data.benefitsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {data.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {benefit.value}
                  {benefit.suffix && <span className="text-xl ml-1">{benefit.suffix}</span>}
                </div>
                <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {benefit.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />
      </section>

      {/* Integrations Section (optional) */}
      {data.integrations && (
        <section className="py-10 sm:py-14 lg:py-18 xl:py-22 relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-tight mb-3 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-text-primary'}`}>
                {data.integrations.title}
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                {data.integrations.subtitle}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div
                className={`bento-card compact`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {data.integrations.categories.map((category, index) => (
                    <div key={index}>
                      <h3 className={`text-lg font-semibold mb-4 font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                        {category.title}
                      </h3>
                      <ul className="space-y-3">
                        {category.items.map((item, i) => (
                          <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                            <FaCheckCircle className={`flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={`py-10 sm:py-14 lg:py-18 xl:py-22 relative ${isDark ? 'bg-gray-800/30' : 'bg-slate-50/50'}`}>
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />

        <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-tight mb-3 sm:mb-4 ${isDark ? 'text-gray-100' : 'text-text-primary'}`}>
              {data.ctaTitle}
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              {data.ctaSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8">
              {data.ctaButtons.map((button, index) => (
                <Link
                  key={index}
                  href={button.href}
                  className={
                    button.primary
                      ? "btn-primary h-12 sm:h-14 px-6 sm:px-8 rounded-xl text-base sm:text-lg w-full sm:w-auto justify-center inline-flex items-center gap-2"
                      : `h-12 sm:h-14 px-6 sm:px-8 rounded-xl border font-medium transition-colors w-full sm:w-auto text-center inline-flex items-center justify-center ${
                          isDark
                            ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`
                  }
                >
                  <span>{button.label}</span>
                  {button.primary && <FaArrowRight className="w-4 h-4" />}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              {data.ctaFeatures.map((feature, index) => (
                <span key={index} className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  <FaCheckCircle className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductPageTemplate
