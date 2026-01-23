'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  FaRoute,
  FaDatabase,
  FaRobot,
  FaHandshake,
  FaArrowRight,
  FaCheckCircle,
  FaBrain
} from 'react-icons/fa'
import SEO from '../components/SEO'
import HeroBackgroundGrid from '../components/HeroBackgroundGrid'
import IndustriesCarousel from '../components/IndustriesCarousel'

const WhatWeDo: React.FC = () => {
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

  // Subtle glass style for accordion cards - lighter than hero cards
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
          _subject: `Consultation Request from ${formData.name}${formData.company ? ` at ${formData.company}` : ''}`,
          form_type: 'consultation_request',
          source: 'what_we_do_page',
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

  const engagementTypes = [
    {
      icon: FaRoute,
      title: 'AI Strategy & Assessment',
      subtitle: 'For companies exploring AI possibilities',
      description: 'We start with a comprehensive audit of your operations and data landscape, identifying where AI can deliver the highest impact.',
      features: [
        'Comprehensive Audit',
        'Opportunity Mapping',
        'ROI Modeling',
        'Transformation Roadmap'
      ]
    },
    {
      icon: FaDatabase,
      title: 'Data Intelligence Platform',
      subtitle: 'For companies drowning in disconnected data',
      description: 'Our flagship offering. We unify your scattered data, deploy AI-powered analytics, and give your executives strategic insights.',
      features: [
        'Full BI Deployment',
        'AI Analytics Layer',
        'Executive Dashboards',
        'Natural Language Queries'
      ],
      featured: true
    },
    {
      icon: FaRobot,
      title: 'Intelligent Operations',
      subtitle: 'For high-volume customer interactions',
      description: 'AI-powered automation for customer-facing and back-office processes. Voice agents, chatbots, and workflow automation.',
      features: [
        'AI Voice Agents',
        'Conversational AI',
        'Workflow Automation',
        'System Integrations'
      ]
    },
    {
      icon: FaHandshake,
      title: 'Managed AI Partnership',
      subtitle: 'For companies wanting ongoing AI support',
      description: 'We become your AI team. Continuous optimization, new use case development, training, and strategic guidance.',
      features: [
        'Dedicated Team',
        'Continuous Optimization',
        'New Use Cases',
        'Training & Enablement'
      ]
    }
  ]

  const heroStats = [
    { value: '50+', label: 'Transformations' },
    { value: '94%', label: 'Retention Rate' },
    { value: '3.2x', label: 'Average ROI' }
  ]

  return (
    <div className="min-h-screen text-text-primary transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="solutions"
        customTitle="What We Do | AI Transformation Agency - Cognia AI"
        customDescription="We don't sell software. We partner with businesses to fundamentally transform how they operate using AI. Strategy, data intelligence, intelligent operations, and managed partnerships."
      />

      {/* Hero Section with Animated Grid Background */}
      {/* Mobile Hero - Compact Design */}
      <section className={`lg:hidden relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="absolute inset-0">
          <HeroBackgroundGrid isPlaying={false} />
        </div>

        {/* Gradient overlay for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, rgba(17,24,39,0.85) 0%, rgba(17,24,39,0.7) 50%, rgba(17,24,39,0.9) 100%)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.95) 100%)'
          }}
        />

        <div className="relative z-10 container-responsive pt-24 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                isDark
                  ? 'bg-blue-500/15 border border-blue-400/25'
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                Our Approach
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={`text-2xl font-serif font-normal mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            What We Do
          </motion.h1>

          {/* Description - Condensed for mobile */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}
          >
            We partner with businesses to transform how they operate using AI.{' '}
            <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Every engagement is custom.
            </span>
          </motion.p>

          {/* Stats - Horizontal row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex justify-between"
          >
            {heroStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-xl font-serif font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-[9px] uppercase tracking-wider font-medium mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Desktop Hero - Full Height Design */}
      <section className="hidden lg:flex min-h-screen flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <HeroBackgroundGrid isPlaying={false} />

        {/* Gradient Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none ${isDark ? 'from-gray-900/10 to-gray-900' : 'from-white/10 to-white'}`} />
        <div className={`absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none ${isDark ? 'from-gray-900 via-gray-900/40' : 'from-white via-white/40'}`} />

        {/* Radial gradient for text readability */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.7) 40%, rgba(17,24,39,0.4) 60%, rgba(17,24,39,0) 80%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 80%)',
          }}
        />

        {/* Main container */}
        <div className="w-full max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 relative z-10 flex-1 flex items-center pt-20 pb-24">
          <div className="w-full">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 lg:mb-10 ${
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
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping opacity-75" />
                </div>
                <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                  Our Approach
                </span>
                <FaBrain className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </motion.div>

              <h1 className={`text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-normal leading-[1.08] mb-6 lg:mb-8 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                What We Do
              </h1>

              <p className={`text-lg lg:text-xl 2xl:text-2xl max-w-2xl mx-auto mb-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                We don't sell software. We don't do one-off projects.
              </p>
              <p className={`text-lg lg:text-xl 2xl:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                We partner with businesses to fundamentally transform how they operate using AI.
                <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}> Every engagement is custom. Every solution is built for your specific challenges.</span>
              </p>

              {/* Stats Row */}
              <div className="flex items-stretch justify-center gap-4 lg:gap-5">
                {heroStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className={`min-w-[140px] rounded-2xl border px-6 py-4 ${isDark ? 'border-gray-700' : 'border-slate-200/80'}`}
                    style={statCardStyle}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className={`text-3xl lg:text-4xl font-serif font-normal ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-[10px] 2xl:text-xs uppercase tracking-[0.12em] font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engagement Types - Redesigned Accordion */}
      <section className={`py-16 sm:py-20 md:py-28 lg:py-36 relative ${isDark ? 'bg-gray-900/50' : 'bg-slate-50/30'}`}>
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-800' : 'via-slate-200'}`} />

        <div className="container-responsive px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
            {/* Left: Section Header - 5 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 lg:sticky lg:top-32"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
                <span className={`text-xs font-medium tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Engagement Models
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-[1.15] mb-5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                How We Work{' '}
                <span className={isDark ? 'text-gray-400' : 'text-slate-500'}>With You</span>
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Choose the engagement model that fits your needs. Every solution is custom-built for your specific challenges.
              </p>
              <Link
                href="/demo"
                className="btn-primary h-12 px-8 rounded-xl text-sm inline-flex items-center justify-center gap-2"
              >
                <span>Schedule Consultation</span>
                <FaArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Right: Accordion - 7 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 space-y-4"
            >
              {engagementTypes.map((engagement, index) => {
                const isExpanded = expandedId === index

                return (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`
                      rounded-2xl border overflow-hidden transition-all duration-200
                      ${isExpanded
                        ? isDark
                          ? 'border-gray-700/80'
                          : 'border-slate-200/80'
                        : isDark
                          ? 'border-gray-800/60 hover:border-gray-700/70'
                          : 'border-slate-200/50 hover:border-slate-200/80'
                      }
                    `}
                    style={accordionGlassStyle(isExpanded)}
                  >
                    {engagement.featured && (
                      <div className={`px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                        Flagship Offering
                      </div>
                    )}

                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full px-5 sm:px-6 py-5 flex items-start sm:items-center gap-4 text-left group"
                    >
                      {/* Icon */}
                      <div className={`
                        w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200
                        ${isExpanded
                          ? 'bg-blue-500 text-white'
                          : isDark
                            ? 'bg-gray-700/80 text-gray-400 group-hover:text-gray-300'
                            : 'bg-slate-100 text-slate-500 group-hover:text-slate-600'
                        }
                      `}>
                        <engagement.icon size={20} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`
                          text-base sm:text-[17px] font-medium leading-snug mb-1 transition-colors duration-200
                          ${isExpanded
                            ? isDark ? 'text-white' : 'text-slate-900'
                            : isDark ? 'text-gray-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}
                        `}>
                          {engagement.title}
                        </h3>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                          {engagement.subtitle}
                        </p>
                      </div>

                      {/* Chevron */}
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200
                        ${isExpanded
                          ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-500'
                          : isDark
                            ? 'bg-gray-700/50 text-gray-500 group-hover:text-gray-400'
                            : 'bg-slate-100 text-slate-400 group-hover:text-slate-500'
                        }
                      `}>
                        <motion.svg
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
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
                          transition={{
                            height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.2, delay: 0.05 }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 ml-14 sm:ml-[3.75rem]">
                            <p className={`text-sm sm:text-[15px] leading-relaxed mb-5 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                              {engagement.description}
                            </p>

                            {/* Features as clean inline list */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                              {engagement.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
                                  <span className={`text-xs sm:text-[13px] font-medium ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                                    {feature}
                                  </span>
                                </div>
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

        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-800' : 'via-slate-200'}`} />
      </section>

      {/* Industries Carousel */}
      <IndustriesCarousel />

      {/* What Makes Us Different - Bento Style */}
      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 relative ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container-responsive px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 sm:mb-6 ${isDark ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-50'}`}
            >
              Our Difference
            </motion.span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal mb-3 sm:mb-4 ${isDark ? 'text-gray-100' : ''}`}>
              We're Not a Vendor. We're Your AI Team.
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Most AI companies sell you software and disappear. We take a fundamentally different approach.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Comparison Card - Spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 lg:col-span-2"
            >
              <div className={`bento-card h-full p-5 sm:p-8`}>
                <h3 className={`text-base sm:text-lg font-serif font-medium mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  The Cognia AI Difference
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className={`rounded-xl p-4 sm:p-6 ${isDark ? 'bg-gray-700/50' : 'bg-slate-100'}`}>
                    <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>Typical Vendor</div>
                    <ul className={`space-y-2 sm:space-y-3 text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        Sells software license
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        One-time implementation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        Generic solutions
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        Support tickets
                      </li>
                    </ul>
                  </div>
                  <div className={`rounded-xl p-4 sm:p-6 border-2 ${isDark ? 'bg-blue-900/30 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
                    <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Cognia AI</div>
                    <ul className={`space-y-2 sm:space-y-3 text-xs sm:text-sm ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className={`flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        Strategic partnership
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className={`flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        Ongoing evolution
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className={`flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        Custom-built solutions
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className={`flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        Dedicated team
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Values Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={`bento-card h-full p-5 sm:p-8`}>
                <h3 className={`text-base sm:text-lg font-serif font-medium mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  Our Values
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { title: 'Business-First', desc: 'Your challenges drive our solutions' },
                    { title: 'Custom Built', desc: 'No off-the-shelf templates' },
                    { title: 'Long-Term', desc: 'We stay engaged, always' },
                    { title: 'Accessible', desc: 'AI for everyone, not just data scientists' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                      <FaCheckCircle className={`flex-shrink-0 mt-0.5 text-sm sm:text-base ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div>
                        <h4 className={`font-semibold text-xs sm:text-sm ${isDark ? 'text-gray-200' : 'text-slate-900'}`}>{item.title}</h4>
                        <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Width Contact Form Section */}
      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 ${isDark ? 'bg-gray-800/30' : 'bg-slate-50/50'}`}>
        <div className="container-responsive px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div
              className={`rounded-2xl sm:rounded-[2rem] border p-5 sm:p-8 lg:p-12 ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
              style={glassStyle}
            >
              <div className="text-center mb-6 sm:mb-10">
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-serif font-normal mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Ready to Explore What's Possible?
                </h2>
                <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Schedule a consultation. We'll assess your situation and recommend the right approach.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-slate-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-slate-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-slate-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    How can we help?
                  </label>
                  <input
                    type="text"
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-700/80 text-white placeholder-slate-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="Tell us about your challenges..."
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
                        <span>Schedule Consultation</span>
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

export default WhatWeDo
