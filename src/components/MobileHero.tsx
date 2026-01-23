'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { ArrowRight } from 'lucide-react'
import HeroBackgroundGrid from './HeroBackgroundGrid'

const MobileHero: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  return (
    <section className={`lg:hidden relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>

      {/* Dynamic Background Grid */}
      <div className="absolute inset-0">
        <HeroBackgroundGrid isPlaying={false} />
      </div>

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, rgba(17,24,39,0.85) 0%, rgba(17,24,39,0.7) 40%, rgba(17,24,39,0.5) 100%)'
            : 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.5) 100%)'
        }}
      />

      <div className="relative z-10 px-5 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
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
              AI Transformation Agency
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className={`text-[2rem] leading-[1.15] font-serif font-light tracking-tight mb-5 ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          Never Miss a Call{' '}
          <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            Ever Again
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}
        >
          AI voice agents that answer calls 24/7, book appointments, and handle customer inquiries.
        </motion.p>

        {/* Stats row - simpler design */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex justify-between mb-8 px-2"
        >
          {[
            { value: '50+', label: 'Businesses' },
            { value: '100K+', label: 'Calls Handled' },
            { value: '95%', label: 'Satisfaction' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-2xl font-serif font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {stat.value}
              </div>
              <div className={`text-[10px] uppercase tracking-wider font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
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
            <span>Schedule Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/what-we-do"
            className={`flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-sm font-medium transition-colors ${
              isDark
                ? 'bg-white/10 text-white border border-white/20 active:bg-white/15'
                : 'bg-slate-900/5 text-slate-700 border border-slate-200 active:bg-slate-100'
            }`}
          >
            <span>See What We Do</span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

export default MobileHero
