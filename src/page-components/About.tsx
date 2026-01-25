'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  FaGlobe,
  FaHandshake,
  FaBrain,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaRocket,
  FaShieldAlt,
  FaChartLine,
  FaPhone,
  FaCalendarCheck
} from 'react-icons/fa'
import SEO from '../components/SEO'
import HeroBackgroundGrid from '../components/HeroBackgroundGrid'
import MobileHeroBackground from '../components/MobileHeroBackground'
import StructuredData from '../components/StructuredData'

const About: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  // Glass style matching Contact page exactly
  const glassOpacity = isDark ? 0.20 : 0.18
  const glassBlur = 10

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

  const philosophy = [
    {
      icon: FaHandshake,
      title: 'Partnership Over Projects',
      description: "We don't build and disappear. We stay engaged as your long-term AI partner, evolving the system as your business grows.",
      color: 'blue'
    },
    {
      icon: FaBrain,
      title: 'Business First, Technology Second',
      description: 'We start with your challenges, not our tools. Technology is a means to an end — your operational excellence is the goal.',
      color: 'blue'
    },
    {
      icon: FaUsers,
      title: 'Accessible AI',
      description: 'AI insights should be available to everyone, not just data scientists. We build solutions anyone in your organization can use.',
      color: 'blue'
    }
  ]

  const stats = [
    { value: '60', label: 'Days to Transform' },
    { value: '95%', label: 'AI Projects Fail' },
    { value: '20+', label: 'Transformations' },
    { value: '$1K', label: 'Starting Price' },
  ]

  const differentiators = [
    {
      icon: FaRocket,
      title: 'We Build What We Recommend',
      description: 'Consultants advise. Engineers build. We do both.',
      color: 'blue'
    },
    {
      icon: FaShieldAlt,
      title: 'The Plan Is Yours',
      description: 'Whether you work with us or not, the roadmap is yours to keep.',
      color: 'blue'
    },
    {
      icon: FaChartLine,
      title: 'ROI in Weeks, Not Years',
      description: 'We prioritize opportunities that pay back fast.',
      color: 'blue'
    }
  ]

  const colorClasses = {
    blue: isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600',
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        page="company"
        customTitle="About Cognia AI | AI Transformation Agency"
        customDescription="We're not a vendor, we're your AI team. Founded on the belief that transformative AI should be accessible to mid-market companies, not just enterprises."
      />

      {/* Structured Data for SEO */}
      <StructuredData type="AboutPage" />
      <StructuredData type="Organization" />
      <StructuredData
        type="BreadcrumbList"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' }
        ]}
      />

      <section className="lg:hidden relative overflow-hidden transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0">
          <MobileHeroBackground />
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
              <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>About Us</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={`text-[1.875rem] leading-[1.15] font-serif font-light tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            We Advise.{' '}
            <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>We Build. We Do Both.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}
          >
            From AI strategy to transformed operations in 60 days. Find the highest-ROI opportunities. Build only what pays back.
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
            <a
              href="tel:+16163263328"
              className={`flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-sm font-medium transition-colors ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}
            >
              <FaPhone className="text-sm" />
              <span>Talk to Expert</span>
            </a>
          </motion.div>
        </div>
      </section>

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
        <div className="w-full max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] 3xl:max-w-[1584px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 relative z-10 flex-1 flex items-center pt-8 lg:pt-12 pb-24 -mt-8 lg:-mt-12">
          <div className="grid grid-cols-12 gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

            {/* Left Column - Value Proposition (7 cols) */}
            <motion.div
              className={`col-span-7 relative rounded-2xl border p-6 xl:p-8 h-full ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
              style={glassStyle}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                    isDark
                      ? 'bg-blue-900/40 border border-blue-500/30'
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
                  <div className="relative">
                    <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
                    <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} animate-ping opacity-75`} />
                  </div>
                  <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    About Us
                  </span>
                  <FaGlobe className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </motion.div>

                <h1 className={`text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-serif font-light leading-[1.08] mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  Consultants Advise.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                    Engineers Build. We Do Both.
                  </span>
                </h1>

                <p className={`text-lg 2xl:text-xl max-w-xl mb-8 leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                  From AI strategy to transformed operations in 60 days. Find the highest-ROI AI opportunities.
                  Then build only what pays back.
                </p>

                {/* Stats Row */}
                <div className="flex items-stretch gap-4 mb-6">
                  {stats.map((item, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 min-w-[100px] rounded-xl border px-4 py-3 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className={`text-2xl 2xl:text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {item.value}
                      </div>
                      <div className={`text-[9px] 2xl:text-[10px] uppercase tracking-[0.12em] font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="/demo"
                    className="btn-primary h-14 px-8 rounded-xl text-base flex items-center justify-center gap-2"
                  >
                    <FaCalendarCheck />
                    <span>Get Started</span>
                  </Link>
                  <a
                    href="tel:+16163263328"
                    className={`h-14 px-8 rounded-xl flex items-center justify-center gap-2 border transition-colors ${
                      isDark
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <FaPhone className="text-sm" />
                    <span>Talk to Expert</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Our Approach (5 cols) */}
            <motion.div
              className={`col-span-5 rounded-2xl border p-6 xl:p-8 h-full flex flex-col ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
              style={glassStyle}
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="flex-1 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h2 className={`text-3xl font-serif font-normal mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  Our Approach
                </h2>

                <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  We combine deep industry expertise with cutting-edge AI to deliver solutions that work from day one.
                </p>

                {/* Visual Timeline */}
                <div className="flex-1 relative">
                  {/* Connecting Line - stops before the last step */}
                  <div className={`absolute left-[19px] top-4 h-[calc(100%-80px)] w-0.5 ${isDark ? 'bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300' : 'bg-gradient-to-b from-blue-500 via-blue-400 to-blue-200'}`} />

                  <div className="space-y-6">
                    {[
                      { num: '01', title: 'Discovery', desc: 'Key player interviews, workflow mapping, data identification (2 weeks)', icon: FaBrain },
                      { num: '02', title: 'Assessment', desc: 'AI-readiness scoring, data maturity evaluation, ROI calculations (1 week)', icon: FaRocket },
                      { num: '03', title: 'Deliverable', desc: 'AI Readiness Report with roadmap and investment analysis (Final week)', icon: FaShieldAlt },
                      { num: '04', title: 'Build & Ship', desc: 'We implement the solutions you choose. ROI in weeks, not years.', icon: FaChartLine }
                    ].map((step, index) => {
                      const Icon = step.icon
                      return (
                        <motion.div
                          key={index}
                          className="flex items-start gap-4 relative"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${isDark ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-bold tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                STEP {step.num}
                              </span>
                            </div>
                            <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                              {step.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                              {step.desc}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                  className="mt-6 pt-5 border-t border-dashed"
                  style={{ borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(203, 213, 225, 0.8)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    href="/demo"
                    className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
                  >
                    <span>Start your transformation</span>
                    <FaArrowRight className="text-xs" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

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
              Our Story
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Born From a Simple Observation
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Most companies are sitting on valuable data they can't use
            </p>
          </motion.div>

          {/* Story Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`rounded-xl sm:rounded-2xl border p-5 sm:p-8 lg:p-10 ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
              style={glassStyle}
            >
              <div className="space-y-4 sm:space-y-6">
                <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>
                  Cognia AI was founded on a simple observation: most companies are sitting on
                  valuable data they can't use.
                </p>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  They have the information. They just lack the systems and expertise to turn
                  it into decisions.
                </p>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  We bridge that gap — combining AI technology with deep business understanding
                  to help enterprises operate smarter.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`rounded-xl sm:rounded-2xl border p-5 sm:p-8 lg:p-10 ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
              style={glassStyle}
            >
              <div className="space-y-3 sm:space-y-4">
                {[
                  { val: '76%', label: 'Cost Reduction vs. Traditional Staff' },
                  { val: '10-20%', label: 'Revenue Increase from Captured Leads' },
                  { val: '24/7', label: 'Availability - Never Miss a Call' },
                  { val: '1 Week', label: 'Time to Launch' }
                ].map((stat, i) => (
                  <div key={i} className={`flex items-center justify-between py-3 sm:py-4 border-b last:border-0 ${isDark ? 'border-gray-700' : 'border-slate-200'}`}>
                    <span className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{stat.label}</span>
                    <span className={`text-xl sm:text-2xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />
      </section>

      <section className={`py-12 sm:py-16 md:py-24 lg:py-32 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 sm:mb-6 ${isDark ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-50'}`}>
              Our Philosophy
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              How We Think About AI
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Three principles that guide everything we do
            </p>
          </motion.div>

          {/* Philosophy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {philosophy.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-xl sm:rounded-2xl border p-5 sm:p-8 text-center ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
                  style={glassStyle}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

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
              Global Presence
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 sm:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              US + Turkey Operations
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              We serve clients across both markets with local expertise and global perspective
            </p>
          </motion.div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                country: 'United States',
                flag: '\ud83c\uddfa\ud83c\uddf8',
                description: 'Headquartered in the US, serving North American enterprises with dedicated local support and expertise.'
              },
              {
                country: 'Turkey',
                flag: '\ud83c\uddf9\ud83c\uddf7',
                description: 'Deep roots in the Turkish market, serving enterprises across the region with cultural understanding.'
              }
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-xl sm:rounded-2xl border p-5 sm:p-8 text-center ${isDark ? 'border-gray-700' : 'border-slate-200'}`}
                style={glassStyle}
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{location.flag}</div>
                <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  {location.country}
                </h3>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  {location.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-gray-700' : 'via-slate-200'}`} />
      </section>

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
              Let's Build the Future Together
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Ready to explore how AI can transform your operations? Schedule a free consultation call.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg w-full sm:w-auto"
              >
                Get in Touch
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                href="/demo"
                className={`h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg border transition-colors w-full sm:w-auto ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Schedule Demo
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 sm:mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-xs">
              {['Enterprise Ready', 'Secure Platform', 'Data Protection', '24/7 Support'].map((item, i) => (
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

export default About
