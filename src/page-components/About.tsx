'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
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
  // Glass style using CSS variables to prevent dark mode flash
  const glassStyle = {
    borderWidth: '0.5px',
    background: 'var(--hero-glass-bg)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: 'var(--hero-glass-shadow)',
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
    { value: '60', label: 'Days to Launch' },
    { value: '3x', label: 'Faster Decisions' },
    { value: '20+', label: 'Clients Served' },
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
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
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
            background: 'var(--hero-gradient-mobile)'
          }}
        />
        <div className="relative z-10 px-5 pt-24 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 dark:bg-blue-500/20 dark:border-blue-400/30">
              <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
              <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">About Us</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-[1.875rem] leading-[1.15] font-serif font-light tracking-tight mb-4 text-slate-900 dark:text-white"
          >
            We Advise.<br />We Engineer.<br />
            <span className="text-blue-600 dark:text-blue-400">We Do Both.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base leading-relaxed mb-6 text-slate-600 dark:text-gray-300"
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
                <div className="text-xl font-serif font-medium text-slate-900 dark:text-white">{item.value}</div>
                <div className="text-[9px] uppercase tracking-wider font-medium mt-1 text-slate-500 dark:text-gray-400">{item.label}</div>
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
              className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-sm font-medium transition-colors bg-slate-100 text-slate-700 border border-slate-200 dark:bg-white/10 dark:text-white dark:border-white/20"
            >
              <FaPhone className="text-sm" />
              <span>Talk to Expert</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Desktop Hero - EXACTLY matching UnifiedHero (Home page) */}
      <section className="hidden lg:flex min-h-[700px] flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <HeroBackgroundGrid isPlaying={false} />
        <div className="absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none from-white/10 to-white dark:from-gray-900/10 dark:to-gray-900" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none from-white via-white/40 dark:from-gray-900 dark:via-gray-900/40" />
        <div
          className="absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
          style={{
            background: 'var(--hero-radial-desktop)',
          }}
        />

        {/* Main container - EXACTLY matching UnifiedHero (Home page) */}
        <div className="w-full max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-12 2xl:px-16 relative z-10 flex-1 flex items-start pb-24" style={{ paddingTop: '10rem' }}>
          <div className="grid grid-cols-12 gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

            {/* Left Column - Value Proposition (7 cols) - EXACTLY like UnifiedHero */}
            <motion.div
              className="col-span-12 lg:col-span-7 relative rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 h-full border-[#e2e8f0] dark:border-blue-500/30"
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 lg:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 dark:from-transparent dark:to-transparent dark:bg-blue-900/40 dark:border-blue-500/30"
                  style={{
                    boxShadow: 'var(--hero-badge-shadow)',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full border-[1.5px] border-blue-500 dark:border-blue-400" />
                  <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400">
                    About Us
                  </span>
                </motion.div>

                <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif font-light leading-[1.08] mb-4 lg:mb-6 text-slate-900 dark:text-gray-100">
                  We Advise.<br />
                  We Engineer.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                    We Do Both.
                  </span>
                </h1>

                <p className="text-base lg:text-lg 2xl:text-xl max-w-xl lg:max-w-2xl mb-6 lg:mb-8 leading-relaxed text-slate-500 dark:text-gray-500">
                  From AI strategy to transformed operations in 60 days. Find the highest-ROI AI opportunities. Then build only what pays back.
                </p>

                {/* Stats Row - EXACTLY like UnifiedHero */}
                <div className="flex flex-wrap items-stretch gap-3 lg:gap-4">
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

                {/* CTA Button */}
                <motion.div
                  className="mt-6 lg:mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="/demo"
                    className="btn-primary h-12 lg:h-14 px-8 rounded-xl text-base flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <FaCalendarCheck className="w-4 h-4" />
                    <span>Schedule Free Consultation</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Our Approach with Timeline (5 cols) */}
            <motion.div
              className="col-span-12 lg:col-span-5 rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 h-full flex flex-col border-[#e2e8f0] dark:border-gray-700"
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
                <h2 className="text-xl lg:text-2xl font-serif font-normal mb-1 text-slate-900 dark:text-gray-100">
                  Our Approach
                </h2>
                <p className="text-sm mb-6 text-slate-500 dark:text-gray-400">
                  From strategy to implementation in 60 days.
                </p>

                {/* Visual Timeline */}
                <div className="flex-1 relative">
                  {/* Timeline items with integrated line segments */}
                  <div className="space-y-0">
                    {[
                      { num: '01', title: 'Discovery', desc: 'Interviews & workflow mapping', icon: FaBrain },
                      { num: '02', title: 'Assessment', desc: 'AI-readiness & ROI analysis', icon: FaRocket },
                      { num: '03', title: 'Deliverable', desc: 'Roadmap & investment report', icon: FaShieldAlt },
                      { num: '04', title: 'Build & Ship', desc: 'Implementation & launch', icon: FaChartLine }
                    ].map((step, index, arr) => {
                      const Icon = step.icon
                      const isLast = index === arr.length - 1
                      return (
                        <motion.div
                          key={index}
                          className="flex items-stretch gap-4 relative"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {/* Icon column with line */}
                          <div className="flex flex-col items-center">
                            <div className="btn-primary w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 p-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            {/* Connecting line to next item */}
                            {!isLast && (
                              <div className="w-[3px] flex-1 min-h-[24px] bg-gradient-to-b from-blue-500 to-blue-400" />
                            )}
                          </div>
                          {/* Content */}
                          <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-4'}`}>
                            <span className="text-[11px] font-bold tracking-wider text-blue-600 dark:text-blue-400">
                              STEP {step.num}
                            </span>
                            <h3 className="text-base font-semibold mt-0.5 text-slate-900 dark:text-gray-100">
                              {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed mt-0.5 text-slate-500 dark:text-gray-400">
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
                  className="mt-6 pt-5 border-t border-dashed border-slate-300/80 dark:border-gray-600/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
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

      <section className="py-10 sm:py-16 lg:py-32 relative bg-slate-50/50 dark:bg-gray-800/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full mb-4 sm:mb-6 bg-blue-50 border border-blue-200 dark:bg-blue-500/20 dark:border-blue-400/30">
              <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">Our Story</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-light text-slate-900 dark:text-gray-100">
              Data to Decisions
            </h2>
          </motion.div>

          {/* Stats grid only - clean and simple */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {[
              { val: '76%', label: 'Cost Reduction' },
              { val: '10-20%', label: 'Revenue Lift' },
              { val: '24/7', label: 'Availability' },
              { val: '1 Week', label: 'To Launch' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border p-4 sm:p-6 text-center border-slate-200 dark:border-gray-700"
                style={glassStyle}
              >
                <div className="text-2xl sm:text-3xl font-serif font-medium tracking-tight mb-1 text-slate-800 dark:text-white">{stat.val}</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />
      </section>

      <section className="py-10 sm:py-16 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-16"
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full mb-4 sm:mb-6 bg-blue-50 border border-blue-200 dark:bg-blue-500/20 dark:border-blue-400/30">
              <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">Our Philosophy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-light mb-3 sm:mb-6 text-slate-900 dark:text-gray-100">
              How We Think About AI
            </h2>
            <p className="text-sm sm:text-lg max-w-2xl mx-auto text-slate-600 dark:text-gray-400">
              Three principles that guide everything we do
            </p>
          </motion.div>

          {/* Philosophy Cards - Compact list on mobile, grid on desktop */}
          <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
            {philosophy.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-xl sm:rounded-2xl border p-4 sm:p-8 border-slate-200 dark:border-gray-700"
                  style={glassStyle}
                >
                  {/* Mobile: Horizontal layout, Desktop: Centered */}
                  <div className="flex items-start gap-3 lg:flex-col lg:items-center lg:text-center">
                    <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 lg:mb-6 ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-4 h-4 sm:w-7 sm:h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-3 text-slate-900 dark:text-gray-100">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 lg:py-32 relative bg-slate-50/50 dark:bg-gray-800/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-16"
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full mb-4 sm:mb-6 bg-blue-50 border border-blue-200 dark:bg-blue-500/20 dark:border-blue-400/30">
              <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">Global Presence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-light mb-3 sm:mb-6 text-slate-900 dark:text-gray-100">
              US + Turkiye Operations
            </h2>
            <p className="text-sm sm:text-lg max-w-2xl mx-auto text-slate-600 dark:text-gray-400">
              Local expertise. Global perspective.
            </p>
          </motion.div>

          {/* Location Cards - Side by side on mobile */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                country: 'United States',
                flag: '\ud83c\uddfa\ud83c\uddf8',
                description: 'Serving North American enterprises.'
              },
              {
                country: 'Turkiye',
                flag: '\ud83c\uddf9\ud83c\uddf7',
                description: 'Deep roots in the Turkish market.'
              }
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl sm:rounded-2xl border p-4 sm:p-8 text-center border-slate-200 dark:border-gray-700"
                style={glassStyle}
              >
                <div className="text-3xl sm:text-5xl mb-2 sm:mb-4">{location.flag}</div>
                <h3 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-3 text-slate-900 dark:text-gray-100">
                  {location.country}
                </h3>
                <p className="text-[10px] sm:text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                  {location.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent via-slate-200 dark:via-gray-700" />
      </section>

      <section className="py-10 sm:py-16 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl sm:rounded-[2rem] border p-5 sm:p-10 lg:p-16 text-center border-slate-200 dark:border-gray-700"
            style={glassStyle}
          >
            <h2 className="text-xl sm:text-3xl lg:text-5xl font-serif font-light mb-3 sm:mb-6 text-slate-900 dark:text-gray-100">
              Let's Build the Future Together
            </h2>
            <p className="text-sm sm:text-lg max-w-2xl mx-auto mb-5 sm:mb-8 text-slate-600 dark:text-gray-400">
              Ready to explore how AI can transform your operations?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary h-11 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-lg w-full sm:w-auto"
              >
                Get in Touch
                <FaArrowRight className="text-xs sm:text-sm" />
              </Link>
              <Link
                href="/demo"
                className="h-11 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-lg border transition-colors w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Schedule Demo
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-5 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-2 sm:gap-6 text-[10px] sm:text-xs">
              {['Enterprise Ready', 'Secure Platform', 'Data Protection', '24/7 Support'].map((item, i) => (
                <span key={i} className="flex items-center gap-1 sm:gap-2 text-slate-500 dark:text-gray-500">
                  <FaCheckCircle className="text-[8px] sm:text-xs text-blue-500 dark:text-blue-400" />
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
